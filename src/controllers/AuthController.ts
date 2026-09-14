import { Request,Response } from "express";
import {login} from "../services/AuthService";

export async function autenticar(req:Request,res:Response){

    const {email,senha} = req.body;

    const resultado = await login(email,senha);

    return res.status(200).json(resultado);
}