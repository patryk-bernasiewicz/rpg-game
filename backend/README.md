# RPG Game - backend

This is a backend for an RPG game project. It's built with Node.js, Express, TypeScript, MariaDB and TypeORM. It's based partially on standard HTTP requests (for authorization/authentication) and WebSockets.

## Table of contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
- [WebSocket Handlers](#websocket-handlers)
- [Tests](#tests)

## Installation

This project uses pnpm to manage dependencies and run scripts.

```
pnpm install
```

## Configuration

Environment variables are used to store database connection information and basic server settings. Create an `.env` file in the root directory and add the following variables:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=rpg_user
DB_PASSWORD=rpg_password
DB_DATABASE=rpg_game
DB_SYNCHRONIZE=true
DB_LOGGING=false
APP_PORT=3000
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
├── entity/
│   └── User.ts
├── websocket/
│   └── websocketServer.ts
└── index.ts
```

## Endpoints

`GET /`
Returns "Hello World!"

Response:

```json
{
  "message": "Hello World!"
}
```

`POST /register`
Registers a new user with the provided username and password.

Request body:

```json
{
  "username": "string",
  "password": "string"
}
```

Response:

```json
{
  "id": 1,
  "username": "string"
}
```

## Websocket handlers

Currently, user can make a connection to the Websocket on port 3000, but nothing specific is implemented yet.

## Tests

The tests currently are very basic and only contain simple tests for the User entity: `./src/__tests__/user.test.ts`.

We're going to prefer integration tests over unit tests.