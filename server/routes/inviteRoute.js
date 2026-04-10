const express = require("express");
const auth = require("../middlewares/auth");
const { inviteEmployee } = require("../controller/inviteController");
const router = express.Router();

// admin invite employee
router.post("/", auth, inviteEmployee);

module.exports = router;