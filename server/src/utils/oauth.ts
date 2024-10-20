import passport from "passport";
import jwt from "jsonwebtoken";

const GoogleStrategy = require("passport-google-oauth20").Strategy;

import User from "../models/User.model";
import { GOOGLE_CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET } from "./config";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL:
        GOOGLE_CALLBACK_URL ||
        "http://localhost:3000/auth/google/callback",
    },
    //   (accessToken, refreshToken, profile, done) => {
    //     return done(null, profile);
    //   }
    // @ts-ignore
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
          }).save();
        }
        // Create a JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, {
          expiresIn: "1h",
        });
        done(null, { token, user });
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => done(null, user as typeof User | null));
const oauthPassport = passport;
export default oauthPassport;
