// controllers/adminController.js

import User from "../models/Availability.models.js";
import Session from "../models/sesssion.js";
import mongoose from "mongoose";

// Fetch all users with their availability and sessions
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Schedule a meeting for a specific user (Admin only)
export const scheduleMeetingForUser = async (req, res) => {
  const { userId } = req.params;
  const { start, end, duration } = req.body; // Meeting details

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the new slot to the user's availability
    user.availability.push({
      slots: [
        {
          start,
          end,
          duration,
        },
      ],
    });

    // Save the updated user
    await user.save();

    res
      .status(200)
      .json({
        message: "Meeting scheduled successfully",
        availability: user.availability,
      });
  } catch (error) {
    console.error("Error scheduling meeting:", error);
    res.status(500).json({ message: "Server error" });
  }
};
