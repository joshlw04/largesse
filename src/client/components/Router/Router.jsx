import React from 'react';
import { Router, Route, hashHistory } from 'react-router';
import Nav from '../../components/Nav.jsx';
import Button from '../../components/Button.jsx';
import Login from '../../components/Login.jsx';
import Register from '../../components/Register.jsx';
import About from '../../components/About.jsx';
import Charity from '../../components/Charity.jsx';

const routes = (
  <Router history={hashHistory}>
    <Route component={Nav}>
      <Route path="/" component={Button} />
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
      <Route path="about" component={About} />
      <Route path="charity" component={Charity} />
    </Route>
  </Router>
);

export default routes;
