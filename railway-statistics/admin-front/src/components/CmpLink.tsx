import React from 'react';
import { Link as MuiLink } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const CmpLink: React.FC<{ to: string }> = ({ to, children }) => (
  <Link to={to}>
    <MuiLink>{children}</MuiLink>
  </Link>
);
