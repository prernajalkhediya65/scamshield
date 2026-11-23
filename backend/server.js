require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

const scamRoutes = require("./routes/scamRoutes");
const connectDB = require("./config/db");

const app = express();

// Security Headers
app.use(helmet());

// CORS Configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://scamshield-1-ynrm.onrender.com"
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS origin not allowed"));
      }
    },
    credentials: true,
  })
);

// Middlewares
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

// Routes
app.use("/api/scams", scamRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("ScamShield Backend is running!");
});

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
