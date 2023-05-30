import mongoose from "mongoose";


const { Schema } = mongoose;

interface IOferta extends Document{
    nome: string,
    descricao: string,
    preco: number,
    tipo: "produto" | "servico"
}

const oferta = new Schema({
    nome: String,
    descricao: String,
    preco: Number,
    tipo:{
        type: String,
        enum: ['produto', 'servico'],
        default: 'produto'
    }
});

const Oferta = mongoose.model<IOferta>('ofertas', oferta);

export { Oferta, IOferta };