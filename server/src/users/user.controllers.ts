import { Request, Response } from "express";
import User from "./user.module";
import message from "./user.mesage";
import { generateAT } from "../../config/jwt";
class UserControllers {
  async index(req: Request, res: Response): Promise<void> {
    const { userName, password } = req.body;
    try {
      const user = await User.findOne({ where: { userName, password } });
      if (!user) {
        res.status(404).json({
          data: "Tài khoản hoặc mật khẩu không đúng!",
          message: message.LOGIN_FAILED,
        });
        return;
      }
      const accessToken = generateAT({ userName });
      res.status(200).json({
        data: {
          userName: user.userName,
          accessToken: accessToken,
        },
        message: message.LOGIN_SUCCESS,
      });
    } catch (error) {
      console.error("Error server:", error);
      res.status(500).json({
        data: "Lỗi máy chủ!",
        message: message.SERVER_ERROR,
      });
    }
  }

  async show(req: Request, res: Response): Promise<void> {
    const username = res.locals.userName;
    const user = await User.findOne({ where: { userName: username } });
    if (user) {
      res.status(200).json({
        data: {
          userName: user.userName,
        },
        message: message.LOGIN_SUCCESS,
      });
      return;
    } else {
      res.status(404).json({
        data: "Người dùng không tồn tại!",
        message: message.USER_NOT_FOUND,
      });
      return;
    }
  }
}

export default new UserControllers();
