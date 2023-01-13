const express = require("express");
const router = express.Router();
const Announcement = require("../mongo/schema/Announcement");

router
  .route("/announcement")
  .get((req, res) => {
    Announcement.find({}, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });
  })
  .post((req, res) => {
    Announcement.create(req.body, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send("The announcement has been published.");
    });
  });

router.route("/announcement/:_id").put((req, res) => {
  console.log(req.body);
  Announcement.find(req.params, (err, result) => {
    if (err) {
      console.log(err);
    }
    if (result[0].announcement === req.body.announcement && result[0].subject === req.body.subject) {
      res.end();
    } else {
      Announcement.updateOne(req.params, req.body, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
        res.send("The announcement has been edited.");
      });
    }
  });
});

module.exports = router;
