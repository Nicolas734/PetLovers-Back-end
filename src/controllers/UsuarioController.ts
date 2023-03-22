import { Request, Response } from "express"
import Usuario from "../models/Usuario"


class UsuarioController{
    public async cadastrarUsuario(req:Request, res:Response){
        try{
            const usuario = await Usuario.create(req.body);
            res.status(201).json(usuario);
        }catch(error){
            console.log(error);            
            res.status(500).json({message:error});
        }
    }

    public async buscarUsuarios(req:Request, res:Response){
        try{
            const usuarios = await Usuario.find();
            res.json(usuarios)
        }catch(error){
            res.status(500).json({message:error});
        }
    }

    public async buscarUsuario(req: Request, res: Response){
        try{
            const usuario = await Usuario.findById(req.params.id)
            if(usuario){
                res.json(usuario)
            }else{
                res.json({message: `usuario ${req.params.id} não encontrado....`})
            }
        }catch(error){
            res.status(500).json({message:error});
        }
    }
}


export default new UsuarioController();