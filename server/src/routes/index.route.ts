import authRouter from "./auth.route";
/**
 * As of now the routes we handle here are
 *  /auth
 *  - /auth/google
 *  - /auth/google/callback
 * 
 *  /logout  
 *  /profile  
 */
const router = require("express").Router();

router.use("/auth", authRouter);
router.get("/profile", (req:any, res:any) => {
  console.log("user is ", req.user);
  res.send(`Welcome ${req.user}`);
});

// @ts-ignore
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

import { authenticateJWT } from '../utils/jwt';
// Example of a protected route
// @ts-ignore
router.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});


export default router;
