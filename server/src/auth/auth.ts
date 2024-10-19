import { Request, Response, NextFunction } from "express";
import { verifyAT } from "../../config/jwt";
import message from "./auth.message";
import User from "../users/user.module";

export const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({
      data: "Không có mã truy cập!",
      message: message.ACCESS_TOKEN_REQUIRED,
    });
    return;
  }
  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) {
    res.status(401).json({
      data: "Không có mã truy cập!",
      message: message.ACCESS_TOKEN_REQUIRED,
    });
    return;
  }
  const payload = verifyAT(accessToken);
  if (!payload) {
    res.status(401).json({
      data: "Mã truy cập không hợp lệ!",
      message: message.INVALID_ACCESS_TOKEN,
    });
    return;
  }
  res.locals.userName = payload.userName;
  next();
};

export const checkPermission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const username = res.locals.userName;
  const user = await User.findOne({ where: { userName: username } });
  if (user && checkAdmin(user.role)) {
    res.locals.user = username;
    console.log("User: check quyen thanh cong");
    next();
    return;
  }
  res.status(403).json({
    data: "Không có quyền truy cập!",
    message: message.NO_PERMISSION,
  });
};
const checkAdmin = (role: string): boolean => {
  if (role === "admin") {
    return true;
  }
  return false;
};
