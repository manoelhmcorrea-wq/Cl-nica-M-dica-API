import { Router } from "express";
import { criar } from "../controllers/UsuarioController";

const router = Router();

router.post("/usuarios", criar);

export default router;