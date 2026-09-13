import {Request, Response, NextFunction} from "express";

export function errorMiddleware(
    error:Error,
    req:Request,
    res:Response,
    next:NextFunction
) {
    return res.status(400).json({
        erro: error.message
    });
}