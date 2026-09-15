import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            erro: "Token não informado"
        });
    }

    const token = authHeader.split(" ")[1];

    try{
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );

        if(typeof payload === "string") {
            return res.status(401).json({
                erro: "Token inválido"
            });
        }

        req.user = {
            id: payload.id as string,
            role:payload.role as string
        };

        next();
    } catch(error) {
        return res.status(401).json({
            erro: "Token inválido ou expirado"
        });
    }
}

export interface AuthRequest extends Request{
    user?:{
        id:string;
        role:string;
    };
}