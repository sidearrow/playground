import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { IndexPage } from 'pages/index/IndexPage';
import { LineIndexPage } from 'pages/line/LineIndexPage';
import { CompanyIndexPage } from 'pages/company/CompanyIndexPage';
import { LineDetailPage } from 'pages/line/lineDetail/LineDetailPage';
import { LoginPage } from 'pages/login/LoginPage';
import { CompanyDetailPage } from 'pages/company/detail/CompanyDetailPage';

export const Router: React.FC = () => (
  <Switch>
    <Route exact path="/login">
      <LoginPage />
    </Route>
    <Route exact path="/">
      <IndexPage />
    </Route>
    <Route exact path="/company">
      <CompanyIndexPage />
    </Route>
    <Route exact path="/company/:companyId">
      <CompanyDetailPage />
    </Route>
    <Route exact path="/line">
      <LineIndexPage />
    </Route>
    <Route exact path="/line/:lineId">
      <LineDetailPage />
    </Route>
  </Switch>
);
