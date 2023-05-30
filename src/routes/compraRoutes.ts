import { Router } from "express";
import CompraController from "../controllers/CompraController";
import { authenticate } from "../middlewares";


const routes = Router();

routes.post('/cadastrar/:id', authenticate, CompraController.realizarCompra);


export default routes;