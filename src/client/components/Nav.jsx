import React, { Component } from 'react';
import { Link } from 'react-router';

const propTypes = {
  children: React.PropTypes.element,
};

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
  }
  render() {
    return (
      <div>
        {
        this.state.isLoggedIn === true ?
          <ul id="nav_bar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/logout">Log Out</Link></li>
            <li><Link to="/button">Feeling Guilty?</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/charity">Charity</Link></li>
          </ul>
          :
          <ul id="nav_bar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/button">Feeling Guilty?</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/charity">Charity</Link></li>
          </ul>
      }
        { this.props.children }
      </div>
    );
  }
}

Nav.propTypes = propTypes;

export default Nav;
