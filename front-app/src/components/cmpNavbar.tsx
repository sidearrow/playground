import React from 'react';
import { Link } from 'gatsby';

export const CmpNavbar: React.FC = () => (
  <nav className="navbar navbar-light border-bottom">
    <div className="container">
      <Link to="/" className="navbar-brand">
        鉄道統計情報
      </Link>
    </div>
  </nav>
);
