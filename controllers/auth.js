const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const render_index = (req, res) => {
  let messages = [];
  if (req.session.messages) {
    messages = req.session.messages;
    req.session.messages = [];
  }
  res.render("pages/index", { messages });
};

const render_signup = (req, res) => {
  let messages = [];
  if (req.session.messages) {
    messages = req.session.messages;
    req.session.messages = [];
  }
  res.render("pages/register", { messages });
};

const register = async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await User.create({ ...req.body });
  try {
    await User.create({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });
    res.redirect("/dashboard");
  } catch (err) {
    return next(err);
  }
};

const render_login = async (req, res) => {
  res.render('pages/login')
};

const login = async (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureMessage: true,
  })(req, res, next);
};

const log_out = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

const render_restricted = (req, res) => {
  if (!req.session.pageCount) {
    req.session.pageCount = 1;
  } else {
    req.session.pageCount++;
  }
  res.render("pages/dashboard", { pageCount: req.session.pageCount });
};

module.exports = {
  render_index,
  render_signup,
  register,
  login,
  render_login,
  log_out,
  render_restricted,
};
