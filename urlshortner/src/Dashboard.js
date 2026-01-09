import { useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const [mode, setMode] = useState("single");
  const [input, setInput] = useState("");
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!input.trim()) return alert("Please enter URL(s)!");
    setLoading(true);
    try {
      if (mode === "single") {
        const response = await fetch("http://localhost:8080/api/shorten", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ originalUrl: input.trim() }),
        });
        const shortCode = await response.text();
        setResult({ [input.trim()]: shortCode });
      } else {
        const urls = input
          .split("\n")
          .map((u) => u.trim())
          .filter((u) => u !== "");
        const response = await fetch(
          "http://localhost:8080/api/shorten/bulk",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ urls }),
          }
        );
        const data = await response.json();
        setResult(data);
      }
    } catch (err) {
      console.error(err);
      alert("Error shortening URL(s)!");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    alert("Copied to clipboard!");
  };

  return (
    <div className="dashboard-wrapper">
      <div className="gradient-bg"></div>

      <div className="dashboard-container">
        <h1 className="gradient-text">TinyTrail</h1>
        <p className="subtitle">Short links, big insights</p>

        {/* Mode Selection */}
        <div className="mode-selection">
          <label>
            <input
              type="radio"
              checked={mode === "single"}
              onChange={() => {
                setMode("single");
                setInput("");
                setResult({});
              }}
            />
            Single URL
          </label>
          <label>
            <input
              type="radio"
              checked={mode === "bulk"}
              onChange={() => {
                setMode("bulk");
                setInput("");
                setResult({});
              }}
            />
            Bulk URLs
          </label>
        </div>

        {/* Input */}
        {mode === "single" ? (
          <input
            className="url-input"
            type="text"
            placeholder="Enter your URL"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        ) : (
          <textarea
            className="url-input"
            rows="8"
            placeholder="Enter one URL per line"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        )}

        <button className="shorten-btn" onClick={handleShorten} disabled={loading}>
          {loading ? "Shortening..." : "Shorten URL(s)"}
        </button>

        {/* Result Table */}
        {Object.keys(result).length > 0 && (
          <div className="result-section">
            <h3>Shortened URL(s)</h3>
            <table>
              <thead>
                <tr>
                  <th>Long URL</th>
                  <th>Short URL</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(result).map(([longUrl, shortUrl], idx) => (
                  <tr key={idx}>
                    <td>{longUrl}</td>
                    <td>{shortUrl}</td>
                    <td>
                      <button onClick={() => handleCopy(shortUrl)}>Copy</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
