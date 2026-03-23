'use client';

import './globals.css';

import { useState } from 'react';
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Sidebar from './components/Sidebar/Sidebar';
import { getTheme } from './theme/theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode] = useState<'light' | 'dark'>('light');

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={getTheme(mode)}>
          <CssBaseline />

          <Sidebar />
          <Box
            component="main"
            flex={1}
            bgcolor="background.paper"
            overflow="auto"
            height="100vh"
            ml="280px"
          >
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
