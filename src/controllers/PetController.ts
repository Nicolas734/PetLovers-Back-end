import { Request, Response } from "express";
import { Pet } from "../models/Pet";
import { idEhValido } from "../functions/utils";


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
            const pet_id = req.params.id;
            if(!idEhValido(pet_id)){
                return res.status(400).json({message: `id ${pet_id} não é valido...`});
            }

            const pet = await Pet.findById(pet_id, '-__v');
            if(pet){
                res.status(200).json(pet);
            }else{
                res.status(404).json({message: `pet ${pet_id} não encontrado....`});
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


    public async atualizarInfosDoPet(req: Request, res: Response){
        try{
            const pet_id = req.params.id;
            if(!idEhValido(pet_id)){
                return res.status(400).json({message: `id ${pet_id} não é valido...`});
            }

            const pet = await Pet.findById(pet_id, '-__v');
            if(!pet){
                res.status(404).json(`Pet ${pet_id} não encontrado...`);
            }else{

                const {nome, idade, raca, tamanho, } = req.body;
                if(nome){
                    pet.nome = nome;
                }
                if(idade){
                    pet.idade = idade;
                }
                if(raca){
                    pet.raca = raca;
                }
                if(tamanho){
                    pet.tamanho = tamanho;
                }
                await pet.save();

                res.status(200).json(pet);
            }
        }catch(error){
            res.status(500).json({ message:error });
        }
    }


    public async excluirPet(req: Request, res: Response){
        try{
            const pet_id = req.params.id;
            if(!idEhValido(pet_id)){
                return res.status(400).json({message: `id ${pet_id} não é valido...`});
            }

            const pet = await Pet.findByIdAndDelete(pet_id);
            if(!pet){
                res.status(404).json(`Pet ${pet_id} não encontrado...`);
            }else{
                res.status(202).json(`Pet ${pet_id} excluído com sucesso!`);
            }
        }catch(error){
            res.status(500).json({ message:error });
        }
    }
}


export default new PetController();
