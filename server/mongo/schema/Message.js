const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    unit: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    reply: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message ", messageSchema, "message");
