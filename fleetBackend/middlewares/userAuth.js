import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const userAuth = async (req, res, next) => {
  const { token } = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access Denied! Token is missing." });
  }
  try {
    const secretKey = process.env.TOKEN_SECRET_KEY;
    const decoded = jwt.verify(token.replace("Bearer ", ""), secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
