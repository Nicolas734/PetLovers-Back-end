import mongoose from "mongoose";

const { Schema } = mongoose;


const documento = new Schema({
    documento: String,
    numero: String
});


export default documento;
