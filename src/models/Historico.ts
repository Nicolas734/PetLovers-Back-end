import mongoose from "mongoose";
import Diagnostico from "./Diagnostico";
import Tratamento from "./Tratamento";
import { Pet, IPet } from "./Pet";
import { IUsuario, Usuario } from "./Usuario";


const { Schema } = mongoose;

interface IHistorico extends Document{
    diagnostico: typeof Diagnostico,
    tratamento: typeof Tratamento,
    data_registro: Date,
    custo: String,
    pet_id: IPet,
    funcionario_id: IUsuario
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
    custo: String,
    pet_id: {
        type: mongoose.Types.ObjectId,
        ref: Pet
    },
    funcionario_id: {
        type: mongoose.Types.ObjectId,
        ref: Usuario
    }
});

const Historico = mongoose.model<IHistorico>('historicos', historico);

export { Historico, IHistorico };