/**
 * By default its starting point is /auth
 * - /google
 * - /google/callback
 */

import { Router } from "express";

const authRouter = Router();

import oauthPassport from "../utils/oauth";
authRouter.get("/", (req, res) => {
  console.log("Route is hit for auth");
  res.json({
    message: "Route is hit for auth",
  });
});

authRouter.get(
  "/google",
  oauthPassport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/google/callback",
  oauthPassport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  (req, res) => {
    try {
      // To check the origin and based on that toggle the cookie option
      const isCrossOrigin =
        req?.headers?.origin &&
        req?.headers?.origin !== "http://localhost:5173";
        console.log('\n \n headers are', req.headers,'\n')
      const cookieSameSite = isCrossOrigin ? "none" : "lax";
      console.log("isCrossOrigin is ", isCrossOrigin);
      console.log("CookieSameSite is ", cookieSameSite);
      // @ts-ignore
      res.cookie("token", req?.user?.token, {
        path: "/",
        httpOnly: true,
        secure: true,
        maxAge: 5 * 60 * 1000,
        sameSite: "none",
        domain: "localhost",
      });
      
      // ⚠️ We can send the cookie as res if its an android or ios app
      // res.json({
      //   message: "User auth done",
      //   token: req.user.token,
      //   user: req.user.user,
      // });

    // This is the redirect to the frontend and it closes the popup its the frontend part
      res.redirect("http://localhost:5173/close");
    } catch (err) {
      console.log(err);
    }
  }
);

export default authRouter;
