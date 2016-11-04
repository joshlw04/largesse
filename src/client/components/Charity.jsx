import React, { Component } from 'react';
import request from 'superagent';

class Charity extends Component {
  constructor() {
    super();
    this.state = {
      charities: [],
    };
  }

  componentDidMount() {
    request.get('http://localhost:3000/api/v1/charities')
          .then((charities) => {
            console.log("CDM ran");
            this.setState({ charities: charities })
            console.log(this.state);
          });
  }

  render() {
    const charityList = this.state.charities.map((charity, idx) => {
      return (
        <div className="charity_div" key={idx}>
          <h2 className="charity_header">{charity.name}</h2>
          <p className="charity_mission">{charity.mission}</p>
          <h3 className="charity_address">{charity.address}</h3>
        </div>
      );
    });
    return (
      <div>
        {charityList}
        hello from charities
      </div>
    );
  }
}

export default Charity;
