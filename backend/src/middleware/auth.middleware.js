import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    // 🔐 1. Get token from cookies
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    // 🔍 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 👤 3. Find user by decoded ID
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    //  4. Attach user to request and proceed
    req.user = user;
    next();

  } catch (error) {
    console.error(" Error in protectRoute middleware:", error.message);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};
