import { Router } from "express";
import { HistoricoController } from "../controllers";


const routes = Router();

routes.get('/buscar', HistoricoController.buscarHistoricos);
routes.post('/cadastrar/:id', HistoricoController.cadastrarHistorico);

export default routes;