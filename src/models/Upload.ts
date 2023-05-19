import mongoose from "mongoose";


const { Schema } = mongoose;

const upload = new Schema({
    link: String,
    nome: String,
    ext: String,
    local: {
        type: Boolean,
        default: false
    }
})

export default upload;