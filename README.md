# Hublocal - Back-end
Sistema de armazenamento de locais de empresas

## Tecnologias 
- NodeJs
- NestJs
- PostgresSQL
- Docker
- Typescript
- TypeOrm
- JWT

## Funcionalidades

- Logar/Criar usuários
- Criar/Listar/Deletar/Editar empresas 
- Criar/Listar/Deletar/Editar locais pertencentes a uma empresa 

## Instalação
- Clone o projeto
```bash
git clone https://github.com/Porto-08/hublocal-api.git
```

- Instale as dependências
```bash
npm install
```

- Banco de Dados

No arquivo .env.example tem uma URL de exemplo para conexão com o banco de dados. É preciso ter um banco Postgres criado chamado 'hublocal' para funcionamento da API, as tabelas serão criadas automaticamente ao conectar com o banco.

OBS: (Tentei utilizar o docker-compose para criar os containers da aplicação e do banco, porém não tive sucesso ao fazê-lo.)

- Inicie o projeto
```bash
npm run start:dev
```


>  This is a challenge by [Coodesh](https://coodesh.com/)
