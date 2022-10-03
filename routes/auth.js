const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  render_index,
  render_signup,
  register,
  render_login,
  log_out,
  render_notFound,
} = require("../controllers/auth");


router.route("/").get(render_index);
router.route("/not-found").get(render_notFound)
router.route("/register").get(render_signup).post(register);
router.route("/login").get(render_login).post(
  passport.authenticate("local", {
    successRedirect: "/api/v1/events/dashboard",
    failureRedirect: "/api/v1/auth/login",
    failureMessage: true,
    failureFlash : true
})
);
router.route("/log-out").get(log_out);

module.exports = router;
