const express = require("express");
const auth = require("../middlewares/auth");
const { createProduct, getProducts } = require("../controller/productController");
const router = express.Router();


// create product 
router.post("/", auth, createProduct);

// Get product 
router.get("/", auth, getProducts);

module.exports = router;