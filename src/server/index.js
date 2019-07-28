const db = require('./db');
const express = require('express');
const path = require('path');
const seed = require('./db/seed');
const session = require('express-session');

// Port assignment
const port = process.env.PORT || 3000;

// Express server app
const app = express();

// Body parsing middleware
app.use(express.json());
//app.use(express.urlencoded({extended: true}));

// Session Middelware
app.use(session({
  secret:'iDKWhatAGoodSessionSecretIs',
  // Reduces session concurrency issues by not resaving if you haven't changed session.
  resave: false,
  // If new, but not modified, still save
  saveUninitialized: true
}));

// Session Logging Middleware
app.use((req, res, next) => {
  console.log('SESSION: ', req.session)
  next()
})

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

// Sync, then Seed, then Listen
async function listen() {
  await db.sync();
  console.log('DB synced!');
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  })
};

seed().then(()=>listen());