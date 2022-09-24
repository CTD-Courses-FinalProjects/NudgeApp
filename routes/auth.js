const express = require("express");
const router = express.Router();

const {
  render_index, 
  render_signup,
  register, 
  login,
  render_login, 
  log_out, 
  render_restricted
} = require("../controllers/auth");

router.route("/").get(render_index);
router.route("/dashboard").get(render_restricted);
router.route("/register").get(render_signup).post(register);
router.route("/login").get(render_login).post(login);
router.route("/log-out").get(log_out);

module.exports = router;
