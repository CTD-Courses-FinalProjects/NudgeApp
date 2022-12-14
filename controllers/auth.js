const User = require("../models/User");

const render_index = (req, res) => {
  res.render("pages/index");
};

const render_notFound = (req, res) => {
const url = req.query.page;
  res.render("pages/not-found", {url})
}
const render_signup = (req, res) => {
  res.render("pages/register");
};

const render_login = async (req, res) => {
  res.render("pages/login");
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
    res.redirect("/api/v1/auth/login");
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
  render_notFound,
};
