const router = require("express").Router();

const {
  checkAuth,
  checkIsUserAuthorize,
  checkIsUserAuthorizeToUpdateAnswer,
} = require("../middlewares/checkAuth");

const {
  answerPost,
  deleteAnswer,
  updateSingleAnswer,
  updateDoubtAnswers,
} = require("../controllers/answerDoubts");

const {
  askdoubt,
  getAllDoubts,
  getSingleDoubt,
  getSingleUserAnswered,
  getSingleUserDoubts,
  deleteDoubt,
} = require("../controllers/doubt");

const {
  loadSingleDoutbt,
  loadAnswer,
  deleteDoubtImage,
} = require("../middlewares/doubt");
const { upload, checkFile } = require("../middlewares/HandleImageUpload");

router.param("doubtId", loadSingleDoutbt);
router.param("answerId", loadAnswer);

router.get("/alldoubts", getAllDoubts);
router.get("/alldoubts/:doubtId", getSingleDoubt);

router.get("/myDoubts/:userId", checkAuth, getSingleUserDoubts);

// post a answer

router.post("/answerDoubt/:doubtId", checkAuth, answerPost, updateDoubtAnswers);

// ask doubt or post a doubt

router.post(
  "/askDoubt",
  checkAuth,
  upload.single("doubtScreenShot"),
  checkFile,
  askdoubt
);

// delete an answer

router.delete(
  "/delete/:userId/:doubtId/:answerId",
  checkAuth,
  checkIsUserAuthorizeToUpdateAnswer,
  deleteAnswer
);

router.delete(
  "/deleteDoubt/:doubtId",
  checkAuth,
  checkIsUserAuthorize,
  deleteDoubtImage,
  deleteDoubt
);

// update an answer

router.put(
  "/updateAnswer/:userId/:doubtId/:answerId",
  checkAuth,
  checkIsUserAuthorizeToUpdateAnswer,
  updateSingleAnswer
);

// TODO: not optimized under Beta not include in production

router.get("/myAnswered/:userId", checkAuth, getSingleUserAnswered);

module.exports = router;
