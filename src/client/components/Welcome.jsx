import React, { Component } from 'react';
import { Link } from 'react-router';
import firebase from '../../../firebase.config.js';
import WelcomeSlideshow from './WelcomeSlideshow.jsx';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: (firebase.auth().currentUser !== null), // this will be either true or false
    };
    this.signOutUser = this.signOutUser.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log('Logged IN', firebaseUser.uid);
      } else {
        console.log('Not logged in');
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
      <div>Largess
        <WelcomeSlideshow />
        {
          this.state.isLoggedIn === false ?
            <div>
              <Link className="auth_link" to="login">Login</Link>
              <Link className="auth_link" to="register">Register</Link>
            </div>
          :
            <div>
              <Link to="/" onClick={this.signOutUser}>Log Out</Link>
            </div>
        }
      </div>
    );
  }
}

export default Welcome;
