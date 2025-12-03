#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (prompt) => {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
};

async function deploy() {
    console.log('🚀 Deploying ZeusLabs Website...\n');

    // Check if .env.local exists and has required variables
    const envLocalPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envLocalPath)) {
        console.error('❌ .env.local file not found. Please run "npm run setup" first.');
        process.exit(1);
    }

    const envContent = fs.readFileSync(envLocalPath, 'utf8');
    if (!envContent.includes('VITE_SUPABASE_URL=') || !envContent.includes('VITE_SUPABASE_ANON_KEY=')) {
        console.error('❌ Missing Supabase configuration in .env.local');
        console.error('   Please configure your Supabase URL and API key before deploying.');
        process.exit(1);
    }

    // Run validation
    console.log('🔍 Running validation checks...');
    try {
        execSync('npm run validate', { stdio: 'inherit' });
        console.log('✅ Validation passed');
    } catch (error) {
        console.error('❌ Validation failed. Please fix errors before deploying.');
        process.exit(1);
    }

    // Build the application
    console.log('🔨 Building application...');
    try {
        execSync('npm run build', { stdio: 'inherit' });
        console.log('✅ Build successful!');
    } catch (error) {
        console.error('❌ Build failed!');
        process.exit(1);
    }

    console.log('📦 Built files are in the "dist" directory');
    console.log('🌐 Ready for deployment to your hosting service\n');

    // Check for deployment tools and offer to deploy
    const deployToVercel = await question('Deploy to Vercel? (y/n): ');
    if (deployToVercel.toLowerCase() === 'y') {
        try {
            execSync('vercel --version', { stdio: 'ignore' });
            console.log('🚀 Deploying to Vercel...');
            execSync('vercel --prod', { stdio: 'inherit' });
        } catch (error) {
            console.log('❌ Vercel CLI not installed. Install with: npm i -g vercel');
        }
    }

    const deployToNetlify = await question('Deploy to Netlify? (y/n): ');
    if (deployToNetlify.toLowerCase() === 'y') {
        try {
            execSync('netlify --version', { stdio: 'ignore' });
            console.log('🚀 Deploying to Netlify...');
            execSync('netlify deploy --prod --dir=dist', { stdio: 'inherit' });
        } catch (error) {
            console.log('❌ Netlify CLI not installed. Install with: npm i -g netlify-cli');
        }
    }

    console.log('\n✅ Deployment process complete!');
    console.log('📖 Check README.md for additional deployment options.');

    rl.close();
}

deploy().catch((error) => {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
});