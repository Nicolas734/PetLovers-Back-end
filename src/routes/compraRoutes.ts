import { Router } from "express";
import { CompraController } from "../controllers";
import { authenticate } from "../middlewares";


const routes = Router();

routes.post('/cadastrar/:id', authenticate, CompraController.realizarCompra);
routes.get('/buscar', authenticate, CompraController.buscarComprasDoUsuario);


export default routes;