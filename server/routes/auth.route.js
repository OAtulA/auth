
/**
 * By default its starting point is /auth  
 * - /google
 * - /google/callback
 */
const authRouter = require("express").Router();

const oauthPassport = require("../utils/oauth");
authRouter.get('/', (req, res)=>{
  console.log("Route is hit for auth")
  res.json({
    message: "Route is hit for auth"
  })
})

authRouter.get(
  "/google",
  oauthPassport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  oauthPassport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

module.exports = authRouter;
