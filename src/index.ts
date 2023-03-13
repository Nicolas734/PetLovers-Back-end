import express from "express";
import * as dotenv from "dotenv"
import db from "./config/db";

dotenv.config()

const app = express();
app.use(express.json());

try {
    db.authenticate().then(()=>{
        console.log('Banco de Dados Conectado.');
    });
    
} catch (error) {
    console.error('Connection error:', error);
}

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> console.log(`Servidor rodando na porta ${PORT}`))
