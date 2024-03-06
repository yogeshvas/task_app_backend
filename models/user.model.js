import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
