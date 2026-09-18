import bcrypt from "bcrypt";
import {buscarPorEmail, salvar} from "../repositories/UsuarioRepository";
import { Usuario } from "../entities/Usuario";
import { Role } from "../utils/roles";
import { AppError } from "../utils/AppError";

export async function criarUsuario(
    nome:string,
    email:string,
    senha:string
){
    const usuarioExiste = await buscarPorEmail(email);

    if(usuarioExiste){
        throw new AppError("E-mail já cadastrado",409)
    }

    const senhaHash = await bcrypt.hash(senha,10)

    const usuario = new Usuario();

    usuario.nome = nome;
    usuario.email= email;
    usuario.senha = senhaHash;
    usuario.role = Role.ATENDENTE;

    return salvar(usuario);
}

export async function criarAdministrador(
    nome: string,
    email: string,
    senha: string
) {
    const usuarioExiste = await buscarPorEmail(email);

    if (usuarioExiste) {
        throw new AppError("E-mail já cadastrado", 409);
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = new Usuario();

    usuario.nome = nome;
    usuario.email = email;
    usuario.senha = senhaHash;
    usuario.role = Role.ADMINISTRADOR;

    return salvar(usuario);
}