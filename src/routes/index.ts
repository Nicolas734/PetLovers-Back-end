import { Router } from "express";
import usuarioRoutes from "./usuarioRoutes";
import petRoutes from "./petRoutes";
import historicoRouter from "./historicoRoutes";
import { LoginController } from "../controllers";
import upload from "../middlewares/upload";
import UploadController from "../controllers/UploadController";



const routes = Router();

routes.use('/usuario', usuarioRoutes);
routes.use('/pet', petRoutes);
routes.use('/historico', historicoRouter);

routes.post('/login', LoginController.login);
routes.get('/teste-login', LoginController.testeLogin);
routes.post('/upload-local', upload.single('file'), UploadController.sendToLocal);
routes.post('/upload-drive',upload.single('file'), UploadController.sendToDrive);


export default routes;