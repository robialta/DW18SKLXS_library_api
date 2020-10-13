const express = require("express");
const router = express.Router();

const { getUsers } = require("../controllers/user");
const { register, login } = require("../controllers/auth");

router.get("/users", getUsers);

// Authentication
router.post("/register", register);
router.post("/login", login);

module.exports = router;
