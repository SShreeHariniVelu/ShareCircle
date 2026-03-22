const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const authRoutes   = require("./routes/authRoutes");
const itemRoutes   = require("./routes/itemRoutes");
const borrowRoutes = require("./routes/borrowRoutes");

const app = express();

// ── MIDDLEWARE ─────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── ROUTES ─────────────────────────────────────────────────
app.use("/api/auth",   authRoutes);
app.use("/api/items",  itemRoutes);
app.use("/api/borrow", borrowRoutes);

// ── HEALTH CHECK ───────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "ShareCircle API is running 🚀" });
});

// ── ERROR HANDLER ──────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || "Server Error" });
});

// ── START SERVER ───────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});