# Backend - NestJS with Fastify and PostgreSQL

## Database Setup

### Prerequisites
- PostgreSQL 14+ installed and running
- Database client (pgAdmin, DBeaver, or psql CLI)

### Create Database

Using psql:
```bash
psql -U postgres
CREATE DATABASE admin_dashboard;
\q
```

Or using Docker:
```bash
docker run --name postgres-admin \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=admin_dashboard \
  -p 5432:5432 \
  -d postgres:15
```

### Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=admin_dashboard
DB_SSL=false
```

### Run Migrations

TypeORM will automatically sync your database schema in development mode (synchronize: true).

For production, disable sync and use migrations:
```bash
# Generate migration
npm run migration:generate -- -n CreateUsers

# Run migrations
npm run migration:run
```

## Database Service (Singleton Pattern)

The `DatabaseService` uses a singleton pattern to ensure only one database connection instance exists:

```typescript
import { DatabaseService } from './database/database.service';

// Get singleton instance
const dbService = DatabaseService.getInstance();

// Check connection status
const status = await dbService.getStatus();

// Execute raw queries
const result = await dbService.query('SELECT * FROM users');

// Use transactions
await dbService.transaction(async (entityManager) => {
  // Your transactional operations
});
```

## API Endpoints

### Health Check
```bash
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-02-11T...",
  "uptime": 123.45,
  "environment": "development",
  "database": {
    "connected": true,
    "database": "admin_dashboard",
    "host": "localhost",
    "type": "postgres"
  }
}
```

### Users CRUD
```bash
# Get all users
GET /api/users

# Get user by ID
GET /api/users/:id

# Create user
POST /api/users
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com"
}

# Delete user
DELETE /api/users/:id
```

## Development

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm dev

# Build
pnpm build

# Run production build
pnpm start
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Architecture

- **Singleton Pattern**: DatabaseService ensures single connection instance
- **Repository Pattern**: TypeORM repositories for data access
- **Module-based**: Feature modules (Users, Health) for separation of concerns
- **DTO Pattern**: Data Transfer Objects for validation and type safety
