/**
 * By default its starting point is /auth
 * - /google
 * - /google/callback
 */
const authRouter = require("express").Router();

const oauthPassport = require("../utils/oauth");
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
    res.cookie("token", { path: "/", httpOnly: true, expires: "1h", sameSite: "none" });
    res.json({
      message: "User auth done",
      token: req.user.token,
      user: req.user.user,
      
    });
    // res.redirect("/profile");
  }
);

module.exports = authRouter;
