import { Router } from "express";
import usuarioRoutes from "./usuarioRoutes";
import petRoutes from "./petRoutes";

const routes = Router();

routes.use('/usuario', usuarioRoutes);
routes.use('/pet', petRoutes);

export default routes;