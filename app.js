require("dotenv").config();
require("express-async-errors");
const favicon = require('serve-favicon')
const path = require('path')
const flash = require('connect-flash');

//extra security packages
// const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

//Express and EJS Layout
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const app = express();
app.use(expressLayouts);

//session and passport
const session = require("express-session");
const passport = require("passport");
const passport_init = require("./passport/passport_init");

//connectDB
const {connectDB, storeDB} = require('./db/connect')

// //middleware
const { authenticateUser, protectIndex, setCurrentUser } = require("./middleware/authentication");

// //routers
const eventRouter = require('./routes/events');
const authRouter = require("./routes/auth");
const render_index  = require("./routes/auth");

//error handler
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const { render_notFound } = require("./controllers/auth");


//connect to views
app.set("view engine", "ejs");

// Express body parser
app.use(express.urlencoded({ extended: true }));


//use the security packages
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 60 * 1000, // 15 minutes
    max: 60, // each IP is limited to make 100 requests per windowMs
  })
)
app.use(express.json());
// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//     defaultSrc: ["'self'"],
//     imgSrc: ["'self'"],
//     scriptSrc: ["'self'", "https://code.jquery.com/jquery-3.5.1.slim.min.js/"],
//     objectSrc: ["'none'"],
//     styleSrc: ["'self'", "https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js/", "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js/"],
//     upgradeInsecureRequests: [],
//   },
// }
// }));
app.use(cors());
app.use(xss());

//Use files from public folder
app.use(express.static('public'))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

//save the session in mongo
//validate env variables
const requiredEnvVars = ['SESSION_SECRET', 'MONGO_URI'];
requiredEnvVars.forEach((item) => {
  if (process.env[item] === undefined) { 
   throw new Error(`Required environment variable ${item} is missing`);
 }
});

//use session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: storeDB(process.env.MONGO_URI),
  })
);

//passport
passport_init();
app.use(passport.initialize());
app.use(passport.session());
app.use(setCurrentUser);

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//routes
app.get("/", protectIndex, render_index)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/events/", authenticateUser, eventRouter);
app.use("/not-found", render_notFound)
app.all('*', notFoundMiddleware);

//app.use();
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log("mongo connection error:- ", error);
  }
};

start();


//  <% messages.forEach((msg) =>{ %>
{/* <p><%= msg %></p>
<%})%> */}