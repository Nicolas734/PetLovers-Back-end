import express from "express";
import * as dotenv from "dotenv";
import startDb from "./config/db";
import routes from "./routes";
import cors from "cors";
import { dirExiste } from "./functions/utils";



dotenv.config();

const PORT = process.env.PORT || 3000;

startDb();

const app = express();

app.use(express.static(__dirname));
app.use(express.json());
app.use(cors());
app.use(routes);


app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));