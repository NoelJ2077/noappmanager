#!/bin/bash
set -e

APP_DIR=${APP_DIR:-/opt/noappmanager}
REPO_URL=${REPO_URL:-https://github.com/NoelJ2077/noappmanager.git}
BRANCH=${BRANCH:-main}

echo "==> Deployment von noappmanager wird gestartet..."

if [ ! -d "$APP_DIR/.git" ]; then
  echo "==> Repository klonen nach $APP_DIR ..."
  git clone -b "$BRANCH" "$REPO_URL" "$APP_DIR"
else
  echo "==> Repository aktualisieren..."
  cd "$APP_DIR"
  git fetch origin
  git checkout "$BRANCH"
  git pull origin "$BRANCH"
fi

cd "$APP_DIR"

echo "==> Abhaengigkeiten installieren..."
npm ci --only=production

echo "==> App neu starten..."
if command -v pm2 &> /dev/null; then
  pm2 restart noappmanager 2>/dev/null || pm2 start src/app.js --name noappmanager
else
  echo "FEHLER: pm2 nicht gefunden. Bitte installieren: npm install -g pm2"
  exit 1
fi

echo "==> Deployment erfolgreich abgeschlossen!"
