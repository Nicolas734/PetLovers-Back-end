import { Request, Response } from "express";
import { Historico } from "../models/Historico";
import { Pet } from "../models/Pet";
import { idEhValido } from "../functions/utils";
import { Agendamento } from "../models/Agendamento";



class HistoricoController {
    public async cadastrarHistorico(req: Request, res: Response) {
        try {
            const pet_id = req.params.id;
            const funcionario_id = res.locals.jwtPayload._id
            const id_agendamento = req.body.id_agendamento;

            const agendamento = await Agendamento.findById(id_agendamento, "-__v");

            if(!agendamento){
                return res.status(404).json({ message: `agendamento ${id_agendamento} não encontrado...` });
            }

            if(!idEhValido(pet_id)){
                return res.status(400).json({message: `id ${pet_id} não é valido...`});
            }

            const pet = await Pet.findById(pet_id, '-__v');

            if (!pet) {
                return res.status(404).json({ message: `Pet ${req.params.id} não encontrado...` });
            } else {

                const historico = new Historico({
                    pet_id: pet_id,
                    funcionario_id: funcionario_id,
                    diagnostico: req.body.diagnostico || null,
                    tratamento: req.body.tratamento || null,
                    custo: req.body.custo
                });

                agendamento.status = 'concluido';
                agendamento.data_conclusao = new Date();
                await agendamento.save();
                const historicoCadastrado = await historico.save();
                return res.status(201).json(historicoCadastrado);
            }

        } catch (error) {
            return res.status(500).json({ message: error });
        }
    }

    public async buscarHistoricos(req: Request, res: Response) {
        try {
            const historicos = await Historico.find({}, "-__v").populate('funcionario_id', '-__v -upload.ext -upload.local -upload._id -endereco -documento -telefone -email -senha').exec();
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

            const historico = await Historico.findById(hist_id, "-__v").populate('funcionario_id', '-__v -upload.ext -upload.local -upload._id -endereco -documento -telefone -email -senha').exec();

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
                const dados = historicos.sort((a, b) => {
                    return b.data_registro.getDate() - a.data_registro.getDate()
                })
                res.status(200).json(dados);
            }
        }catch(error){
            res.status(500).json({ message: error });
        }
    }
}

export default new HistoricoController();