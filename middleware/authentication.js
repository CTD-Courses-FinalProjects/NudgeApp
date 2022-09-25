

const authenticateUser = (req, res, next) => {
  if (!req.user) {
    if (!req.session.messages) {
      req.session.messages = []
    }
    req.session.messages.push("You can't access that page before logon.")
    res.redirect('/')
  } else {
    next()
  }
}

const setCurrentUser = (req, res, next) => {
  res.locals.currentUser = req.user;
  next();
};

//this file protects the routes and the users can only see their jobs and not others 
module.exports = { authenticateUser, setCurrentUser };