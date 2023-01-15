const express = require("express");
const router = express.Router();
const Gym = require("../../mongo/schema/Gym");

router.route("/gymcalendar/:unit").get((req, res) => {
  Gym.find({}, (err, result) => {
    if (err) {
      console.log(err);
    }
    const sanitizedResult = result.map((day) => {
      day.timeslot.map((timeslot) => {
        if (timeslot.slotOne !== "Available" && timeslot.slotOne !== "Closed" && timeslot.slotOne !== req.params.unit) {
          timeslot.slotOne = "Unavailable";
        }
        if (timeslot.slotTwo !== "Available" && timeslot.slotTwo !== "Closed" && timeslot.slotTwo !== req.params.unit) {
          timeslot.slotTwo = "Unavailable";
        }
        if (timeslot.slotThree !== "Available" && timeslot.slotThree !== "Closed" && timeslot.slotThree !== req.params.unit) {
          timeslot.slotThree = "Unavailable";
        }
        return timeslot;
      });
      return day;
    });
    res.json(sanitizedResult);
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
