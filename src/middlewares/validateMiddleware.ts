import { Request,Response,NextFunction} from "express";

export function validateMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
){
    const{nome,email,senha} = req.body;
    if(!nome.trim()){
        return res.status(400).json({
            erro:"O campo 'nome' é obrigatório"
        });
}
    if(!email){
        return res.status(400).json({
            erro:"O campo 'email' é obrigatório"
        });
}
    if(!senha){
        return res.status(400).json({
            erro:"O campo 'senha' é obrigatório"
        });
}
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(email)) {
        return res.status(400).json({
            erro: "E-mail inválido"
        });
}
    if(senha.length < 6){
        return res.status(400).json({
            erro: "A senha deve ter no mínimo 6 caracteres"
        })
    }

next();
}