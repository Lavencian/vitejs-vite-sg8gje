import React from 'react';
import { Player } from '../types';

const shopPlayers: Player[] = [
  { name: 'Antony', cost: 10, sph: 36 },
  { name: 'Rashford', cost: 15, sph: 40 },
  { name: 'Eriksen', cost: 20, sph: 45 },
  { name: 'Messi', cost: 50, sph: 180 },
  { name: 'Ronaldo', cost: 55, sph: 185 },
  { name: 'Neymar', cost: 60, sph: 190 },
  { name: 'Yamal', cost: 100, sph: 360 },
  { name: 'Wirtz', cost: 110, sph: 370 },
  { name: 'Saka', cost: 120, sph: 380 },
  { name: 'Pele', cost: 500, sph: 1800 },
  { name: 'Maradona', cost: 550, sph: 1900 },
  { name: 'Henry', cost: 600, sph: 2000 },
];

interface ShopProps {
  score: number;
  onBuy: (player: Player) => void;
}

const Shop: React.FC<ShopProps> = ({ score, onBuy }) => {
  const rookies = shopPlayers.slice(0, 3);
  const pros = shopPlayers.slice(3, 6);
  const stars = shopPlayers.slice(6, 9);
  const legends = shopPlayers.slice(9);

  return (
    <div className="shop">
      <h2>Player Shop</h2>
      <h3>Rookie Players</h3>
      {rookies.map((player, index) => (
        <div key={index} className="shop-item">
          <span>{player.name}</span>
          <span>Cost: {player.cost} score</span>
          <span>Score/Hour: {player.sph}</span>
          <button onClick={() => onBuy(player)} disabled={score < player.cost}>
            Buy
          </button>
        </div>
      ))}
      <h3>Pro Players</h3>
      {pros.map((player, index) => (
        <div key={index + 3} className="shop-item">
          <span>{player.name}</span>
          <span>Cost: {player.cost} score</span>
          <span>Score/Hour: {player.sph}</span>
          <button onClick={() => onBuy(player)} disabled={score < player.cost}>
            Buy
          </button>
        </div>
      ))}
      <h3>Star Players</h3>
      {stars.map((player, index) => (
        <div key={index + 6} className="shop-item">
          <span>{player.name}</span>
          <span>Cost: {player.cost} score</span>
          <span>Score/Hour: {player.sph}</span>
          <button onClick={() => onBuy(player)} disabled={score < player.cost}>
            Buy
          </button>
        </div>
      ))}
      <h3>Legend Players</h3>
      {legends.map((player, index) => (
        <div key={index + 9} className="shop-item">
          <span>{player.name}</span>
          <span>Cost: {player.cost} score</span>
          <span>Score/Hour: {player.sph}</span>
          <button onClick={() => onBuy(player)} disabled={score < player.cost}>
            Buy
          </button>
        </div>
      ))}
    </div>
  );
};

export default Shop;