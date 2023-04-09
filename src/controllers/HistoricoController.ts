import { Request, Response } from "express";
import Historico from "../models/Historico";
import Pet from "../models/Pet";


class HistoricoController {
    public async cadastrarHistorico(req: Request, res: Response) {
        try {
            const pet_id = req.params.id;
            const pet = Pet.findById(pet_id, '-__v');

            if (!pet) {
                res.status(404).json({ message: `Pet ${req.params.id} não encontrado...` })
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
}

export default new HistoricoController();