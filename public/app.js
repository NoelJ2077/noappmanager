async function fetchTasks() {
  const res = await fetch('/tasks');
  return res.json();
}

function renderTasks(tasks) {
  const list = document.getElementById('tasksList');
  list.innerHTML = '';
  tasks.forEach(t => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-start';
    li.innerHTML = `
      <div class="ms-2 me-auto">
        <div class="fw-bold">${escapeHtml(t.title)}</div>
        <small>${escapeHtml(t.description || '')}</small>
      </div>
      <div>
        <button class="btn btn-sm btn-outline-secondary me-2" data-id="${t.id}" data-action="view">Ansehen</button>
        <button class="btn btn-sm btn-outline-success me-2" data-id="${t.id}" data-action="toggle">${t.done ? 'Offen' : 'Erledigt'}</button>
        <button class="btn btn-sm btn-outline-danger" data-id="${t.id}" data-action="delete">Löschen</button>
      </div>
    `;
    list.appendChild(li);
  });
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function loadAndRender() {
  const tasks = await fetchTasks();
  renderTasks(tasks);
}

document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  if (!title) return;
  await fetch('/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  });
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  await loadAndRender();
});

document.getElementById('tasksList').addEventListener('click', async (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const id = btn.dataset.id;
  const action = btn.dataset.action;
  if (action === 'view') {
    const res = await fetch('/tasks/' + id);
    const task = await res.json();
    document.getElementById('taskDetails').innerHTML = `\n      <h6>${escapeHtml(task.title)}</h6>\n      <p>${escapeHtml(task.description || '')}</p>\n      <p>Status: ${task.done ? 'Erledigt' : 'Offen'}</p>\n    `;
  } else if (action === 'toggle') {
    const res = await fetch('/tasks/' + id);
    const task = await res.json();
    await fetch('/tasks/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !task.done })
    });
    await loadAndRender();
  } else if (action === 'delete') {
    await fetch('/tasks/' + id, { method: 'DELETE' });
    document.getElementById('taskDetails').innerHTML = 'Keine Aufgabe ausgewählt.';
    await loadAndRender();
  }
});

// initial load
loadAndRender();
