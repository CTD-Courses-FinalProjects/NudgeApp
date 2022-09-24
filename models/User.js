const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 50,
      },
      email: {
        type: String,
        required: [true, "Please provide email"], // field is required and there is error message
        match: [
          //match with regex
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please provide a valid email",
        ],
        unique: true, //creates a unique index
      },
      password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
      },
    },
    { timestamps: true }
    );

    UserSchema.pre("save", async function () {
      //create password hash
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    });

    UserSchema.methods.comparePassword = async function (candidatePassword) {
      const isMatch = await bcrypt.compare(candidatePassword, this.password)
      return isMatch
    }

    module.exports = mongoose.model("User", UserSchema);