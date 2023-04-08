import mongoose from "mongoose";
import Diagnostico from "./Diagnostico";
import Tratamento from "./Tratamento";
import Pet from "./Pet";


const {Schema} = mongoose;

const historico = new Schema({
    diagnostico: Diagnostico,
    tratamento: Tratamento,
    data_registro: {
        type: Date,
        default: Date.now
    },
    pet_id:{
        type: mongoose.Types.ObjectId,
        ref: Pet
    }
});

const Historico = mongoose.model('historicos', historico);

export default Historico;