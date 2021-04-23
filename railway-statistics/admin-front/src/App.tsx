import React from 'react';
import { Navbar } from 'components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'Router';
import { config } from 'config';
import { AuthProvider } from 'AuthProvider';
import { Container, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { LoadingProvider } from 'LoadingProvider';

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: '1.6rem',
      marginBottom: '1rem',
    },
    h2: {
      fontSize: '1.4rem',
    },
    h3: {
      fontSize: '1.2rem',
    },
  },
});

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={config.baseUrl}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <LoadingProvider>
            <header>
              <Navbar />
            </header>
            <Container
              style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
              maxWidth="md"
            >
              <Router />
            </Container>
          </LoadingProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
