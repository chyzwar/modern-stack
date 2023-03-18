import type {Options} from "sequelize";
import {Sequelize} from "sequelize";

const options: Options = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  dialect: "postgres",
  retry: {
    max: 10,
  },
};

const sequelize = new Sequelize(options);

export default sequelize;
