import { Router } from "express";
import { authenticate } from "../middlewares";
import { OfertaController } from "../controllers";


const routes = Router();

routes.get('/buscar', authenticate, OfertaController.buscarOfertas);
routes.get('/buscar/:id', authenticate, OfertaController.buscarOfertaPorId);
routes.get('/buscarProdutos', authenticate, OfertaController.buscarOfertaDosProdutos);
routes.get('/buscarServicos', authenticate, OfertaController.buscarOfertaDosServicos);
routes.post('/cadastrar', authenticate, OfertaController.criarOferta);
routes.put('/atualizar/:id', authenticate, OfertaController.atualizarOferta);
routes.delete('/excluir/:id', authenticate, OfertaController.excluirOferta);

export default routes;