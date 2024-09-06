import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [duration, setDuration] = useState(30); // Default duration in minutes

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/getallUsers`
        );
        setUsers(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch users:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchUsers();
  }, []);

  // Schedule a meeting for a specific user
  const handleScheduleMeeting = async (userId) => {
    try {
      await axios.post(`http://localhost:5000/api/admin//${userId}/schedule`, {
        start,
        end,
        duration,
      });
      alert("Meeting scheduled successfully!");
    } catch (error) {
      console.error(
        "Failed to schedule meeting:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <h2>Admin Panel - Schedule Meetings</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <strong>{user.email}</strong> - Role: {user.role}
            <button onClick={() => setSelectedUser(user)}>
              Schedule Meeting
            </button>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div>
          <h3>Schedule a Meeting for {selectedUser.email}</h3>
          <div>
            <label>Start: </label>
            <input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </div>
          <div>
            <label>End: </label>
            <input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </div>
          <div>
            <label>Duration: </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="1"
            />
          </div>
          <button onClick={() => handleScheduleMeeting(selectedUser._id)}>
            Schedule
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
