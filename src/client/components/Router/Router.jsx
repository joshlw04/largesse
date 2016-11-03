import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Nav from '../../components/Nav.jsx';
import Button from '../../components/Button.jsx';
import Login from '../Auth/Login.jsx';
import Register from '../Auth/Register.jsx';
import About from '../../components/About.jsx';
import Charity from '../../components/Charity.jsx';
import Welcome from '../../components/Welcome.jsx';
import requireAuth from '../../../utility/authorize.js';

const routes = (
  <Router history={browserHistory}>
    <Route component={Nav}>
      <Route path="/" component={Welcome} />
      <Route path="/button" component={Button} onEnter={requireAuth} />
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
      <Route path="about" component={About} />
      <Route path="charity" component={Charity} />
    </Route>
  </Router>
);

export default routes;
