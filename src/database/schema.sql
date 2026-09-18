
-- Criação do tipo ENUM para os perfis de usuário
CREATE TYPE usuario_role_enum AS ENUM (
    'ATENDENTE',
    'ADMINISTRADOR'
);

-- Criação da tabela de usuários
CREATE TABLE usuario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    senha VARCHAR NOT NULL,
    role usuario_role_enum NOT NULL,
    "criadoEm" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

