const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Resident = require("../../mongo/schema/Resident");

router.route("/resident/:unit").put((req, res) => {
  if (req.body.newPassword === req.body.confirmNewPassword) {
    bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
      if (err) console.log(err);
      Resident.updateOne(req.params, { password: hash }, (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.send("The password has been changed.");
      });
    });
  } else {
    res.send("Something's wrong. Please try again.");
  }
});

module.exports = router;
