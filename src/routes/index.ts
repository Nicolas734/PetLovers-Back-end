import { Router } from "express";
import usuarioRoutes from "./usuarioRoutes";
import petRoutes from "./petRoutes";
import historicoRouter from "./historicoRoutes";
import uploadRoutes from "./uploadRoutes";
import ofertaRoutes from "./ofertasRoutes";
import compraRoutes from "./compraRoutes";
import { LoginController } from "../controllers";
import agendamentoRoutes from './agendamentoRoutes'


const routes = Router();

routes.get('/', (req, res) => res.json('Is Rodando......') )
routes.use('/usuario', usuarioRoutes);
routes.use('/pet', petRoutes);
routes.use('/historico', historicoRouter);
routes.use('/upload', uploadRoutes);
routes.use('/oferta', ofertaRoutes);
routes.use('/compra', compraRoutes);
routes.use('/agendamento', agendamentoRoutes)
routes.post('/login', LoginController.login);
routes.get('/teste-login', LoginController.testeLogin);



export default routes;