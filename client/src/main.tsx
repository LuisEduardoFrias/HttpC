import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   {/*
   <ThemeProvider theme={theme}>
      <CssBaseline />
    </ThemeProvider>
    */}
      <App />
  </React.StrictMode>
);
