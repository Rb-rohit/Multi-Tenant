const express = require("express");
const { register, login, registerWithInvite } = require("../controller/authController");
const router = express.Router();


// normal register
router.post("/register", register);

// login
router.post("/login", login);

// register using invite
router.post("/register-invite", registerWithInvite);

module.exports = router;