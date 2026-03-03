# Admin Dashboard - pnpm Monorepo

A modern admin dashboard built with Next.js, Material-UI, NestJS, and SST.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+
- AWS CLI (for deployment)

### Installation

```bash
# Install dependencies
pnpm install
```

### Development

#### 🚀 Available Commands

- **`pnpm dev`** - Start both services with URL info
- **`pnpm urls`** - Quick display of both URLs  
- **`pnpm dev:frontend`** - Frontend only
- **`pnpm dev:backend`** - Backend only with URL display

#### Quick Start Commands

```bash
# Run both frontend and backend
pnpm dev

# Run only frontend (port 3000)
pnpm dev:frontend

# Run only backend (port 3001)
pnpm dev:backend

# Show application URLs
pnpm urls
```

#### 💡 Development Tips

- Both services support hot-reloading for instant development feedback
- Use `Ctrl+C` to stop both services when running `pnpm dev`
- Database connection is disabled for easy development without external dependencies
- Frontend automatically proxies `/api/*` requests to the backend

### 🌐 Your URLs

- **Frontend UI**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health
- **Auth Login**: http://localhost:3001/auth/login (POST)
- **Auth Logout**: http://localhost:3001/auth/logout (POST)

## 📦 Project Structure

```
admin-dashboard/
├── packages/
│   ├── backend/          # NestJS + Fastify API server
│   └── frontend/         # Next.js + Material-UI client
├── sst.config.ts         # SST deployment configuration
├── pnpm-workspace.yaml   # pnpm workspace configuration
└── package.json          # Root package configuration
```

## 🛠️ Available Scripts

### Root Level

- `pnpm dev` - Run both frontend and backend in development mode
- `pnpm build` - Build all packages
- `pnpm lint` - Lint all packages
- `pnpm type-check` - Type check all packages
- `pnpm clean` - Clean all build artifacts and node_modules

### Package Specific

- `pnpm --filter frontend <command>` - Run command in frontend package
- `pnpm --filter backend <command>` - Run command in backend package

## 🎨 Tech Stack

### Frontend
- **Next.js 14** - React framework
- **Material-UI (MUI)** - UI component library
- **TypeScript** - Type safety
- **Emotion** - CSS-in-JS styling

### Backend
- **NestJS** - Progressive Node.js framework
- **Fastify** - Fast HTTP server adapter
- **TypeScript** - Type safety
- **Module-based architecture** - Scalable structure

### Infrastructure
- **SST** - Serverless Stack deployment
- **AWS** - Cloud platform
- **pnpm** - Package manager

## 🚢 Deployment

### Deploy to AWS

```bash
# Development stage
pnpm sst:dev

# Production stage
pnpm sst:deploy --stage production
```

### Remove Deployment

```bash
pnpm sst:remove
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Backend
PORT=3001
NODE_ENV=development

# Frontend
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
BACKEND_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000

# AWS
AWS_PROFILE=your-profile
AWS_REGION=us-east-1
```

## 📚 API Endpoints

### Health
- `GET /api/health` - Health check endpoint

### Authentication
- `POST /auth/login` - User login endpoint
- `POST /auth/logout` - User logout endpoint

### Root
- `GET /` - Application root endpoint

> **Note**: Database connection is currently disabled for development. User management endpoints are temporarily unavailable.

## 📚 Documentation

For detailed setup instructions and architecture information, see [MONOREPO_SETUP_GUIDE.md](./MONOREPO_SETUP_GUIDE.md).

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## 📝 License

MIT
