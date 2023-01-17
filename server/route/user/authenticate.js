require("dotenv");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.route("/authenticate").get((req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    console.log("user decoded", decoded);
    if (decoded) {
      res.json({ isAuthenticated: true, unit: decoded.unit, isAdmin: decoded.isAdmin });
    } else {
      res.json({ isAuthenticated: false });
    }
  });
});

module.exports = router;
