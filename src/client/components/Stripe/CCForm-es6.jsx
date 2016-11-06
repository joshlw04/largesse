import React, { Component } from 'react';
import ReactScriptLoaderMixin from 'react-script-loader';

// .ReactScriptLoaderMixin;

class PaymentForm extends Component {
  constructor() {
    super();
    mixins: [ReactScriptLoaderMixin];

  this.state = {
    stripeLoading: true,
    stripeLoadingError: false,
    submitDisabled: false,
    paymentError: null,
    paymentComplete: false,
    token: null,
  };
    this.onScriptLoaded = this.onScriptLoaded.bind(this);
    this.onScriptError = this.onScriptError.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getScriptURL = this.getScriptURL.bind(this);
  }


  onScriptLoaded() {
    if (!PaymentForm.getStripeToken) {
      Stripe.setPublishableKey('pk_test_QWrV3Zz85xnFhi5L5AWpxMMh');
      this.setState({ stripeLoading: false, stripeLoadingError: false });
    }
  }

  onScriptError() {
    this.setState({ stripeLoading: false, stripeLoadingError: true });
  }

  onSubmit(event) {
    const self = this;
    event.preventDefault();
    this.setState({ submitDisabled: true, paymentError: null });
    // send form here
    Stripe.createToken(event.target, function(status, response) {
      if (response.error) {
        self.setState({ paymentError: response.error.message, submitDisabled: false });
      }
      else {
        self.setState({ paymentComplete: true, submitDisabled: false, token: response.id });
        // make request to your server here!
      }
    });
  }

  getScriptURL() {
    return 'https://js.stripe.com/v2/';
  }

  render() {
    if (this.state.stripeLoading) {
      return <div>Loading</div>;
    }
    else if (this.state.stripeLoadingError) {
      return <div>Error</div>;
    }
    else if (this.state.paymentComplete) {
      return <div>Payment Complete!</div>;
    }
    else {
      return (<form onSubmit={this.onSubmit} >
        <span>{ this.state.paymentError }</span><br />
        <input type='text' data-stripe='number' placeholder='credit card number' /><br />
        <input type='text' data-stripe='exp-month' placeholder='expiration month' /><br />
        <input type='text' data-stripe='exp-year' placeholder='expiration year' /><br />
        <input type='text' data-stripe='cvc' placeholder='cvc' /><br />
        <input disabled={this.state.submitDisabled} type='submit' value='Purchase' />
      </form>);
    }
  }
}

module.exports = PaymentForm;
