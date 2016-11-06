import React, { Component } from 'react';
import { Link } from 'react-router';
import request from 'superagent';

import CCForm from './Stripe/CCForm.jsx';
import firebase from '../../../firebase.config.js';

class Account extends Component {
  constructor() {
    super();
    this.state = {
      first_name: '',
      firebase_uid: '',
      user_id: null,
      email: '',
      clicks: null,
      cost_per_click: '',
      charity_address: '',
      charity_list: [],
      charity_id: '',
      charity_name: '',
      payment_type: 'VISA',
      isLoggedIn: false,
      stripe_id: '',
      payment_last_four: null,
      modalIsOpen: false,
    };

    this.getUserInfo = this.getUserInfo.bind(this);
    this.getCharities = this.getCharities.bind(this);
    this.handleCostChange = this.handleCostChange.bind(this);
    this.handleCharityChange = this.handleCharityChange.bind(this);
    this.testMethod = this.testMethod.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log('Logged IN', firebaseUser.uid);
        this.setState({ isLoggedIn: true });
      } else {
        console.log('Not logged in');
        this.setState({ isLoggedIn: false });
      }
    });
    this.getUserInfo();
    this.getCharities();
  }

  getUserInfo() {
    const baseURL = 'https://largress-api.herokuapp.com/api/v1/users/';
    const userID = firebase.auth().currentUser.uid;
    request.get(`${baseURL}${userID}`)
           .then((response) => {
             this.setState({
               first_name: response.body.first_name,
               last_name: response.body.last_name,
               firebase_uid: response.body.firebase_uid,
               email: response.body.email,
               user_id: response.body.id,
               clicks: response.body.clicks.length,
               cost_per_click: response.body.cost_per_click,
               charity_name: response.body.charity.name,
               charity_address: response.body.charity.address,
               charity_id: response.body.charity_id,
               stripe_id: response.body.stripe_id,
               payment_last_four: response.body.payment_last_four,
             });
           });
           console.log('getUserInfo ran');
  }

  getCharities() {
    const baseURL = 'https://largress-api.herokuapp.com/api/v1/charities/';
    request.get(baseURL)
           .then((response) => {
             this.setState({
               charity_list: response.body,
             });
           });
  }

  testMethod() {
    const baseURL = 'https://largress-api.herokuapp.com/api/v1/users/';
    const userID = firebase.auth().currentUser.uid;
    const cost_per_click = this.state.cost_per_click;
    const charity_id = this.state.charity_id;
    const payment_type = this.state.payment_type;

    request.put(`${baseURL}${userID}`)
           .send(
      { user:
      { cost_per_click: cost_per_click,
        charity_id: this.state.charity_id,
      },
      });
  }

  handleCostChange(e) {
    this.setState({ cost_per_click: parseInt(e.target.value, 10) });
  }

  handleCardChange(e) {
    this.setState({ payment_type: e.target.value });
  }

  handleCharityChange() {
    const charityValue = parseInt(document.querySelector('#charity-list-id').value, 10);
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
        <div className="navbar">
          <Link className="back-button" to="home"><i className="ion-ios-arrow-back"></i> Back</Link>
        </div>
        <h1>{this.state.first_name} {this.state.last_name}</h1>
        <p>Your current Charity is</p> <h2>{this.state.charity_name}</h2>
        <br />
        <p>Choose a new Chairty below:</p>
        <select id="charity-list-id" className="drop-down-menu" onChange={this.handleCharityChange}>
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

        <p>How much per click?</p>
        <input
          className="input-box"
          type="number"
          onChange={this.handleCostChange}
          name="cost_per_click"
        />
        <p>Total Donation:</p>
        <h1>${this.state.cost_per_click * this.state.clicks}</h1>
        <br />
        {
          this.state.stripe_id === null ?
        <CCForm
          firebaseUID={this.state.firebase_uid}
          email={this.state.email}
          stripeID={this.state.stripe_id}
          getUserInfo={this.getUserInfo}
        />
        :
          <div>
            <p>Your Credit Card Info:</p>
            <h3><b>{this.state.payment_type}</b> <span>ending in</span> <b>{this.state.payment_last_four}</b></h3>
          </div>
        }
        <button
          className="button update"
          onTouchStart={this.testMethod}
          onClick={this.testMethod}
        >Save Details</button>
      </div>
    );
  }
}

export default Account;

// TODO: create a modal for confirmation of updated account info
// TODO: clean up camelCase in state
