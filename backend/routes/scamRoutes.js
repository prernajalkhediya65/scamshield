const express = require("express");
const protect = require("../middleware/authMiddleware");
const router = express.Router();
const { analyzeLimiter } = require("../middleware/rateLimitMiddleware");
const {
    analyzeScamController,
    getHistoryController,
    deleteHistoryItemController,
    clearHistoryController

}= require("../controllers/scamController");

router.post("/analyze",protect, analyzeLimiter, analyzeScamController);
// Get history
router.get("/history",protect, getHistoryController);

// Delete one history record
router.delete("/history/:id", protect,deleteHistoryItemController);

// Delete all history
router.delete("/history", protect,clearHistoryController);

module.exports = router;