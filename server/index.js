const express = require('express');
const path = require('path');
const db = require('./db');
const session = require('express-session');
const passport = require('passport');

const app = express();


// general purpose middleware
app.use(morgan('dev'));
app.use(require('./middleware/logging'));
app.use(require('./middleware/body-parsing'));
app.use(express.static(path.join(__dirname, '../public')));

// configure and create our database store
// store session information on postgres database to restart without interrupting users
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

dbStore.sync();

// session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: false
}));

// initialize passport
// consume req.session object and attach the user to the request object
app.use(passport.initialize());
app.use(passport.session());

// serve api routes
app.use('/api', require('./apiRoutes')); // matches all requests to /api

// serve index.html for all non-api routes
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// error handling
app.use(require('./middleware/error'));

// process.env.PORT for deploying to Heroku or 3000 for local
const port = process.env.PORT || 3000; 

// sync our database
db.sync() 
  .then(function(){
  	// then start listening with our express server once we have synced
    app.listen(port , function () {
	  console.log("Knock, knock");
	  console.log("Who's there?");
	  console.log(`Your server, listening on port ${port}`);
	}) 
  });