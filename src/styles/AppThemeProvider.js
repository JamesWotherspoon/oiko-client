import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
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
    gradient: {
      main: 'linear-gradient(to right, #1976d2, #5e35b1)',
    },
    background: {
      default: '#f4f5f7',
    },
    text: {
      primary: '#333',
      secondary: '#555',  
    },
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

const AppThemeProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default AppThemeProvider;
