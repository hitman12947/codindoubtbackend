const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getUserInfo = (req, res) => {
  res.status(200).json({
    _id: req.loadedUser._id,
    username: req.loadedUser.username,
    email: req.loadedUser.email,
  });
};

const loadUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "Auth failed",
        });
      }

      req.loadedUser = user;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: "Auth failed",
      });
    });
};

const signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errors: err.errors,
        message: "Error while creating your account",
      });
    });
};

const signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .exec()
    .then((user) => {
      if (user === null || !user.authenticate(password)) {
        return res.status(403).json({
          error: "Invalid data check your email and password",
        });
      }

      const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        token,
        user: {
          _id: user._id,
          email: user.email,
          username: user.username,
        },
      });
    });
};

module.exports = {
  signup,
  signin,
  getUserInfo,
  loadUserInfo,
};
