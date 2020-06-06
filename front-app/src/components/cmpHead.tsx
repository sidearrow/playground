import React from 'react';
import { Helmet } from 'react-helmet';

type Props = {
  title: string;
  description: string;
};

export const CmpHead: React.FC<Props> = ({ description, title }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>
);
