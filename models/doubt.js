const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Answer",
    },
  ],
  language: String,
  acceptedAnswer: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  screenShot: {
    type: String,
    default: null,
  },
  code: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Doubts", doubtSchema);
