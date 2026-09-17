import { Router } from "express";
import { autenticar } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddliware } from "../middlewares/roleMiddleware";

const router = Router();

router.post("/login",autenticar);

router.get("/perfil",authMiddleware,(req,res) => {
    return res.json({
        mensagem: "Você está autenticado!"
    });
});

router.get(
    "/admin",
    authMiddleware,
    roleMiddliware("ADMINISTRADOR"),
    (req,res) => {
        return res.json({
        mensagem: "Você é um administrador!"
        });
    }
);

export default router;