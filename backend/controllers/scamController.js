const Scan = require("../models/Scan");
const analyzeScam = require("../services/geminiService");

const analyzeScamController = async (req, res) => {
    try {
        const { type, content } = req.body;

        // Validate input
        if (!type || !content) {
            return res.status(400).json({
                message: "Type and content are required"
            });
        }

        if (!["URL", "MESSAGE", "OFFER"].includes(type)) {
            return res.status(400).json({
                message: "Invalid scan type"
            });
        }

        // Gemini AI analysis
        const aiResponse = await analyzeScam(type, content);

        // Convert AI response into JavaScript object
        const result = JSON.parse(aiResponse);

        // Save result in MongoDB
        const newScan = await Scan.create({
            type,
            content,
            riskLevel: result.riskLevel,
            explanation: result.explanation,
            reasons: result.reasons,
            recommendation: result.recommendation
        });

        return res.status(200).json(newScan);

    } catch (error) {
        console.error("Scam Analysis Error:", error);

        return res.status(500).json({
            message: "Scam analysis failed",
            error: error.message
        });
    }
};
// Get all scan history
const getHistoryController = async (req, res) => {
    try {
        const history = await Scan.find().sort({ createdAt: -1 });

        return res.status(200).json(history);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch scan history",
            error: error.message
        });
    }
};


// Delete one history record
const deleteHistoryItemController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedScan = await Scan.findByIdAndDelete(id);

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
        return res.status(500).json({
            message: "Failed to delete scan record",
            error: error.message
        });
    }
};


// Delete all history
const clearHistoryController = async (req, res) => {
    try {
        await Scan.deleteMany({});

        return res.status(200).json({
            message: "All scan history cleared successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to clear scan history",
            error: error.message
        });
    }
};

module.exports = { analyzeScamController,
    getHistoryController,
    deleteHistoryItemController,
    clearHistoryController
};