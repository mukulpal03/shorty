import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    imageUrl: { type: String, required: false },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;

