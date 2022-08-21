//require express 
const express = require('express');
const { ConnectionCreatedEvent } = require('mongodb');

//declaring port
const port = 8080;

//require mongoose
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

//require model
const BlogPost = require('./models/blogpost');
const User = require('./models/user');


//instantiate the express into constant app
const app = express();
app.use(expressLayouts);

//extract styles and scripts from layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine','ejs');
app.set('views', './views');

//middleware to use assets
app.use(express.static('assets'));

//middleware to parse the post request
app.use(express.urlencoded());

//mongo store is used to store a session cookie
app.use(session({
  name: 'blog',
  secret: 'tejashwarajvardhan',
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({
    mongoUrl:'mongodb://localhost/blog_post_db',
  }),
  cookie: {
    maxAge: (1000 * 60 * 100)
  },

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


//use express route
app.use('/', require('./routes'));


//starting server
app.listen(port, function(err){
  if(err){
    console.log(`Error in running the server: ${err}`);
  }
  console.log(`Server is running successfully on port ${port}`);
})



