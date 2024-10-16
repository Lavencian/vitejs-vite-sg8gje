import React, { useState, useEffect } from 'react';

interface LeaderboardEntry {
  name: string;
  score: number;
}

const API_URL = 'http://localhost:3001/api';

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = () => {
    fetch(`${API_URL}/leaderboard`)
      .then(response => response.json())
      .then(data => {
        setLeaderboard(data);
      })
      .catch(err => {
        console.error("Failed to fetch leaderboard:", err);
        setError("Failed to load leaderboard. Please try again later.");
      });
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ol>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            {entry.name}: {Math.floor(entry.score)}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;