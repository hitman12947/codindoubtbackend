const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  links: [String],
  comments: [
    {
      author: mongoose.Schema.Types.ObjectId,
      ref: "User",
      type: String,
    },
  ],
  photo: String,
});

module.exports = mongoose.model("Blog", blogSchema);
