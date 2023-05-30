import { Router } from "express";
import usuarioRoutes from "./usuarioRoutes";
import petRoutes from "./petRoutes";
import historicoRouter from "./historicoRoutes";
import uploadRoutes from "./uploadRoutes";
import ofertaRoutes from "./ofertasRoutes";
import compraRoutes from "./compraRoutes";
import { LoginController } from "../controllers";



const routes = Router();

routes.use('/', (req, res) => res.json('Is Rodando......') )
routes.use('/usuario', usuarioRoutes);
routes.use('/pet', petRoutes);
routes.use('/historico', historicoRouter);
routes.use('/upload', uploadRoutes);
routes.use('/oferta', ofertaRoutes);
routes.use('/compra', compraRoutes);

routes.post('/login', LoginController.login);
routes.get('/teste-login', LoginController.testeLogin);



export default routes;