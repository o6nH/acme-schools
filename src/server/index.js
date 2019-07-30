const db = require('./db');
const morgan = require('morgan')
const express = require('express');
const path = require('path');
const seed = require('./db/seed');
const session = require('express-session');
const createSessionStore = require('connect-session-sequelize');

// Port assignment
const port = process.env.PORT || 3000;
const doSeed = process.env.DO_SEED || true;

// Session Store Constructor 
const SessionStoreConstructor = createSessionStore(session.Store);

// Sequelize "Session" Model/Store to be used as Express-Session Store (req.sesssion === db.session)
const altSequelizeSessionStore = new SessionStoreConstructor({
  db, 
  table: 'session',
  extendDefaultFields: (defaults, session) => ({
    data: defaults.data,
    expires: defaults.expires,
    userId: session.userId
  })
});

// Express server app
const app = express();

// Logging Middleware
app.use(morgan('dev'));

// Body Parsing Middleware
app.use(express.json());
//app.use(express.urlencoded({extended: true}));

// Session Middleware Config
app.use(session({
  //db.session.sid = req.session.id = session.genid(req)
  name: 'SID', 
  //{set-cookie:`'${session.name}=${signCookie(req.session.id, session.secret)}'`}===req.cookies.SID
  secret:'iDKWhatAGoodSessionSecretIs',
  //Reduces concurrency issues by not resaving if you haven't changed session.
  resave: false,
  //True => If new, but not modified, still save (if legal)
  saveUninitialized: false,
  cookie: {maxAge: 5*60*60*1000}, //req.session.cookie.expires = date(now+hr*(min/hr)*(s/min)*(ms/s))
  store: altSequelizeSessionStore
}));

// Session Logging Middleware
app.use((req, res, next) => {
  console.log('req.headers.cookie: ', req.headers.cookie);
  console.log('req.session.id: ', req.session.id);
  console.log('req.session.cookie: ', req.session.cookie);
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