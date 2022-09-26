const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  render_index, 
  render_signup,
  register,
  render_login, 
  log_out, 
  render_restricted
} = require("../controllers/auth");
const {authenticateUser} = require("../middleware/authentication")


router.route("/").get(render_index);
router.route("/dashboard").get(authenticateUser, render_restricted);
router.route("/register").get(render_signup).post(register);
router.route("/login").get(render_login).post(
  passport.authenticate("local", {
    successRedirect: "/api/v1/auth/dashboard",
    failureRedirect: "/api/v1/auth/login",
    failureMessage: true,
    failureFlash : true
})
);
router.route("/log-out").get(log_out);

module.exports = router;
