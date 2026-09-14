import { Router } from "express";
import { autenticar } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login",autenticar);

router.get("/perfil",authMiddleware,(req,res) => {
    return res.json({
        mensagem: "Você está autenticado!"
    });
});

export default router;