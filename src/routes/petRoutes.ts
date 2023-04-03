import { Router } from "express";
import { PetController } from "../controllers";
import { authenticate } from "../middlewares";


const routes = Router();

routes.get('/buscar', authenticate, PetController.buscarPets);
routes.get('/buscar/:id', authenticate, PetController.buscarPetPorId);
routes.get('/buscar-pets-usuario', authenticate, PetController.buscarPetsDeUmUsuario);
routes.post('/cadastrar', authenticate, PetController.cadastrarPet);
routes.put('/atualizar/:id', authenticate, PetController.atualizarInfosDoPet);
routes.delete('/excluir/:id', authenticate, PetController.excluirPet)


export default routes;
