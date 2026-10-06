import { type Request, type Response, type NextFunction } from "express";
import { listUsers, updateAccountStatus } from "./user.admin.service.js";
import { getIO } from "../../socket/socket.js";
import { successResponse } from "../../utils/apiResponse.js";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await listUsers(Number(req.query.page ?? 1), Number(req.query.limit ?? 10), String(req.query.search || ""), req.query.role ? String(req.query.role) : undefined);
    return successResponse(res, data);
  } catch (error) { next(error); }
};
export const changeAccountStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await updateAccountStatus(BigInt(String(req.params.id)), BigInt(req.user!.id), req.body.accountStatus);
    if (data.accountStatus !== "ACTIVE") getIO()?.in(String(data.id)).disconnectSockets(true);
    return successResponse(res, data, "Account status updated");
  } catch (error) { next(error); }
};
