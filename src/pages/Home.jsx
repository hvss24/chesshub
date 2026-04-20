import React from "react";
import { useState } from "react";   // ✅ add here
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import RatingChart from "../components/RatingChart";

const Home = () => {

  // ✅ ADD HERE (inside component, before return)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [player, setPlayer] = useState(null);
  const [username2, setUsername2] = useState("");
  const [player2, setPlayer2] = useState(null);

  const getWinner = (r1, r2) => {
  if (!r1 || !r2) return "";
  if (r1 > r2) return "Player 1 🟢";
  if (r2 > r1) return "Player 2 🟢";
  return "Tie 🤝";
};

  const fetchPlayer = async () => {
  try {
    setLoading(true);
    setError("");
    setPlayer(null);
    setPlayer2(null);

    // PLAYER 1
    const res1 = await fetch(
      `https://api.chess.com/pub/player/${username}`
    );
    const data1 = await res1.json();

    const stats1 = await fetch(
      `https://api.chess.com/pub/player/${username}/stats`
    );
    const statsData1 = await stats1.json();

    // PLAYER 2 (if entered)
    let data2 = null;
    let statsData2 = null;

    if (username2) {
      const res2 = await fetch(
        `https://api.chess.com/pub/player/${username2}`
      );
      data2 = await res2.json();

      const stats2 = await fetch(
        `https://api.chess.com/pub/player/${username2}/stats`
      );
      statsData2 = await stats2.json();
    }

    setPlayer({
      ...data1,
      stats: statsData1,
    });

    if (data2) {
      setPlayer2({
        ...data2,
        stats: statsData2,
      });
    }

  } catch (err) {
    setError("Error fetching players");
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <Navbar />

      <h1>Chess Dashboard</h1>

      {/* INPUT UI */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={fetchPlayer}>Search</button>
      </div>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
  <input
    type="text"
    placeholder="Compare with..."
    value={username2}
    onChange={(e) => setUsername2(e.target.value)}
  />
</div>

<div style={{ textAlign: "center", marginBottom: "20px" }}>
  <button
    onClick={() => {
      setPlayer(null);
      setPlayer2(null);
      setUsername("");
      setUsername2("");
    }}
    style={{
      padding: "10px 20px",
      backgroundColor: "#ff4d4d",
      border: "none",
      color: "white",
      cursor: "pointer",
      borderRadius: "5px",
    }}
  >
    Reset
  </button>
</div>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

{error && (
  <p style={{ textAlign: "center", color: "red" }}>
    {error}
  </p>
)}
      {/* SHOW DATA */}
      <div className="cards-container">
  {player && (
    <Card
      title={player.username}
      description={`Blitz: ${player.stats?.chess_blitz?.last?.rating}`}
      extra={`Rapid: ${player.stats?.chess_rapid?.last?.rating}`}
    />
  )}

  {player2 && (
    <Card
      title={player2.username}
      description={`Blitz: ${player2.stats?.chess_blitz?.last?.rating}`}
      extra={`Rapid: ${player2.stats?.chess_rapid?.last?.rating}`}
    />
  )}
</div>

{player && <RatingChart player={player} />}

{player && player2 && (
  <div style={{ textAlign: "center", marginTop: "20px" }}>
    <h3>Comparison Result</h3>

    <p>
      Blitz Winner:{" "}
      {getWinner(
        player.stats?.chess_blitz?.last?.rating,
        player2.stats?.chess_blitz?.last?.rating
      )}
    </p>

    <p>
      Rapid Winner:{" "}
      {getWinner(
        player.stats?.chess_rapid?.last?.rating,
        player2.stats?.chess_rapid?.last?.rating
      )}
    </p>
  </div>
)}

    </div>
  );
};

export default Home;