const express = require("express");
const app = express();
const port = 3000;
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

/*


*/

app.use(
  cors({ origin: "https://eilatbackend.vercel.app", methods: ["POST", "GET"] })
);
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  const isAddress =
    req.body.address === "" ? "" : `\nכתובת: ${req.body.address}`;
  let mailOptions = {
    from: "yuval.poliak5@gmail.com",
    to: "yuval.poliak5@gmail.com",
    subject: "בור חדש התגלה",
    text: `שם השולח: ${req.body.name}\n${isAddress}\nבזמן: ${req.body.time}\n פרטי מיקום:\nקו רוחב: ${req.body.position.latitude}\nקו אורך: ${req.body.position.longitude}`,
    attachments: [
      {
        filename: req.body.img.filePath,
        path: req.body.img.webviewPath,
      },
    ],
  };
  //console.log(req.body);
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
  res.status(200).json({ success: "yaaaa" });
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});

module.exports = app;
