#!/bin/bash
# ZeusLabs Website Deployment Script  
# This script builds and deploys the ZeusLabs website

echo "🚀 Deploying ZeusLabs Website..."

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📦 Built files are in the 'dist' directory"
    echo "🌐 Ready for deployment to your hosting service"
else
    echo "❌ Build failed!"
    exit 1
fi

# Optional: Deploy to specific platforms
read -p "Deploy to Vercel? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v vercel &> /dev/null; then
        vercel --prod
    else
        echo "❌ Vercel CLI not installed. Install with: npm i -g vercel"
    fi
fi

read -p "Deploy to Netlify? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v netlify &> /dev/null; then
        netlify deploy --prod --dir=dist
    else
        echo "❌ Netlify CLI not installed. Install with: npm i -g netlify-cli"
    fi
fi