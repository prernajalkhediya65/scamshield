require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

const scamRoutes = require("./routes/scamRoutes");
const connectDB = require("./config/db");

const app = express();

// Trust Render / Cloudflare reverse proxy for secure cookies and accurate client IP
app.set("trust proxy", 1);

// Security Headers
app.use(helmet());

// CORS Configuration - exact origin matching, supporting Render and local environments
const clientUrls = (process.env.CLIENT_URL || "")
  .split(",")
  .map((u) => u.trim())
  .filter(Boolean);

const defaultOrigins = [
  "https://scamshield-1-ynrm.onrender.com",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];

const allowedOrigins = Array.from(
  new Set([...clientUrls, ...defaultOrigins].map((o) => o.replace(/\/+$/, "")))
);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. server-to-server, curl, Postman) where origin is not present
    if (!origin) {
      return callback(null, true);
    }

    const cleanOrigin = origin.replace(/\/+$/, "");

    if (allowedOrigins.includes(cleanOrigin)) {
      return callback(null, true);
    }

    console.warn(`Blocked by CORS: origin "${origin}" not in allowed list:`, allowedOrigins);
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
// Middlewares
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

// Routes
app.use("/api/scams", scamRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("ScamShield Backend is running!");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err.message || err);
  if (err.message && err.message.startsWith("CORS blocked")) {
    return res.status(403).json({
      message: err.message,
    });
  }
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
