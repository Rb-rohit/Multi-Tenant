const mongoose = require("mongoose");

const inviteSchema = new mongoose.Schema({
    email: String,

    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },

    role: {
        type: String,
        default: "employee"
    },

    token: String,

    isUsed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("Invite", inviteSchema);