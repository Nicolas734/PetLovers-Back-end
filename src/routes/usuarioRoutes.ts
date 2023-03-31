import { Router } from "express";
import { UsuarioController } from "../controllers";
import { authorization } from "../middlewares";

const routes = Router();

routes.get('/buscar', UsuarioController.buscarUsuarios);
routes.get('/buscar/:id', authorization , UsuarioController.buscarUsuario);
routes.post('/cadastrar', UsuarioController.cadastrarUsuario);
routes.put('/atualizar/:id', authorization , UsuarioController.atualizarInfosDoUsuario);
routes.delete('/excluir/:id', authorization , UsuarioController.excluirUsuario)

export default routes;