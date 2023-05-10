import { Types } from "mongoose";
import fs from "fs";


const idEhValido = (id: string): boolean => {
    return Types.ObjectId.isValid(id);
}


const dirExiste = (DIR: string) => {
    if(!fs.existsSync(DIR)){
        console.log("Pasta dos uploads criada com sucesso...");
        fs.mkdirSync(DIR);
    }
}

export { idEhValido, dirExiste };