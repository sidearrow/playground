import * as React from 'react';
import '../assets/scss/style.scss';
import { Link } from 'gatsby';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <header>
        <Link to="/">鉄道辞典（趣味）</Link>
      </header>
      <main>
        <div>{children}</div>
      </main>
      <footer></footer>
    </>
  )
}

export default Layout
