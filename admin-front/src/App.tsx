import React from 'react';
import { Navbar } from 'components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'Router';
import { config } from 'config';
import { AuthProvider } from 'AuthProvider';

import 'bootstrap/dist/js/bootstrap.bundle';

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={config.baseUrl}>
      <AuthProvider>
        <header>
          <Navbar />
        </header>
        <main className="container pb-5">
          <Router />
        </main>
      </AuthProvider>
    </BrowserRouter>
  );
};
