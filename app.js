#!/usr/bin/env node

'use strict';

const express = require('express');

const mongoose = require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 3000;

const app = express();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('My father was a mongoose and my mother was a rattlin\' snake.');
});

app.use(express.static(__dirname + '/public'));

// default route for dev
app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Big Brother is always watching');
});
// custom 404 page
app.use((req, res) => {
  res.type('text/plain');
  res.status('404');
  res.send('404 - Not Found');
});
// custom 500 response
app.use((err, req, res, next) => {
  console.error(err.message);
  res.type('text/plain');
  res.status('500');
  res.send('500 - Server Error');
});

app.listen(port, () => console.log(
  `Big Brother started on port ${port}; ` +
  'press Ctrl-C to terminate.'));
