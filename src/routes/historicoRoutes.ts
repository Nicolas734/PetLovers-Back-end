import { Router } from "express";
import { HistoricoController } from "../controllers";
import { authenticate } from "../middlewares";


const routes = Router();

routes.get('/buscar', authenticate, HistoricoController.buscarHistoricos);
routes.get('/buscar/:id', authenticate, HistoricoController.buscarHistorico);
routes.post('/cadastrar/:id', authenticate, HistoricoController.cadastrarHistorico);

export default routes;