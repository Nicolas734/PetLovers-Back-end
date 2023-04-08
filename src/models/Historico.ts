import { Schema, model } from "mongoose";
import Diagnostico from "./Diagnostico";
import Tratamento from "./Tratamento";

const historico = new Schema({
    diagnostico: Diagnostico,
    tratamento: Tratamento,
    data_registro: {
        type: Date,
        default: Date.now
    }
});

const Historico = model('historicos', historico);

export default Historico;