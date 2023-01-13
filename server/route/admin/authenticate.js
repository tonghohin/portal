require("dotenv");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.route("/authenticate").get((req, res) => {
  jwt.verify(req.headers["x-access-token"], process.env.SECRET, (err, decoded) => {
    console.log("admin decoded", decoded);
    if (decoded) {
      res.json({ isAuthenticated: true, username: decoded.username, isAdmin: decoded.isAdmin });
    } else {
      res.json({ isAuthenticated: false });
    }
  });
});

module.exports = router;
