import { Router } from "express";
import { PetController } from "../controllers";
import { authorization } from "../middlewares";


const routes = Router();

routes.get('/buscar', PetController.buscarPets);
routes.get('/buscar/:id', authorization, PetController.buscarPetPorId);
routes.get('/buscar-pets-usuario/:dono_id', authorization, PetController.buscarPetsDeUmUsuario);
routes.post('/cadastrar/:dono_id', authorization, PetController.cadastrarPet);


export default routes;
