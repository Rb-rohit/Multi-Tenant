const Invite = require("../models/Invite");
const crypto = require("crypto");


exports.inviteEmployee = async (req, res) => {
    try {
        // only admin allowed
        if (req.user.role !== "admin") {
            return res.status(403).json({ msg: "Only admin can invite" });
        }

        const {email} = req.body;

        // check if already invited
        const existingInvite = await Invite.findOne({
            email,
            companyId: req.user.companyId,
            isUsed: false
        });

        if (existingInvite) {
            return res.status(400).json({
                msg: "User already invited"
            });
        } 

        const token = crypto.randomBytes(20).toString("hex");

        const expiresAt = new Date(Date.now() + 24 * 60 *60 * 1000);

        const invite = await Invite.create({
            email,
            companyId: req.user.companyId,
            role: "employee",
            token,
            expiresAt
        });

        res.json({
            message: "Invite created successfully",
            inviteLink: `http://localhost:5173/register/${token}`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Server error"
        });
    }
};