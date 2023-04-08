import { Schema } from "mongoose";


const tratamento = new Schema({
    tratamento: String,
    data_tratamento: Date
})

export default tratamento;