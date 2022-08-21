const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const BlogPost = require('../models/blogpost');
const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  function(email, password, done){
    //find a user and establish a connection
    User.findOne({email: email}, function(err, user){
      if(err){console.log('Error finding the user -----> Passport'); return done(err);}

      if(!user || user.password != password){
        console.log('Invalid Username/Password ---> Passport');
        return done(null, false);
      }

      return done(null, user);
    });
  }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser((user, done) => {
  done(null, user.id);
})

//de-serializing the user from the key in the cookies
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if(err){console.log('Error finding the user ----> Passport'); return done(err);}

    return done(null, user);
  })
})

//check if user is authenticated
passport.checkAuthetication = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }

  // if the user is not signed in
  return res.redirect('/login');
}

//if the user is logged in - making the user data available in the local i.e assets - css/html
passport.setAuthenticatedUser = (req, res, next) => {
  if(req.isAuthenticated()){
    res.locals.user = req.user;
  }

  next();
}


module.exports = passport;