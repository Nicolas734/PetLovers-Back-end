import { Router } from "express";
import usuarioRoutes from "./usuarioRoutes";
import petRoutes from "./petRoutes";
import { LoginController } from "../controllers";

const routes = Router();

routes.use('/usuario', usuarioRoutes);
routes.use('/pet', petRoutes);
routes.post('/login', LoginController.login);
routes.get('/teste-login', LoginController.testeLogin);

export default routes;