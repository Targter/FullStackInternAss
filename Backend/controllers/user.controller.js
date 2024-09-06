import User from "../models/Availability.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { trycatchhandler } from "../utils/AsyncHandler.js";

// Login User with Email and Role
const loginUser = trycatchhandler(async (req, res) => {
  const { email, role } = req.body;
  console.log("email:", email);
  console.log("role:", role);

  let user = await User.findOne({ email });

  if (!user) {
    user = new User({ email, role });
    await user.save();
  }

  res.json(new ApiResponse(200, user, "LoggedInSuccessfully"));
});

// Get User Availability by userId
// Get Availability Slots by User ID
const getAvailability = trycatchhandler(async (req, res) => {
  const { userId } = req.params; // Get user ID from request params

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return availability if user is found
    res.status(200).json({ availability: user.availability });
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching availability" });
  }
});

// Add New Availability Slot
// Add a New Availability Slot
export const addAvailabilitySlot = async (req, res) => {
  const { userId } = req.params; // Extract userId from request params
  const { start, end, duration } = req.body; // Extract start, end, and duration from the request body

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create a new slot object
    const newSlot = {
      start: new Date(start), // Ensure it's a valid date object
      end: new Date(end),
      duration: parseInt(duration), // Ensure duration is a number
    };

    // Add the new slot to the user's availability
    user.availability.push({ slots: [newSlot] });

    // Save the user with the new availability slot
    await user.save();

    // Return the updated availability
    res.status(200).json({
      message: "Slot added successfully",
      availability: user.availability,
    });
  } catch (error) {
    console.error("Error adding availability slot:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete an Availability Slot
// Delete an Availability Slot
export const deleteAvailability = async (req, res) => {
  const { userId, slotId } = req.params; // Extract userId and slotId from request params

  try {
    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find and remove the slot with the matching slotId
    const updatedAvailability = user.availability.map((avail) => {
      return {
        ...avail,
        slots: avail.slots.filter((slot) => slot._id.toString() !== slotId),
      };
    });

    user.availability = updatedAvailability;

    // Save the user document with updated availability
    await user.save();

    res.status(200).json({
      message: "Slot deleted successfully",
      availability: user.availability,
    });
  } catch (error) {
    console.error("Error deleting availability slot:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export { loginUser, getAvailability };
