import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { buscarPorEmail } from "../repositories/UsuarioRepository";

export async function login(email:string, senha:string) {
    
    const usuario = await buscarPorEmail(email);

    if(!usuario){
        throw new Error("E-mail ou senha inválidos");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida){
        throw new Error("E-mail ou senha inválidos");
    }

    const token = jwt.sign(
        {
            id:usuario.id,
            role:usuario.role
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1h"
        }
    );
    return{
        token
    };
}