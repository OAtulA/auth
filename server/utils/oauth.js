const passport = require("passport");
const jwt = require("jsonwebtoken");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:3000/auth/google/callback",
    },
    //   (accessToken, refreshToken, profile, done) => {
    //     return done(null, profile);
    //   }
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
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
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
passport.deserializeUser((user, done) => done(null, user));

const oauthPassport = passport;
module.exports = oauthPassport;
