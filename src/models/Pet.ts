import mongoose from "mongoose";
import Usuario from "./Usuario";
import Upload from "./Upload";


const { Schema } = mongoose;

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

const Pet = mongoose.model('pets', pet);

export default Pet;
