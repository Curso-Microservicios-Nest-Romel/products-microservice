# Product Microservice

## Dev

1. Clonar el repositorio
2. Instalar las dependencias
   ```bash
   npm install
   ```
3. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

   ```env
   PORT=3000
   DATABASE_URL=postgres://user:password@localhost:5432/database_name
   JWT_SECRET=your_jwt_secret
   ```

4. Ejecutar migración de prisma
   ```bash
   npx prisma migrate dev
   ```
5. Ejecutar el proyecto
   ```bash
   npm run start:dev
   ```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
