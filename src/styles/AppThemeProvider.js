import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      light: '#4f83cc',
      main: '#1976d2',
      dark: '#174c99',
      contrastText: '#fff',
    },
    secondary: {
      light: '#8e6bcf',
      main: '#5e35b1',
      dark: '#3c1c7a',
      contrastText: '#fff',
    },
    grey: {
      main: 'rgb(128, 128, 128)'
    },
    brand: {
      main: 'linear-gradient(90deg, #1976d2, #5e35b1)',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: 'white',
    },
    text: {
      primary: '#333',
      secondary: '#555',  
    },
  },
  border: {
    main: '0.5px, solid, rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
      marginBottom: '1rem',
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
      marginBottom: '1rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

const theme = createTheme({
  ...baseTheme,
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        root: {
          background: baseTheme.palette.brand.main,
          width: '120px',
          margin: '8px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          margin: '8px',
        },
      },
    },
    MuiSelected: {
      defaultProps: {
        color: baseTheme.palette.brand.main,
      },
      styleOverrides: {
        root: {
          color: baseTheme.palette.brand.main,
        },
      },
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '.Mui-error': {
          color: 'error.main',
          margin: '8px',
        },
      },
    },
  },
});

const AppThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default AppThemeProvider;
