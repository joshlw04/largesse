import React, { Component } from 'react';
import { Link } from 'react-router';
import firebase from '../../../firebase.config.js';
import WelcomeSlideshow from './WelcomeSlideshow.jsx';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false, // this will be either true or false
    };
    this.signOutUser = this.signOutUser.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log('Logged IN', firebaseUser.uid);
        this.setState({ isLoggedIn: true });
      } else {
        console.log('Not logged in');
        this.setState({ isLoggedIn: false });
      }
    });
  }

  signOutUser() {
    firebase.auth()
    .signOut()
    .then(() => {
      // console.log('user logged out');
      this.setState({ isLoggedIn: false });
    });
  }

  render() {
    return (
      <div>
        <h1>Largess</h1>
        {/* <WelcomeSlideshow /> */}
            <div id="welcome-main">
              <div id="welcome-icon">

              </div>
              <Link className="button register" to="register">Sign Up</Link>
              <br />
              Already have an account? <Link to="login"><b>Sign in</b></Link>
            </div>

      </div>
    );
  }
}

export default Welcome;
