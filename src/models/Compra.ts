import mongoose from "mongoose";
import { IOferta, Oferta } from "./Ofertas";


const { Schema } = mongoose;

interface ICompra extends Document{
    ofertas: IOferta[],
    data_compra: Date
}

const compra = new Schema({
    data_compra: Date,
    ofertas:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:Oferta
        }
    ]
});


export { compra, ICompra };