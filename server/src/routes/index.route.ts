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

import { Request, Response } from "express";

router.use("/auth", authRouter);
router.get("/profile", (req:any, res:any) => {
  console.log("user is ", req.user);
  res.send(`Welcome ${req.user}`);
});

router.get("/logout", (req:Request, res: Response) => {
  req.logout(() => {
    // clear the token from the cookie
    res.clearCookie("token");
    res.redirect("/");
  });
});

import { authenticateJWT } from '../utils/jwt';
// Example of a protected route
router.get('/protected', authenticateJWT, (req:Request, res:Response) => {
  res.json({ message: "This is a protected route", user: req?.user });
});


export default router;
