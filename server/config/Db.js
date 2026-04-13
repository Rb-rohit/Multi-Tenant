const { default: mongoose } = require("mongoose");
const createSuperAdmin = require("../utils/CreateSuperadmin");


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");

        await createSuperAdmin();
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;