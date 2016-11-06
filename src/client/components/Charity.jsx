import React, { Component } from 'react';
import request from 'superagent';
import { Link } from 'react-router';

class Charity extends Component {
  constructor() {
    super();
    this.state = {
      charities: [],
    };
  }

  componentDidMount() {
    request.get('https://largress-api.herokuapp.com/api/v1/charities')
          .then((charities) => {
            this.setState({ charities: charities.body });
          });
  }

  render() {
    const charityList = this.state.charities.map((charity, idx) => {
      return (
        <div className="charity_div" key={idx}>
          <h2 className="charity_header">{charity.name}</h2>
          <p className="charity_mission">{charity.mission}</p>
        </div>
      );
    });
    return (
      <div>
        <div className="navbar">
          <Link className="back-button" to="home">
          <i className="ion-ios-arrow-back"></i> Back</Link>
          <div className="charity-list">
            {charityList}
          </div>
        </div>
      </div>
    );
  }
}

export default Charity;
