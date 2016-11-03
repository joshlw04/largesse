import React, { Component } from 'react';
import request from 'superagent';

class Charity extends Component {
  constructor() {
    super();
  }

  render() {
    request.get('http://localhost:3000/api/v1/charities')
           .then((charities) => {
               return charityList;
             })
            .then((charities) => {
              let charityList = [];
              charityList = charities.map((charity, idx) => {
                 <div className="charity_div" key={idx}>
                   <h2 className="charity_header">{charity.name}</h2>
                   <p className="charity_mission">{charity.mission}</p>
                   <h3 className="charity_address">{charity.address}</h3>
                 </div>;
              })
           });
    return (
      <div>
        {charityList}
      </div>
    );
  }
}

export default Charity;
