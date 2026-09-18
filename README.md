# Clínica Médica API

API REST desenvolvida em Node.js e TypeScript para simulação de uma clínica médica.
Nesta etapa, o projeto tem como foco a autenticação e autorização de usuários, utilizando JWT e controle de acesso baseado em perfis (RBAC).

## Escopo da etapa

- Cadastro de usuários
- Criptografia de senhas
- Login e geração de token JWT
- Autenticação por token
- Autorização baseada em perfil
- Validação de dados
- Tratamento de operações inválidas
- Endpoint para verificar o usuário autenticado
- Endpoint protegido para administradores
- Criação de usuários administradores por outro administrador

## Tecnologias utilizadas
- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL
- JWT (jsonwebtoken)
- Bcrypt
- Dotenv

## Requisitos para execução
- Node.js instalado
- PostgreSQL instalado e em execução
- Banco de dados PostgreSQL criado
- Git (opcional)

## Configuração do banco e variáveis de ambiente

Criar um arquivo .env na raiz do projeto:

DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=clinica
JWT_SECRET=sua_chave_secreta

As informações de acesso ao banco devem corresponder à configuração do PostgreSQL local.

O arquivo .env não deve ser versionado.

## Instalação e execução

Instalar as dependências:

npm install

Executar a aplicação em modo de desenvolvimento:

npm run dev

Por padrão, a API será executada em:

http://localhost:3000

## Arquitetura do projeto

O projeto utiliza uma arquitetura em camadas:
```text
src/
├── controllers/
├── database/
├── entities/
├── middlewares/
├── repositories/
├── routes/
├── services/
└── utils/
```
## Responsabilidades

- Routes: definição das rotas da API
- Controllers: tratamento das requisições e respostas HTTP
- Services: regras de negócio
- Repositories: acesso ao banco de dados
- Entities: entidades utilizadas pelo TypeORM
- Middlewares: autenticação, autorização e validações
- Database: configuração da conexão com o PostgreSQL
- Utils: funções e definições auxiliares, como os perfis de acesso

## Endpoints

Cadastro de usuário

POST /usuarios

Cadastro público de usuários. O perfil criado é automaticamente ATENDENTE.

Requisição:

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}

Resposta — 201:

{
  "id": "uuid",
  "nome": "João Silva",
  "email": "joao@email.com",
  "role": "ATENDENTE"
}
Login

POST /login

Realiza a autenticação e retorna um token JWT.

Requisição:

{
  "email": "joao@email.com",
  "senha": "123456"
}

Resposta — 200:

{
  "token": "jwt",
  "usuario": {
    "id": "uuid",
    "role": "ATENDENTE"
  },
  "expiraEm": "1 hora"
}

Credenciais inválidas retornam 401.

Usuário autenticado

GET /users/me

Retorna os dados do usuário a partir do token informado.

Header:

Authorization: Bearer <token>

Resposta — 200:

{
  "id": "uuid",
  "role": "ATENDENTE"
}
Verificação de acesso administrativo

GET /admin/ping

Endpoint protegido utilizado para demonstrar o funcionamento do RBAC.

Header:

Authorization: Bearer <token>

Apenas usuários com perfil ADMINISTRADOR possuem acesso.

Resposta — 200:

{
  "mensagem": "Você é um administrador!"
}

Um usuário ATENDENTE recebe 403 Forbidden.

Criação de administrador

POST /admin/usuarios

Permite que um administrador autenticado crie outro usuário com perfil ADMINISTRADOR.

Header:

Authorization: Bearer <token>

Requisição:

{
  "nome": "Administrador",
  "email": "admin@email.com",
  "senha": "123456"
}

Resposta — 201:

{
  "id": "uuid",
  "nome": "Administrador",
  "email": "admin@email.com",
  "role": "ADMINISTRADOR"
}

Usuários ATENDENTE recebem 403 Forbidden.

## Perfis de acesso
Perfil	Acesso
ATENDENTE	Cadastro, login e endpoints permitidos ao usuário autenticado
ADMINISTRADOR	Acessos do ATENDENTE + endpoints administrativos

## Autenticação e autorização
401 Unauthorized: token ausente, inválido ou expirado, ou credenciais inválidas.
403 Forbidden: usuário autenticado sem permissão para acessar o recurso.
409 Conflict: tentativa de cadastro com e-mail já existente.
400 Bad Request: dados de entrada inválidos.