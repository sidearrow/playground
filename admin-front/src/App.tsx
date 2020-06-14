import React from 'react';
import { Navbar } from 'components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'Router';
import { config } from 'config';

export const App: React.FC = () => {
  return (
    <BrowserRouter basename={config.baseUrl}>
      <header>
        <Navbar />
      </header>
      <main className="container pb-5">
        <Router />
      </main>
    </BrowserRouter>
  );
};
