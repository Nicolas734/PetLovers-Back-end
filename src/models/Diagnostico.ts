import { Schema } from "mongoose";

const diagnostico = new Schema({
    diagnostico: String,
    descricao: String,
    data_diagnostico: {
        type: Date,
        default: Date.now
    }
})


export default diagnostico