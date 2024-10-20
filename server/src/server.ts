require("dotenv").config();

import express from "express";
import cookieparser from "cookie-parser";
import passport from "passport";
// const session = require("express-session");

const app = express();
import { connect } from "mongoose";

import cors from "cors";

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
  const corsOrigin =["http://localhost:3000","http://localhost:5173", "http://localhost:3002", "http://127.0.0.1:5500","*"]
  app.use(cors({origin:corsOrigin, credentials: true}));
  app.use(cookieparser())
  app.use(passport.initialize());
  // app.use(passport.session());
};
appUseConfig();


const MONGO_URI: string = process.env.MONGO_URI as string;
const connectDB =()=> connect(MONGO_URI,).then((val)=>
  console.log("Our db is connected")
).catch((err)=>{
  console.error('We could not connect to db')
  process.exit(1)
});

connectDB()


import router from "./routes/index.route";

app.get("/", (_req, res) => {
  res.send("<a href='/auth/google'>Login with Google</a>");
});

app.use('/', router)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
