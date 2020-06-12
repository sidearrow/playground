import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { IndexPage } from 'pages/index/IndexPage';
import { LineIndexPage } from 'pages/line/LineIndexPage';
import { CompanyIndexPage } from 'pages/company/CompanyIndexPage';

export const Router: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <IndexPage />
    </Route>
    <Route exact path="/company">
      <CompanyIndexPage />
    </Route>
    <Route exact path="/line">
      <LineIndexPage />
    </Route>
  </Switch>
);
