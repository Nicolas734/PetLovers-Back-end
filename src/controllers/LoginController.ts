import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import { generateToken } from "../middlewares";


class LoginController{
    public async login(req: Request, res: Response){
        try{
            const { email, senha } = req.body;
            const usuario = await Usuario.findOne({ email: email, senha: senha}, '-__v');
            if(usuario){
                const token = await generateToken(usuario);
                res.set('Authorization', `Bearer ${token}`);
                res.status(200).json({message:'Login realizado com sucesso...', token:token});
            }else{
                res.status(404).json({message: `usuario não encontrado, email ou senha incorreto....`});
            }
        }catch(error){
            console.log(error)
            res.status(500).json(error);
        }
    }
}



export default new LoginController();
