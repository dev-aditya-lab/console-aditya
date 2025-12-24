import mongoose from "mongoose";

// Configure Mongoose to fail fast instead of buffering commands indefinitely
mongoose.set("bufferCommands", false);
mongoose.set("strictQuery", false);

export async function connectDB() {
  // Check if already connected and ready
  if (mongoose.connection.readyState === 1) {
    return;
  }

  // If currently connecting, wait for it
  if (mongoose.connection.readyState === 2) {
    await new Promise<void>((resolve) => {
      mongoose.connection.once("connected", () => resolve());
    });
    return;
  }

  const uri = process.env.DB_URI;
  if (!uri) {
    throw new Error("Missing environment variable DB_URI");
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });
    console.log("🚀 MongoDB connected:", mongoose.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
