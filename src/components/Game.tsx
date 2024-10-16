import React, { useState, useEffect } from 'react';
import { Player } from '../types';

interface GameProps {
  onTap: () => void;
  players: Player[];
  tapsRemaining: number;
}

const Game: React.FC<GameProps> = ({ onTap, players, tapsRemaining }) => {
  const [score, setScore] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });

  const handleTap = () => {
    if (tapsRemaining > 0) {
      onTap();
      setScore(prevScore => prevScore + 1);
      setShowAnimation(true);
      setBallPosition({
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10
      });
      setTimeout(() => setShowAnimation(false), 500);
    }
  };

  useEffect(() => {
    const resetScore = setTimeout(() => setScore(0), 5000);
    return () => clearTimeout(resetScore);
  }, [score]);

  return (
    <div className="game">
      <div className="soccer-field" onClick={handleTap}>
        <div 
          className={`ball ${showAnimation ? 'animate' : ''}`}
          style={{ left: `${ballPosition.x}%`, top: `${ballPosition.y}%` }}
        ></div>
        {players.map((player, index) => (
          <div 
            key={index} 
            className={`player player-${player.name.toLowerCase()}`} 
            style={{ left: `${Math.random() * 80 + 10}%`, top: `${Math.random() * 80 + 10}%` }}
          >
            {player.name[0]}
          </div>
        ))}
      </div>
      <div className={`score ${showAnimation ? 'animate' : ''}`}>GOAL!</div>
      <div className="current-score">Goals: {score}</div>
      <button className="tap-button" onClick={handleTap} disabled={tapsRemaining === 0}>
        {tapsRemaining > 0 ? 'Tap to Score!' : 'Refill Taps!'}
      </button>
    </div>
  );
};

export default Game;