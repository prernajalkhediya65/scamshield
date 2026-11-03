const mongoose = require("mongoose");
const scanSchema = new mongoose.Schema({
    type:{
        type:String,
        required:true,
        enum:["URL","MESSAGE","OFFER"]
    },
        content: {
        type: String,
        required: true
    },

    riskLevel: {
        type: String,
        required: true
    },

    explanation: {
        type: String,
        required: true
    },

    reasons: {
        type: [String],
        default: []
    },

    recommendation: {
        type: String,
        required: true
    }

}, { timestamps: true });
const Scan = mongoose.model("Scan", scanSchema);

module.exports = Scan;