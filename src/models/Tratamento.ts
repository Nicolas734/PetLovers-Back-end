import mongoose from "mongoose";


const { Schema } = mongoose;

const tratamento = new Schema({
    tratamento: String,
    data_tratamento: {
        type: Date,
        default: Date.now
    }
})

export default tratamento;