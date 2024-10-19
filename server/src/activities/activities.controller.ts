import { Request, Response } from "express";
import Activities from "./activities.module";
import message from "./activities.message";
class ActivitiesControllers {
  /**
   * show all Activities
   * @param req
   * @param res
   * @returns all Activities
   */
  async index(req: Request, res: Response): Promise<void> {
    try {
      const acti = await Activities.findAll();
      if (!acti || acti.length === 0) {
        res.status(404).json({
          data: "Không thành công!",
          message: message.ACTIVITY_NOT_FOUND,
        });
        return;
      }
      res.status(200).json({
        data: acti,
        message: message.INDEX,
      });
    } catch (error) {
      console.error("Lỗi lấy danh sách hoạt động:", error);
      res
        .status(500)
        .json({ data: "Không thành công!", message: message.GET_FAILED });
    }
  }

  /**
   * create a new Activities
   * @param req
   * @param res
   * @returns new Activities
   */
  async create(req: Request, res: Response): Promise<void> {
    const { id, title, date, content, image } = req.body;

    try {
      const existingActi = await Activities.findOne({ where: { id } });
      if (existingActi) {
        res
          .status(400)
          .json({
            data: "Không thành công!",
            message: message.ACTIVITY_EXISTED,
          });
        return;
      }

      const newActi = await Activities.create({
        id,
        title,
        date,
        content,
        image,
      });

      res.status(201).json({
        data: newActi,
        message: message.CREATE,
      });
    } catch (error) {
      console.error("Lỗi không thể thêm hoạt động:", error);
      res
        .status(500)
        .json({ data: "Không thành công!", message: message.CREATE_FAILED });
    }
  }

  /**
   * delete a Activities
   * @param req
   * @param res
   * @returns delete Activities
   */
  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const result = await Activities.destroy({
        where: { id },
      });

      if (result === 0) {
        res
          .status(404)
          .json({
            data: "Không thành công!",
            message: message.ACTIVITY_NOT_FOUND,
          });
        return;
      }

      res
        .status(200)
        .json({ data: "Xoá thành công!", message: message.DESTROY });
    } catch (error) {
      console.error("Lỗi không thể xoá hoạt động:", error);
      res
        .status(500)
        .json({ data: "Không thành công!", message: message.DELETE_FAILED });
    }
  }

  /**
   * show a Activities
   * @param req
   * @param res
   * @returns a Activities
   */
  async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const acti = await Activities.findByPk(id);
      if (!acti) {
        res
          .status(404)
          .json({
            data: "Không thành công!",
            message: message.ACTIVITY_NOT_FOUND,
          });
        return;
      }
      res.status(200).json({
        data: acti,
        message: message.SHOW,
      });
    } catch (error) {
      console.error("Lỗi không thể lấy thông tin chi tiết hoạt động:", error);
      res
        .status(500)
        .json({ data: "Không thành công!", message: message.SHOW_FAILED });
    }
  }

  /**
   * update a news
   * @param req
   * @param res
   * @returns updated news
   */
  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, date, content, image } = req.body;

    try {
      const acti = await Activities.findByPk(id);

      if (!acti) {
        res
          .status(404)
          .json({
            data: "Không thành công!",
            message: message.ACTIVITY_NOT_FOUND,
          });
        return;
      }
      acti.title = title;
      acti.date = date;
      acti.content = content;
      acti.image = image;

      await acti.save();

      res.status(200).json({
        data: acti,
        message: message.UPDATE,
      });
    } catch (error) {
      console.error("Lỗi không để cập nhật thông tin hoạt động:", error);
      res
        .status(500)
        .json({ data: "Không thành công!", message: message.CREATE_FAILED });
    }
  }
}
export default new ActivitiesControllers();
