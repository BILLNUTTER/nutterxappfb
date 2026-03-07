import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    });

    console.log("MongoDB connected successfully.");

    mongoose.set("toJSON", {
      virtuals: true,
      transform: (_doc, converted) => {
        delete converted._id;
        delete converted.__v;
      }
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
