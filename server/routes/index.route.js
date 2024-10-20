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
  console.log("user is ", req.user);
  res.send(`Welcome ${req.user}`);
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

const {authenticateJWT} = require('../utils/jwt')
// Example of a protected route
router.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});


module.exports = router;
