import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const USER = process.env.USER || 'root';
const PASSWORD = process.env.PASSWORD || 'sua_senha';
const DATABASE = process.env.DATABASE || 'root';
const HOST = process.env.HOST || 'localhost';


const url = process.env.DATABASE_URL || `mysql://${USER}:${PASSWORD}@${HOST}:3306/${DATABASE}`

const db = new Sequelize(url)

export default db;