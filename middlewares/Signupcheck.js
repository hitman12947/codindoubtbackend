const User = require("../models/user");

const passwordCheck = (req, res, next) => {
  if (req.body.password.length < 6) {
    return res.status(400).json({
      error: "Password length atleast 6",
    });
  }
  next();
};

const usernameExistCheck = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then((doc) => {
      if (doc.length > 0) {
        return res.status(400).json({
          error: "Username Already Exists",
        });
      }
      next();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: "SOmething went wrong",
        err: err,
      });
    });
};
const emailExistCheck = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((doc) => {
      if (doc.length > 0) {
        return res.status(400).json({
          error: "Email Already Exists",
        });
      }
      next();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: "SOmething went wrong",
        err: err,
      });
    });
};
module.exports = {
  passwordCheck,
  usernameExistCheck,
  emailExistCheck,
};
