const Doubt = require("../models/doubt");
const Answer = require("../models/doubtAnswer");

const loadSingleDoutbt = (req, res, next, id) => {
  Doubt.findOne({ _id: id })
    .populate("_userId", "username")
    .populate("answers", "answer")
    .populate({
      path: "answers",
      populate: {
        path: "_userId",
        model: "User",
        select: "username",
      },
    })
    .exec()
    .then((doc) => {
      if (!doc) {
        return res.status(400).json({
          error: "Cant load doubt",
        });
      }
      req.singleLoadedDoubt = doc;
      next();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        error: "Failed to load doubt",
        err,
      });
    });
};

const loadAnswer = (req, res, next, id) => {
  Answer.findById(id)
    .exec()
    .then((doc) => {
      if (!doc) {
        return res.status(400).json({
          error: "Can't load the answer",
        });
      }
      req.loadedAnswer = doc;
      next();
    });
};

const fs = require("fs");
const path = require("path");

const deleteDoubtImage = (req, res, next) => {
  const imageName = req.singleLoadedDoubt.screenShot;
  console.log(imageName);

  try {
    fs.unlinkSync(path.join(__dirname, "../uploads/" + imageName));
  } catch {}
  next();
};

module.exports = { loadSingleDoutbt, loadAnswer, deleteDoubtImage };
