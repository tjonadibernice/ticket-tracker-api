# Ticket Tracker API

A REST API built with Node.js, Express, and TypeScript — the backend serving the live Ticket Tracker application.

## What this is

Exposes ticket data over HTTP for the [ticket-tracker-ui](https://github.com/tjonadibernice/ticket-tracker-ui) React frontend to consume. Reads and writes to the same PostgreSQL database whose schema is managed by [ticket-tracker](https://github.com/tjonadibernice/ticket-tracker) (Python/SQLAlchemy/Alembic).

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/tickets` | List all tickets |
| POST | `/api/tickets` | Create a ticket (`customer_id`, `subject`, `priority`) |
| PATCH | `/api/tickets/:id/close` | Mark a ticket as closed |

## Tech stack

- Node.js, Express, TypeScript
- `pg` (PostgreSQL client, raw SQL)
- `cors` (cross-origin support for the separate frontend)

## Setup

```bash
npm install
```

Requires the database schema to already exist (see [ticket-tracker](https://github.com/tjonadibernice/ticket-tracker) for setup via Alembic).

## Running

```bash
npx tsx src/server.ts
```
Runs on `http://localhost:3001` by default.

## What I learned building this

- Middleware, request validation, and centralized error handling in Express
- The importance of explicit values in raw SQL inserts — an ORM-level default (like SQLAlchemy's `default=`) does not apply when a different client writes to the table via raw SQL; only a real database-level default (`server_default=` / `DEFAULT` in the schema) is universally enforced
- WSL2 networking quirks: `localhost` can resolve differently between a WSL-hosted server and a Windows-hosted browser, requiring the machine's actual network IP during local development
