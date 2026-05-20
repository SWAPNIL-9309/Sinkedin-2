const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  title: {
    type: String,
    required: true
  },

  story: {
    type: String,
    required: true
  },

  lesson: {
    type: String,
    required: true
  },

 likes: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
]

}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);