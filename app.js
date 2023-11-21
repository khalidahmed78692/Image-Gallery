require("./db/config");
const express = require("express");
const bodyParser = require("body-parser");
const User = require("./db/User");
const ejs = require("ejs");
const multer = require("multer");
const Photo = require("./db/Photo");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  const photo = new Photo({
    images: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    },
  });
  photo.save().then((result) => {
    if (result) {
      res.render("gallery");
    } else {
      res.render("gallery");
    }
  });
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  if (req.body.email && req.body.password) {
    User.findOne(req.body).then((result) => {
      if (result) {
        res.redirect("/gallery");
      } else res.render("login");
    });
  } else {
    res.render("register");
  }
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save().then((result) => {
    if (result) {
      res.render("login");
    } else res.render("register");
  });
});

app.get("/gallery", (req, res) => {
  Photo.find().then((images) => {
    res.render("gallery", { images });
  });
});

app.post("/gallery", (req, res) => {});

app.listen(3000, (req, res) => {
  console.log("Successfully running server on port 3000");
});
