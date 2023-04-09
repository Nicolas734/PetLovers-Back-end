import mongoose from "mongoose";


const { Schema } = mongoose;

const tratamento = new Schema({
    tratamento: String,
    data_tratamento: Date
})

export default tratamento;