const db = require('./db');
const express = require('express');
const path = require('path');
const seed = require('./db/seed');

// Port assignment
const port = process.env.PORT || 3000;

// Express server app
const app = express();

// Body parsing middleware
app.use(express.json());
//app.use(express.urlencoded({extended: true}));

// Static
app.use('/dist', express.static(path.join(__dirname, '..', '..', 'dist')));
//app.get('/', express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
  } catch (err) {
    next(err)
  }
});

// API Routes
app.use('/api', require('./routes/api'));

// Sync then Listen
async function listen() {
  await db.sync();
  console.log('DB synced!');
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  })
};

//SEEDS THE DATA
seed();
listen();