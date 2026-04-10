const Product = require("../models/Product")

// create product
exports.createProduct = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("USER:", req.user);

        const { name, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                msg: "Name and Price are required"
            });
        }

        if (!req.user || !req.user.companyId) {
            return res.status(400).json({
                msg: "Invalid user or company"
            });
        }

        const product = await Product.create({
            name,
            price,
            companyId: req.user.companyId
        });

        res.status(201).json(product);

    }catch (err) {
        console.error("ERROR FULL:", err);
        res.status(500).json({msg: err.message});
    }
};

// get Product
exports.getProducts = async (req, res) => {
    try {
        let query = {};

    if (req.user.role === "superadmin") {
        if (req.query.companyId) {
            query.companyId = req.query.companyId;
        }
    }
    else {
        query.companyId = req.user.companyId;
    }


    const products = await Product.find(query);

    res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};