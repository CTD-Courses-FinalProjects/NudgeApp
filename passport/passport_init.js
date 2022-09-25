const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const passport_init = () => {
  //setting up the LocalStrategy
  //function acts a bit like a middleware and will be called for us when we ask passport to do the authentication later.
  passport.use(
    new LocalStrategy((username, password, done) => {
      console.log(username, password, "Credentials");

      User.findOne({ email: username }, (err, user) => {
        //compare email
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }
        //compare password
        user.comparePassword(password, (err, isPasswordCorrect) => {
          if (err) throw err;
          if (!isPasswordCorrect) {
            return done(null, false, {  message: 'Password incorrect'  });
          }else {
          return done(null, user);
          }
        });
      });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

module.exports = passport_init;
