require('dotenv').config();
const express = require('express');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Willkommen beim noappmanager!' });
});

app.use('/tasks', taskRoutes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server laeuft auf Port ${PORT}`);
  });
}

module.exports = app;
