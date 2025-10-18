<h1 align="center">
  <img
    src="../.github/logo.svg"
    alt="Book Wise"
    width="192px"
  />
</h1>

<p align="center">Ignite | Challenge - Book Wise API</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#%EF%B8%8F-configura%C3%A7%C3%A3o-do-projeto">Configuração do Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como Executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-autor">Autor</a>
</p>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [Postgres](https://www.postgresql.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Docker](https://www.docker.com/)
- [JWT](https://jwt.io/)

## ⚙️ Configuração do Projeto

### Pré requisitos

**OAuth**

- Credenciais OAuth do Google
- Credenciais OAuth do Github

**Docker**

Para executar o banco de dados local, foi utilizado o [Docker](https://www.docker.com/).

### 1. Acesse o diretório do projeto

```bash
cd ./challenge-04-book-wise/api/
```

### 2. Configure as variáveis de ambiente

Crie uma cópia do arquivo `.env.example` para `.env`

```bash
cp .env.example .env
```

> [!IMPORTANT]
> As variáveis de ambiente precisam ser preenchidas para prosseguir.

### 3. Instale as dependências

```bash
npm install
```

## 🎲 Como executar

### Banco de dados (Docker)

Execute o comando abaixo para executar o banco localmente.

```bash
docker compose up -d
```

Crie as tabelas no banco de dados

```bash
npm run db:migrate
```

Agora preencha o banco com alguns dados

```bash
npm run db:seed
```

### Ambiente  de Desenvolvimento

Execute a aplicação em modo de desenvolvimento

```bash
npm run start:dev
```

> O servidor inciará na porta 3333 - acesse <http://localhost:3333>
> 
> Documentação da API - acesse <http://localhost:3333/docs>

## 👨🏻‍💻 Autor

<img
  style="border-radius:50%;"
  src="https://avatars.githubusercontent.com/jordane-chaves"
  width="100px;"
  title="Foto de Jordane Chaves"
  alt="Foto de Jordane Chaves"
/>

Feito com 💜 por Jordane Chaves