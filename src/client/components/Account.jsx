import React, { Component } from 'react';
import { Link } from 'react-router';
import Modal from 'react-modal';
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
      payment_type: '',
      isLoggedIn: (firebase.auth().currentUser !== null),
      stripe_id: '',
      payment_last_four: null,
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
      } else {
        console.log('Not logged in');
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
    console.log('updateUserInfo ran');
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
        // charity_address: this.state.charity_list
      },
      }).then(
      );
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
    console.log('state on render of Account.jsx', this.state);
    return (
      <div>
        <Link to="home">Largess</Link>
        <h1>{this.state.first_name} {this.state.last_name}</h1>

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

        <p>How much per click?</p>
        <input
          type="number"
          onChange={this.handleCostChange}
          name="cost_per_click"
          placeholder="Change your cost-per-click here"
        />
        <p>Total Donation:</p>
        <p>${this.state.cost_per_click * this.state.clicks}</p>

        <button className="button update" onClick={this.testMethod}>Submit Changes</button>

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
            <h2>Your Credit Card Info:</h2>
            <h3>{this.state.payment_type} {this.state.payment_last_four}</h3>
          </div>
        }
        {/* <div>
          <button onClick={this.openModal}>Edit Your Account</button>
          <Modal isOpen={this.state.open}>
            <h1>Basic Modal</h1>
            <button onClick={this.closeModal}>Close</button>
            <input />
            <input />
          </Modal>
          <button onClick={this.openModal}>Add A Credit Card</button>
          <Modal isOpen={this.state.open}>
            <h1>Basic Modal</h1>
            <button onClick={this.closeModal}>Close</button>
            <input />
            <input />
          </Modal>

      </div>
 */}
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
