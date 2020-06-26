import React from 'react';
import { Navbar } from 'components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'Router';
import { config } from 'config';
import { AuthProvider } from 'AuthProvider';

import 'bootstrap/dist/js/bootstrap.bundle';
import { Container } from '@material-ui/core';

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={config.baseUrl}>
      <AuthProvider>
        <header>
          <Navbar />
        </header>
        <Container style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          <Router />
        </Container>
      </AuthProvider>
    </BrowserRouter>
  );
};
