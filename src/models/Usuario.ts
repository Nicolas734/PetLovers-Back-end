import mongoose from "mongoose";
import Documento from "./Documento";
import Endereco from "./Endereco";
import Telefone from "./Telefone";
import Upload from "./Upload";
import { ICompra, compra } from "./Compra";


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
    compras: ICompra[];
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
    compras: [compra]
});


const Usuario = mongoose.model<IUsuario>('usuarios', usuario);


export { Usuario, IUsuario };
