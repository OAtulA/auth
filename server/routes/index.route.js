const authRouter = require("./auth.route");
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

router.get("/profile", (req, res) => {
  res.send(`Welcome ${req.user.displayName}`);
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

module.exports = router;
