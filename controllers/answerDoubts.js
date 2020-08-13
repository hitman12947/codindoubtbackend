const AnswerDoubts = require("../models/doubtAnswer");
const Doubt = require("../models/doubt");

const answerPost = (req, res, next) => {
  const answer = new AnswerDoubts({
    _userId: req.user._id,
    _doubtId: req.params.doubtId,
    answer: req.body.answer,
  });

  answer
    .save()
    .then((doc) => {
      req.body.answer = doc;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Unable to post answer",
        err,
      });
    });
};

const updateDoubtAnswers = (req, res) => {
  const doubtId = req.params.doubtId;
  Doubt.updateOne({ _id: doubtId }, { $push: { answers: req.body.answer._id } })
    .then((doc) => {
      res.status(203).json({
        message: "Doubt updated",
        doc,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "Unable to post answer",
        err,
      });
    });
};

const deleteAnswer = (req, res) => {
  console.log("im in delete function");
  AnswerDoubts.deleteOne({ _id: req.params.answerId })
    .exec()
    .then(() => {
      Doubt.updateOne(
        { _id: req.params.doubtId },
        { $pull: { answers: req.params.answerId } }
      )
        .exec()
        .then(() => {
          res.status(200).json({
            message: "Answer Deleted",
          });
        })
        .catch((err) => {
          res.status(400).json({
            error: "Some occures",
            err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        err,
        error: "Unable to delete answer",
      });
    });
};

const updateSingleAnswer = (req, res) => {
  const answerId = req.params.answerId;
  AnswerDoubts.updateOne(
    { _id: answerId },
    { $set: { answer: req.body.answer } }
  )
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Answer Updated",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        error: "Can't update the answer",
      });
    });
};

module.exports = {
  answerPost,
  updateDoubtAnswers,
  deleteAnswer,
  updateSingleAnswer,
};
