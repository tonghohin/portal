const express = require("express");
const router = express.Router();
const Gym = require("../../mongo/schema/Gym");

router.route("/gymcalendar").get((req, res) => {
  Gym.find({}, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

router.route("/gym/:id/:timeslot/:slot").put((req, res) => {
  if (req.body.action === "Register") {
    Gym.updateOne({ _id: req.params.id }, { [`timeslot.$[elem].${req.params.slot}`]: req.body.unit }, { arrayFilters: [{ "elem.time": req.params.timeslot }] }, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.end();
    });
  } else if (req.body.action === "De-register") {
    Gym.updateOne({ _id: req.params.id }, { [`timeslot.$[elem].${req.params.slot}`]: "Available" }, { arrayFilters: [{ "elem.time": req.params.timeslot }] }, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.end();
    });
  }
});

module.exports = router;
