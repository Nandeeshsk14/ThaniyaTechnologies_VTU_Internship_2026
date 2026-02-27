const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory storage (replace with a DB like MongoDB/PostgreSQL in production)
let users = [];
let nextId = 1;

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST create user
app.post('/api/users', (req, res) => {
  const { username } = req.body;
  if (!username || username.trim() === '') {
    return res.status(400).json({ error: 'Username is required' });
  }
  const exists = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase());
  if (exists) {
    return res.status(409).json({ error: 'Username already exists' });
  }
  const user = { id: nextId++, username: username.trim() };
  users.push(user);
  res.status(201).json(user);
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { username } = req.body;
  if (!username || username.trim() === '') {
    return res.status(400).json({ error: 'Username is required' });
  }
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  const duplicate = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase() && u.id !== id);
  if (duplicate) return res.status(409).json({ error: 'Username already exists' });
  users[index].username = username.trim();
  res.json(users[index]);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(index, 1);
  res.json({ message: 'User deleted' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
