import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import mongoose from "mongoose"; // Import mongoose for logging

// Import Routes
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:3100", 
  "https://jobfolio-1-v4ql.onrender.com", 
  "http://localhost:3001"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials such as cookies, authorization headers, etc.
    allowedHeaders: ["Content-Type", "Authorization"], // Include headers to ensure token-based auth works
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly allow the relevant HTTP methods
  })
);

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Database connection log
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Server Setup
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});
