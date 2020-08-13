const { transporter } = require("../miscellaneous/mailConfig");

const sendContactMail = (req, res) => {
  const mailOptions = {
    from: "hackmania24x7@gmail.com",
    to: "hackmania24x7@gmail.com",
    subject: req.body.purpose,
    html: `<div>
    <h3>My Name : ${req.body.name}</h3>
    <h3>My Email : ${req.body.email}</h3>
    <p>My Purpose : ${req.body.purpose}</p>
    </div>`,
  };

  transporter
    .sendMail(mailOptions)
    .then(() => {
      res.status(200).json({
        message: "Request Send Successfully",
      });
    })
    .catch(() => {
      //   console.log(err);
      res.status(400).json({
        error: "Unable to send mail",
        // err,
      });
    });
};

module.exports = {
  sendContactMail,
};
