#!/usr/bin/env bash
set -e

echo "📦 Installing dependencies..."

# Backend setup
echo "📁 Installing backend dependencies..."
cd backend
npm install

echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🚀 Running migrations..."
npx prisma migrate dev --name init

echo "🌱 Seeding database..."
npm run seed

cd ..

# Frontend setup
echo "📁 Installing frontend dependencies..."
cd frontend
npm install

cd ..

echo "✅ Project initialized successfully!"
echo
echo "Next steps:"
echo "➡  To start backend: cd backend && npm run dev"
echo "➡  To start frontend: cd frontend && npm run dev"
