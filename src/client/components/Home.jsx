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
      cost_per_click: null,
      isLoggedIn: false,
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

  getUser() {
    const baseURL = 'https://largress-api.herokuapp.com/api/v1/users/';
    const userID = firebase.auth().currentUser.uid;
    request.get(`${baseURL}${userID}`)
           .then((response) => {
             this.setState({
               first_name: response.body.first_name,
               firebase_uid: firebase.auth().currentUser.uid,
               user_id: response.body.id,
               clicks: response.body.clicks.length,
               cost_per_click: response.body.cost_per_click,
             });
           });
  }

  buttonClickPostToDB() {
    request.post('https://largress-api.herokuapp.com/api/v1/clicks/')
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
      <h1>Hi, {this.state.first_name}</h1>
        <Button
          buttonClick={this.buttonClickPostToDB}
          userId={this.state.user_id}
          clicks={this.state.clicks}
        />
        <Counter
          clicks={this.state.clicks}
          cost_per_click={this.state.cost_per_click}
        />
        <Link
          className="button my-account" onTouchStart="account"
          to="account"
        >My Account</Link>
        <br />
        <Link
          to="charity"
          onTouchStart="charity"
        >List of Charities</Link>
        <br />
      </div>
    );
  }
}

export default Home;
