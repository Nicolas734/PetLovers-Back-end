
import { Request, Response } from "express";
import { idEhValido } from "../functions/utils";
import { Agendamento } from "../models/Agendamento";


class AgendamentoController {
    public async cadastrarAgendamento(req: Request, res: Response) {
        try {
            const id_usuario = res.locals.jwtPayload._id;
            const dados = new Agendamento({
                id_usuario: id_usuario,
                id_pet: req.body.id_pet,
                data_agendamento: req.body.data_agendamento,
                horario: req.body.horario,
                status: 'andamento',
                data_conclusao: null,
                tipo_Consulta:req.body.tipo_Consulta,
                complemento:req.body.complemento,
            })
            const agendamento = await Agendamento.create(dados);
            res.status(201).json(agendamento);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public async buscarAgendamentos(req: Request, res: Response) {
        try {
            const agendamentos = await Agendamento.find({}, "-__v").populate('id_usuario id_pet', '-__v -endereco -documento -telefone -dono_id -email -senha -compras -upload.ext -upload.local -upload._id').exec();
            res.status(200).json(agendamentos);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    public async buscarAgendamentosConcluidos(req: Request, res: Response){
        try{
            const agendamentos = await Agendamento.find({status:'concluido'}, "-__v").populate('id_usuario id_pet', '-__v -endereco -documento -telefone -dono_id -email -senha -compras -upload.ext -upload.local -upload._id').exec();
            res.status(200).json(agendamentos);
        }catch(error){
            res.status(500).json({ message: error });
        }
    }

    public async buscarAgendamentosEmAndamento(req: Request, res: Response){
        try{
            const agendamentos = await Agendamento.find({status:'andamento'}, "-__v").populate('id_usuario id_pet', '-__v -endereco -documento -telefone -dono_id -email -senha -compras -upload.ext -upload.local -upload._id').exec();
            res.status(200).json(agendamentos);
        }catch(error){
            res.status(500).json({ message: error });
        }
    }

    public async buscarTodosOsAgendamentosDeUmCliente(req: Request, res: Response){
        try{
            const id = res.locals.jwtPayload._id;
            const agendamentos = await Agendamento.find({id_usuario:id}, "-__v").populate('id_usuario id_pet', '-__v -endereco -documento -telefone -dono_id -email -senha -compras -upload.ext -upload.local -upload._id').exec();;
            const dados = agendamentos.sort((a, b)=>{
                return new Date(b.data_agendamento).getDate() - new Date(a.data_agendamento).getDate()
            })
            res.status(200).json(agendamentos);
        }catch(error){
            res.status(500).json({ message: error });
        }
    }

    public async buscarAgendamento(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!idEhValido(id)) {
                return res.status(400).json({ message: `id ${id} não é válido...` });
            }

            const agendamento = await Agendamento.findById(id, "-__v").populate('id_usuario id_pet', '-__v -endereco -documento -telefone -dono_id -email -senha -compras -upload.ext -upload.local -upload._id').exec();
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


    public async concluirAgendamento(req: Request, res: Response){
        try{
            const id = req.params.id
            const agendamento = await Agendamento.findById(id, "-__v");

            if(!agendamento){
                res.status(404).json({ message: `agendamento ${id} não encontrado...` });
            }

            agendamento.status = 'concluido';
            agendamento.data_conclusao = new Date();

            await agendamento.save();
            res.status(200).json(agendamento);
        }catch(error){
            res.status(500).json({ message: error });
        }
    }
}

export default new AgendamentoController();