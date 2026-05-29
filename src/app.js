require('dotenv').config();
const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static frontend from public/
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use('/tasks', taskRoutes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server laeuft auf Port ${PORT}`);
  });
}

module.exports = app;
