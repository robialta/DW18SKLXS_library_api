const express = require("express");
const router = express.Router();

const { getUsers, deleteUser } = require("../controllers/user");
const {
    getCategory,
    detailCategory,
    addCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/category");
const { register, login } = require("../controllers/auth");
const { authenticated } = require("../middleware/authentication");

router.get("/users", authenticated, getUsers);
router.delete("/user/:id", authenticated, deleteUser);
router.get("/category", authenticated, getCategory);
router.get("/category/:id", authenticated, detailCategory);
router.post("/category", authenticated, addCategory);
router.patch("/category/:id", authenticated, updateCategory);
router.delete("/category/:id", authenticated, deleteCategory);

// Authentication
router.post("/register", register);
router.post("/login", login);

module.exports = router;
