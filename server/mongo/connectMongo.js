require("dotenv").config();
const mongoose = require("mongoose");

const connectMongo = async function () {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("CONNECTED TO MONGO");
};

module.exports = connectMongo;
