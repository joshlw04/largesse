import React, { Component } from 'react';
import { Link } from 'react-router';
import request from 'superagent';
import firebase from '../../../firebase.config.js';

import Button from './Button.jsx';
import Counter from './Counter.jsx';

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

  componentWillMount() {
    this.getUser();
  }

  getUser() {
    const baseURL = 'http://localhost:3000/api/v1/users/';
    const userID = firebase.auth().currentUser.uid;
    request.get(`${baseURL}${userID}`).then((response) => {
      this.setState({
        first_name: response.body.first_name,
        firebase_uid: firebase.auth().currentUser.uid,
        user_id: response.body.id,
        clicks: response.body.clicks.length,
      });
      console.log("Home rendered, this is the state of home:", this.state);
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
        <Link to="charity">Charities</Link>
      </div>
    );
  }
}

export default Home;
