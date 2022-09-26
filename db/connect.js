const mongoose = require('mongoose')
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session)


//to store the session data in Mongo db
const storeDB = (url) => {

 const store = new MongoDBStore({
  uri: url,
  collection: 'sessions'
});
// Catch errors
store.on('error', function (error) {
  console.log("error while storing the session:- ", error);
});
return store;
}

const connectDB = (url) => {
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
// const db = mongoose.connection(url, { 
//   useUnifiedTopology: true, 
//   useNewUrlParser: true 
// });
// // Catch errors
db.on("error", console.error.bind(console, "mongo connection error"));
return db;
}

module.exports = {connectDB, storeDB}
