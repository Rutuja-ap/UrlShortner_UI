import React, { useState } from "react";
import { shortenUrl } from "./services/api";

const UrlShortener = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = async () => {
    try {
      const response = await shortenUrl(longUrl);
      setShortUrl(response.data);
    } catch (error) {
      console.error("Error shortening URL", error);
    }
  };

  return (
    <div>
      <h2>URL Shortener</h2>

      <input
        type="text"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />

      <button onClick={handleShorten}>Shorten</button>

      {shortUrl && <p>Short URL: {shortUrl}</p>}
    </div>
  );
};

export default UrlShortener;
