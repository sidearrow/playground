import React from 'react';
import { Navbar } from 'components/Navbar';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'Router';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
      <main className="container">
        <Router />
      </main>
    </BrowserRouter>
  );
};
