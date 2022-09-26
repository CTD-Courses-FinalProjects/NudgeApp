const User = require("../models/User");

const render_index = (req, res) => {
  res.render("pages/index");
};

const render_signup = (req, res) => {
  let messages = [];
  if (req.session.messages) {
    messages = req.session.messages;
  }
  req.session.messages = [];
  res.render("pages/register", { messages });
};

const render_login = async (req, res) => {
  res.render("pages/login");
};

const render_restricted = (req, res) => {
  let messages = [];
  if (req.session.messages) {
    messages = req.session.messages;
  }
  req.session.messages = [];
  res.render("pages/dashboard", { messages });
};

const register = async (req, res, next) => {
  const { name, email, password } = { ...req.body };
  try {
    await User.create({
      name: name,
      email: email,
      password: password,
    });
    req.flash("success_msg", "You are now registered and can log in");
    res.redirect("/login");
  } catch (err) {
    return next(err);
  }
};

const log_out = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
  req.flash('success_msg', 'You are logged out');
  res.redirect("/")
  })
  // req.session.destroy(function (err) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   res.redirect("/");
  // });
};

module.exports = {
  render_index,
  render_signup,
  register,
  render_login,
  log_out,
  render_restricted,
};
