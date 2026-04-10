const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true });

module.exports = mongoose.model("Company", companySchema);