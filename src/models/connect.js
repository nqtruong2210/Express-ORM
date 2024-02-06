import { Sequelize } from "sequelize";
import dbConfig from "../config/db.config.js";

const { dbName, dbUserName, dbPassword, dbHost, dbPort, dbDialect } = dbConfig;

const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect,
});

// Lệnh Connect DataBase thành công / thất bại
// try {
//   await sequelize.authenticate();
//   console.log("Connection successful");
// } catch (error) {
//   console.log("Connection failed");
// }

// Lệnh chạy DataBase: npx sequelize-auto -h localhost -d EXPRESS-ORM -u root -x 1234 -p 3307 --dialect mysql -o src/models -l esm

export default sequelize;
