import PDFDocument from "pdfkit";
import { Response } from "express";

import { getAttendanceExportData } from "./attendance.service.js";

export const exportPDF = async (eventId: bigint, res: Response) => {
  const registrations = await getAttendanceExportData(eventId);

  const doc = new PDFDocument({
    margin: 40,

    size: "A4",
  });

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=attendance-${eventId}.pdf`,
  );

  doc.pipe(res);

  /*
  |--------------------------------------------------------------------------
  | Header
  |--------------------------------------------------------------------------
  */

  doc
    .fillColor("#0F766E")
    .font("Helvetica-Bold")
    .fontSize(22)
    .text("Royal University of Phnom Penh", {
      align: "center",
    });

  doc.fontSize(15).text("Student Conference & Opportunity Platform", {
    align: "center",
  });

  doc.moveDown(0.5);

  doc.moveTo(40, doc.y).lineTo(555, doc.y).strokeColor("#0F766E").stroke();

  doc.moveDown();

  doc.fillColor("#2563EB").fontSize(20).text("Attendance Report", {
    align: "center",
  });

  doc.moveDown();

  /*
  |--------------------------------------------------------------------------
  | Event Information
  |--------------------------------------------------------------------------
  */

  if (registrations.length > 0) {
    const event = registrations[0].event;

    doc
      .fillColor("black")
      .font("Helvetica-Bold")
      .fontSize(15)
      .text("Event Information");

    doc.moveDown(0.5);

    doc.font("Helvetica");

    doc.text(`Event : ${event.title}`);

    doc.text(`Location : ${event.location ?? "-"}`);

    doc.text(`Date : ${event.eventDate.toLocaleString()}`);

    doc.text(`Generated : ${new Date().toLocaleString()}`);

    doc.moveDown();
  }

  /*
  |--------------------------------------------------------------------------
  | Attendance Summary
  |--------------------------------------------------------------------------
  */

  const total = registrations.length;

  const checkedIn = registrations.filter(
    (registration) => registration.attendanceRecord,
  ).length;

  const absent = total - checkedIn;

  const rate = total === 0 ? 0 : Math.round((checkedIn / total) * 100);

  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .fillColor("#2563EB")
    .text("Attendance Summary");

  doc.moveDown(0.5);

  const boxY = doc.y;

  doc.roundedRect(40, boxY, 515, 90, 8).fillAndStroke("#ECFDF5", "#10B981");

  doc.fillColor("black").font("Helvetica").fontSize(12);

  doc.text(`Registered Students : ${total}`, 60, boxY + 15);

  doc.text(`Checked In          : ${checkedIn}`);

  doc.text(`Absent              : ${absent}`);

  doc.text(`Attendance Rate     : ${rate}%`);

  doc.moveDown(5);

  /*
  |--------------------------------------------------------------------------
  | Attendee List
  |--------------------------------------------------------------------------
  */

  doc
    .fillColor("#2563EB")
    .font("Helvetica-Bold")
    .fontSize(15)
    .text("Attendee List");

  doc.moveDown();

  const tableTop = doc.y;

  doc.rect(40, tableTop, 515, 22).fill("#F3F4F6");

  doc.fillColor("black").font("Helvetica-Bold").fontSize(10);

  doc.text("No", 45, tableTop + 6);

  doc.text("Student", 75, tableTop + 6);

  doc.text("University", 220, tableTop + 6);

  doc.text("Major", 360, tableTop + 6);

  doc.text("Status", 455, tableTop + 6);

  doc.text("Time", 515, tableTop + 6);

  let rowY = tableTop + 25;

  /*
  |--------------------------------------------------------------------------
  | Table Rows
  |--------------------------------------------------------------------------
  */

  registrations.forEach((registration, index) => {
    if (rowY > 730) {
      doc.addPage();

      rowY = 40;
    }

    if (index % 2 === 0) {
      doc.rect(40, rowY - 2, 515, 20).fill("#FAFAFA");
    }

    doc.fillColor("black").font("Helvetica").fontSize(10);

    const student = registration.student;

    const status = registration.attendanceRecord ? "Checked In" : "Absent";

    const time = registration.attendanceRecord?.checkInTime
      ? registration.attendanceRecord.checkInTime.toLocaleTimeString()
      : "-";

    doc.text(String(index + 1), 45, rowY);

    doc.text(student.user.profile?.fullName ?? "-", 75, rowY, {
      width: 135,
    });

    doc.text(student.university?.universityName ?? "-", 220, rowY, {
      width: 125,
    });

    doc.text(student.major?.majorName ?? "-", 360, rowY, {
      width: 90,
    });

    doc.text(status, 455, rowY);

    doc.text(time, 515, rowY);

    rowY += 22;
  });

  /*
  |--------------------------------------------------------------------------
  | Footer
  |--------------------------------------------------------------------------
  */

  doc.moveTo(40, 770).lineTo(555, 770).strokeColor("#CCCCCC").stroke();

  doc
    .fontSize(9)
    .fillColor("gray")
    .text(
      "Generated by RUPP Student Conference & Opportunity Platform",
      40,
      780,
      {
        align: "center",
      },
    );

  doc.end();
};
