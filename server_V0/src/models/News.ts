import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class News extends Model {
  public id!: string;
  public title!: string;
  public date!: Date;
  public contentHeader!: string;
  public contentMain!: string;
  public contentFooter!: string;
  public image!: string;
}

News.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    contentHeader: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contentMain: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    contentFooter: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'News'
  }
);

// Đồng bộ hóa mô hình với cơ sở dữ liệu (nếu cần)
News.sync().then(() => {});

export default News;
