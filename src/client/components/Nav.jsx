import React, { Component } from 'react';
import { Link } from 'react-router';

const propTypes = {
  children: React.PropTypes.element,
};

class Nav extends Component {
  render() {
    return (
      <div>
        <ul>
          <li className="active"><Link to="/">Home</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/charity">Charity</Link></li>
        </ul>
        { this.props.children }
      </div>
    );
  }
}

Nav.propTypes = propTypes;

export default Nav;
