import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  image: {type: String, default: ""},
  password: {type: String, select: false},
  googleId: {type: String},
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
