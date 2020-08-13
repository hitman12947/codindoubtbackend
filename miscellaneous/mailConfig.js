const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "hackmania24x7@gmail.com",
    pass: "mrpwpdonphdhqfwh",
  },
});

module.exports = { transporter };
