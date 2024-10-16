import express from 'express';
import cors from 'cors';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const app = express();
const port = 3001;

// Database setup
const adapter = new JSONFile('db.json');
const db = new Low(adapter);

// Default data
db.data = db.data || { players: [], leaderboard: [] };

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from the Vite dev server
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Initialize database
await db.read();

// Get game state
app.get('/api/game-state', async (req, res) => {
  await db.read();
  res.json(db.data);
});

// Update player score
app.post('/api/update-score', async (req, res) => {
  const { playerName, score } = req.body;
  await db.read();
  
  const playerIndex = db.data.players.findIndex(p => p.name === playerName);
  
  if (playerIndex !== -1) {
    db.data.players[playerIndex].score = score;
  } else {
    db.data.players.push({ name: playerName, score });
  }

  // Update leaderboard
  db.data.leaderboard = [...db.data.players]
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  await db.write();
  res.json({ message: 'Score updated successfully' });
});

// Add a new player
app.post('/api/add-player', async (req, res) => {
  const { playerName } = req.body;
  await db.read();
  
  if (!db.data.players.some(p => p.name === playerName)) {
    db.data.players.push({ name: playerName, score: 0 });
    await db.write();
    res.json({ message: 'Player added successfully' });
  } else {
    res.status(400).json({ message: 'Player already exists' });
  }
});

// Get player stats
app.get('/api/player/:name', async (req, res) => {
  const { name } = req.params;
  await db.read();
  
  const player = db.data.players.find(p => p.name === name);
  if (player) {
    res.json(player);
  } else {
    res.status(404).json({ message: 'Player not found' });
  }
});

// Get leaderboard
app.get('/api/leaderboard', async (req, res) => {
  await db.read();
  res.json(db.data.leaderboard);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});