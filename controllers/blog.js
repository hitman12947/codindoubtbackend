const Blog = require("../models/blog");

const createBlog = (req, res) => {
  const user = req.loadedUser;
  if (!user.isAdmin) {
    res.status(200).json({
      user: user.isAdmin,
    });
  }
  const blog = new Blog(req.body);
  blog
    .save()
    .then((b) => {
      res.status(201).json({
        message: "Blog Created",
        blog: b,
      });
    })
    .catch((err) => {
      res.status(400).json({
        error: "Unable to create blog",
        err,
      });
    });
};

const getAllBlogs = (req, res) => {
  Blog.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(400).json({
        error: "Unable to fetch blogs",
        err,
      });
    });
};

module.exports = { createBlog, getAllBlogs };
