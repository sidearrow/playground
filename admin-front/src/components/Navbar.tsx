import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from 'AuthProvider';

export const Navbar: React.FC = () => {
  const { status } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-light bg-transparent d-block">
      <div className="container justify-content-center">
        <Link to="/" className="navbar-brand">
          鉄道統計情報 管理画面
        </Link>
      </div>
      {status === true && (
        <div className="container pb-2 border-bottom border-dark d-block">
          <Link to="/company">事業者一覧</Link>
          <Link to="/line">路線一覧</Link>
        </div>
      )}
    </nav>
  );
};
