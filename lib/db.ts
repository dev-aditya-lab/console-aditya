import mongoose from "mongoose";

let isConnected = false; // track connection status

export async function connectDB() {
  if (isConnected) {
    console.log("✅ MongoDB already connected");
    return;
  }

  const uri = process.env.DB_URI;
  if (!uri) {
    throw new Error("Missing environment variable DB_URI");
  }

  try {
    const conn = await mongoose.connect(uri);
    isConnected = true;
    console.log("🚀 MongoDB connected:", conn.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
