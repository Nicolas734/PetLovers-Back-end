import mongoose from "mongoose";

const { Schema } = mongoose;


const endereco = new Schema({
    estado: String,
    cep: Number,
    cidade: String,
    bairro: String,
    rua: String,
    numero: Number,
    complemento: String
});

export default endereco;
