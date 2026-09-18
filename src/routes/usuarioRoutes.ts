import { Router } from "express";
import { criar } from "../controllers/UsuarioController";
import { validateMiddleware } from "../middlewares/validateMiddleware";

const router = Router();

router.post("/usuarios",validateMiddleware, criar);

export default router;