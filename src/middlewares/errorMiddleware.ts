import {Request, Response, NextFunction} from "express";
import { AppError  } from "../utils/AppError";

export function errorMiddleware(
    error:Error,
    req:Request,
    res:Response,
    next:NextFunction
) {

    if (error instanceof AppError){
        return res.status(error.statusCode).json({
            erro: error.message
        })
    }

    return res.status(500).json({
        erro: "Erro interno do servidor"
    });
}