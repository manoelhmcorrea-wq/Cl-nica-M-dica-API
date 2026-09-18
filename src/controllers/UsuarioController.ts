import { Request,Response } from "express";
import { criarUsuario } from "../services/UsuarioService";

export async function criar(req:Request, res:Response){

    const {nome,email,senha} = req.body;
    const usuario = await criarUsuario(
        nome,
        email,
        senha
    );

    return res.status(201).json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role
    });
}