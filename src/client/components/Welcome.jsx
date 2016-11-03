import React, { Component } from 'react';
import { Link } from 'react-router';
import request from 'superagent';
import firebase from '../../../firebase.config.js';
import WelcomeSlideshow from './WelcomeSlideshow.jsx';

class Welcome extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: (firebase.auth().currentUser !== null), // this will be either true or false
    };

    this.getUsers = this.getUsers.bind(this);
  }
  componentWillMount() {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      this.setState({ isLoggedIn: (firebaseUser !== null) });
      if (firebaseUser) {
        console.log('Logged IN', firebaseUser.uid);
      } else {
        console.log('Not logged in');
      }
    });
  }

  getUsers() {
    request.post('http://localhost:3000/api/v1/users')
           .send(
      { user:
      { first_name: 'Hammy',
        last_name: 'Chicken',
        email: 'josh@chicken.com',
        total_clicks: 0,
        cost_per_click: 1,
        payment_type: 'VISA',
        payment_last_four: 7889,
        charity_id: 1 } })
          .then((response) => {
            console.log(response.body);
          });
  }

  signOutUser() {
    firebase.auth()
    .signOut()
    .then(() => {
      console.log('user logged out');
      this.setState({ isLoggedIn: false });
    });
  }

  render() {
    return (
      <div>Largess
        <WelcomeSlideshow />
        <button onClick={this.getUsers}>Post to Users</button>
        {
          this.state.isLoggedIn === false ?
            <div>
              <Link to="login">Login</Link>
              <Link to="/register">Register</Link>
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
