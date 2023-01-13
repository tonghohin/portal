const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  timeslot: [
    {
      time: String,
      slotOne: { type: String, required: true, default: "Available" },
      slotTwo: { type: String, required: true, default: "Available" },
      slotThree: { type: String, required: true, default: "Available" }
    }
  ]
});

module.exports = mongoose.model("Gym", gymSchema, "gym");
