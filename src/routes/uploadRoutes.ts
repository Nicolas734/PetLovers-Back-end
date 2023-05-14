import { Router } from "express";
import upload from "../middlewares/upload";
import UploadController from "../controllers/UploadController";


const routes = Router();


routes.post('/local', upload.single('file'), UploadController.sendToLocal);
routes.post('/drive',upload.single('file'), UploadController.sendToDrive);
routes.post('/search-drive', UploadController.searchFileInDriveById);


export default routes;