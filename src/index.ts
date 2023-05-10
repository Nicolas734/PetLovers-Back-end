import express from "express";
import * as dotenv from "dotenv";
import startDb from "./config/db";
import routes from "./routes";
import cors from "cors";
import { dirExiste } from "./functions/utils";


dotenv.config();

const PORT = process.env.PORT || 3000;
const DIR = process.env.DIR || 'uploads/';

startDb();
dirExiste(DIR);

const app = express();

app.use(express.json());
app.use(cors())
app.use(routes);


app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
