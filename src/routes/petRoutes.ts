import { Router } from "express";
import { PetController } from "../controllers";


const routes = Router();

routes.get('/buscar', PetController.buscarPets);
routes.get('/buscar/:id', PetController.buscarPetPorId);
routes.get('/buscar-pets-usuario/:dono_id', PetController.buscarPetsDeUmUsuario)
routes.post('/cadastrar/:dono_id', PetController.cadastrarPet);


export default routes;
