import React from 'react';
import CmpHead from './head.cmp';

const CmpLayout: React.FC<{
  title: string;
}> = ({ title, children }) => {
  return (
    <>
      <CmpHead title={title} />
      <header>
        <nav className="navbar">
          <div className="container">
            <a className="navbar-brand">鉄道統計情報</a>
          </div>
        </nav>
      </header>
      <div className="container">{children}</div>
    </>
  );
}

export default CmpLayout;
