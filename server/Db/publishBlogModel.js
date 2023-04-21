const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    fImage: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const PublishBlog = mongoose.model("publishBlog", blogSchema);

module.exports = PublishBlog;
