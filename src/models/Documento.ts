import mongoose from "mongoose";

const { Schema } = mongoose;


const documento = new Schema({
    documento: {
        type: String,
        enum:['rg', 'cpf']
    },
    numero: String
});


export default documento;
