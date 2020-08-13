require("dotenv").config();

// core modules

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
// routes

const user = require("./routes/users");
const doubt = require("./routes/doubt");
const blog = require("./routes/blog");
const other = require("./routes/other");

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DATABASE CONNECTED"))
  .catch((err) => console.log(err));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/uploads", express.static("uploads"));
app.use(express.static("dist"));

app.use("/api/v1/user", user);
app.use("/api/v1/doubt", doubt);
app.use("/api/v1/other", other);
app.use("/api/v1/blog", blog);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

module.exports = app;
