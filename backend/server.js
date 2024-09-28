const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Ensure routes are defined correctly
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/todos", todoRoutes); // Todo routes

const PORT = process.env.PORT || 3000; // Use port from .env or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
