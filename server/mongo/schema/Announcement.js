const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    subject: { type: String, required: true },
    announcement: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement ", announcementSchema, "announcement");
