import React, { useState, createContext, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { apiClient } from 'api/apiClient';
import { authService } from 'services/authService';

export const AuthContext = createContext<{
  status: boolean | null;
  setStatus: (v: boolean) => void;
}>({ status: null, setStatus: () => { } });

export const AuthProvider: React.FC = ({ children }) => {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    (async () => {
      const res = await authService.isLogin();
      setIsLogin(res);
    })();
  }, []);

  if (isLogin === null) {
    return <div>ログイン情報確認中......</div>;
  }

  if (pathname !== '/login' && isLogin === false) {
    return <Redirect to="/login" />;
  }

  return (
    <AuthContext.Provider
      value={{
        status: isLogin,
        setStatus: (v): void => {
          setIsLogin(v);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
