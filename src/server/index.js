const db = require('./db');
const express = require('express');
const path = require('path');

// Port assignment
const port = process.env.PORT || 3000;

// Models (asserions included)
const {School, Student} = require('./db/models');

// Express server app
const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Static
// app.use(express.static(path.join(__dirname, '../../dist')));
app.get('/', (req, res, next) => {
  try {
    res.send(`<html><h1>HI!!!!!!</h1></html>`)
  } catch (err) {
    next(err)
  }
})

// Routes
app.use('/api', require('./routes/api'));

// Sync then Listen
async function listen() {
  await db.sync();
  console.log('DB synced!');
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  })
};

listen();