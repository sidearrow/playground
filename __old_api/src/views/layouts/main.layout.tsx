import React from 'react';

const MainLayout: React.FC = ({ children }) => (
  <html>
    <head>
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      />
      <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
    </head>
    <body style={{ fontSize: '13px' }}>
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
