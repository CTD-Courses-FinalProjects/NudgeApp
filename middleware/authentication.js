

const authenticateUser = (req, res, next) => {
  // console.log("Auth", req.isAuthenticated())
  if (!req.user) {
    if (!req.session.messages) {
      req.session.messages = []
    }
    // req.session.messages.push("You can't access that page before logon.")
    req.flash('error_msg', 'Please log in to view that page');
    res.redirect('/')
  } else {
    next()
  }
};

const protectIndex = (req, res, next) => {
  if(req.user) {
    req.flash('error_msg', 'You are already logged-in');
    res.redirect('/api/v1/auth/dashboard')
  } else {
    next()
  }
}

const setCurrentUser = (req, res, next) => {
  res.locals.currentUser = req.user;
  next();
};

//this file protects the routes and the users can only see their jobs and not others 
module.exports = { authenticateUser, protectIndex, setCurrentUser };