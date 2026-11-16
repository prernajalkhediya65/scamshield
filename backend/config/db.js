const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const rawUri = (process.env.MONGO_URI || "").trim();
        const cleanUri = rawUri.replace(/([^:]\/)\/+/g, "$1");
        await mongoose.connect(cleanUri);
        console.log(`MongoDB Connected Successfully: ${mongoose.connection.db.databaseName}`);
    } catch (error) {
        console.log("MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;