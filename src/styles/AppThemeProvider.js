import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const baseTheme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      light: '',
      main: 'rgb(0,48,61)',
      dark: '',
      contrastText: '',
    },
    secondary: {
      light: '',
      main: 'rgb(104,202,176)',
      dark: '',
      contrastText: '',
    },
    grey: {
      main: 'rgb(128, 128, 128)'
    },
    brand: {
      main: '#3f51b5',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: 'rgb(255, 255, 255)',
    },
    text: {
      primary: '#333',
      secondary: '#555',  
    },
  },
  border: {
    main: '0.5px, solid, rgba(0, 0, 0, 0.12)',
  },
  shape: {
    borderRadius: 4,
  },
});

const theme = createTheme({
  ...baseTheme,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
      color: baseTheme.palette.primary.main,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '2.4rem',
      fontWeight: 500,
      color: baseTheme.palette.brand.main,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
      styleOverrides: {
        outlined: {
          color: baseTheme.palette.primary.main,
          background: 'transparent',
        },
        root: {
          color: baseTheme.palette.primary.main,
          background: baseTheme.palette.secondary.main,
          width: '120px',
          margin: '8px',
          boxShadow: 'none',
        },
        '&.MuiButton-contained': {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'standard',
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
    },
    MuiFormControl: {
      defaultProps: {
        variant: 'standard',
      },
    },
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
