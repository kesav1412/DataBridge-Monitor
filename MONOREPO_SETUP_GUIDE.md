# Complete Guide: pnpm Monorepo with Next.js, Fastify, Material-UI, and SST

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Initial Setup](#initial-setup)
5. [Backend Setup (Next.js + Fastify)](#backend-setup)
6. [Frontend Setup (Next.js + MUI)](#frontend-setup)
7. [SST Configuration](#sst-configuration)
8. [Development Workflow](#development-workflow)
9. [Building and Deployment](#building-and-deployment)
10. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

This monorepo setup combines:
- **pnpm workspaces** for efficient package management and dependency sharing
- **Frontend**: Next.js application with Material-UI for beautiful, responsive UI components
- **Backend**: Next.js with Fastify as a custom server for API endpoints
- **SST**: Infrastructure as Code for AWS deployment

### Why This Stack?

- **pnpm**: Fast, disk-efficient package manager with excellent monorepo support
- **Next.js (Frontend)**: React framework with SSR, SSG, and excellent DX
- **Material-UI (MUI)**: Comprehensive React component library with customizable theming
- **Next.js + Fastify (Backend)**: Combines Next.js capabilities with Fastify's high performance
- **SST**: Type-safe infrastructure with hot-reload in development

---

## Prerequisites

Before starting, ensure you have:

```bash
# Node.js (v18 or higher recommended)
node --version

# pnpm (install if needed)
npm install -g pnpm

# AWS CLI (for SST deployment)
aws --version

# Git
git --version
```

---

## Project Structure

```
admin-dashboard/
├── packages/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   └── api/
│   │   │   │       └── health.ts
│   │   │   ├── server.ts
│   │   │   └── app.ts
│   │   ├── public/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── next.config.js
│   └── frontend/
│       ├── src/
│       │   ├── pages/
│       │   │   ├── index.tsx
│       │   │   ├── _app.tsx
│       │   │   └── _document.tsx
│       │   ├── components/
│       │   │   └── Layout.tsx
│       │   ├── theme/
│       │   │   └── index.ts
│       │   └── styles/
│       │       └── globals.css
│       ├── public/
│       ├── package.json
│       ├── tsconfig.json
│       └── next.config.js
├── sst.config.ts
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
└── .gitignore
```

---

## Initial Setup

### Step 1: Initialize Root Package

Create the root directory and initialize:

```bash
mkdir admin-dashboard
cd admin-dashboard
pnpm init
```

### Step 2: Create pnpm Workspace Configuration

Create `pnpm-workspace.yaml`:

```yaml
packages:
  - 'packages/*'
```

### Step 3: Root package.json

Update the root `package.json`:

```json
{
  "name": "admin-dashboard",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "concurrently \"pnpm --filter frontend dev\" \"pnpm --filter backend dev\"",
    "dev:frontend": "pnpm --filter frontend dev",
    "dev:backend": "pnpm --filter backend dev",
    "build": "pnpm --filter frontend build && pnpm --filter backend build",
    "build:frontend": "pnpm --filter frontend build",
    "build:backend": "pnpm --filter backend build",
    "start:frontend": "pnpm --filter frontend start",
    "start:backend": "pnpm --filter backend start",
    "lint": "pnpm -r lint",
    "type-check": "pnpm -r type-check",
    "clean": "pnpm -r clean && rm -rf node_modules",
    "sst:dev": "sst dev",
    "sst:deploy": "sst deploy",
    "sst:remove": "sst remove"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "sst": "^3.0.0",
    "typescript": "^5.3.3"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

### Step 4: Root TypeScript Configuration

Create `tsconfig.json` at root:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020"],
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "composite": true,
    "incremental": true
  }
}
```

### Step 5: Create .gitignore

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# SST
.sst/
.open-next/

# Misc
.DS_Store
*.pem
.env*.local
.env

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Vercel
.vercel

# TypeScript
*.tsbuildinfo
```

---

## Backend Setup

### Step 1: Create Backend Package Structure

```bash
mkdir -p packages/backend/src/pages/api
```

### Step 2: Backend package.json

Create `packages/backend/package.json`:

```json
{
  "name": "backend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "next build",
    "start": "NODE_ENV=production node dist/server.js",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf .next dist node_modules"
  },
  "dependencies": {
    "fastify": "^4.25.2",
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.48",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.1.0",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3"
  }
}
```

### Step 3: Backend TypeScript Config

Create `packages/backend/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", ".next", "dist"]
}
```

### Step 4: Backend Next.js Config

Create `packages/backend/next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable default Next.js server since we use Fastify
  experimental: {
    externalDir: true,
  },
  // API routes will be handled by Fastify
  async rewrites() {
    return [];
  },
}

module.exports = nextConfig
```

### Step 5: Fastify Server Implementation

Create `packages/backend/src/server.ts`:

```typescript
import Fastify from 'fastify';
import next from 'next';
import { parse } from 'url';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3001', 10);

// Initialize Next.js
const app = next({ dev, hostname, port, dir: __dirname });
const handle = app.getRequestHandler();

async function start() {
  try {
    // Prepare Next.js
    await app.prepare();

    // Initialize Fastify
    const server = Fastify({
      logger: {
        level: dev ? 'info' : 'error',
      },
    });

    // Custom API routes with Fastify
    server.get('/api/health', async (request, reply) => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    });

    server.get('/api/users', async (request, reply) => {
      // Example API endpoint
      return {
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        ],
      };
    });

    server.post('/api/users', async (request, reply) => {
      // Example POST endpoint
      const body = request.body as any;
      return {
        success: true,
        user: {
          id: Math.random(),
          ...body,
        },
      };
    });

    // Delegate all other routes to Next.js
    server.all('/*', async (request, reply) => {
      const parsedUrl = parse(request.url, true);
      await handle(request.raw, reply.raw, parsedUrl);
      reply.sent = true;
    });

    // Start the server
    await server.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 Backend server ready on http://${hostname}:${port}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

start();
```

### Step 6: Backend API Route (Optional Next.js API Routes)

Create `packages/backend/src/pages/api/health.ts`:

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  status: string;
  timestamp: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
}
```

---

## Frontend Setup

### Step 1: Create Frontend Package Structure

```bash
mkdir -p packages/frontend/src/pages
mkdir -p packages/frontend/src/components
mkdir -p packages/frontend/src/styles
mkdir -p packages/frontend/src/theme
mkdir -p packages/frontend/public
```

### Step 2: Frontend package.json

Create `packages/frontend/package.json`:

```json
{
  "name": "frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "clean": "rm -rf .next node_modules"
  },
  "dependencies": {
    "@emotion/react": "^11.11.3",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.15.10",
    "@mui/material": "^5.15.10",
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.1.0",
    "typescript": "^5.3.3"
  }
}
```

### Step 3: Frontend TypeScript Config

Create `packages/frontend/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### Step 4: Frontend Next.js Config

Create `packages/frontend/next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Proxy API requests to backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.BACKEND_URL || 'http://localhost:3001/api/:path*',
      },
    ];
  },
  // Environment variables exposed to the browser
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3001',
  },
}

module.exports = nextConfig
```

### Step 5: Frontend Theme Configuration

Create `packages/frontend/src/theme/index.ts`:

```typescript
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#8b5cf6',
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});
```

### Step 6: Frontend Pages

Create `packages/frontend/src/pages/_app.tsx`:

```typescript
import type { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from '../theme';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

Create `packages/frontend/src/pages/_document.tsx`:

```typescript
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

Create `packages/frontend/src/pages/index.tsx`:

```typescript
import { useState, useEffect } from 'react';
import Head from 'next/head';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import { Person, Email } from '@mui/icons-material';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        <meta name="description" content="Admin Dashboard with Next.js and MUI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          py: 8,
          background: 'linear-gradient(to bottom, #0a0a0a, #1a1a1a)',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              textAlign: 'center',
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              mb: 4,
            }}
          >
            Admin Dashboard
          </Typography>

          <Card
            sx={{
              borderRadius: 3,
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h2" component="h2" sx={{ flexGrow: 1 }}>
                  Users
                </Typography>
                <Chip
                  label={`${users.length} users`}
                  color="primary"
                  size="small"
                />
              </Box>

              <Divider sx={{ mb: 2 }} />

              {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {!loading && !error && (
                <List>
                  {users.map((user, index) => (
                    <Box key={user.id}>
                      <ListItem
                        sx={{
                          borderRadius: 2,
                          mb: 1,
                          transition: 'all 0.2s',
                          '&:hover': {
                            backgroundColor: 'rgba(59, 130, 246, 0.08)',
                            transform: 'translateX(8px)',
                          },
                        }}
                      >
                        <Avatar
                          sx={{
                            mr: 2,
                            bgcolor: 'primary.main',
                          }}
                        >
                          <Person />
                        </Avatar>
                        <ListItemText
                          primary={
                            <Typography variant="body1" fontWeight={600}>
                              {user.name}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <Email sx={{ fontSize: 16, mr: 0.5 }} />
                              <Typography variant="body2" color="text.secondary">
                                {user.email}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < users.length - 1 && <Divider variant="inset" />}
                    </Box>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
```

### Step 7: Frontend Styles

Create `packages/frontend/src/styles/globals.css`:

```css
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

/* MUI custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7);
}
```

### Step 8: Additional MUI Components

Create `packages/frontend/src/components/Layout.tsx`:

```typescript
import { ReactNode } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  Settings,
} from '@mui/icons-material';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/' },
    { text: 'Users', icon: <People />, path: '/users' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          background: 'rgba(10, 10, 10, 0.8)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 700,
            }}
          >
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            background: 'rgba(26, 26, 26, 0.95)',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'primary.main' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
```

### Step 9: MUI Best Practices and Tips

#### Using MUI Components Effectively

1. **Import Only What You Need**:
```typescript
// Good - Tree-shaking friendly
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// Avoid - Imports entire library
import { Button, TextField } from '@mui/material';
```

2. **Custom Theme Extensions**:
```typescript
// packages/frontend/src/theme/index.ts
declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
```

3. **Responsive Design with MUI**:
```typescript
<Box
  sx={{
    width: { xs: '100%', sm: '50%', md: '33.33%' },
    padding: { xs: 2, md: 4 },
  }}
>
  {/* Content */}
</Box>
```

4. **Custom MUI Components**:
```typescript
// packages/frontend/src/components/CustomButton.tsx
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const CustomButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  textTransform: 'none',
  padding: '10px 24px',
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
  },
}));
```

5. **MUI with Next.js Image Optimization**:
```typescript
import Image from 'next/image';
import { Card, CardMedia } from '@mui/material';

// Use MUI Card with Next.js Image
<Card>
  <CardMedia>
    <Image
      src="/path/to/image.jpg"
      alt="Description"
      width={500}
      height={300}
      style={{ objectFit: 'cover' }}
    />
  </CardMedia>
</Card>
```

#### MUI DataGrid Example

For advanced data tables, install MUI DataGrid:

```bash
pnpm --filter frontend add @mui/x-data-grid
```

Usage example:
```typescript
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
];

<DataGrid
  rows={users}
  columns={columns}
  pageSize={10}
  checkboxSelection
  disableSelectionOnClick
  sx={{
    border: 'none',
    '& .MuiDataGrid-cell': {
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
  }}
/>
```

#### MUI Form Example with Validation

```typescript
// packages/frontend/src/components/UserForm.tsx
import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Stack,
} from '@mui/material';

export default function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          fullWidth
        />
        <TextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
}
```

---

## SST Configuration

### Step 1: Install SST

```bash
pnpm add -w -D sst aws-cdk-lib constructs
```

### Step 2: Create SST Config

Create `sst.config.ts` at the root:

```typescript
import { SSTConfig } from 'sst';
import { NextjsSite } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'admin-dashboard',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      // Frontend Next.js site
      const frontend = new NextjsSite(stack, 'frontend', {
        path: 'packages/frontend',
        environment: {
          BACKEND_URL: backend.url,
        },
      });

      // Backend Next.js site with Fastify
      const backend = new NextjsSite(stack, 'backend', {
        path: 'packages/backend',
        // Custom server configuration
        customServer: {
          command: 'node src/server.js',
        },
      });

      // Output the URLs
      stack.addOutputs({
        FrontendUrl: frontend.url,
        BackendUrl: backend.url,
      });
    });
  },
} satisfies SSTConfig;
```

### Step 3: Alternative SST Config with API Gateway

For a more traditional API setup, create an alternative config:

```typescript
import { SSTConfig } from 'sst';
import { NextjsSite, Api } from 'sst/constructs';

export default {
  config(_input) {
    return {
      name: 'admin-dashboard',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      // API with Lambda functions
      const api = new Api(stack, 'api', {
        routes: {
          'GET /api/health': 'packages/backend/src/functions/health.handler',
          'GET /api/users': 'packages/backend/src/functions/users.handler',
        },
      });

      // Frontend
      const frontend = new NextjsSite(stack, 'frontend', {
        path: 'packages/frontend',
        environment: {
          NEXT_PUBLIC_API_URL: api.url,
        },
      });

      stack.addOutputs({
        FrontendUrl: frontend.url,
        ApiUrl: api.url,
      });
    });
  },
} satisfies SSTConfig;
```

### Step 4: Environment Variables

Create `.env.local` (for local development):

```bash
# Backend
PORT=3001
HOSTNAME=localhost
NODE_ENV=development

# Frontend
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
BACKEND_URL=http://localhost:3001

# AWS (for SST)
AWS_PROFILE=default
AWS_REGION=us-east-1
```

Create `.env.example`:

```bash
# Backend
PORT=3001
HOSTNAME=localhost
NODE_ENV=development

# Frontend
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
BACKEND_URL=http://localhost:3001

# AWS
AWS_PROFILE=your-profile
AWS_REGION=us-east-1
```

---

## Development Workflow

### Step 1: Install All Dependencies

```bash
# From the root directory
pnpm install
```

### Step 2: Development Commands

```bash
# Run both frontend and backend in development mode
pnpm dev

# Run only frontend
pnpm dev:frontend

# Run only backend
pnpm dev:backend

# Run with SST (includes AWS resources)
pnpm sst:dev
```

### Step 3: Accessing the Applications

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Backend API Health Check**: http://localhost:3001/api/health

### Step 4: Adding New Dependencies

```bash
# Add dependency to frontend
pnpm --filter frontend add package-name

# Add dependency to backend
pnpm --filter backend add package-name

# Add dev dependency to root
pnpm add -w -D package-name

# Add dependency to all packages
pnpm add -r package-name
```

### Step 5: Type Checking

```bash
# Type check all packages
pnpm type-check

# Type check specific package
pnpm --filter frontend type-check
```

### Step 6: Linting

```bash
# Lint all packages
pnpm lint

# Lint specific package
pnpm --filter backend lint
```

---

## Building and Deployment

### Step 1: Build for Production

```bash
# Build all packages
pnpm build

# Build specific package
pnpm build:frontend
pnpm build:backend
```

### Step 2: Local Production Test

```bash
# Start backend in production mode
cd packages/backend
pnpm build
pnpm start

# Start frontend in production mode
cd packages/frontend
pnpm build
pnpm start
```

### Step 3: Deploy with SST

```bash
# Deploy to AWS (development stage)
pnpm sst:dev

# Deploy to AWS (production stage)
pnpm sst:deploy --stage production

# Remove deployment
pnpm sst:remove
```

### Step 4: SST Deployment Process

When you run `pnpm sst:deploy`, SST will:

1. Build your Next.js applications
2. Create CloudFormation stacks
3. Deploy to AWS Lambda (for serverless) or EC2/ECS (for containers)
4. Set up CloudFront distributions
5. Configure API Gateway (if using)
6. Output deployment URLs

### Step 5: CI/CD Setup (GitHub Actions Example)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Type check
        run: pnpm type-check
      
      - name: Lint
        run: pnpm lint
      
      - name: Build
        run: pnpm build
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Deploy to AWS
        if: github.ref == 'refs/heads/main'
        run: pnpm sst:deploy --stage production
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use

```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Kill process on port 3000 (Unix)
lsof -ti:3000 | xargs kill -9
```

#### 2. pnpm Link Issues

```bash
# Clear pnpm cache
pnpm store prune

# Remove all node_modules and reinstall
pnpm clean
pnpm install
```

#### 3. TypeScript Errors

```bash
# Rebuild TypeScript project references
pnpm -r exec tsc --build --force
```

#### 4. Next.js Build Errors

```bash
# Clear Next.js cache
rm -rf packages/frontend/.next
rm -rf packages/backend/.next

# Rebuild
pnpm build
```

#### 5. SST Deployment Issues

```bash
# Check AWS credentials
aws sts get-caller-identity

# Clear SST cache
rm -rf .sst

# Redeploy
pnpm sst:deploy
```

#### 6. MUI Styling Issues

If you see unstyled MUI components or hydration errors:

```bash
# Ensure Emotion is properly installed
pnpm --filter frontend add @emotion/react @emotion/styled

# Clear Next.js cache
rm -rf packages/frontend/.next

# Rebuild
pnpm build:frontend
```

Check that `_document.tsx` includes the proper font imports and that `_app.tsx` wraps the app with `ThemeProvider` and `CssBaseline`.

#### 7. MUI Icons Not Displaying

```bash
# Install MUI icons if missing
pnpm --filter frontend add @mui/icons-material

# Ensure Material Icons font is loaded in _document.tsx
```

#### 8. MUI Dark Mode Not Working

Ensure your theme configuration has:
```typescript
palette: {
  mode: 'dark',
  // ... other palette settings
}
```

And that `CssBaseline` is included in `_app.tsx` after `ThemeProvider`.

#### 9. MUI Server-Side Rendering (SSR) Warnings

If you see warnings about className mismatch:

1. Ensure proper Emotion configuration
2. Check that `_document.tsx` is properly set up
3. Consider adding emotion cache for SSR:

```typescript
// packages/frontend/src/utils/createEmotionCache.ts
import createCache from '@emotion/cache';

export default function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}
```

Update `_app.tsx`:
```typescript
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}
```

---

## Advanced Configuration

### Shared Packages

Create a shared package for common types and utilities:

```bash
mkdir -p packages/shared/src
```

`packages/shared/package.json`:

```json
{
  "name": "shared",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}
```

`packages/shared/src/index.ts`:

```typescript
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const API_ENDPOINTS = {
  users: '/api/users',
  health: '/api/health',
} as const;
```

Use in other packages:

```json
// In packages/frontend/package.json and packages/backend/package.json
{
  "dependencies": {
    "shared": "workspace:*"
  }
}
```

### Advanced MUI Dashboard Example

Create a more complex dashboard page with MUI:

`packages/frontend/src/pages/dashboard.tsx`:

```typescript
import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  People,
  ShoppingCart,
  AttachMoney,
} from '@mui/icons-material';
import Layout from '../components/Layout';

interface StatCard {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  color: string;
}

export default function Dashboard() {
  const stats: StatCard[] = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+12.5%',
      icon: <AttachMoney />,
      color: '#3b82f6',
    },
    {
      title: 'Total Users',
      value: '1,234',
      change: '+8.2%',
      icon: <People />,
      color: '#8b5cf6',
    },
    {
      title: 'Total Orders',
      value: '892',
      change: '+15.3%',
      icon: <ShoppingCart />,
      color: '#06b6d4',
    },
    {
      title: 'Growth Rate',
      value: '23.5%',
      change: '+4.1%',
      icon: <TrendingUp />,
      color: '#10b981',
    },
  ];

  return (
    <Layout>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom fontWeight={700} sx={{ mb: 4 }}>
            Dashboard Overview
          </Typography>

          <Grid container spacing={3}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 48,
                          height: 48,
                          borderRadius: 2,
                          bgcolor: `${stat.color}20`,
                          color: stat.color,
                          mr: 2,
                        }}
                      >
                        {stat.icon}
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ flexGrow: 1 }}
                      >
                        {stat.title}
                      </Typography>
                    </Box>
                    <Typography variant="h4" fontWeight={700} gutterBottom>
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: stat.change.startsWith('+') ? '#10b981' : '#ef4444',
                        fontWeight: 600,
                      }}
                    >
                      {stat.change} from last month
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* Activity Chart Placeholder */}
            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Activity Overview
                  </Typography>
                  <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="text.secondary">
                      Chart component here (use recharts, chart.js, or MUI X Charts)
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Recent Activity */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    Recent Activity
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <Paper
                        key={item}
                        sx={{
                          p: 2,
                          mb: 1,
                          bgcolor: 'rgba(255, 255, 255, 0.03)',
                        }}
                      >
                        <Typography variant="body2" fontWeight={600}>
                          User Action {item}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          2 minutes ago
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}
```

### Docker Setup

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: packages/frontend/Dockerfile
    ports:
      - '3000:3000'
    environment:
      - BACKEND_URL=http://backend:3001
    depends_on:
      - backend

  backend:
    build:
      context: .
      dockerfile: packages/backend/Dockerfile
    ports:
      - '3001:3001'
    environment:
      - NODE_ENV=production
      - PORT=3001
```

### Monorepo Best Practices

1. **Dependency Management**: Keep shared dependencies in sync
2. **Build Order**: Backend → Frontend (if frontend depends on backend types)
3. **Environment Variables**: Use `.env` files but never commit `.env.local`
4. **Version Control**: Use conventional commits and semantic versioning
5. **Testing**: Add Jest or Vitest for unit tests
6. **Code Quality**: Set up ESLint and Prettier with shared configs

---

## Next Steps

1. **Add Authentication**: Integrate NextAuth.js or AWS Cognito with MUI components
2. **Database**: Add Prisma or Drizzle ORM with PostgreSQL
3. **State Management**: Add Zustand or Redux Toolkit
4. **Data Tables**: Integrate MUI DataGrid for advanced data visualization
5. **Forms**: Add React Hook Form with MUI form components
6. **Testing**: Set up Jest, React Testing Library, and Playwright
7. **Monitoring**: Integrate Sentry or CloudWatch
8. **Documentation**: Use Storybook for MUI component documentation

---

## Resources

- [pnpm Documentation](https://pnpm.io/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Fastify Documentation](https://www.fastify.io/)
- [Material-UI Documentation](https://mui.com/)
- [SST Documentation](https://docs.sst.dev/)
- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)

---

## Summary

This setup provides:
- ✅ Efficient monorepo management with pnpm
- ✅ High-performance backend with Fastify
- ✅ Modern frontend with Next.js and Material-UI
- ✅ Beautiful, responsive UI components with MUI
- ✅ Dark theme with custom MUI theming
- ✅ Infrastructure as Code with SST
- ✅ Type-safe development with TypeScript
- ✅ Production-ready build and deployment pipeline

Start building by running:

```bash
pnpm install
pnpm dev
```

Happy coding! 🚀
