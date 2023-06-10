import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";
import { Oferta } from "../models/Ofertas";


class CompraController {
    public async realizarCompra(req: Request, res: Response) {
        try {
            const user_id = res.locals.jwtPayload._id;
            const oferta_id = req.params.id;
            const usuario = await Usuario.findById(user_id);
            if (!usuario) {
                throw `Usuario ${user_id} não encontrado`;
            }
            const oferta = await Oferta.findById(oferta_id);
            if (!oferta) {
                throw `Oferta ${oferta_id} não encontrada`;
            }
            usuario.compras.push(oferta);
            await usuario.save();
            res.status(200).json(usuario);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async comprarMultiplasOfertas(req: Request, res: Response){
        try{
            const user_id = res.locals.jwtPayload._id;
            const usuario = await Usuario.findById(user_id);
            if (!usuario) {
                throw `Usuario ${user_id} não encontrado`;
            }
            const ofertas_ids = req.body.ofertas;
            const ofertas = await Oferta.find({_id:{"$in":ofertas_ids}}, "-__v -nome -descricao -preco -tipo");
            usuario.compras.push(...ofertas);
            usuario.save();
            res.json(usuario.compras);
        } catch(error){
            console.log(error);
            res.status(500).json(error);
        }
    }

    public async buscarComprasDoUsuario(req: Request, res: Response) {
        try {
            const user_id = res.locals.jwtPayload._id;
            const usuario = await Usuario.findById(user_id, '-__v').populate('compras', '-__v').exec();
            if (!usuario) {
                throw `Usuario ${user_id} não encontrado...`;
            }
            res.status(200).json(usuario.compras);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}


export default new CompraController();