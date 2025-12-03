#!/bin/bash
# ZeusLabs Website Setup Script
# This script sets up the development environment for the ZeusLabs website

echo "🚀 Setting up ZeusLabs Website..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local file..."
    cp .env.example .env.local
    echo "⚠️  Please update .env.local with your Supabase credentials"
fi

# Run type check
echo "🔍 Running type check..."
npm run type-check

# Run linting
echo "🧹 Running linting..."
npm run lint

echo "✅ Setup complete! Run 'npm run dev' to start the development server."
echo "📖 Check README.md for detailed configuration instructions."