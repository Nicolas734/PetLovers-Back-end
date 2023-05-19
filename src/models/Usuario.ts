import mongoose from "mongoose";
import Documento from "./Documento";
import Endereco from "./Endereco";
import Telefone from "./Telefone";
import Upload from "./Upload";


const { Schema } = mongoose;


const usuario = new Schema({
    nome: String,
    email: String,
    senha: String,
    endereco: Endereco,
    documento: Documento,
    telefone: Telefone,
    upload: Upload,
    tipoUsuario:{
        type: String,
        enum: ['admin', 'funcionario', 'cliente'],
        default: 'cliente'
    }
});


const Usuario = mongoose.model('usuarios', usuario);


export default Usuario;
