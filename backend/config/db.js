import mongoose from "mongoose";

export const connectDB = async () => {
  console.log("MONGO_URL:", process.env.MONGO_URL);
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");
  } catch (error) {
    console.error("DB connection error:", error);
    process.exit(1);
  }
};
