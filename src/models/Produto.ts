import mongoose from "mongoose";

const { Schema } = mongoose;


const produto = new Schema({
    nome: String,
    descricao: String,
    preco: Number
});

const Produto = mongoose.model('produtos', produto);

export default Produto;
