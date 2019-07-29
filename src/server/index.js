const db = require('./db');
const express = require('express');
const path = require('path');
const seed = require('./db/seed');
const session = require('express-session');
const SessionStoreConstructor = require('connect-session-sequelize')(session.Store);

// Port assignment
const port = process.env.PORT || 3000;
const doSeed = process.env.DO_SEED || true;

// Express-Session Store to be saved in Sequelize Model "Session"
const altSequelizeSessionStore = new SessionStoreConstructor({
  db, 
  table: 'session',
  extendDefaultFields: (defaults, sessionInstance) => ({
    data: defaults.data,
    expires: defaults.expires,
    userId: sessionInstance.userId
  })
});

// Express server app
const app = express();

// Body parsing middleware
app.use(express.json());
//app.use(express.urlencoded({extended: true}));

// Session Middleware Config
app.use(session({
  name: 'SID',
  secret:'iDKWhatAGoodSessionSecretIs',
  // Reduces concurrency issues by not resaving if you haven't changed session.
  resave: false,
  // True => If new, but not modified, still save (if legal)
  saveUninitialized: false,
  cookie: {maxAge: 5*60*60*1000}, //hr*(min/hr)*(s/min)*(ms/s)
  store: altSequelizeSessionStore
}));

// Session Logging Middleware
app.use((req, res, next) => {
  console.log(req.session)
  next()
})

// Static
app.use('/dist', express.static(path.join(__dirname, '..', '..', 'dist')));
//app.get('/', express.static(path.join(__dirname, '..', 'public')));

// Root/Home Route
app.get('/', (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
  } catch (err) {
    next(err)
  }
});

// API Routes
app.use('/api', require('./routes/api'));

// Sync DB Connection, then Seed, then Listen
async function listen() {
  await db.sync();
  console.log('DB synced!');
  app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
  })
};

if (doSeed) {
  seed().then(()=>listen());
} else {
  listen();
}