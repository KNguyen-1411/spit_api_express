import { Sequelize } from "sequelize";
import "dotenv/config";

const { DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize(
  DB_NAME || "",
  DB_USER || "",
  DB_PASSWORD || "",
  {
    host: "spit_api_app_database",
    dialect: "mysql",
  }
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Ket noi database thanh cong");
  } catch (error) {
    console.error("Ket noi database that bai:", error);
  }
};

export { sequelize };
export default connectToDatabase;
