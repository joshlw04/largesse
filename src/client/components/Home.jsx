import React, { Component } from 'react';
import { Link } from 'react-router';
import request from 'superagent';
import firebase from '../../../firebase.config.js';

import Button from './Button.jsx';
import Counter from './Counter.jsx';
import Account from './Account.jsx';


class Home extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      firebase_uid: '',
      user_id: null,
      clicks: null,
    };
    this.getUser = this.getUser.bind(this);
    this.buttonClickPostToDB = this.buttonClickPostToDB.bind(this);
  }

/*
before rendering, call this function, which will make a GET request
for the currently logged in user and set the state of Home based on that user.

*/
  componentWillMount() {
    this.getUser();
  }

  /*
  after rendering once, call this function, which .

  */

  componentDidMount() {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log('Logged IN', firebaseUser.uid);
      } else {
        console.log('Not logged in');
      }
    });
  }

  getUser() {
    const baseURL = 'http://localhost:3000/api/v1/users/';
    const userID = firebase.auth().currentUser.uid;
    request.get(`${baseURL}${userID}`)
           .then((response) => {
             this.setState({
               first_name: response.body.first_name,
               firebase_uid: firebase.auth().currentUser.uid,
               user_id: response.body.id,
               clicks: response.body.clicks.length,
             });
           });
  }

  buttonClickPostToDB() {
    request.post('http://localhost:3000/api/v1/clicks/')
      .send(
      { click:
      {
        user_id: this.state.user_id,
        location: 'NYC',
      },
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        this.setState({ clicks: this.state.clicks += 1 });
        console.log('State after button click:', this.state);
      });
  }

  render() {
    return (
      <div>
        <h1>Welcome, {this.state.first_name}</h1>
        <Button
          buttonClick={this.buttonClickPostToDB}
          userId={this.state.user_id}
          clicks={this.state.clicks}
        />
        <Counter clicks={this.state.clicks} />
        <Link to="account">My Account</Link>
        <Link to="charity">Charities</Link>
      </div>
    );
  }
}

export default Home;
