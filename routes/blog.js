const router = require("express").Router();
const { createBlog, getAllBlogs } = require("../controllers/blog");
const { checkAuth } = require("../middlewares/checkAuth");
const { loadUserInfo } = require("../controllers/users");

router.get("/all", getAllBlogs);
router.post("/create", checkAuth, loadUserInfo, createBlog);

module.exports = router;
