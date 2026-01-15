import axios from "axios";

const API_BASE_URL = process.env.APP_BACKEND_URL;
/* ---------- SINGLE URL ---------- */
export const shortenUrl = async (originalUrl) => {
  return axios.post(
    `${API_BASE_URL}/shorten`,
    {
      originalUrl: originalUrl, // ⚠ MUST match DTO field name
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

/* ---------- BULK URLS ---------- */
export const shortenBulkUrls = async (urls) => {
  return axios.post(
    `${API_BASE_URL}/shorten/bulk`,
    {
      urls: urls, // must match backend request body
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
