import mongoose from "mongoose";
import Documento from "./Documento";
import Endereco from "./Endereco";
import Telefone from "./Telefone";
import Upload from "./Upload";
import { Oferta, IOferta } from "./Ofertas";


const { Schema } = mongoose;


interface IUsuario extends Document {
    nome: string;
    email: string;
    senha: string;
    endereco: typeof Endereco;
    documento: typeof Documento;
    telefone: typeof Telefone;
    upload: typeof Upload;
    tipoUsuario: "admin" | "funcionario" | "cliente";
    compras: IOferta[];
  }


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
    },
    compras: [{ type: Schema.Types.ObjectId, ref: Oferta }]
    // compras:{
    //     type: mongoose.Types.DocumentArray
    // }
    // compras:[{
    //     type: mongoose.Types.ObjectId,
    //     ref: Oferta
    // }] 
});


const Usuario = mongoose.model<IUsuario>('usuarios', usuario);


export default Usuario;
