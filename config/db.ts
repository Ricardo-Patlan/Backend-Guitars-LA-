import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Guitar from "../model/Guitar.model";
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [Guitar],
  logging: false,
});

export default db;
