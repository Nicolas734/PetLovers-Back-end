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
            const { fileId } = req.body;
            const link = await Drive.getImageLinkById(fileId);
            res.json(link);
        }catch(error){
            res.status(500).json(error);
        }
    }

};

export default new UploadController();