import { Router } from "express";
import usuarioRouter from "./usuarioRoutes"

const routes = Router();

routes.use('/usuario', usuarioRouter);

export default routes;