import React, { Component } from 'react';
import request from 'superagent';

class Charity extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    request.get('http://localhost:3000api/v1/charities')
           .then((charities) => {
             console.log(charities);
           });
  }

  render() {
    return (
      <div className="charity_container">
        <div className="charity_div">
          <h2 className="charity_header">Red Cross</h2>
          <p className="charity_mission">The Red Cross, blah blah blah blah balh.lsdjf sldkfjwofjlsjfl slkdfj alskdjfslkdfj sldkfj lskdfj lskdf lsdfj lsdjf oweij2slfksdls lisdjlsdk fjosdj lsk josdj lskdj vlskdj fowiedj osdfj a;osdcjvzcnv oasfgj skchv osnva; sodfja; osdf s wodfj ;SOdf ;Svnslzn;S dv ; Sdnv;sd ;sdlva;osdfhg;a sfmcv a;</p>
          <h3 className="charity_address">Address 123 main street</h3>
        </div>
      </div>
    );
  }
};

export default Charity;
