import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
// import Nav from '../../components/Nav.jsx';
import Home from '../../components/Home.jsx';
import Login from '../Auth/Login.jsx';
import Register from '../Auth/Register.jsx';
import Account from '../../components/Account.jsx';
import Charity from '../../components/Charity.jsx';
import Welcome from '../../components/Welcome.jsx';
import requireAuth from '../../../utility/authorize.js';

const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Welcome} />
    <Route path="home" component={Home} onEnter={requireAuth} />
    <Route path="login" component={Login} />
    <Route path="register" component={Register} />
    <Route path="account" component={Account} onEnter={requireAuth} />
    <Route path="charity" component={Charity} />
  </Router>
);

export default routes;
