const router = require("express").Router();
const {
  signup,
  signin,
  getUserInfo,
  loadUserInfo,
} = require("../controllers/users");
const { checkAuth } = require("../middlewares/checkAuth");

const {
  passwordCheck,
  usernameExistCheck,
  emailExistCheck,
} = require("../middlewares/Signupcheck");

router.post(
  "/signup",
  passwordCheck,
  usernameExistCheck,
  emailExistCheck,
  signup
);

router.post("/signin", signin);

router.get("/userInfo", checkAuth, loadUserInfo, getUserInfo);

module.exports = router;
