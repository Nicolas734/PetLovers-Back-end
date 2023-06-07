import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";
import { idEhValido } from "../functions/utils";


class UsuarioController{
    public async cadastrarUsuario(req:Request, res:Response){
        try{
            const usuario = await Usuario.create(req.body);
            res.status(201).json(usuario);
        }catch(error){
            res.status(500).json({message:error});
        }
    }

    public async buscarUsuarios(req:Request, res:Response){
        try{
            const usuarios = await Usuario.find({},'-__v');
            res.status(200).json(usuarios);
        }catch(error){
            res.status(500).json({message:error});
        }
    }

    public async buscarFuncionarios(req:Request, res:Response){
        try{
            const funcionarios = await Usuario.find({tipoUsuario:'funcionario'},'-__v');
            res.status(200).json(funcionarios);
        }catch(error){
            res.status(500).json({message:error});
        }
    }

    public async buscarClientes(req:Request, res:Response){
        try{
            const clientes = await Usuario.find({tipoUsuario:'cliente'},'-__v');
            res.status(200).json(clientes);
        }catch(error){
            res.status(500).json({message:error});
        }
    }

    public async buscarUsuario(req: Request, res: Response){
        try{
            const id = res.locals.jwtPayload._id
            if(!idEhValido(id)){
                return res.status(400).json({message: `id ${id} não é valido...`});
            }

            const usuario = await Usuario.findById(id, '-__v');
            if(usuario){
                res.status(200).json(usuario);
            }else{
                res.status(404).json({message: `usuario ${id} não encontrado....`});
            }
        }catch(error){
            res.status(500).json({message:error});
        }
    }

    public async atualizarInfosDoUsuario(req: Request, res: Response){
        try{
            const id = req.params.id;
            if(!idEhValido(id)){
                return res.status(400).json({message: `id ${id} não é valido...`});
            }

            const usuario = await Usuario.findById(id, '-__v');
            if(!usuario){
                res.status(404).json({message: `usuario ${id} não encontrado....`});
            }else{
                const { nome, email } = req.body;
                if(nome){
                    usuario.nome = nome;
                }
                if(email){
                    usuario.email = email;
                }
                await usuario.save();

                res.status(200).json(usuario);
            }
        }catch(error){
            res.status(500).json({message:error});
        }
    }

    public async excluirUsuario(req: Request, res: Response){
        try{
            const id = req.params.id;
            if(!idEhValido(id)){
                return res.status(400).json({message: `id ${id} não é valido...`});
            }

            const usuario = await Usuario.findByIdAndDelete(id);
            if(!usuario){
                res.status(404).json({message: `usuario ${id} não encontrado....`});
            }else{
                res.status(202).json({message: `usuario ${id} excluído com sucesso!`});
            }
        }catch(error){
            res.status(500).json({message:error});
        }
    }
}


export default new UsuarioController();