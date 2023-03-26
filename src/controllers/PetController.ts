import { Request, Response } from "express";
import Pet from "../models/Pet";

class PetController{
    public async cadastrarPet(req:Request, res:Response){
        try{
            let tamanho = req.body.tamanho || 'pequeno';
            const dono_id = res.locals.jwtPayload._id
            const pet = new Pet({
                nome: req.body.nome,
                idade: req.body.idade,
                raca: req.body.raca,
                tamanho: tamanho,
                dono_id: dono_id
            })
            const petCadastrado = await pet.save();
            res.status(201).json(petCadastrado);
        }catch(error){
            res.status(500).json({ message:error });
        }
    }

    public async buscarPets(req:Request, res:Response){
        try{
            const pets = await Pet.find({}, '-__v');
            res.status(200).json(pets)
        }catch(error){
            res.status(500).json({ message:error });
        }
    }

    public async buscarPetPorId(req: Request, res: Response){
        try{
            const pet = await Pet.findById(req.params.id, '-__v');
            if(pet){
                res.status(200).json(pet)
            }else{
                res.status(404).json({message: `pet ${req.params.id} não encontrado....`})
            }
        }catch(error){
            res.status(500).json({message:error});
        }
    }

    public async buscarPetsDeUmUsuario(req: Request, res: Response){
        try{
            const dono_id = res.locals.jwtPayload._id
            const pets = await Pet.find({dono_id:dono_id}, '-__v').populate('dono_id', '-__v -nome -_id -email -senha -endereco -documento -telefone -tipoUsuario').exec();
            res.status(200).json(pets)
        }catch(error){
            res.status(500).json({ message:error });
        }
    }
}


export default new PetController();
