import mongoose from "mongoose";

const { Schema } = mongoose;

const servico = new Schema({
    nome: String,
    descricao: String,
    preco: Number
});

const Servico = mongoose.model('servicos', servico);

export default Servico;
