import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const URI = process.env.URI || '';

const startDb = async () => {
    try{
        await mongoose.connect(URI);
        console.log("Conectado ao banco...");
    }catch(error){
        console.log(error);
        
    }
};

export default startDb;