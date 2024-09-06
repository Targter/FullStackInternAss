import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const saveAvailability = (availability) => {
  return axios.post(`${API_URL}/availability`, availability);
};
