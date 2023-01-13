require("dotenv");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../../mongo/schema/Admin");

router.route("/login").post((req, res) => {
  Admin.find({ username: req.body.username }, (err, user) => {
    if (user.length === 0) {
      res.json({ isInvalidUsernameOrPassword: true });
    } else {
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (result) {
          jwt.sign({ username: user[0].username, isAdmin: true }, process.env.SECRET, { expiresIn: 86400 }, (err, token) => {
            res.json(token);
          });
        } else {
          res.json({ isInvalidUsernameOrPassword: true });
        }
      });
    }
  });
});

module.exports = router;
