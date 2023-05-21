import { Request, Response } from "express";
import OfertaService from "../service/OfertaService";


class OfertaController{
    public async criarOferta(req:Request, res:Response){
        try{
            const {nome, descricao, preco, tipo} = req.body;
            const oferta = await OfertaService.criar(nome, descricao, preco, tipo);
            res.status(201).json(oferta);
        }catch(error){
            res.status(500).json(error)
        }
    }

    public async buscarOfertas(req:Request, res:Response){
        try{
            const ofertas = await OfertaService.buscar();
            res.json(ofertas);
        }catch(error){
            res.status(500).json(error)
        }
    }

    public async buscarOfertaPorId(req:Request, res:Response){
        try{
            const {id} = req.params;
            const oferta = await OfertaService.buscarPorId(id);
            res.json(oferta);
        }catch(error){
            res.status(500).json(error);
        }
    }

    public async buscarOfertaDosProdutos(req:Request, res:Response){
        try{
            const ofertas = await OfertaService.buscarProdutos();
            res.json(ofertas);
        }catch(error){
            res.status(500).json(error);
        }
    }

    public async buscarOfertaDosServicos(req:Request, res:Response){
        try{
            const ofertas = await OfertaService.buscarServicos();
            res.json(ofertas);
        }catch(error){
            res.status(500).json(error);
        }
    }

    public async atualizarOferta(req:Request, res:Response){
        try{
            const {id} = req.params;
            const {nome, descricao, preco} = req.body;
            const oferta = await OfertaService.atualizar(id, nome, descricao, preco);
            res.status(200).json(oferta);
        }catch(error){
            res.status(500).json(error)
        }
    }

    public async excluirOferta(req:Request, res:Response){
        try{
            const {id} = req.params;
            const response = await OfertaService.excluir(id);
            if(!response){
                res.status(404).json({message: `oferta ${id} não encontrado....`});
            }else{
                res.status(202).json({message: `oferta ${id} excluída com sucesso!`});
            }
        }catch(error){
            res.status(500).json(error)
        }
    }
}

export default new OfertaController();