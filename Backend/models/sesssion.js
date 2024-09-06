// models/Session.js

import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  type: { type: String, enum: ["one-on-one", "multi"] },
  start: { type: Date },
  end: { type: Date },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Admin who created
});

const Session = mongoose.model("Session", sessionSchema);
export default Session;
