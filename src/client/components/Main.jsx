import React, { Component } from 'react';
import firebase from '../../../firebase.config.js';

import Welcome from './Welcome.jsx';

const propTypes = {
  router: React.PropTypes.object,
};

class Main extends Component {
  constructor() {
    super();
  }
/*----------------------------------------------------------------------------------------------*/

  render() {
    return (
      <Welcome />
    );
  }
}

Main.propTypes = propTypes;

export default Main;
