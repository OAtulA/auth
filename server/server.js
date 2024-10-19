require("dotenv").config();

const express = require("express");
const passport = require("passport");
const session = require("express-session");

const app = express();

/**
 * To keep the code clean, we have created a function to call app.use()
 */
const appUseConfig = () => {
  console.log("app.use called");
  app.use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
appUseConfig();


const router = require("./routes/index.route");
app.get("/", (req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

app.use('/', router)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
