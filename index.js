const express = require("express");
const app = express();
const port = 3000;
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
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

app.all("*", function (req, res, next) {
  var origin = req.get("origin");
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

var cors = require("cors");
app.use(cors());
app.use(bodyParser({ limit: "50mb" }));
app.use(express.json());
//app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

//s

app.post("/", async (req, res) => {
  const isAddress =
    req.body.address == "" ||
    req.body.address == undefined ||
    req.body.address == null
      ? "מיקום לא סופק"
      : `\nמיקום ${req.body.address}`;

  let mailOptions = {
    from: "savethetreeseilat@gmail.com",
    to: "savethetreeseilat@gmail.com",
    subject: "בור חדש התגלה",
    html: `<p>שם השולח: ${req.body.name}\n${isAddress}\nבזמן: ${req.body.time}\n נקודת ציון:\nקו רוחב: ${req.body.position.latitude}\nקו אורך: ${req.body.position.longitude}</p>`,

    attachments: [
      {
        filename: req.body.img.filePath,
        path: req.body.img.webviewPath,
      },
      {
        filename: "staticmap.png",
        path: `https://maps.googleapis.com/maps/api/staticmap?center=${req.body.position.latitude},${req.body.position.longitude}&markers=${req.body.position.latitude},${req.body.position.longitude}&zoom=18&size=400x400&key=AIzaSyCGi5v_6qYfBI3wR9qI37flAEYnHTC7maU`,
      },
    ],
  };
  await new Promise((resolve, rej) => {
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("error ", err);
        rej(res.status(400).json({ url: err }));
      } else {
        console.log("sent");
        resolve(res.status(200).json({ url: "sent", data }));
      }
    });
  });
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});

/*
var daemon = new gpsd.Daemon({
    program: 'gpsd',
    device: '/dev/ttyUSB0',
    port: 2947,
    pid: '/tmp/gpsd.pid',
    readOnly: false,
    logger: {
        info: function() {},
        warn: console.warn,
        error: console.error
    }
});



daemon.start(function() {
    console.log('Started');
});

/*

//daemon.logger = new (winston.Logger) ({ exitOnError: false });

var listener = new gpsd.Listener({
    port: 2947,
    hostname: 'localhost',
    logger:  {
        info: function() {},
        warn: console.warn,
        error: console.error
    },
    parse: true
}); 


listener.connect(function() {
    console.log('Connected');
});
*/

module.exports = app;
