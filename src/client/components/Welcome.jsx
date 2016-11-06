import React, { Component } from 'react';
import { Link } from 'react-router';
import firebase from '../../../firebase.config.js';
import WelcomeSlideshow from './WelcomeSlideshow.jsx';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        this.setState({ isLoggedIn: true });
      } else {
        this.setState({ isLoggedIn: false });
      }
    });
  }

  render() {
    return (
      <div id="welcome-main">
        <div id="welcome-icon">
          <img className="logo" src="images/largess-logo.png" alt="" />
        </div>
        <h1>Largess</h1>
        <Link className="button register" to="register">Sign Up</Link>
        <br />
        Already have an account? <Link to="login"><b>Sign in</b></Link>
      </div>
    );
  }
}

export default Welcome;
