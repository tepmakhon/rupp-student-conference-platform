import { beforeEach, describe, expect, it, vi } from "vitest";
vi.hoisted(() => { process.env.JWT_SECRET = "test-only-secret-with-at-least-32-characters"; });
const db = vi.hoisted(() => {
  const model = () => ({ findMany: vi.fn(), findUnique: vi.fn(), findFirst: vi.fn(), create: vi.fn(), update: vi.fn(), count: vi.fn(), delete: vi.fn(), deleteMany: vi.fn() });
  const tx = { event: model(), eventRegistration: model(), attendanceRecord: model(), student: model(), activityScoreHistory: model(), application: model(), user: model(), auditLog: model(), $queryRaw: vi.fn() };
  return { ...tx, $transaction: vi.fn(), organization: model(), opportunity: model(), tx };
});
vi.mock("../src/config/prisma.js", () => ({ prisma: db }));
vi.mock("../src/socket/dashboardEvents.js", () => ({ refreshStudentDashboard: vi.fn(), refreshOrganizationDashboard: vi.fn(), refreshAdminDashboard: vi.fn() }));
vi.mock("../src/modules/notification/notification.service.js", () => ({ createNotification: vi.fn(), notifyAdmins: vi.fn() }));
vi.mock("../src/modules/audit/audit.service.js", () => ({ createAuditLog: vi.fn() }));
import { scanAttendance } from "../src/modules/attendance/attendance.service.js";
import { registerForEvent, deleteEvent, getEventById } from "../src/modules/event/event.service.js";
import { updateAccountStatus, listUsers } from "../src/modules/user/user.admin.service.js";
import { getAllOpportunities } from "../src/modules/opportunity/opportunity.service.js";

const event = { id: 10n, organizationId: 2n, title: "Workshop", status: "APPROVED", eventDate: new Date("2099-01-01"), capacity: 1, organization: { userId: 2n } };
beforeEach(() => {
  vi.resetAllMocks();
  db.$transaction.mockImplementation((callback) => callback(db.tx));
  db.student.findUnique.mockResolvedValue({ id: 1n, userId: 1n });
  db.student.update.mockResolvedValue({ id: 1n, userId: 1n });
  db.event.findUnique.mockResolvedValue(event);
  db.eventRegistration.findUnique.mockResolvedValue(null);
  db.eventRegistration.count.mockResolvedValue(0);
  db.eventRegistration.create.mockResolvedValue({ id: 11n });
});
describe("workflow consistency", () => {
  it("locks the event before checking capacity and awards points in the same transaction", async () => {
    await expect(registerForEvent(10n, 1n)).resolves.toEqual({ id: 11n });
    expect(db.tx.$queryRaw).toHaveBeenCalled();
    expect(db.tx.$queryRaw.mock.invocationCallOrder[0]).toBeLessThan(db.tx.eventRegistration.count.mock.invocationCallOrder[0]);
    expect(db.$transaction).toHaveBeenCalledTimes(1);
    expect(db.tx.student.update).toHaveBeenCalledWith(expect.objectContaining({ data: { activityScore: { increment: 10 } } }));
    expect(db.tx.activityScoreHistory.create).toHaveBeenCalled();
  });
  it("refuses full, duplicate and unapproved registrations before creating records", async () => {
    db.eventRegistration.count.mockResolvedValue(1);
    await expect(registerForEvent(10n, 1n)).rejects.toMatchObject({ message: "Event is full" });
    db.eventRegistration.findUnique.mockResolvedValue({ id: 11n });
    await expect(registerForEvent(10n, 1n)).rejects.toMatchObject({ statusCode: 409 });
    db.event.findUnique.mockResolvedValue({ ...event, status: "PENDING" });
    await expect(registerForEvent(10n, 1n)).rejects.toMatchObject({ message: "Event is not approved" });
    expect(db.eventRegistration.create).not.toHaveBeenCalled();
  });
  it("blocks attendance scanning for another organization", async () => {
    db.eventRegistration.findUnique.mockResolvedValue({ id: 11n, registrationStatus: "APPROVED", event, student: { id: 1n, userId: 1n } });
    await expect(scanAttendance(11n, 3n)).rejects.toMatchObject({ statusCode: 403 });
    expect(db.attendanceRecord.create).not.toHaveBeenCalled();
  });
  it("records attendance and points in one transaction", async () => {
    db.eventRegistration.findUnique.mockResolvedValue({ id: 11n, registrationStatus: "APPROVED", event, student: { id: 1n, userId: 1n } });
    db.attendanceRecord.create.mockResolvedValue({ id: 12n });
    await expect(scanAttendance(11n, 2n)).resolves.toEqual({ id: 12n });
    expect(db.$transaction).toHaveBeenCalledTimes(1);
    expect(db.tx.student.update).toHaveBeenCalledWith(expect.objectContaining({ data: { activityScore: { increment: 20 } } }));
  });
  it("does not award points when attendance creation fails", async () => {
    db.eventRegistration.findUnique.mockResolvedValue({ id: 11n, registrationStatus: "APPROVED", event, student: { id: 1n, userId: 1n } });
    db.attendanceRecord.create.mockRejectedValue(new Error("database failure"));
    await expect(scanAttendance(11n, 2n)).rejects.toThrow("database failure");
    expect(db.student.update).not.toHaveBeenCalled();
  });
  it("deletes attendance before registrations inside a transaction", async () => {
    db.organization.findUnique.mockResolvedValue({ id: 2n });
    await deleteEvent(10n, 2n);
    expect(db.$transaction).toHaveBeenCalledTimes(1);
    expect(db.attendanceRecord.deleteMany.mock.invocationCallOrder[0]).toBeLessThan(db.eventRegistration.deleteMany.mock.invocationCallOrder[0]);
    expect(db.eventRegistration.deleteMany.mock.invocationCallOrder[0]).toBeLessThan(db.event.delete.mock.invocationCallOrder[0]);
  });
  it("hides unapproved event details from public and students while allowing owner/admin", async () => {
    db.event.findUnique.mockResolvedValue({ ...event, status: "PENDING" });
    await expect(getEventById(10n)).rejects.toMatchObject({ statusCode: 404 });
    await expect(getEventById(10n, { id: "1", roleName: "STUDENT" })).rejects.toMatchObject({ statusCode: 404 });
    await expect(getEventById(10n, { id: "2", roleName: "ORGANIZATION" })).resolves.toBeTruthy();
    await expect(getEventById(10n, { id: "3", roleName: "ADMIN" })).resolves.toBeTruthy();
  });
});
describe("admin accounts", () => {
  it("records account status and actor atomically", async () => {
    db.user.findUnique.mockResolvedValue({ id: 1n, role: { roleName: "STUDENT" } });
    await updateAccountStatus(1n, 3n, "SUSPENDED");
    expect(db.user.update).toHaveBeenCalledWith(expect.objectContaining({ data: { accountStatus: "SUSPENDED" } }));
    expect(db.auditLog.create).toHaveBeenCalledWith({ data: { userId: 3n, action: "ACCOUNT_STATUS:1:SUSPENDED" } });
  });
  it("prevents self-suspension and administrator suspension", async () => {
    await expect(updateAccountStatus(3n, 3n, "SUSPENDED")).rejects.toMatchObject({ statusCode: 400 });
    db.user.findUnique.mockResolvedValue({ id: 4n, role: { roleName: "ADMIN" } });
    await expect(updateAccountStatus(4n, 3n, "SUSPENDED")).rejects.toMatchObject({ statusCode: 403 });
    expect(db.user.update).not.toHaveBeenCalled();
  });
  it("validates roles before running account queries", async () => {
    await expect(listUsers(1, 10, "", "UNKNOWN")).rejects.toMatchObject({ statusCode: 400 });
  });
});


describe("public discovery", () => {
  it("ignores a request to expose pending opportunities", async () => {
    db.opportunity.findMany.mockResolvedValue([]);
    db.opportunity.count.mockResolvedValue(0);
    await getAllOpportunities({ page: 1, limit: 10, status: "PENDING" });
    expect(db.opportunity.findMany).toHaveBeenCalledWith(expect.objectContaining({ where: expect.objectContaining({ status: "APPROVED" }) }));
  });
});
