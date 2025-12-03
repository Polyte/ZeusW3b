# 🔧 Troubleshooting Guide

This guide helps you resolve common issues when setting up and running the ZeusLabs website.

## 🚨 Common Issues

### 1. Node.js Version Issues

**Problem**: "Node.js version 18 or higher is required"

**Solution**:
```bash
# Check your Node.js version
node -v

# Install Node.js 18+ using nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

# Or download from nodejs.org
# Visit: https://nodejs.org/en/download/
```

### 2. Package Installation Failures

**Problem**: `npm install` fails with permission errors

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# On Windows, you might need to run as administrator
# On macOS/Linux, avoid using sudo with npm
```

### 3. Environment Variables Not Working

**Problem**: Application shows "Missing Supabase configuration"

**Solution**:
```bash
# Ensure .env.local exists and has correct format
cp .env.example .env.local

# Edit .env.local with your actual values:
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_actual_anon_key

# Restart the development server
npm run dev
```

### 4. Zeus Logo Not Displaying

**Problem**: Broken images or default placeholders showing

**Solution**:
1. Ensure `zeus-logo.png` is in the `/public` directory
2. Check file permissions: `chmod 644 public/zeus-logo.png`
3. Verify image format (PNG recommended)
4. Clear browser cache: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

### 5. Build Failures

**Problem**: `npm run build` fails with TypeScript errors

**Solution**:
```bash
# Run type checking to see specific errors
npm run type-check

# Run linting to fix code style issues
npm run lint

# Clean and rebuild
npm run clean
npm install
npm run build
```

### 6. Port 3000 Already in Use

**Problem**: "Port 3000 is already in use"

**Solution**:
```bash
# Find and kill process using port 3000
lsof -ti:3000 | xargs kill -9

# Or start on a different port
npm run dev -- --port 3001
```

### 7. Supabase Connection Issues

**Problem**: "Failed to connect to Supabase"

**Solution**:
1. Verify your Supabase project is active
2. Check your internet connection
3. Confirm API keys are correct and not expired
4. Ensure Supabase project region matches your location
5. Check Supabase service status: https://status.supabase.com/

### 8. Docker Issues

**Problem**: Docker containers not starting

**Solution**:
```bash
# Ensure Docker is running
docker --version
docker-compose --version

# Rebuild containers
docker-compose down
docker-compose build --no-cache
docker-compose up

# Check logs
docker-compose logs zeuslabs-app
```

### 9. Deployment Failures

**Problem**: Deployment to Vercel/Netlify fails

**Solution**:
```bash
# Ensure build works locally first
npm run build

# Check environment variables are set in hosting platform
# Verify build command and output directory settings
# For Vercel: Build Command = "npm run build", Output Directory = "dist"
# For Netlify: Build Command = "npm run build", Publish Directory = "dist"

# Check deployment logs in platform dashboard
```

### 10. Performance Issues

**Problem**: Slow loading or poor performance

**Solution**:
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Enable production optimizations
# Ensure images are optimized
# Check network requests in browser dev tools
# Consider implementing lazy loading
```

## 🐛 Debug Mode

Enable debug mode to get more detailed error information:

```bash
# Set debug environment variable
export DEBUG=true

# Or in .env.local
DEBUG=true

# Run with verbose logging
npm run dev -- --debug
```

## 📊 Performance Monitoring

Monitor your application performance:

```bash
# Check bundle size
npm run build && ls -la dist/

# Analyze dependencies
npx depcheck

# Check for security vulnerabilities
npm audit

# Fix security issues
npm audit fix
```

## 🆘 Getting Help

If you continue to experience issues:

1. **Check the logs**: Look for specific error messages in the console
2. **Browser DevTools**: Check the Network and Console tabs for errors
3. **Clear everything**: Remove `node_modules`, `.env.local`, and start fresh
4. **Check versions**: Ensure all dependencies are compatible
5. **Community support**: Search for similar issues on GitHub or Stack Overflow

### Quick Reset Commands

```bash
# Nuclear reset (start completely fresh)
rm -rf node_modules package-lock.json .env.local dist
npm install
cp .env.example .env.local
# Edit .env.local with your values
npm run dev
```

### System Requirements

- **Node.js**: 18.0.0 or higher
- **NPM**: 8.0.0 or higher  
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **Browser**: Modern browser with ES2020 support

### Contact Support

For ZeusLabs-specific issues:
- **Email**: hello@zeuslabs.site
- **Phone**: +27 726911 887

Include the following information when reporting issues:
- Operating system and version
- Node.js and npm versions
- Full error message
- Steps to reproduce the issue
- Browser and version (for UI issues)