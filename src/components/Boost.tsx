import React from 'react';

interface BoostProps {
  score: number;
  onBuyMultitap: () => void;
  onRefill: () => void;
  tapsRemaining: number;
}

const Boost: React.FC<BoostProps> = ({ score, onBuyMultitap, onRefill, tapsRemaining }) => {
  return (
    <div className="boost">
      <h2>Boost Shop</h2>
      <div className="boost-item">
        <span>Multitap</span>
        <span>Cost: 200 coins</span>
        <button onClick={onBuyMultitap} disabled={score < 200}>
          Buy Multitap
        </button>
      </div>
      <div className="boost-item">
        <span>Refill Taps</span>
        <span>Taps Remaining: {tapsRemaining}</span>
        <button onClick={onRefill} disabled={tapsRemaining > 0}>
          Refill Taps
        </button>
      </div>
    </div>
  );
};

export default Boost;