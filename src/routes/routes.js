const express = require("express");
const router = express.Router();

const { getUsers, deleteUser } = require("../controllers/user");
const { register, login } = require("../controllers/auth");

router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

// Authentication
router.post("/register", register);
router.post("/login", login);

module.exports = router;
