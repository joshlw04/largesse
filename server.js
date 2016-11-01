require('dotenv').config();

process.env.ENV = process.env.ENV || 'dev';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');
const app = require('./src/server/app');

// if (process.env.ENV === 'dev') {
//   const compiler = webpack(config);
//   const middleware = webpackMiddleware(compiler, {
//     stats: {
//       colors: true,
//       chunks: false,
//     },
//   });
//   app.use(middleware);
//   app.use(webpackHotMiddleware(compiler));
// }

app.use(express.static(path.join(__dirname, 'static')));
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'static/index.html'));
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`LISTENING on Port ${port}, webpack was here`);
});
