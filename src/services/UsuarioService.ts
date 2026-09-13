import bcrypt from "bcrypt";
import {buscarPorEmail, salvar} from "../repositories/UsuarioRepository";
import { Usuario } from "../entities/Usuario";

export async function criarUsuario(
    nome:string,
    email:string,
    senha:string,
    role:string
){
    const usuarioExiste = await buscarPorEmail(email);

    if(usuarioExiste){
        throw new Error("E-mail já cadastrado")
    }

    const senhaHash = await bcrypt.hash(senha,10)

    const usuario = new Usuario();

    usuario.nome = nome;
    usuario.email= email;
    usuario.senha = senhaHash;
    usuario.role = role;

    return salvar(usuario);
}