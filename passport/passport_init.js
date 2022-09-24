const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const passport_init = () => {
 //setting up the LocalStrategy
//function acts a bit like a middleware and will be called for us when we ask passport to do the authentication later.
passport.use(
    new LocalStrategy((email, password, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const isPasswordCorrect = async () => {return await user.comparePassword(password)};
        if(!isPasswordCorrect){
            return done(null, false, { message: "Incorrect password" });
          }
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