import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Members extends Model {
  public id!: string;
  public lastName!: string;
  public firstName!: string;
  public gender!: boolean;
  public birthday!: Date;
  public email!: string;
  public phone!: string;
  public class!: string;
  public avatar!: string;
  public generation!: number;
}
Members.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    class: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true
    },
    generation: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Members'
  }
);

Members.sync().then(() => {});

export default Members;
