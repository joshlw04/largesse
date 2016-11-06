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
            console.log("CDM ran");
            console.log('return from GET request:', charities.body);
            this.setState({ charities: charities.body })
            console.log('current state:', this.state);
          });
  }

  render() {
    const charityList = this.state.charities.map((charity, idx) => {
      return (
        <div className="charity_div" key={idx}>
          <h2 className="charity_header">{charity.name}</h2>
          <p className="charity_mission">{charity.mission}</p>
          {/* <h3 className="charity_address"><Link to={charity.address}>Donate Here</Link></h3> */}
        </div>
      );
    });
    return (
      <div>
      <Link className="back-button" onTouchStart="home" to="home">Back</Link>
        {charityList}
      </div>
    );
  }
}

export default Charity;
