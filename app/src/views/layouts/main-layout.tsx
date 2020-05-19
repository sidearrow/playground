import React from 'react';

const MainLayout: React.FC = ({ children }) => (
  <html>
    <head>
      <script></script>
    </head>
    <body>
      <header>
        <div>HEADER</div>
      </header>
      {children}
    </body>
  </html>
);

export default MainLayout;
