const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,

    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        index: true
    }
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);