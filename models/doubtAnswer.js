const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    _doubtId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doubts",
      required: true,
    },
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);
