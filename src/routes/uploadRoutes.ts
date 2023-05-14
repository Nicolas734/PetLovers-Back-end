import { Router } from "express";
import { uploadLocal, uploadDrive } from "../middlewares/upload";
import UploadController from "../controllers/UploadController";


const routes = Router();


routes.post('/local', uploadLocal.single('file'), UploadController.sendToLocal);
routes.post('/drive',uploadDrive.single('file'), UploadController.sendToDrive);

routes.get('/search-local/:filename', UploadController.searchFileInLocalByName);
routes.get('/search-drive/:fileid', UploadController.searchFileInDriveById);



export default routes;