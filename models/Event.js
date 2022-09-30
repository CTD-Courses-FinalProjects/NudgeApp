const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide event name"],
      maxlength: 50,
    },
    eventType: {
      type: String,
      enum: ["birthday", "wedding", "others"],
      required: [true, "Please select Event Type"],
      default: "birthday",
    },
    eventDate: {
      type: Date,
      required: [true, "Please provide event date"],
      default: new Date()
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
