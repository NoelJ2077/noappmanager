const request = require('supertest');
const app = require('../src/app');
const taskRouter = require('../src/routes/tasks');

beforeEach(() => {
  taskRouter.resetTasks();
});

describe('GET /', () => {
  it('sollte Willkommensnachricht zurueckgeben', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Willkommen beim noappmanager!');
  });
});

describe('Tasks API', () => {
  it('GET /tasks - sollte leere Liste zurueckgeben', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('POST /tasks - sollte neuen Task erstellen', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Hausaufgaben machen', description: 'Mathe und Deutsch' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Hausaufgaben machen');
    expect(res.body.done).toBe(false);
  });

  it('GET /tasks/:id - sollte einzelnen Task zurueckgeben', async () => {
    await request(app).post('/tasks').send({ title: 'Test Task' });
    const res = await request(app).get('/tasks/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('PUT /tasks/:id - sollte Task aktualisieren', async () => {
    await request(app).post('/tasks').send({ title: 'Original' });
    const res = await request(app)
      .put('/tasks/1')
      .send({ done: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.done).toBe(true);
  });

  it('DELETE /tasks/:id - sollte Task loeschen', async () => {
    await request(app).post('/tasks').send({ title: 'Zu loeschen' });
    const res = await request(app).delete('/tasks/1');
    expect(res.statusCode).toBe(204);
  });

  // ABSICHTLICHER FEHLER fuer Issue #4 - falscher Statuscode
  it('POST /tasks - sollte Fehler bei fehlendem Titel zurueckgeben', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ description: 'Kein Titel vorhanden' });
    expect(res.statusCode).toBe(200); // BUG: sollte 400 sein!
  });

  it('GET /tasks/:id - sollte 404 bei unbekannter ID zurueckgeben', async () => {
    const res = await request(app).get('/tasks/999');
    expect(res.statusCode).toBe(404);
  });
});
