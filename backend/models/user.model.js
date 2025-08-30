import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],   
      default: "USER",
    },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
