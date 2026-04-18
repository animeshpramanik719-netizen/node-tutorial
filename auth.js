const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./person');

// Local Strategy Authentication
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log('Received username:', username);

      const user = await Person.findOne({ username: username });

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      const isPasswordMatch = user.password === password;

      if (isPasswordMatch) {
        return done(null, user); // Login success
      } else {
        return done(null, false, { message: 'Incorrect password' });
      }

    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;