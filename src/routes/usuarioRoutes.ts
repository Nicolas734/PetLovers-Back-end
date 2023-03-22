import { Router } from "express";
import { UsuarioController } from "../controllers";

const routes = Router();

routes.get('/buscar', UsuarioController.buscarUsuarios);
routes.post('/cadastrar', UsuarioController.cadastrarUsuario);

export default routes;