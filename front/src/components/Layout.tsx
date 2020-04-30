import * as React from 'react';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';

import '../assets/scss/style.scss';

const Layout: React.FC<{
  title?: string;
  description?: string;
  keywords?: string[];
}> = props => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title ? `${props.title} | 鉄道事典` : '鉄道事典'}</title>
        <meta name="google-site-verification" content={''} />
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords ? props.keywords.join(',') : ''} />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <header>
        <Link to="/">鉄道事典（趣味）</Link>
      </header>
      <main>
        <div>{props.children}</div>
      </main>
      <footer></footer>
    </>
  )
}


export default Layout
