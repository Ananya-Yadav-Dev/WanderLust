const express = require("express");
const router = express.Router();
const asyncHandler = require("../utils/asyncHandler");
const { isAuthenticated } = require("../middleware/auth");
const UserController = require("../controllers/userController.js");

router.post("/signup", asyncHandler(UserController.signup));
router.post("/login", asyncHandler(UserController.login));
router.get("/me", isAuthenticated, asyncHandler(UserController.getCurrentUser));
router.post("/logout", UserController.logout);

module.exports = router;
