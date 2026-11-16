const Scan = require("../models/Scan");
const analyzeScam = require("../services/geminiService");
const mongoose = require("mongoose");

const analyzeScamController = async (req, res) => {
    try {
        const { type, content } = req.body;

        // Input validation
        if (
            typeof type !== "string" ||
            typeof content !== "string" ||
            !content.trim()
        ) {
            return res.status(400).json({
                message: "Type and content are required"
            });
        }

        if (!["URL", "MESSAGE", "OFFER"].includes(type)) {
            return res.status(400).json({
                message: "Invalid scan type"
            });
        }

     
        const cleanContent = content.trim();

        if (cleanContent.length > 5000) {
            return res.status(400).json({
                message: "Content cannot exceed 5000 characters"
            });
        }

        // Gemini AI analysis
        const aiResponse = await analyzeScam(type, cleanContent);

        let result;

        try {
            result = JSON.parse(aiResponse);
        } catch (error) {
            return res.status(502).json({
                message: "AI returned an invalid response"
            });
        }

  
        if (
            !result ||
            typeof result !== "object" ||
            !["LOW", "MEDIUM", "HIGH"].includes(result.riskLevel) ||
            typeof result.explanation !== "string" ||
            !Array.isArray(result.reasons) ||
            !result.reasons.every(reason => typeof reason === "string") ||
            typeof result.recommendation !== "string"
        ) {
            return res.status(502).json({
                message: "AI returned an incomplete or invalid response"
            });
        }

        const newScan = await Scan.create({
            userId: req.user._id,
            type,
            content: cleanContent,
            riskLevel: result.riskLevel,
            explanation: result.explanation,
            reasons: result.reasons,
            recommendation: result.recommendation
        });

        return res.status(200).json(newScan);

    } catch (error) {
        console.error("Scam Analysis Error:", error);

        if (error.message && error.message.includes("timed out")) {
            return res.status(504).json({
                message: "AI analysis timed out. Please try again."
            });
        }

        return res.status(500).json({
            message: "Scam analysis failed. Please try again later."
        });
    }
};

const getHistoryController = async (req, res) => {
    try {
        const history = await Scan.find({
            userId: req.user._id
        }).sort({ createdAt: -1 });

        return res.status(200).json(history);

    } catch (error) {
        console.error("Fetch Scan History Error:", error);
        return res.status(500).json({
            message: "Failed to fetch scan history. Please try again later."
        });
    }
};

const deleteHistoryItemController = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid scan ID"
            });
        }

        const deletedScan = await Scan.findOneAndDelete({
            _id: id,
            userId: req.user._id
        });

        if (!deletedScan) {
            return res.status(404).json({
                message: "Scan record not found"
            });
        }

        return res.status(200).json({
            message: "Scan deleted successfully",
            id
        });

    } catch (error) {
        console.error("Delete Scan Record Error:", error);
        return res.status(500).json({
            message: "Failed to delete scan record. Please try again later."
        });
    }
};

const clearHistoryController = async (req, res) => {
    try {
        await Scan.deleteMany({
            userId: req.user._id
        });

        return res.status(200).json({
            message: "Your scan history cleared successfully"
        });

    } catch (error) {
        console.error("Clear Scan History Error:", error);
        return res.status(500).json({
            message: "Failed to clear scan history. Please try again later."
        });
    }
};

module.exports = {
    analyzeScamController,
    getHistoryController,
    deleteHistoryItemController,
    clearHistoryController
};
