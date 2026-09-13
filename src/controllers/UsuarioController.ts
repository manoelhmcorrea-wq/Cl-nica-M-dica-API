import { Request,Response } from "express";
import { criarUsuario } from "../services/UsuarioService";

export async function criar(req:Request, res:Response){

    const {nome,email,senha,role} = req.body;
    const usuario = await criarUsuario(
        nome,
        email,
        senha,
        role
    );

    return res.status(201).json(usuario)
}