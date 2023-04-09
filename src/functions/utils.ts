import { Types } from "mongoose";

export const idEhValido = (id: string): boolean => {
    return Types.ObjectId.isValid(id);
}
