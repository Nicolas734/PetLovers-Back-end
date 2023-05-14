import { Request, Response } from "express";
import Drive from "../functions/Drive";


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

    public async sendToDrive(req:Request, res:Response){
        try{
            const folder = await Drive.searchFolder('teste-upload');
            res.json(folder)
        }catch(error){
            res.status(500).json(error);
        }
    }
};

export default new UploadController();