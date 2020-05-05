import * as React from 'react';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';

import '../assets/scss/style.scss';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Zoom,
  Fab,
  useScrollTrigger,
} from '@material-ui/core';
import { Menu, KeyboardArrowUp } from '@material-ui/icons';

const CmpScrollTop: React.FC = ({ children }) => {
  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    document
      .getElementById('back-to-top-anchor')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        style={{ position: 'fixed', bottom: '10px', right: '10px' }}
      >
        {children}
      </div>
    </Zoom>
  );
};

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
      <AppBar>
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <Menu />
          </IconButton>
          <Typography variant="h6">鉄道統計情報</Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Toolbar id="back-to-top-anchor" />
        <Container maxWidth="md">
          <div>{props.children}</div>
        </Container>
        <CmpScrollTop>
          <Fab color="secondary" size="small">
            <KeyboardArrowUp />
          </Fab>
        </CmpScrollTop>
      </main>
      <footer></footer>
    </>
  );
};

export default CmpLayout;
