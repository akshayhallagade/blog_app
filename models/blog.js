const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;