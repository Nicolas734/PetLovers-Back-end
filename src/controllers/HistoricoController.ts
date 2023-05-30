import { Request, Response } from "express";
import { Historico } from "../models/Historico";
import { Pet } from "../models/Pet";
import { idEhValido } from "../functions/utils";



class HistoricoController {
    public async cadastrarHistorico(req: Request, res: Response) {
        try {
            const pet_id = req.params.id;

            if(!idEhValido(pet_id)){
                return res.status(400).json({message: `id ${pet_id} não é valido...`});
            }

            const pet = await Pet.findById(pet_id, '-__v');

            if (!pet) {
                res.status(404).json({ message: `Pet ${req.params.id} não encontrado...` });
            } else {

                const historico = new Historico({
                    pet_id: pet_id,
                    diagnostico: req.body.diagnostico || null,
                    tratamento: req.body.tratamento || null,
                });

                const historicoCadastrado = await historico.save();
                res.status(201).json(historicoCadastrado);
            }

        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public async buscarHistoricos(req: Request, res: Response) {
        try {
            const historicos = await Historico.find({}, "-__v");
            res.status(200).json(historicos);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public async buscarHistorico(req: Request, res: Response){
        try{
            const hist_id = req.params.id;
            if(!idEhValido(hist_id)){
                return res.status(400).json({message: `id ${hist_id} não é valido...`});
            }

            const historico = await Historico.findById(hist_id, "-__v");

            if(!historico){
                res.status(404).json({ message: `Historico ${req.params.id} não encontrado...` });
            }else{
                res.status(200).json(historico)
            }
        }catch(error){
            res.status(500).json({ message: error });
        }
    }

    public async buscarHistoricosDoPet(req: Request, res: Response){
        try{
            const pet_id = req.params.id;

            if(!idEhValido(pet_id)){
                return res.status(400).json({message: `id ${pet_id} não é valido...`});
            }

            const pet = await Pet.findById(pet_id);
            if(!pet){
                res.status(404).json({ message: `Pet ${req.params.id} não encontrado...` });
            }else{
                const historicos = await Historico.find({pet_id:pet_id}, "-__v").populate('pet_id', '-__v -_id -nome -idade -raca -tamanho -dono_id').exec();
                res.status(200).json(historicos);
            }
        }catch(error){
            res.status(500).json({ message: error });
        }
    }
}

export default new HistoricoController();