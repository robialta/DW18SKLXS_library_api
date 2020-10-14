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
const {
    getBooks,
    detailBook,
    addBook,
    updateBook,
} = require("../controllers/book");
const { up } = require("../../migrations/20201014064510-create-book");

//user
router.get("/users", authenticated, getUsers);
router.delete("/user/:id", authenticated, deleteUser);
//Category
router.get("/category", authenticated, getCategory);
router.get("/category/:id", authenticated, detailCategory);
router.post("/category", authenticated, addCategory);
router.patch("/category/:id", authenticated, updateCategory);
router.delete("/category/:id", authenticated, deleteCategory);
//Book
router.get("/books", authenticated, getBooks);
router.get("/book/:id", authenticated, detailBook);
router.post("/book", authenticated, addBook);
router.patch("/book/:id", authenticated, updateBook);

// Authentication
router.post("/register", register);
router.post("/login", login);

module.exports = router;
