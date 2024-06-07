# RPG Game - backend

This is a backend for an RPG game project. It's built with Node.js, Express, TypeScript, MariaDB and Prisma. It's based partially on standard HTTP requests (for authorization/authentication) and WebSockets.

## Table of contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
- [WebSocket Handlers](#websocket-handlers)
- [Tests](#tests)

## Installation

This project uses pnpm to manage dependencies and run scripts. Dev server is ran using Nodemon.

```
pnpm install
```

Create two MariaDB databases named, `rpg` and `rpg_shadow`. Then run Prisma migrations:

```
npx prisma migrate
```

## Configuration

Environment variables are used to store database connection information and basic server settings. Create an `.env` file in the root directory and add the following variables:

```env
DB_URL="mysql://rpg_user:rpg_password@localhost:3306/rpg_game"
APP_PORT=3000
APP_ORIGINS=http://localhost:5173
JWT_SECRET=secret
```

## Usage

To start the server, use the `start` pnpm script:

```
pnpm start
```

## Project structure

```
src/
├── __tests__/
│   └── user.test.ts
├── config/
│   └── database.ts
├── const/
│   └── auth.ts
├── middleware/
│   └── auth.middleware.ts
├── routes/
│   ├── auth.routes.ts
│   └── index.ts
├── utils/
│   └── jwt.ts
├── websocket/
│   └── websocketServer.ts
├── prisma/
│   └── schema.prisma
└── app.ts
```

## Endpoints

### `GET /`

Returns "Hello World!"

Response:

```json
{
  "message": "Hello World!"
}
```

### `POST /api/register`

Registers a new user with the provided username and password.

Request body:

```json
{
  "username": "string",
  "password": "string",
  "email": "string"
}
```

`username` field must be unique.

Response:

```json
{
  "success": true
}
```

On successful response, the server creates a http-only cookie containing the authorization JWT token.

### `GET /api/protected`

Simple endpoint to test the authorization cookie.

Response:

```json
{
  "message": "Hello user {username}!"
}
```

### `POST /api/login`

Logs the user in with the provided credendials.

Request body:

```json
{
  "username": "string",
  "password": "string"
}
```

Response:

Sets an HTTP-Only cookie with the JWT token.  
Status: 201

```json
{
  "success": true
}
```

## Websocket handlers

Currently, user can make a connection to the Websocket on port 3000, but nothing specific is implemented yet.

## Tests

The tests currently are very basic and only contain simple tests for the User entity: `./src/__tests__/user.test.ts`.

We're going to prefer integration tests over unit tests.
