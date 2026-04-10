const Invite = require("../models/Invite");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Normal Register (optional)
exports.register = async (req, res) => {
    const {name, email, password} = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashed,
        role: "superadmin"
    });

    res.json(user);
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne
    ({ email });

    if (!user) return res.status(400).json({msg: "User not found"});

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({msg: "Invalid password"});
    
    const token = jwt.sign(
        {
            userId: user._id,
            role: user.role,
            companyId: user.companyId
        },
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    );

    const result = await User.findById(user._id).select("-password");

        res.status(200).json({
            message: "Login successful",
            result,
            token: token,
        });
}

// Register via Invite
exports.registerWithInvite = async (req, res) => {
    try{
        const { token, name, password } = req.body;

        // find valid invite
        const invite = await Invite.findOne({
            token,
            isUsed: false
        });

        if (!invite) {
            return res.status(400).json({
                msg: "Invalid or expired invite"
            });
        }

        // check if user already exists
        const existingUser = await User.findOne({
            email: invite.email
        });

        if (existingUser) {
            return res.status(400).json({
                msg: "User already exists"
            });
        }

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email: invite.email,
            password: hashed,
            role: invite.role,
            companyId: invite.companyId
        });

        invite.isUsed = true;
        await invite.save();

        // Auto-login (JWT)
        const tokenJWT = jwt.sign(
            {
                userId: user._id,
                role: user._id,
                companyId: user.companyId
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
        );

        res.json({
            message: "User registered successfully",
            token: tokenJWT,
            user
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Server error"
        });
    }
};