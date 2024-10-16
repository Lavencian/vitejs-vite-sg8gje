import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import Shop from './components/Shop';
import Leaderboard from './components/Leaderboard';
import Social from './components/Social';
import Boost from './components/Boost';
import { Player } from './types';
import './App.css';

const API_URL = 'http://localhost:3001/api';

const App: React.FC = () => {
  const [score, setScore] = useState(0);
  const [scorePerHour, setScorePerHour] = useState(0);
  const [players, setPlayers] = useState<Player[]>([]);
  const [activeTab, setActiveTab] = useState('game');
  const [tapsRemaining, setTapsRemaining] = useState(100);
  const [multitapCount, setMultitapCount] = useState(1);
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch initial game state
    fetch(`${API_URL}/game-state`)
      .then(response => response.json())
      .then(data => {
        setPlayers(data.players);
        // You might want to set other state variables based on the fetched data
      })
      .catch(err => {
        console.error("Failed to fetch game state:", err);
        setError("Failed to connect to the server. Please try again later.");
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prevScore => {
        const newScore = prevScore + scorePerHour / 3600;
        updateScore(newScore);
        return newScore;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [scorePerHour, playerName]);

  const updateScore = (newScore: number) => {
    if (playerName) {
      fetch(`${API_URL}/update-score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerName, score: newScore }),
      })
      .catch(err => {
        console.error("Failed to update score:", err);
        setError("Failed to update score. Please try again later.");
      });
    }
  };

  const handleTap = () => {
    if (tapsRemaining > 0) {
      setScore(prevScore => {
        const newScore = prevScore + multitapCount;
        updateScore(newScore);
        return newScore;
      });
      setTapsRemaining(prevTaps => prevTaps - 1);
    }
  };

  const buyPlayer = (player: Player) => {
    if (score >= player.cost) {
      setScore(prevScore => {
        const newScore = prevScore - player.cost;
        updateScore(newScore);
        return newScore;
      });
      setScorePerHour(prevSPH => prevSPH + player.sph);
      setPlayers(prevPlayers => [...prevPlayers, player]);
    }
  };

  const buyMultitap = () => {
    if (score >= 200) {
      setScore(prevScore => {
        const newScore = prevScore - 200;
        updateScore(newScore);
        return newScore;
      });
      setMultitapCount(prevCount => prevCount + 1);
    }
  };

  const refillTaps = () => {
    setTapsRemaining(100);
  };

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    fetch(`${API_URL}/add-player`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerName: name }),
    })
    .catch(err => {
      console.error("Failed to add player:", err);
      setError("Failed to add player. Please try again later.");
    });
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="App">
      <h1>GOAL COIN</h1>
      {!playerName ? (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={() => handleNameSubmit(playerName)}>Start Game</button>
        </div>
      ) : (
        <>
          <div className="stats">
            <p>Score: {Math.floor(score)}</p>
            <p>Score/Hour: {scorePerHour.toFixed(1)}</p>
            <p>Taps: {tapsRemaining}</p>
            <p>Multitap: x{multitapCount}</p>
          </div>
          <div className="tabs">
            <button onClick={() => setActiveTab('game')} className={activeTab === 'game' ? 'active' : ''}>Game</button>
            <button onClick={() => setActiveTab('shop')} className={activeTab === 'shop' ? 'active' : ''}>Shop</button>
            <button onClick={() => setActiveTab('boost')} className={activeTab === 'boost' ? 'active' : ''}>Boost</button>
            <button onClick={() => setActiveTab('social')} className={activeTab === 'social' ? 'active' : ''}>Social</button>
            <button onClick={() => setActiveTab('leaderboard')} className={activeTab === 'leaderboard' ? 'active' : ''}>Leaderboard</button>
          </div>
          {activeTab === 'game' && <Game onTap={handleTap} players={players} tapsRemaining={tapsRemaining} />}
          {activeTab === 'shop' && <Shop score={score} onBuy={buyPlayer} />}
          {activeTab === 'boost' && <Boost score={score} onBuyMultitap={buyMultitap} onRefill={refillTaps} tapsRemaining={tapsRemaining} />}
          {activeTab === 'social' && <Social />}
          {activeTab === 'leaderboard' && <Leaderboard />}
        </>
      )}
    </div>
  );
};

export default App;