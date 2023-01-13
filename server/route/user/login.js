require("dotenv");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Resident = require("../../mongo/schema/Resident");

router.route("/login").post((req, res) => {
  Resident.find({ unit: req.body.unit }, (err, user) => {
    if (user.length === 0) {
      res.json({ isInvalidUnitOrPassword: true });
    } else {
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        console.log(err);
        if (result) {
          jwt.sign({ unit: user[0].unit, isAdmin: false }, process.env.SECRET, { expiresIn: 86400 }, (err, token) => {
            res.json(token);
          });
        } else {
          res.json({ isInvalidUnitOrPassword: true });
        }
      });
    }
  });
});

module.exports = router;
