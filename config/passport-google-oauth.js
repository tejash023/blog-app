const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

const User = require('../models/user');

//tell passport to use new starategy for google login
passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALL_BACK_URL,
    
  },
  
  function(accessToken, refreshToken, profile, done){
    
    //find a user
    User.findOne({email: profile.emails[0].value}).exec(function(err, user){
      if(err){console.log('Error in Google starategy passport',err); return;}
      // console.log(profile);
      // console.log(user);

      if(user){
        //if found, set this user as req.user
        return done(null, user);
      }else{
        //if not found, create the user and set it as req.user
        User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString('hex')
        }, function(err, user){
          if(err){console.log('error in creating the user google strategy', err); return;}
          //console.log("User", user);
          return done(null, user);
        })
      }
    });
  }

));

module.exports = passport;