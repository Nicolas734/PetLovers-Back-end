import mongoose from "mongoose";

const { Schema } = mongoose;


const telefone = new Schema({
    numero: Number
});

export default telefone;