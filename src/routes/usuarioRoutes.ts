import { Router } from "express";
import { criar,criarAdmin } from "../controllers/UsuarioController";
import { validateMiddleware } from "../middlewares/validateMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { Role } from "../utils/roles";

const router = Router();

router.post("/usuarios",validateMiddleware, criar);

router.post("/admin/usuarios",authMiddleware,roleMiddleware(Role.ADMINISTRADOR),validateMiddleware,criarAdmin);

export default router;