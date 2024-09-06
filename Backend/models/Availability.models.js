// models/User.js
import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  slots: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      start: { type: Date, required: true },
      end: { type: Date, required: true },
      duration: { type: Number, required: true }, // Duration in minutes
    },
  ],
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["admin", "user"], required: true },
  availability: [availabilitySchema],
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
});

const User = mongoose.model("User", userSchema);
export default User;
