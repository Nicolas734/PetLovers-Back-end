import { Router } from "express";
import { PetController } from "../controllers";
import { authorization } from "../middlewares";


const routes = Router();

routes.get('/buscar', authorization, PetController.buscarPets);
routes.get('/buscar/:id', authorization, PetController.buscarPetPorId);
routes.get('/buscar-pets-usuario', authorization, PetController.buscarPetsDeUmUsuario);
routes.post('/cadastrar', authorization, PetController.cadastrarPet);
routes.put('/atualizar/:id', authorization, PetController.atualizarInfosDoPet);
routes.delete('/excluir/:id', PetController.excluirPet)


export default routes;
