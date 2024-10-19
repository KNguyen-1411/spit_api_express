import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB";

class Activities extends Model {
  public id!: string;
  public title!: string;
  public date!: Date;
  public content!: string;
  public image!: string;
}

Activities.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Activities",
  }
);

// Đồng bộ hóa mô hình với cơ sở dữ liệu (nếu cần)
Activities.sync().then(() => {});

export default Activities;
