# auth-api

<h2>About</h2>

Aplicação Back-end de autenticação **completa**, utilizando Node.js, express, docker, Postgres e Escrita em typescript. Desenvolvida utilizando os princípios do SOLID e boas práticas de codigo e testes.

As funcionalides sao:

- Cadastro de usuários
- Autenticação
- Listagem de dados do usuario.
- Atualização de dados do usuario.
- Upload de imagem de perfil para o usuario.
- Envio de email para recuperação de senha.
- Alteração de senha

<h2>Summary</h2>

- [Technologies](#technologies)
- [Getting started](#started)
  - [Download](#download)
  - [Environment](#environment)
    - [Databases](#databases)
    - [Environment variables](#variables)
  - [Running the API](#running)
    - [Tools](#tools)
  - [Routes](#routes)
- [License](#license)

<h2 id="technologies">Technologies</h2>

- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [Multer](https://github.com/expressjs/multer)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/#/)
- [PostgreSQL](https://hub.docker.com/_/postgres)
- [JWT-token](https://jwt.io/)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [Date-fns](https://date-fns.org/)
- [Jest](https://jestjs.io/)
- [nodemailer](https://nodemailer.com/about/)
- [tsyringe](https://github.com/microsoft/tsyringe)
- [handlebars](https://handlebarsjs.com)

<h6>Tools</h6>

- [ts-node-dev](https://github.com/wclr/ts-node-dev)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

<h6>REST API Client</h6>

- [Insomnia](https://insomnia.rest/)
- [DBeaver](https://dbeaver.io/)


<h2 id="started">Getting started</h2>

Before downloading and running the project, you must have **[Node.js](https://nodejs.org/en/)** already installed and then install the following tools:

- [Git](https://git-scm.com/)
- [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/get-started)

<h4 id="download">Download</h4>

Open the terminal and execute the following commands:

```bash
  # Clone the project
  $ git clone https://github.com/marchetti2/auth-api.git

  # Access the folder
  $ cd auth-api

  # Install the dependencies
  $ yarn
```
<h4 id="environment">Environment</h4>

<h6 id="databases">Databases</h6>

Using the **docker**, start an instance of the databases below.

```bash
  # PostgreSQL
  $ docker run --name postgres -e POSTGRES_DB=auth-api -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
To find out if the databases are running, run the following command:
```bash
$ docker ps
```
If not, run:

```bash
$ docker start postgres
```
<h2 id="running">Running the API</h2>

First, verify that the databases are running. From the API directory, run the following commands:

```bash
  # Create tables in PostgreSQL
  $ yarn typeorm migration:run

  # Run the server
  $ yarn dev:server
```
<h6 id="tools">Tools</h6>

- To view the tables created in the postgres database, use [DBeaver](https://dbeaver.io/).
- To test the routes, you can use [Insomnia](https://insomnia.rest/). The workspace used in this API is available, just click the button below.
<p align="center">
<a href="https://insomnia.rest/run/?label=auth-api&uri=https%3A%2F%2Fgist.githubusercontent.com%2Fmarchetti2%2F294e53d822efb482a5ac565e833d6a20%2Fraw%2Ff47950adb76c07dafa089d02547e18b8c1838720%2Fauth-api.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

<h2 id="routes">Routes</h2>

<h6>/users</h6>

- `POST /users`: Register a new user. Set `first_name, last_name, email, password` body params.

- `PATCH /users/avatar`: Update the user's avatar.

<h6>/sessions</h6>

- `POST /sessions`: User authentication. Set `email, password` body params.

<h6>/profile</h6>

- `GET /profile`: Show user profile. Set Bearer token received from authenticate response (Only athententicated users can see).

- `PUT /profile`: Update profile. Set `first_name, last_name, password, email` body params and Bearer token received from authenticate response.

<h6>/password</h6>

- `POST /password/forgot`: Password recovery. Set `email` body params.

- `POST /password/reset`: Change Password. Set `password, password_confirmation, token` body params. The token is received from 'forgot route' response.


<h2 id="license">License</h2>

This project was developed by Mário Luiz.


app.use("/files", express.static(upload.directory));
