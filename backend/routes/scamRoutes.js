const express = require("express");
const router = express.Router();
const {
    analyzeScamController,
    getHistoryController,
    deleteHistoryItemController,
    clearHistoryController

}= require("../controllers/scamController");

router.post("/analyze",analyzeScamController);
// Get history
router.get("/history", getHistoryController);

// Delete one history record
router.delete("/history/:id", deleteHistoryItemController);

// Delete all history
router.delete("/history", clearHistoryController);

module.exports = router;