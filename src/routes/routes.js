const express = require("express");
const router = express.Router();

const { login } = require("../controllers/auth");

// Authentication
router.post("/login", login);

module.exports = router;
