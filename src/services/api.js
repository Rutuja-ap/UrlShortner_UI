import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, 
  headers: {
    "Content-Type": "application/json",
  },
});

/* ---------- SINGLE URL ---------- */
export const shortenUrl = async (originalUrl) => {
  return api.post("/shorten", {
    originalUrl,
  });
};

/* ---------- BULK URLS ---------- */
export const shortenBulkUrls = async (urls) => {
  return api.post("/shorten/bulk", {
    urls,
  });
};
