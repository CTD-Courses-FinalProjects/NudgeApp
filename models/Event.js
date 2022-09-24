const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    eventType: {
      type: String,
      enum: ["birthday", "wedding", "other"],
      default: "birthday",
    },
    name: {
      type: String,
      required: [true, "Please provide event name"],
      maxlength: 50,
    },
    date: {
      type: Date,
      required: [true, "Please provide event date"],
      default: Date.now
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
