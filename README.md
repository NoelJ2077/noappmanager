# noappmanager

Einfacher Task-Manager als REST-API. Entwickelt im Rahmen des M324 DevOps-Moduls an der Benedict Schule.

## Team
- **Ahmed** – Commits 1, 3, 4, 7
- **Noel** – Commits 2, 5, 6, 8

## Technischer Stack
- **Runtime:** Node.js 18+
- **Framework:** Express
- **Tests:** Jest & Supertest
- **CI/CD:** GitHub Actions
- **Container:** Docker

## Setup

### Installation
```bash
npm install
```

### App starten
```bash
npm start
# Läuft auf http://localhost:3000
```

### Tests ausführen
```bash
npm test
```

### Umgebungsvariablen
```bash
cp .env.example .env
# .env anpassen
```

## API-Endpunkte

| Methode | Pfad         | Beschreibung             |
|---------|--------------|--------------------------|
| GET     | /            | Willkommensnachricht     |
| GET     | /tasks       | Alle Tasks abrufen       |
| GET     | /tasks/:id   | Einzelnen Task abrufen   |
| POST    | /tasks       | Neuen Task erstellen     |
| PUT     | /tasks/:id   | Task aktualisieren       |
| DELETE  | /tasks/:id   | Task löschen             |
