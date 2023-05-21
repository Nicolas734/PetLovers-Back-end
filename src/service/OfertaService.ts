import Oferta from "../models/Ofertas";

class OfertaService{
    public async criar(nome:string, descricao:string, preco:number, tipo:string){
        try{
            const oferta = await Oferta.create({nome, descricao, preco, tipo});
            return oferta;
        }catch(error){
            throw error
        }
    }

    public async buscar(){
        try{
            const ofertas = await Oferta.find({}, '-__v');
            return ofertas;
        }catch(error){
            throw error
        }
    }

    public async buscarPorId(id:string){
        try{
            const oferta = await Oferta.findById(id, '-__v');
            if(!oferta){
                throw `Oferta de id ${id} não encontrada....`;
            }
            return oferta;
        }catch(error){
            throw error
        }
    }

    public async buscarProdutos(){
        try{
            const ofertas = await Oferta.find({tipo:'produto'}, '-__v');
            return ofertas;
        }catch(error){
            throw error
        }
    }

    public async buscarServicos(){
        try{
            const ofertas = await Oferta.find({tipo:'servico'}, '-__v');
            return ofertas;
        }catch(error){
            throw error
        }
    }

    public async atualizar(id:string, nome:string, descricao:string, preco:number){
        try{
            const oferta = await Oferta.findById(id, '-__v');
            if(!oferta){
                throw `Oferta de id ${id} não encontrada....`;
            }
            if(nome){
                oferta.nome = nome;
            }
            if(descricao){
                oferta.descricao = descricao;
            }
            if(preco){
                oferta.preco = preco;
            }
            await oferta.save();
            return oferta;
        }catch(error){
            throw error
        }
    }

    public async excluir(id:string){
        try{
            const oferta = await Oferta.findById(id, '-__v');
            if(!oferta){
                return false;
            }else{
                await Oferta.findByIdAndDelete(id);
                return true;
            }
        }catch(error){
            throw error;
        }
    }
}


export default new OfertaService();