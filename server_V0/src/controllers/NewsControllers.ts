import { Request, Response } from 'express';
import News from '../models/News';
import message from '../messages/news.message';
class NewsControllers {
  /**
   * show all news
   * @param req
   * @param res
   * @returns all members
   */
  async index(req: Request, res: Response): Promise<void> {
    try {
      const news = await News.findAll();
      if (!news || news.length === 0) {
        res.status(404).json({ data: 'Không thành công!', message: message.NEWS_NOT_FOUND });
        return;
      }
      res.status(200).json({
        data: news,
        message: message.INDEX
      });
    } catch (error) {
      console.error('Lỗi lấy danh sách tin tức:', error);
      res.status(500).json({ data: 'Không thành công!', message: message.GET_FAILED });
    }
  }

  /**
   * create a new news
   * @param req
   * @param res
   * @returns new news
   */
  async create(req: Request, res: Response): Promise<void> {
    const { id, title, date, contentHeader, contentFooter, contentMain, image } = req.body;

    try {
      const existingNews = await News.findOne({ where: { id } });
      if (existingNews) {
        res.status(400).json({ data: 'Không thành công!', message: message.NEWS_EXISTED });
        return;
      }

      const newMember = await News.create({
        id,
        title,
        date,
        contentHeader,
        contentFooter,
        contentMain,
        image
      });

      res.status(201).json({
        data: newMember,
        message: message.CREATE
      });
    } catch (error) {
      console.error('Lỗi không thể tạo tin tức:', error);
      res.status(500).json({ data: 'Không thành công!', message: message.CREATE_FAILED });
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
      const result = await News.destroy({
        where: { id }
      });

      if (result === 0) {
        res.status(404).json({ data: 'Không thành công!', message: message.NEWS_NOT_FOUND });
        return;
      }

      res.status(200).json({ data: 'Xoá thành công!', message: message.DESTROY });
    } catch (error) {
      console.error('Lỗi không thể xoá tin tức:', error);
      res.status(500).json({ data: 'Không thành công!', message: message.DELETE_FAILED });
    }
  }

  /**
   * show a news
   * @param req
   * @param res
   * @returns a news
   */
  async show(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const news = await News.findByPk(id);
      if (!news) {
        res.status(404).json({ data: 'Không thành công!', message: message.NEWS_NOT_FOUND });
        return;
      }
      res.status(200).json({
        data: news,
        message: message.SHOW
      });
    } catch (error) {
      console.error('Lỗi không thể lấy thông tin chi tiết tin tức:', error);
      res.status(500).json({ data: 'Không thành công!', message: message.SHOW_FAILED });
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
    const { title, date, contentHeader, contentFooter, contentMain, image } = req.body;

    try {
      const news = await News.findByPk(id);

      if (!news) {
        res.status(404).json({ data: 'Không thành công!', message: message.NEWS_NOT_FOUND });
        return;
      }
      news.title = title;
      news.date = date;
      news.contentHeader = contentHeader;
      news.contentFooter = contentFooter;
      news.contentMain = contentMain;
      news.image = image;

      await news.save();
      res.status(200).json({
        data: news,
        message: message.UPDATE
      });
    } catch (error) {
      console.error('Lỗi không để cập nhật thông tin bài viết:', error);
      res.status(500).json({ data: 'Không thành công!', message: message.CREATE_FAILED });
    }
  }
}
export default new NewsControllers();
