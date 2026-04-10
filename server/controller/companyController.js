const Company = require("../models/Company");
const User = require("../models/User");
const bcrypt = require("bcryptjs");


exports.createCompany = async (req, res) => {
    try {
        // only superadmin allowed
        if (req.user.role !== "superadmin") {
        return res.status(403).json({ msg: "Only owner can create company" });
    }

    const {name, adminName, adminEmail, adminPassword} = req.body;

    // validate input
    if (!name || !adminName || !adminEmail || !adminPassword) {
        return res.status(400).json({
            msg: "All fields are required"
        });
    }

    // check duplicate company
    const existingCompany = await Company.findOne({name});
    if (existingCompany) {
        return res.status(400).json({
            msg: "Company already exists"
        });
    }

    //check duplicate admin email
    const existingUser = await User.findOne({ email: adminEmail});
    if (existingUser) {
        return res.status(400).json({
            msg: "Admin eamil already is use"
        });
    }

    // Create company
    const company = await Company.create({
        name,
        createdBy: req.user.userId
    });

    // Create admin for company
    const hashed = await bcrypt.hash(adminPassword || "123456", 10);

    const admin = await User.create({
        name: adminName,
        email: adminEmail,
        password: hashed,
        role: "admin",
        companyId: company._id
    });

    res.status(201).json({
        message: "Company created SUCCESSFULLY", 
        company,
        admin
    });

    }catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Server error"
        });
    }
    
};

// get All Companies
exports.getAllCompanies = async (req, res) => {
    try {
        if (req.user.role !== "superadmin") {
            return res.status(403).json({ msg: "Access denied" });
        }

        const companies = await Company.find();

        res.json(companies);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};



// get all users 
// exports.getAllUsers = async (req, res) =>{
//     try {
//         if (req.user.role !== "superadmin") {
//             return res.status(403).json({msg: "Access denied"});
//         }

//         const users = await User.find().select("-password");

//         res.json(users);
//     } catch (err) {
//         res.status(500).json({msg: "Server error"});
//     }
// };

exports.getUsers = async (req, res) => {
    try {
        let query = {};

        // Superadmin → can pass companyId
        if (req.user.role === "superadmin") {
            if (req.query.companyId) {
                query.companyId = req.query.companyId;
            }
        } else {
            // Admin → only their company users
            query.companyId = req.user.companyId;
        }

        const users = await User.find(query).select("-password");

        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};