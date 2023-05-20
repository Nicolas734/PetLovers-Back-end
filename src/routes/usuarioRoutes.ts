import { Router } from "express";
import { UsuarioController } from "../controllers";
import { authenticate } from "../middlewares";

const routes = Router();

routes.get('/buscar', UsuarioController.buscarUsuarios);
routes.get('/buscar-info', authenticate , UsuarioController.buscarUsuario);
routes.post('/cadastrar', UsuarioController.cadastrarUsuario);
routes.put('/atualizar/:id', authenticate , UsuarioController.atualizarInfosDoUsuario);
routes.delete('/excluir/:id', authenticate , UsuarioController.excluirUsuario)

export default routes;