const firebase = require('firebase');

const config = {
  apiKey: 'AIzaSyBTnLFLxbjuTSP0O5NkxYh7Ad5n4kkEIVI',
  authDomain: 'largess-8a720.firebaseapp.com',
  databaseURL: 'https://largess-8a720.firebaseio.com',
  storageBucket: 'largess-8a720.appspot.com',
  messagingSenderId: '197335837426',
};

firebase.initializeApp(config);

module.exports = firebase;
