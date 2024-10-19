require("dotenv").config();

const express = require("express");
const cookieparser = require("cookie-parser");
const passport = require("passport");
// const session = require("express-session");

const app = express();
const { connect } = require("mongoose");

const cors = require("cors");

/**
 * To keep the code clean, we have created a function to call app.use()
 */
const appUseConfig = () => {
  console.log("app.use called");
  // app.use(
  //   session({
  //     secret: "secret",
  //     resave: false,
  //     saveUninitialized: true,
  //   })
  // );
  app.use(express.json())
  app.use(express.urlencoded({extended:true}))
  app.use(cors({origin:["http://localhost:3000","http://localhost:5173", "http://localhost:3002","*"], credentials: true}));
  app.use(cookieparser())
  app.use(passport.initialize());
  // app.use(passport.session());
};
appUseConfig();

const connectDB =()=> connect(process.env.MONGO_URI,).then((val)=>
  console.log("Our db is connected")
).catch((err)=>{
  console.error('We could not connect to db')
  exist(1)
});

connectDB()


const router = require("./routes/index.route");

app.get("/", (_req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

app.use('/', router)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
