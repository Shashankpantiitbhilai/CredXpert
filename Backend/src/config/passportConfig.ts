// src/config/passportConfig.ts
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import dotenv from 'dotenv';
import User from '../models/user.js'; // Adjust the import path according to your project structure

dotenv.config();

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    User.authenticate() // Assuming User has authenticate method
  )
);

passport.serializeUser((user: any, done: Function) => {
  done(null, user._id); // Store user ID in the session
});

passport.deserializeUser(async (id: string, done: Function) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
