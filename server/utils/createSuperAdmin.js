const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createSuperAdmin = async () => {
    try {
        const existing = await User.findOne({ role: "superadmin" });

        if (existing) {
            console.log("Superadmin already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash("Rohit123", 10);

        await User.create({
            name: "Super Admin",
            email: "rohit@R.com",
            password: hashedPassword,
            role: "superadmin"
        });

        console.log("Default Superadmin Created ");

    } catch (err) {
        console.error("Error creating superadmin:", err);
    }
};

module.exports = createSuperAdmin;