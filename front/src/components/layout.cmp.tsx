import React from 'react';
import CmpHead from './head.cmp';

const CmpLayout: React.FC<{
  title: string;
}> = ({ title, children }) => {
  return (
    <>
      <CmpHead title={title} />
      <header>
        <nav className="navbar navbar-light border-bottom border-dark">
          <div className="container">
            <a className="navbar-brand" href="/">
              鉄道統計情報
            </a>
          </div>
        </nav>
      </header>
      <div className="container py-5">{children}</div>
    </>
  );
};

export default CmpLayout;
