import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { buscarPorEmail } from "../repositories/UsuarioRepository";
import { AppError } from "../utils/AppError";

export async function login(email:string, senha:string) {
    
    const usuario = await buscarPorEmail(email);

    if(!usuario){
        throw new AppError("E-mail ou senha inválidos", 401);
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida){
        throw new AppError("E-mail ou senha inválidos", 401);
    }

    const token = jwt.sign(
    {
        id: usuario.id,
        role: usuario.role
    },
    process.env.JWT_SECRET as string,
    {
        expiresIn: "1h"
    }
);
    return{
        token,
        usuario:{
            id:usuario.id,
            role:usuario.role
        },
        expiraEm: "1 hora"
    };
}