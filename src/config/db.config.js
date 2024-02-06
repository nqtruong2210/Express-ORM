import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  dbName: process.env.DB_NAME,
  dbUserName: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASS,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbDialect: process.env.DB_DIALECT,
};

export default dbConfig;
