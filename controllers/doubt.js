const Doubt = require("../models/doubt");
const Answer = require("../models/doubtAnswer");

const askdoubt = (req, res) => {
  const doubt = new Doubt(req.body);
  doubt._userId = req.user._id;

  doubt
    .save()
    .then((doc) => {
      res.status(201).json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: "Not able to post doubt",
        err,
      });
    });
};

const getSingleDoubt = (req, res) => {
  res.status(200).json(req.singleLoadedDoubt);
};

const getAllDoubts = (req, res) => {
  Doubt.find()
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
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        docs,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Server error",
      });
    });
};

const getSingleUserDoubts = (req, res) => {
  const userId = req.params.userId;
  Doubt.find({ _userId: userId })
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
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        docs,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Cant load your doubts",
        err,
      });
    });
};

//TODO: not optimised have to optimised

const getSingleUserAnswered = (req, res) => {
  const userId = req.user._id;
  Doubt.find()
    .select("answers")
    .populate("answers")
    .populate({
      path: "answers",
      populate: {
        path: "_doubtId",
        model: "Doubts",
      },
    })
    .exec()
    .then((docs) => {
      if (docs.length > 0) {
        const myAnswered = [];
        docs.forEach((doc) => {
          if (doc.answers.length > 0) {
            doc.answers.forEach((ans) => {
              // console.log(ans._userId == userId);
              if (ans._userId == userId) {
                myAnswered.push(ans._doubtId);
              }
            });
          }
        });

        res.status(200).json({
          finalAnswers: myAnswered.filter((el, pos) => {
            return myAnswered.indexOf(el) == pos;
          }),
        });
      }
    })
    // return res.status(200).json({
    //   totalAnswered: docs.length,
    //   docs,
    // });

    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: "Cant find your answered",
        err,
      });
    });
};

const deleteDoubt = (req, res) => {
  Answer.deleteMany({ _doubtId: req.singleLoadedDoubt._id })
    .exec()
    .then(() => {
      Doubt.deleteOne({ _id: req.singleLoadedDoubt._id })
        .exec()
        .then(() => {
          res.status(200).json({
            message: "Doubt Deleted succesfully",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json({
            err,
            error: "Unble to delete answers",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({
        error: "Unable to delete",
        err,
      });
    });
};

module.exports = {
  askdoubt,
  getAllDoubts,
  getSingleDoubt,
  getSingleUserDoubts,
  getSingleUserAnswered,
  deleteDoubt,
};
