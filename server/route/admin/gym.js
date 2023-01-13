const express = require("express");
const router = express.Router();
const Gym = require("../../mongo/schema/Gym");

router.route("/gym").get((req, res) => {
  Gym.find({}, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

router.route("/gym/:id/:timeslot").put((req, res) => {
  if (req.body.action === "Set to 'Closed'") {
    Gym.updateOne({ _id: req.params.id }, { "timeslot.$[elem].slotOne": "Closed", "timeslot.$[elem].slotTwo": "Closed", "timeslot.$[elem].slotThree": "Closed" }, { arrayFilters: [{ "elem.time": req.params.timeslot }] }, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.end();
    });
  } else if (req.body.action === "Set to 'Available'") {
    Gym.updateOne({ _id: req.params.id }, { "timeslot.$[elem].slotOne": "Available", "timeslot.$[elem].slotTwo": "Available", "timeslot.$[elem].slotThree": "Available" }, { arrayFilters: [{ "elem.time": req.params.timeslot }] }, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.end();
    });
  }
});

module.exports = router;
