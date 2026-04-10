const express = require("express");
const auth = require("../middlewares/auth");
const { createCompany, getAllCompanies, getAllUsers, getUsers } = require("../controller/companyController");
const router = express.Router();


// only superadmin can create company
router.post("/create", auth, createCompany);

router.get("/", auth, getAllCompanies);


router.get("/comp-users", auth, getUsers);

module.exports = router;