const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoute = require("./routes/authRoute");
const companyRoute = require("./routes/companyRoute");
const inviteRoute = require("./routes/inviteRoute");
const productRoute = require("./routes/productRoute");
const createSuperAdmin = require("./utils/createSuperAdmin");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://multi-tenant-tzas.vercel.app"
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("cors not allowed"));
        }
    },
    creadentials: true
};

app.use(cors(corsOptions));
// middleware
app.use(express.json());

// DB connection 
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("MongoDB Connected");

        await createSuperAdmin();  

    })
    .catch(err => console.log(err));

// routes
app.use("/api/auth", authRoute);
app.use("/api/company", companyRoute);
app.use("/api/invite", inviteRoute);
app.use("/api/products", productRoute);

// Test route 
app.get("/", (req, res) => {
    res.send("Multi-Tenant API Running...");
});

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));