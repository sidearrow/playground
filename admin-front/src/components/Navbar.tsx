import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'AuthProvider';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

export const Navbar: React.FC = () => {
  const { status } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">鉄道統計情報 管理画面</Typography>
        {status === true && (
          <div className="container pb-2 border-bottom border-dark d-block">
            <Link to="/company">事業者一覧</Link>
            <Link to="/line">路線一覧</Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
