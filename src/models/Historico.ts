import mongoose from "mongoose";
import Diagnostico from "./Diagnostico";
import Tratamento from "./Tratamento";
import { Pet, IPet } from "./Pet";


const { Schema } = mongoose;

interface IHistorico extends Document{
    diagnostico: typeof Diagnostico,
    tratamento: typeof Tratamento,
    data_registro: Date,
    pet_id: IPet
}

const historico = new Schema({
    diagnostico: {
        type: Diagnostico,
        require: true
    },
    tratamento: Tratamento,
    data_registro: {
        type: Date,
        default: Date.now
    },
    pet_id: {
        type: mongoose.Types.ObjectId,
        ref: Pet
    }
});

const Historico = mongoose.model('historicos', historico);

export { Historico, IHistorico };