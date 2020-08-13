const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("destination running");
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    // console.log("filename running");
    cb(null, uuidv4() + "." + file.originalname.split(".").pop());
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    // console.log("filter running");
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      cb(null, true);
    }
    return cb(null, false);
  },
  limits: {
    fileSize: 1024 * 1024,
  },
});

const checkFile = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      error:
        "Include Doubt Screenshot with valid image format only JPG / JPEG / PNG allowed",
    });
  }
  req.body.screenShot = req.file.filename;
  next();
};

module.exports = { upload, checkFile };
