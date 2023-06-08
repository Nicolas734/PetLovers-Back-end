
import { Request, Response } from "express";
import { idEhValido } from "../functions/utils";
import { Agendamento } from "../models/Agendamento";


class AgendamentoController {
    public async cadastrarAgendamento(req: Request, res: Response) {
        try {
            const agendamento = await Agendamento.create(req.body);
            res.status(201).json(agendamento);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public async buscarAgendamentos(req: Request, res: Response) {
        try {
            const agendamentos = await Agendamento.find({}, "-__v");
            res.status(200).json(agendamentos);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public async buscarAgendamento(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!idEhValido(id)) {
                return res.status(400).json({ message: `id ${id} não é válido...` });
            }

            const agendamento = await Agendamento.findById(id, "-__v");
            if (agendamento) {
                res.status(200).json(agendamento);
            } else {
                res.status(404).json({ message: `agendamento ${id} não encontrado...` });
            }
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public async atualizarAgendamento(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!idEhValido(id)) {
                return res.status(400).json({ message: `id ${id} não é válido...` });
            }

            const agendamento = await Agendamento.findById(id, "-__v");
            if (!agendamento) {
                res.status(404).json({ message: `agendamento ${id} não encontrado...` });
            } else {
                const { id_usuario, id_pet, data_agendamento, horario, status, data_conclusao } = req.body;
                if (id_usuario) {
                    agendamento.id_usuario = id_usuario;
                }
                if (id_pet) {
                    agendamento.id_pet = id_pet;
                }
                if (data_agendamento) {
                    agendamento.data_agendamento = data_agendamento;
                }
                if (horario) {
                    agendamento.horario = horario;
                }
                if (status) {
                    agendamento.status = status;
                }
                if (data_conclusao) {
                    agendamento.data_conclusao = data_conclusao;
                }

                await agendamento.save();

                res.status(200).json(agendamento);
            }
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public async excluirAgendamento(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!idEhValido(id)) {
                return res.status(400).json({ message: `id ${id} não é válido...` });
            }

            const agendamento = await Agendamento.findByIdAndDelete(id);
            if (!agendamento) {
                res.status(404).json({ message: `agendamento ${id} não encontrado...` });
            } else {
                res.status(202).json({ message: `agendamento ${id} excluído com sucesso!` });
            }
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }
}

export default new AgendamentoController();