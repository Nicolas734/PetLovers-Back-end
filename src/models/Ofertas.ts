import mongoose from "mongoose";


const { Schema } = mongoose;


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

const Oferta = mongoose.model('ofertas', oferta);

export default Oferta;