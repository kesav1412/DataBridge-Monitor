import type { AppProps } from 'next/app';
import { CssBaseline } from '@mui/material';
// ...existing code...
import { ThemeProvider } from '@mui/material/styles';
// ...existing code...
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
