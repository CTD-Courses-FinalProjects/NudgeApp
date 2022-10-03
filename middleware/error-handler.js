const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    //set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };
//instead of sending object for missing email and password we are only sending one line message
  if(err.name === "ValidationError") { 
    console.log(Object.values(err.errors))
    customError.msg =Object.values(err.errors)
    .map(item => item.message).join(', ')
      customError.statusCode = 400;
  }

  //Error for Duplicate email registration
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate!! ${Object.keys(err.keyValue)} already exists in our system. Please choose another value`;
        customError.statusCode = 400;
  }

  //Errors when ids not match the modal.
  if (err.name === 'CastError') {
    customError.msg = `No item found with id : ${err.value._id}`
    customError.statusCode = 404
  }

  req.flash("error",[customError.msg] )
  req.session.messages = [customError.msg];
  return res.redirect(req.session.backURL || "back");
};

module.exports = errorHandlerMiddleware;