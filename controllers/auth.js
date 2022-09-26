const User = require("../models/User");

const render_index = (req, res) => {
  console.log(req.session)
  let messages = [];
  if (req.session.messages) {
    messages = req.session.messages;
  }
    req.session.messages = [];
  res.render("pages/index", { messages });
};

const render_signup = (req, res) => {
  console.log(req.body)
  let messages = [];
  if (req.session.messages) {
    messages = req.session.messages;
  }
    req.session.messages = [];
  res.render("pages/register", { messages });
};

const render_login = async (req, res) => {
  console.log("I am here", req.session)
  console.log(req.session.messages, "Messages")

  let messages = [];
  if (req.session.messages) {
    messages = req.session.messages;
  }
  req.session.messages = [];
  res.render('pages/login', {messages})
};

const render_restricted = (req, res) => {
  let messages = [];
  if (req.session.messages) {
    messages = req.session.messages;
  }
  req.session.messages = [];
  res.render("pages/dashboard", {messages} );
};

const register = async (req, res, next) => {
  const {name, email, password} = { ...req.body };

  try {
    await User.create({
      name: name,
      email: email,
      password: password,
    });
    res.redirect("/login");
  } catch (err) {
    return next(err);
  }
};

const log_out = (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

module.exports = {
  render_index,
  render_signup,
  register,
  render_login,
  log_out,
  render_restricted,
};
