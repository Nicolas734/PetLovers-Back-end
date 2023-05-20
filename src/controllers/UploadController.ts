import { Request, Response } from "express";
import Drive from "../functions/Drive";
import path from "path";
import Usuario from "../models/Usuario";
import Pet from "../models/Pet";



const DIR = process.env.DIR || 'uploads/';

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

    public async searchFileInLocalByName(req:Request, res:Response){
        try{
            const { filename } = req.params;
            const filePath = path.join(__dirname, DIR, filename).replace(/\\src\\controllers\\/g, '\\');
            res.sendFile(filePath);
        }catch(error){
            res.status(500).json(error);
        }
    }

    public async sendToDrive(req:Request, res:Response){
        try{
            const { tipo, id } = req.body;
            let target;

            const folderId = await Drive.verifyAndcreateFolderIfNotExist('PetLovers');
            const file = req.file;
            const [,ext] = file.originalname.split('.');
            const fileName = `${Date.now()}.${ext}`;
            const mimeType = file.mimetype;
            const fileContent = file.buffer;
            const response = await Drive.sendFileFromDrive(fileName, mimeType, fileContent, folderId);
            const link = `https://drive.google.com/thumbnail?id=${response.data.id}`;

            const uplaod = {
                local:false,
                link: link,
                nome:fileName,
                ext:ext
            };

            if(tipo === "usuario"){
                target = await Usuario.findById(id);
                if(!target){
                    throw "Usuario não encontrado...";
                }
            };

            if(tipo === "pet"){
                target = await Pet.findById(id);
                if(!target){
                    throw "Pet não encontrado...";
                }
            };

            target.upload = uplaod;
            await target.save();

            res.json(target.upload);
        }catch(error){
            res.status(500).json(error);
        }
    }

    public async searchFileInDriveById(req:Request, res:Response){
        try{
            const { fileid } = req.params;
            const link = await Drive.getImageLinkById(fileid);
            res.json(link);
        }catch(error){
            res.status(500).json(error);
        }
    }

};

export default new UploadController();