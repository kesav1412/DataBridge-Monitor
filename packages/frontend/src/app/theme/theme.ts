import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: string;
  }
  interface PaletteOptions {
    neutral?: string;
  }
}

const lightPalette: ThemeOptions['palette'] = {
  mode: 'light',

  primary: {
    main: '#FA4616',
    light: '#FFF8F6',
    contrastText: '#FFFFFF',
  },

  background: {
    default: '#FFF8F6',
    paper: '#FFFFFF',
  },

  text: {
    primary: '#121212',
    secondary: '#424242',
    disabled: '#9E9E9E',
  },

  divider: '#F7F0EE',

  neutral: '#757575',

  success: {
    main: '#2E7D32',
  },
  error: {
    main: '#D32F2F',
  },
  warning: {
    main: '#EF6C00',
  },

  action: {
    hover: '#FFF1ED',
  },
};

const darkPalette: ThemeOptions['palette'] = {
  mode: 'dark',

  primary: {
    main: '#FA4616',
    light: '#2A1A14',
    contrastText: '#FFFFFF',
  },

  background: {
    default: '#0F0F0F',
    paper: '#161616',
  },

  text: {
    primary: '#FAFAFA',
    secondary: '#BDBDBD',
    disabled: '#9E9E9E',
  },

  success: {
    main: '#66BB6A',
  },
  error: {
    main: '#EF5350',
  },
  warning: {
    main: '#FF9800',
  },

  action: {
    hover: '#2A1A14',
  },

  divider: '#2A2A2A',

  neutral: '#757575',

};

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: mode === 'dark' ? darkPalette : lightPalette,

    typography: {
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont',

      subtitle1: {
        color: mode === 'dark' ? '#D7A18F' : '#ad6755',
        fontWeight: 500,
      },

      body2: {
        color: 'text.secondary',
      },
    },

    shape: {
      borderRadius: 8,
    },
  });
