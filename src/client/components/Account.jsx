import React, { Component } from 'react';
import request from 'superagent';

import firebase from '../../../firebase.config.js';

class Account extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      firebase_uid: '',
      user_id: null,
      clicks: null,
      cost_per_click: '',
      charity_address: '',
      charity_list: [],
      charity_id: '',
      charity_name: '',
      payment_type: '',
    };

    this.getUserInfo = this.getUserInfo.bind(this);
    this.getCharities = this.getCharities.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleCharityChange = this.handleCharityChange.bind(this);
    this.testMethod = this.testMethod.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
  }

  componentWillMount() {
    this.getUserInfo();
    this.getCharities();
  }

  getUserInfo() {
    const baseURL = 'http://localhost:3000/api/v1/users/';
    const userID = firebase.auth().currentUser.uid;
    request.get(`${baseURL}${userID}`)
           .then((response) => {
             this.setState({
               first_name: response.body.first_name,
               last_name: response.body.last_name,
               firebase_uid: response.body.firebase_uid,
               user_id: response.body.id,
               clicks: response.body.clicks.length,
               cost_per_click: response.body.cost_per_click,
               charity_name: response.body.charity.name,
               charity_address: response.body.charity.address,
               charity_id: response.body.charity_id,
             });
           });
           console.log('getUserInfo ran');
  }

  getCharities() {
    const baseURL = 'http://localhost:3000/api/v1/charities/';
    request.get(baseURL)
           .then((response) => {
             this.setState({
               charity_list: response.body,
             });
             console.log('charity list:', this.state.charity_list);
           });
  }

  testMethod() {
    console.log('updateUserInfo ran');
    const baseURL = 'http://localhost:3000/api/v1/users/';
    const userID = firebase.auth().currentUser.uid;
    const cost_per_click = this.state.cost_per_click;
    const charity_id = this.state.charity_id;
    const payment_type = this.state.payment_type;

    request.put(`${baseURL}${userID}`)
           .send(
      { user:
      { cost_per_click: cost_per_click,
        payment_type: payment_type,
        // payment_last_four: 9999,
        charity_id: this.state.charity_id,
        // charity_address: this.state.charity_list
      },
      }).then();
  }

  handleCostChange(e) {
    this.setState({ cost_per_click: parseInt(e.target.value, 10) });
  }

  handleCardChange(e) {
    this.setState({ payment_type: e.target.value });
  }

  handleCharityChange() {
    const charityValue = parseInt(document.querySelector('#charity_list_id').value, 10);
    this.setState({ charity_id: charityValue });
// when you get the value of an html element, it is always a string, so if youre comparing two numbers, and the value of the HTML element is supposed to be a nuymber, you must parseInt the html value.
    const charityList = this.state.charity_list;
    for (const singleCharity of charityList) {
      if (singleCharity.id === charityValue) {
        this.setState({ charity_name: singleCharity.name });
        this.setState({ charity_address: singleCharity.address });
      }
    }
  }

  render() {
    return (
      <div>
        <h1>Hi, {this.state.first_name} {this.state.last_name}</h1>
        <p>You have clicked {this.state.clicks} times</p>
        <p>and you would have given ${this.state.cost_per_click} each click,</p>
        <p>so your total donation should be</p>
        <p>${this.state.cost_per_click * this.state.clicks}</p>
        <p>and your chosen charity is {this.state.charity_name}.</p>
        <p>Their address to send donations is</p>
        <p>{this.state.charity_address}</p>

        <select id="charity_list_id" onChange={this.handleCharityChange}>
          <option>Choose your Charity</option>
          {
              this.state.charity_list.map((charity, idx) => {
                return (
                  <option key={idx} value={charity.id}>
                    {charity.name}
                  </option>
                );
              })
            }
        </select>

        <input
          type="number"
          onChange={this.handleCostChange}
          name="cost_per_click"
          placeholder="Change your cost-per-click here"
        />

        <button onClick={this.testMethod}>Submit Changes</button>

      </div>
    );
  }
}

export default Account;


/*

// updateUserInfo() {
//   console.log('updateUserInfo ran');
//

  // const baseURL = 'http://localhost:3000/api/v1/users/';
  // const userID = firebase.auth().currentUser.uid;
  // //const cost_per_click = this.state.first_name;
  // //const charity_id = this.state.charity_id;
  //
  // console.log(baseURL);
  // console.log(userID);
  // console.log(this.state.first_name);
  //

  // request.put(`${baseURL}${userID}`)
  //        .send(
  //   { user:
  //   { cost_per_click: userID,
            // payment_type: 'MASTERCARD',
            // payment_last_four: 9999,
            // charity_id: this.state.charity_id,
            // charity_address: this.state.charity_list
    // },
    // })
    // .catch();
        //  .then(() => {
          //  this.setState({
            //  first_name: response.body.first_name,
            //  firebase_uid: firebase.auth().currentUser.uid,
            //  user_id: response.body.id,
            //  clicks: response.body.clicks.length,
          //  });
        //  });
// }

// handleChange(e) {
//   const stateObj = {};
//   const stateKey = e.target.name;
//   stateObj[stateKey] = e.target.value;
//   this.setState(stateObj);
// }

this.state.charity_list = array of charity objects
search through  to find the matching




*/
