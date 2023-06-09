import { Router } from "express";
import { AgendamentoController } from "../controllers";
import { authenticate } from "../middlewares";


const routes = Router();

routes.get("/buscar",authenticate, AgendamentoController.buscarAgendamentos);
routes.get("/buscar-concluido",authenticate, AgendamentoController.buscarAgendamentosConcluidos);
routes.get("/buscar-andamento",authenticate, AgendamentoController.buscarAgendamentosEmAndamento);
routes.get("/buscar-cliente",authenticate, AgendamentoController.buscarTodosOsAgendamentosDeUmCliente);
routes.get("/buscar/:id",authenticate, AgendamentoController.buscarAgendamento);
routes.post("/cadastrar",authenticate, AgendamentoController.cadastrarAgendamento);
routes.put("/atualizar/:id",authenticate, AgendamentoController.atualizarAgendamento);
routes.put('/concluir/:id', authenticate, AgendamentoController.concluirAgendamento);
routes.delete("/excluir/:id",authenticate, AgendamentoController.excluirAgendamento);

export default routes;