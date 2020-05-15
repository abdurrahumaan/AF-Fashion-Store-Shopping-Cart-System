var nodemailer = require("nodemailer");
exports.process = (req, res) => {
  if (
    !req.body.emailto ||
    !req.body.emailfrom ||
    !req.body.emailsub ||
    !req.body.emailtext
  ) {
    res.status(400).send({ message: "Params cannot be empty" });
    return;
  }

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "runtimersaf@gmail.com",
      pass: "sliitaf2020",
    },
  });

  var mailOptions = {
    from: req.body.emailfrom,
    to: req.body.emailto,
    subject: req.body.emailsub,
    text: req.body.emailtext,
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(500).send({
        message: "Something Wrong",
      });
    } else {
      res.status(200).send({
        message: "Email sent: " + info.response,
      });
    }
  });
};
