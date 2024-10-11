# Trello API
## Description

Test task

## Project setup

```bash
$ npm install
```

## Running the project with Docker

1. Make sure Docker and Docker Compose are installed.
2. Create a .env file in the root directory based on .env.example.
3. Run the project using Docker Compose:
```bash
$ docker-compose up --build

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## DB Diagram

![image](https://github.com/user-attachments/assets/7c07a22a-1e78-497b-a476-d080da70b543)

## Project structure
```
Trello API
├─ .env.example            # Example of environment variables configuration.
├─ .eslintrc.js            # ESLint configuration for code linting.
├─ .gitignore              # Defines files and directories to be ignored by Git.
├─ README.md               # Main project documentation.
├─ docker-compose.yml      # Docker Compose configuration for PostgreSQL.
├─ src                     # Main directory containing the application source code.
│  ├─ common               # Shared components and constants used across the application.
│  ├─ configuration        # Configuration module for environment settings.
│  ├─ guards               # Guards for route protection and access control.
│  ├─ main.ts              # Entry point to start the application.
│  ├─ models               # Data models and DTOs (Data Transfer Objects).
│  ├─ modules              # Core application modules:
│  │  ├─ auth              # Authentication module (JWT, login, signup).
│  │  ├─ card              # Module for handling cards (CRUD operations).
│  │  ├─ column            # Module for handling columns (CRUD operations).
│  │  ├─ comment           # Module for handling comments.
│  │  └─ user              # Module for handling user-related logic.
│  └─ strategy             # Authentication strategies (JWT).
├─ tsconfig.json            # TypeScript configuration file.
