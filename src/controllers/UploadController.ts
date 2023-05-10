import { Request, Response } from "express";


class UploadController{
    public async sendToLocal(req:Request, res:Response){
        try{
            const file = req.file;
            if(!file){
                throw Error;
            }
            res.json(file.originalname);
        }catch(error){
            res.status(500).json(error);
        }
    }
};

export default new UploadController();