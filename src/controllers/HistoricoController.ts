import { Request, Response } from "express";
import Historico from "../models/Historico";


class HistoricoController{
    public async cadastrarHistorico(req:Request, res:Response){
        try{
            const historico = await Historico.create(req.body);
            res.status(201).json(historico);
        }catch(error){
            res.status(500).json({message:error});
        }
    }

    public async buscarHistoricos(req:Request, res:Response){
        try{
            const historicos = await Historico.find({}, "-__v");
            res.status(200).json(historicos);
        }catch(error){
            res.status(500).json({message:error});
        }
    }
}

export default new HistoricoController();