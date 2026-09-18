import { Router } from "express";
import { autenticar } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { Role } from "../utils/roles";
import { AuthRequest } from "../middlewares/authMiddleware";

const router = Router();

router.post("/login",autenticar);

router.get("/users/me",authMiddleware,(req:AuthRequest,res) => {
    return res.json({
        id:req.user!.id,
        role:req.user!.role
    });
});

router.get(
    "/admin/ping",
    authMiddleware,
    roleMiddleware(Role.ADMINISTRADOR),
    (req:AuthRequest,res) => {
        return res.json({
        mensagem: "Acesso administrativo autorizado!",
        id:req.user!.id,
        role:req.user!.role
        });
    }
);

export default router;