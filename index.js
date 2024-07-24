const express = require("express");
const app = express();
const port = 3000;
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();
//const fileUpload = require("express-fileupload");

const local = "http://localhost:5173/";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET"],
  })
);

app.use(express.json());
app.use(express.static("public"));
//app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

app.post("/", (req, res) => {
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
      console.log("error ", err);
      res.status(400).json(err);
    } else {
      res.status(200).json({ success: "yaaereraae" });
    }
  });
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});

module.exports = app;
