import { Router } from "express";
import { HistoricoController } from "../controllers";

const routes = Router();

routes.get('/buscar', HistoricoController.buscarHistoricos);
routes.post('/cadastrar', HistoricoController.cadastrarHistorico);

export default routes;