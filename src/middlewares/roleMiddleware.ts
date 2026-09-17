import {NextFunction, Request, Response} from "express";
import { AuthRequest } from "./authMiddleware";
import {Role} from "../utils/roles"

export function roleMiddleware(...rolesPermitidas: Role[]){

    return(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) =>{

    if(!req.user){
        return res.status(401).json({
            erro:"Usuário não autenticado"
        });
    }

    if(!rolesPermitidas.includes(req.user.role)){
        return res.status(403).json({
            erro:"Acesso negado"
        });
    }
    next();
    };
}