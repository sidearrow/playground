import React from 'react';
import { CmpLayout } from '../components/cmpLayout';
import { Link } from 'gatsby';

const Component: React.FC = () => {
  return (
    <CmpLayout>
      <div>
        <Link to="/company">事業者一覧</Link>
      </div>
    </CmpLayout>
  );
};

export default Component;
