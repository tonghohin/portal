const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  unit: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("Resident", residentSchema, "resident");
