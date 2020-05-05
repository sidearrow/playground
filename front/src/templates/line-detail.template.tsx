import React from 'react';
import { LineDetailPageData } from '../gatsby-node/create-page/line-detail.create-page';

const Component: React.FC<{ pageData: LineDetailPageData }> = ({
  pageData,
}) => {
  console.log(pageData);
  return <div>aaa</div>;
};

export default Component;
