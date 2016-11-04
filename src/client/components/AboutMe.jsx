import React, { Component } from 'react';
import firebase from '../../../firebase.config.js';
import request from 'superagent';

class AboutMe extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      firebase_uid: '',
      user_id: null,
      clicks: null,
      cost_per_click: null,
      charity: [],
      charity_address: '',
    };

    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    const baseURL = 'http://localhost:3000/api/v1/users/';
    const userID = firebase.auth().currentUser.uid;
    request.get(`${baseURL}${userID}`)
           .then((response) => {
             console.log(response.body);
             this.setState({
               first_name: response.body.first_name,
               last_name: response.body.last_name,
               firebase_uid: response.body.firebase_uid,
               user_id: response.body.id,
               clicks: response.body.clicks.length,
               cost_per_click: response.body.cost_per_click,
               charity: response.body.charity.name,
               charity_address: response.body.charity.address,
             });
           });
  }

  render() {
    return (
      <div>
        <h1>Hi, {this.state.first_name} {this.state.last_name}</h1>
        <h2>You have clicked {this.state.clicks} times,</h2>
        <h2>and you would have given ${this.state.cost_per_click} each click,</h2>
        <h2>and your chosen charity is {this.state.charity}.</h2>
        <h2>Their address to send donations is</h2>
        <h2>{this.state.charity_address}</h2>
        <h3>so your total donation should be</h3>
        <h2>${this.state.cost_per_click * this.state.clicks}</h2>
      </div>
    );
  }
}

export default AboutMe;
