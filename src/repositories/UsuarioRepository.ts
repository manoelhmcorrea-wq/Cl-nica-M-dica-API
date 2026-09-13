import { AppDataSource } from "../database/data-source";
import { Usuario } from "../entities/Usuario";

const usuarioRepository = AppDataSource.getRepository(Usuario);

export async function buscarPorEmail(email:string) {
    return usuarioRepository.findOne({
        where:{
            email: email
        }
    });
}

export async function salvar(usuario:Usuario) {
    return usuarioRepository.save(usuario);
}