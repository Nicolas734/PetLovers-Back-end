import { Request, Response } from "express";
import Drive from "../functions/Drive";
import path from "path";


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
            const folderId = await Drive.verifyAndcreateFolderIfNotExist('PetLovers');
            const file = req.file;
            const [,ext] = file.originalname.split('.');
            const fileName = Date.now() + '.' + ext;
            const mimeType = file.mimetype;
            const fileContent = file.buffer;
            const response = await Drive.sendFileFromDrive(fileName, mimeType, fileContent, folderId);
            const link = `https://drive.google.com/uc?id=${response.data.id}`
            res.json({id:response.data.id, name:response.data.name, link:link});
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