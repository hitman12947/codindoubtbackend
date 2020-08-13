const router = require("express").Router();
const { sendContactMail } = require("../controllers/other");

router.post("/sendContactMail", sendContactMail);

module.exports = router;
