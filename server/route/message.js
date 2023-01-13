const express = require("express");
const router = express.Router();
const Message = require("../mongo/schema/Message.js");

router
  .route("/message")
  .get((req, res) => {
    Message.find({}, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });
  })
  .post((req, res) => {
    console.log(req.body);
    Message.create(req.body, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.send("Message sent! We'll get back to you asap!.");
    });
  });

router
  .route("/message/:_id")
  .get((req, res) => {
    Message.find({ unit: req.params._id }, (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });
  })
  .put((req, res) => {
    Message.updateOne(req.params, req.body, (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
      res.end();
    });
  });

module.exports = router;
