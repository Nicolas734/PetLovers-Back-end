import { Router } from "express";
import usuarioRoutes from "./usuarioRoutes";
import petRoutes from "./petRoutes";
import historicoRouter from "./historicoRoutes";
import { LoginController } from "../controllers";
import uploadRoutes from "./uploadRoutes";



const routes = Router();

routes.use('/usuario', usuarioRoutes);
routes.use('/pet', petRoutes);
routes.use('/historico', historicoRouter);
routes.use('/upload', uploadRoutes);

routes.post('/login', LoginController.login);
routes.get('/teste-login', LoginController.testeLogin);



export default routes;