#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up ZeusLabs Website...\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
    console.error(`❌ Node.js version 18 or higher is required. Current version: ${nodeVersion}`);
    process.exit(1);
}

console.log(`✅ Node.js version: ${nodeVersion}`);

// Install dependencies
console.log('📦 Installing dependencies...');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully');
} catch (error) {
    console.error('❌ Failed to install dependencies');
    process.exit(1);
}

// Create .env.local if it doesn't exist
const envLocalPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envLocalPath)) {
    console.log('🔧 Creating .env.local file...');
    if (fs.existsSync(envExamplePath)) {
        fs.copyFileSync(envExamplePath, envLocalPath);
        console.log('✅ .env.local created from .env.example');
        console.log('⚠️  Please update .env.local with your Supabase credentials');
    } else {
        console.log('⚠️  .env.example not found, creating basic .env.local');
        fs.writeFileSync(envLocalPath, `# ZeusLabs Environment Variables
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_APP_NAME=ZeusLabs
VITE_APP_DESCRIPTION=Professional Technology Solutions
VITE_APP_URL=http://localhost:3000
`);
    }
} else {
    console.log('✅ .env.local already exists');
}

// Check for Zeus logo
const logoPath = path.join(process.cwd(), 'public', 'zeus-logo.png');
if (!fs.existsSync(logoPath)) {
    console.log('⚠️  Zeus logo not found at /public/zeus-logo.png');
    console.log('   Please add the Zeus logo image to complete the setup');
}

// Run type check
console.log('🔍 Running type check...');
try {
    execSync('npm run type-check', { stdio: 'inherit' });
    console.log('✅ Type check passed');
} catch (error) {
    console.log('⚠️  Type check failed - please fix TypeScript errors');
}

// Run linting
console.log('🧹 Running linting...');
try {
    execSync('npm run lint', { stdio: 'inherit' });
    console.log('✅ Linting passed');
} catch (error) {
    console.log('⚠️  Linting failed - please fix code style issues');
}

console.log('\n🎉 Setup complete!');
console.log('📝 Next steps:');
console.log('   1. Update .env.local with your Supabase credentials');
console.log('   2. Add zeus-logo.png to the /public directory');
console.log('   3. Run "npm run dev" to start the development server');
console.log('   4. Visit http://localhost:3000 to see your application');
console.log('\n📖 Check README.md for detailed configuration instructions.');