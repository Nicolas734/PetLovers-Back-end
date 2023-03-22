import express from "express";
import * as dotenv from "dotenv";
import startDb from "./config/db";
import routes from "./routes";

dotenv.config()
startDb()

const app = express();
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> console.log(`Servidor rodando na porta ${PORT}`))
