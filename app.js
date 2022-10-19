// BASE SETUP
// =============================================================================
const express = require('express');
var app = express();
const http = require('http');
//  CONFIG
const config = require('./config/default.json');

require('dotenv').config();
app.use(express.json());
var cors = require('cors');

const session = require('express-session');

let whitelist = ['http://localhost:4201', 'https://quizangularapp.web.app'];
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true,
  preflightContinue: false,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Total-Count', 'x-access-token',
    'Content-Range', 'Access-Control-Allow-Methods', '*'],
  methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
};
app.use(cors(corsOptions));

const uuid = require('uuid').v4;
// const MongoStore = require('connect-mongo');
// const sess = {
//   key: config.cookie.name,
//   secret: config.app.secret,
//   // cookie: {
//   //   domain: config.cookie.domain,
//   //   path: config.cookie.path,
//   //   maxAge: config.cookie.validity * 1000,
//   //   httpOnly: false,
//   // },
//   resave: false,
//   saveUninitialized: true,
//   // store: store,
//   store: MongoStore.create({
//     mongoUrl: process.env.MONGO_URL ? process.env.MONGO_URL : config.db.mongodb_session_store_url + config.db.session_db_name + config.db.session_db_options,
//     ttl: config.cookie.validity,
//     autoRemove: 'native', // Default
//   }),
//   name: config.cookie.name,
//   genid: function () {
//     return uuid() // use UUIDs for session IDs
//   },
// };
// app.use(session(sess));

// Routes
const allRoutes = require('./routes');
app.use(config.app.prefix, allRoutes);

const hostname = '127.0.0.1';
const port = 2000;
//  START THE SERVER
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app // for testing