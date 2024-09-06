import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPanel = () => {
  const [availability, setAvailability] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [duration, setDuration] = useState(30); // Default duration in minutes
  const userId = localStorage.getItem("userId");

  // Fetch the user's availability slots
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}/availability`
        );
        console.log("Fetched availability:", response.data);
        // Assuming the response structure contains an array of availability objects with slots inside it
        setAvailability(response.data.availability || []);
      } catch (error) {
        console.error(
          "Failed to fetch availability:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchAvailability();
  }, [userId]);

  // Add a new time slot to the user's availability
  const handleAddSlot = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/${userId}/availability`,
        {
          start,
          end,
          duration,
        }
      );
      console.log("Slot added:", response.data);

      // Refresh the availability list after adding the slot
      setStart("");
      setEnd("");
      setDuration(30); // Reset the duration after successful addition

      const updatedAvailability = await axios.get(
        `http://localhost:5000/api/user/${userId}/availability`
      );
      setAvailability(updatedAvailability.data.availability || []);
    } catch (error) {
      console.error(
        "Failed to add slot:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Delete an existing time slot
  const deleteAvailability = async (slotId) => {
    try {
      // Make a DELETE request to the server with the slotId
      await axios.delete(
        `http://localhost:5000/api/user/${userId}/availability/${slotId}`
      );
  
      // After successful deletion, refetch the availability
      const updatedAvailability = await axios.get(
        `http://localhost:5000/api/user/${userId}/availability`
      );
      setAvailability(updatedAvailability.data.availability || []);
    } catch (error) {
      console.error(
        "Failed to delete availability:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>User Panel</h2>
      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h3>Add New Slot</h3>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
            style={{ marginRight: "10px" }}
          />
          <input
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
            style={{ marginRight: "10px" }}
          />
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Duration (mins)"
            min="1"
            style={{ marginRight: "10px" }}
          />
          <button
            onClick={handleAddSlot}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Add Slot
          </button>
        </div>
      </div>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {availability.length > 0 ? (
          availability.flatMap((avail) =>
            avail.slots.map((slot) => (
              <li
                key={slot._id}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <div>
                  <strong>Start:</strong>{" "}
                  {new Date(slot.start).toLocaleString()}
                </div>
                <div>
                  <strong>End:</strong> {new Date(slot.end).toLocaleString()}
                </div>
                <div>
                  <strong>Duration:</strong> {slot.duration} minutes
                </div>
                <button
                  onClick={() => deleteAvailability(slot._id)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  Delete
                </button>
              </li>
            ))
          )
        ) : (
          <p>No availability slots found.</p>
        )}
      </ul>
    </div>
  );
};

export default UserPanel;
