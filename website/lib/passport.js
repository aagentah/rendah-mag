import crypto from 'crypto';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import { findUserByUsername } from './sanity/user';

passport.serializeUser((user, done) => {
  // serialize the username into session
  done(null, user.username);
});

passport.deserializeUser((req, id, done) => {
  // deserialize the username back into user object
  const user = findUserByUsername(req, id);
  done(null, user);
});

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      // Here you lookup the user in your DB and compare the password/hashed password
      const user = await findUserByUsername(req, username);

      // User doesn't exist
      if (Object.keys(user).length === 0 && user.constructor === Object) {
        done(null, null);
      }

      let passwordsMatch = false;

      if (password.includes(':')) {
        // If already hashed per login (IE forgot password email)
        const fields = password.split(':');
        const salt = fields[0];
        const hash = fields[1];

        passwordsMatch = salt === user.salt && hash === user.hash;
      } else {
        // Security-wise, if you hashed the password earlier, you must verify it
        const hash = crypto
          .pbkdf2Sync(password, user.salt, 1000, 64, 'sha512')
          .toString('hex');

        passwordsMatch = user.hash === hash;
      }

      if (!user || !passwordsMatch) {
        done(null, null);
      } else {
        done(null, user);
      }
    },
  ),
);

export default passport;
