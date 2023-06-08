import mongoose from "mongoose";
import { Usuario, IUsuario } from "./Usuario";
import { Pet, IPet } from "./Pet";
const { Schema } = mongoose;


interface IAgendamento extends Document {
    id_usuario: IUsuario
    id_pet: IPet,
    data_agendamento: Date,
    horario: String,
    status: String,
    data_conclusao: Date
}
const agendamento = new Schema({
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: Usuario,
        required: true,
    },
    id_pet: {
        type: Schema.Types.ObjectId,
        ref: Pet,
        required: true,
    },
    data_agendamento: {
        type: Date,
        required: true,
    },
    horario: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    data_conclusao: {
        type: Date,
        required: false,
    },
});
const Agendamento = mongoose.model<IAgendamento>('agendamentos', agendamento);



export { Agendamento, IAgendamento };