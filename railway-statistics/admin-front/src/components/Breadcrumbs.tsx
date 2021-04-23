import React from 'react';
import {
  Typography,
  Breadcrumbs as MuiBreadcrumbs,
  Link as MuiLink,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

export const Breadcrumbs: React.FC<{
  links: { text: string; href: string | null }[];
}> = ({ links }) => (
  <MuiBreadcrumbs>
    {links.map((link, i) => {
      if (link.href === null) {
        return <Typography key={i}>{link.text}</Typography>;
      }
      return (
        <Link to={link.href} key={i}>
          <MuiLink>{link.text}</MuiLink>
        </Link>
      );
    })}
  </MuiBreadcrumbs>
);
