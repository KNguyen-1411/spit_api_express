import { Model, DataTypes, SchemaOptions } from 'sequelize';
import { sequelize } from '../config/db';

class User extends Model {
  public id!: string;
  public userName!: string;
  public password!: string;
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User'
  }
);
// Đồng bộ hóa mô hình với cơ sở dữ liệu (nếu cần)
User.sync().then(() => {});

export default User;
