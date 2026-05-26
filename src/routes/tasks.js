const express = require('express');
const router = express.Router();

const tasks = [];
let nextId = 1;

router.get('/', (req, res) => {
  res.json(tasks);
});

router.get('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task nicht gefunden' });
  }
  res.json(task);
});

router.post('/', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Titel ist erforderlich' });
  }
  const task = {
    id: nextId++,
    title,
    description: description || '',
    done: false
  };
  tasks.push(task);
  res.status(201).json(task);
});

router.put('/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task nicht gefunden' });
  }
  const { title, description, done } = req.body;
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (done !== undefined) task.done = done;
  res.json(task);
});

router.delete('/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Task nicht gefunden' });
  }
  tasks.splice(index, 1);
  res.status(204).send();
});

router.resetTasks = () => {
  tasks.length = 0;
  nextId = 1;
};

module.exports = router;
