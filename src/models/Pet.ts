import mongoose from "mongoose";
import { Usuario, IUsuario } from "./Usuario";
import Upload from "./Upload";


const { Schema } = mongoose;

interface IPet extends Document{
    nome: string,
    idade: number,
    raca: string,
    upload: typeof Upload,
    tamanho: 'pequeno' | 'medio' | ' grande',
    dono_id: IUsuario
}

const pet = new Schema({
    nome: String,
    idade: Number,
    raca: String,
    upload: Upload,
    tamanho:{
        type: String,
        enum: ['pequeno', 'medio',' grande'],
        default:'pequeno'
    },
    dono_id:{
        type: mongoose.Types.ObjectId,
        ref: Usuario
    }
});

const Pet = mongoose.model<IPet>('pets', pet);

export default Pet;
