const express = require('express');
const app = express();

app.use(express.json()); // Parses incoming JSON requests

const studentRoutes = require('./routes/studentRoutes');
app.use('/students', studentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});