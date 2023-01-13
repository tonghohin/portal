const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Resident = require("../../mongo/schema/Resident");

router
  .route("/resident")
  .get((req, res) => {
    Resident.find({}, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.json(result);
    });
  })
  .post((req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      req.body.password = hash;
      Resident.create(req.body, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
        res.send("The resident has been added.");
      });
    });
  });

router
  .route("/resident/:_id")
  .put((req, res) => {
    console.log(req.body);
    Resident.find(req.params, (err, result) => {
      if (err) {
        console.log(err);
      }
      if (result[0].firstName === req.body.firstName && result[0].lastName === req.body.lastName && result[0].unit === req.body.unit) {
        res.send("Nothing is updated.");
      } else {
        Resident.updateOne(req.params, { firstName: req.body.firstName, lastName: req.body.lastName, unit: req.body.unit }, (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(result);
          res.send("The resident is updated.");
        });
      }
    });
  })
  .delete((req, res) => {
    Resident.deleteOne(req.params, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send("The resident is deleted.");
    });
  });

module.exports = router;
