import * as React from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';

import '../assets/scss/style.scss';

const CmpLayout: React.FC<{
  title?: string;
  description?: string;
  keywords?: string[];
}> = (props) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title ? `${props.title} | 鉄道事典` : '鉄道事典'}</title>
        <meta name="google-site-verification" content={''} />
        <meta name="description" content={props.description} />
        <meta
          name="keywords"
          content={props.keywords ? props.keywords.join(',') : ''}
        />
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <header>
        <nav className="navbar shadow">
          <div className="container">
            <Link to="/" className="navbar-brand">
              鉄道統計情報
            </Link>
          </div>
        </nav>
      </header>
      <main className="my-5">
        <div className="container">{props.children}</div>
      </main>
      <footer></footer>
    </>
  );
};

export default CmpLayout;
