import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api"; // ⚠️ port must match backend

export const shortenUrl = async (longUrl) => {
  return await axios.post(
    `${API_BASE_URL}/shorten`,
    {
      url: longUrl   // ✅ JSON object
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};
