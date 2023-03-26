import { Router } from "express";
import { PetController } from "../controllers";
import { authorization } from "../middlewares";


const routes = Router();

routes.get('/buscar', authorization, PetController.buscarPets);
routes.get('/buscar/:id', authorization, PetController.buscarPetPorId);
routes.get('/buscar-pets-usuario', authorization, PetController.buscarPetsDeUmUsuario);
routes.post('/cadastrar', authorization, PetController.cadastrarPet);


export default routes;
