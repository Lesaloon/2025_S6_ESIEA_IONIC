#!/bin/bash

echo "📦 Building Angular app for production..."
ionic build

if [ $? -ne 0 ]; then
  echo "❌ Angular build failed. Exiting."
  exit 1
fi

echo "🔄 Syncing Capacitor..."
npx cap sync android

if [ $? -ne 0 ]; then
  echo "❌ Capacitor sync failed. Exiting."
  exit 1
fi

echo "📲 Opening Android project..."
npx cap open android
