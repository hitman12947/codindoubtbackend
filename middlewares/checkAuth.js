const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Auth Failed",
    });
  }
};

const checkIsUserAuthorize = (req, res, next) => {
  if (req.user._id == req.singleLoadedDoubt._userId._id) {
    next();
  } else {
    return res.status(400).json({
      error: "You are not authorized to delete this answer",
    });
  }
};

const checkIsUserAuthorizeToUpdateAnswer = (req, res, next) => {
  if (req.user._id == req.loadedAnswer._userId) {
    next();
  } else {
    res.status(400).json({
      error: "You are not authorized to delete this answer",
    });
  }
};

module.exports = {
  checkAuth,
  checkIsUserAuthorize,
  checkIsUserAuthorizeToUpdateAnswer,
};
