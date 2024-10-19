import { Request, Response } from "express";
import Members from "./members.module";
import message from "./members.message";
class MembersControllers {
  /**
   * show all members
   * @param req
   * @param res
   * @returns all members
   */
  async index(req: Request, res: Response): Promise<void> {
    try {
      const members = await Members.findAll();
      if (!members || members.length === 0) {
        res
          .status(404)
          .json({
            data: "Không thành công!",
            message: message.MEMBER_NOT_FOUND,
          });
        return;
      }
      res.status(200).json({
        data: members,
        message: message.INDEX,
      });
    } catch (error) {
      console.error("Lỗi lấy danh sách thành viên:", error);
      res
        .status(500)
        .json({ data: "Không thành công!", message: message.GET_FAILED });
    }
  }

  /**
   * create a new member
   * @param req
   * @param res
   * @returns new member
   */
  async create(req: Request, res: Response): Promise<void> {
    const {
      id,
      lastName,
      firstName,
      gender,
      birthday,
      email,
      phone,
      class: className,
      avatar,
      generation,
    } = req.body;

    try {
      const existingMember = await Members.findOne({ where: { id } });
      if (existingMember) {
        res
          .status(400)
          .json({ data: "Không thành công!", message: message.MEMBER_EXISTED });
        return;
      }

      const newMember = await Members.create({
        id,
        lastName,
        firstName,
        gender,
        birthday,
        email,
        phone,
        class: className,
        avatar,
        generation,
      });

      res.status(201).json({
        data: newMember,
        message: message.CREATE,
      });
    } catch (error) {
      console.error("Lỗi không thể tạo thành viên:", error);
      res
        .status(500)
        .json({ data: "Không thành công!", message: message.CREATE_FAILED });
    }
  }

  /**
   * delete a member
   * @param req
   * @param res
   * @returns delete member
   */
  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const result = await Members.destroy({
        where: { id },
      });

      if (result === 0) {
        res
          .status(404)
          .json({
            data: "Không thành công!",
            message: message.MEMBER_NOT_FOUND,
          });
        return;
      }

      res
        .status(200)
        .json({ data: "Xoá thành công!", message: message.DESTROY });
    } catch (error) {
      console.error("Lỗi không thể xoá thành viên:", error);
      res
        .status(500)
        .json({ data: "Không thành công!", message: message.DELETE_FAILED });
    }
  }

  /**
   * show a member
   * @param req
   * @param res
   * @returns a member
   */
  async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const member = await Members.findByPk(id);
      if (!member) {
        res
          .status(404)
          .json({
            data: "Không thành công!",
            message: message.MEMBER_NOT_FOUND,
          });
        return;
      }
      res.status(200).json({
        data: member,
        message: message.SHOW,
      });
    } catch (error) {
      console.error("Lỗi không thể lấy thông tin chi tiết thành viên:", error);
      res
        .status(500)
        .json({ data: "Không thành công!", message: message.SHOW_FAILED });
    }
  }

  /**
   * update a member
   * @param req
   * @param res
   * @returns updated member
   */
  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const {
      lastName,
      firstName,
      gender,
      birthday,
      email,
      phone,
      class: className,
      avatar,
      generation,
    } = req.body;

    try {
      const member = await Members.findByPk(id);

      if (!member) {
        res
          .status(404)
          .json({
            data: "Không thành công!",
            message: message.MEMBER_NOT_FOUND,
          });
        return;
      }

      member.lastName = lastName;
      member.firstName = firstName;
      member.gender = gender;
      member.birthday = birthday;
      member.email = email;
      member.phone = phone;
      member.class = className;
      member.avatar = avatar;
      member.generation = generation;

      await member.save();
      res.status(200).json({
        data: member,
        message: message.UPDATE,
      });
    } catch (error) {
      console.error("Lỗi không để cập nhật thông tin thành viên:", error);
      res
        .status(500)
        .json({ data: "Không thành công!", message: message.CREATE_FAILED });
    }
  }
}
export default new MembersControllers();
