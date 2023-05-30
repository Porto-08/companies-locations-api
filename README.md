# Companies Locations - Back-end
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

## Instalação/Inicialização
- Clone o projeto
```bash
git clone https://github.com/Porto-08/hublocal-api.git
```

### Docker
Obs: com esta opção já é feita a criação do banco de dados.

- Na pasta do projeto, crie a imagem do App
```bash
docker build . -t api-hublocal
```
- Inicie o projeto
```bash
docker-compose up -d
```

### Node
Obs: Para pleno funcionamento do projeto é necessário criar um banco de dados Postgres na sua maquina ou com o Docker com nome "hublocal".

- Instale as dependências
```bash
npm install
```

- Crie o arquivo .env
```bash
Existe um arquivo .env.example com um exemplo a ser seguido, apenas troque os valores.
```

- Inicie o projeto
```bash
npm start
```


