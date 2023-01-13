const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Admin = require("../../mongo/schema/Admin");

router.route("/register").post((req, res) => {
  Admin.find({ username: req.body.username }, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result.length === 0) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        Admin.create({ username: req.body.username, password: hash });
      });
      res.json({ isNewAccountRegistered: true });
    } else {
      res.json({ isUsernameExist: true });
    }
  });
});

module.exports = router;
