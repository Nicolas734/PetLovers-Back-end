import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import{ Oferta } from "../models/Ofertas";


class CompraController{
    public async realizarCompra(req:Request, res:Response){
        try{
            const user_id = res.locals.jwtPayload._id;
            const oferta_id = req.params.id;
            const usuario = await Usuario.findById(user_id);
            if(!usuario){
                throw `Usuario ${user_id} não encontrado`;
            }
            const oferta = await Oferta.findById(oferta_id);
            if(!oferta){
                throw `Oferta ${oferta_id} não encontrada`;
            }
            usuario.compras.push(oferta);

            await usuario.save();
            res.status(200).json(usuario)
        }catch(error){
            console.log(error)
            res.status(500).json(error);
        }
    }
}


export default new CompraController();