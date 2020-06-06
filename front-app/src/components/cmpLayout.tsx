import React from 'react';
import '../assets/style/index.scss';
import { CmpNavbar } from './cmpNavbar';

export const CmpLayout: React.FC = ({ children }) => (
  <>
    <header>
      <CmpNavbar />
    </header>
    <main className="container py-5">{children}</main>
    <footer></footer>
  </>
);
