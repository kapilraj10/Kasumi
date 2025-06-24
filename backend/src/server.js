import express from "express";
import dotenv from "dotenv";
import authRoutes from './Routes/auth.route.js';
import userRoutes from './Routes/user.route.js'; 
import chatRoutes from './Routes/chat.routes.js';
import ConnectDB from "./lib/db.js";
import cookieParser from 'cookie-parser';
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Use cookie parser and JSON parser
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
  });
}

ConnectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(" Failed to connect to MongoDB:", error);
    process.exit(1);
  });
