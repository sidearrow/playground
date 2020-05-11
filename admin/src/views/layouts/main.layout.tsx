import React from 'react';

const MainLayout: React.FC = ({ children }) => (
  <html>
    <head>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      />
    </head>
    <body>
      <header>
        <nav className="navbar navbar-light shadow">
          <a href="/" className="navbar-brand">
            鉄道統計情報 管理画面
          </a>
        </nav>
      </header>
      <main className="container py-5">{children}</main>
    </body>
  </html>
);

export default MainLayout;
