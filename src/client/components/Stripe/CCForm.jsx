// https://davidwalsh.name/step-step-guide-stripe-payments-react
// I found this form online, and given my time constraints, I decided to use it in order to get Stripe functionality in time for graduation. I understand that mixins are no longer a supported/recommended way of handling data/functionality, and in the very near future I plan on restructuring this page to update it to es6 standards.

const React = require('react');
const request = require('superagent');
const ReactScriptLoaderMixin = require('react-script-loader').ReactScriptLoaderMixin;

const propTypes = {
  email: React.PropTypes.string,
  firebaseUID: React.PropTypes.string,
  stripeID: React.PropTypes.string,
  getUserInfo: React.PropTypes.func,
};

const PaymentForm = React.createClass({
  mixins: [ReactScriptLoaderMixin],

  getInitialState: function() {
    return {
      stripeLoading: true,
      stripeLoadingError: false,
      submitDisabled: false,
      paymentError: null,
      paymentComplete: false,
      token: null,
      paymentType: '',
      lastFour: '',
    };
  },

  getScriptURL() {
    return 'https://js.stripe.com/v2/';
  },

  onScriptLoaded() {
    if (!PaymentForm.getStripeToken) {
      // Put your publishable key here
      Stripe.setPublishableKey('pk_test_QWrV3Zz85xnFhi5L5AWpxMMh');

      this.setState({ stripeLoading: false, stripeLoadingError: false });
    }
  },

  onScriptError() {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  },

  // deleteCard() {
  //  make a new form to run update script on pfp.com request.del(`http://largress-api.herokuapp.com/api/v1/users/${this.props.firebaseUID}`)
  // }

  onSubmit(e) {
    e.preventDefault();
    // grab last 4 of cc number:
    let lastFour = '';
    const ccValue = document.querySelector('#ccInfo').value.toString();
    lastFour = ccValue.substr(ccValue.length - 4);
    this.setState({ lastFour: lastFour, submitDisabled: true, paymentError: null });

    // send form here
    Stripe.createToken(e.target, (status, response) => {
      // stripe command that creates a stripe token
      if (response.error) { // respond with error if no good
        this.setState({ paymentError: response.error.message, submitDisabled: false });
      } else { // else, set state with the token...
        this.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
        // post request to PFP, with the firebaseUID and email, both matching in the database. SO we need to pass down that info thru props from account.jsx
        // token = response.id
        const baseURL = 'https://paulsfootpalace.com/largess-app/customer-new.php';
        // console.log(this.state);
        request.post(`${baseURL}`)
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .send(
          {
            email: this.props.email,
            firebaseUID: this.props.firebaseUID,
            stripeToken: this.state.token,
          })
          .catch((err) => {
            console.log(err);
          })
          .then((res) => {
            console.log('post request sent', res);
          });
      }
      request.put(`http://largress-api.herokuapp.com/api/v1/users/${this.props.firebaseUID}`)
             .send(
        { user:
        { payment_last_four: this.state.lastFour,
        },
        }).then();
    });
  },

  render() {
    console.log('state of CCForm.jsx', this.state);
    if (this.state.stripeLoading) {
      return <div>Loading</div>;
    } else if (this.state.stripeLoadingError) {
      return <div>Error</div>;
    } else if (this.state.lastFour) {
      return <div>Saved Card: {this.state.lastFour}</div>;
    } else {
      return (<form onSubmit={this.onSubmit} >
        <span>{ this.state.paymentError }</span><br />
        <input id="ccInfo" type="text" data-stripe="number" placeholder="Credit Card number" /><br />
        <input className="input-date" type="text" data-stripe="exp-month" placeholder="Expiration Month" /><br />
        <input className="input-date" type="text" data-stripe="exp-year" placeholder="Expiration Year" /><br />
        <input type="text" data-stripe="cvc" placeholder="CVC" /><br />
        <input className="button button-ccinfo" disabled={this.state.submitDisabled} type="submit" value="Save CC Info" />
      </form>);
    }
  },
});

PaymentForm.propTypes = propTypes;

export default PaymentForm;
