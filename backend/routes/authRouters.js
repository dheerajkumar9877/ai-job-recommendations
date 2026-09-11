const express = require("express");
const router = express.Router();

const authController = require("../controllers/authControllers");

router.post("/register", authController.create);
router.post("/login", authController.login);

router.post("/forgot-password", authController.sendOTP);
router.post("/verify-reset-code", authController.verifyOtp);
router.put("/reset-password", authController.updatePassword);

module.exports = router;