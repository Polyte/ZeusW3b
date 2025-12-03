# 📋 Installation Checklist

Complete this checklist to ensure your ZeusLabs website is properly set up and configured.

## ✅ Pre-Installation Requirements

- [ ] **Node.js 18+** installed (`node -v` should show 18.0.0 or higher)
- [ ] **NPM 8+** available (`npm -v` should show 8.0.0 or higher)  
- [ ] **Git** installed for version control
- [ ] **Code editor** (VS Code recommended with included extensions)
- [ ] **Modern browser** for testing (Chrome, Firefox, Safari, Edge)

## ✅ Repository Setup

- [ ] **Clone repository**: `git clone <repository-url>`
- [ ] **Navigate to directory**: `cd zeuslabs-website`
- [ ] **Verify file structure**: Ensure all required files are present

## ✅ Dependencies Installation

### Automated Setup (Recommended)
- [ ] **Run setup script**: `npm run setup`
- [ ] **Verify no errors** in setup output

### Manual Setup (Alternative)
- [ ] **Install dependencies**: `npm install`
- [ ] **Check for vulnerabilities**: `npm audit`
- [ ] **Fix vulnerabilities**: `npm audit fix` (if needed)

## ✅ Environment Configuration

- [ ] **Copy environment file**: `.env.example` → `.env.local`
- [ ] **Configure Supabase URL**: Add your project URL
- [ ] **Configure Supabase Key**: Add your anon key
- [ ] **Set contact information**: Update contact details
- [ ] **Verify environment**: No placeholder values remain

### Required Environment Variables
```env
✅ VITE_SUPABASE_URL=https://your-project.supabase.co
✅ VITE_SUPABASE_ANON_KEY=your_anon_key_here
✅ VITE_CONTACT_EMAIL=hello@zeuslabs.site
✅ VITE_CONTACT_PHONE=+27726911887
✅ VITE_CONTACT_ADDRESS=Sandton, Johannesburg, 2090, South Africa
```

## ✅ Assets Configuration

- [ ] **Logo design verified**: Simple "Z" letter displays correctly
- [ ] **Logo typography verified**: Josefin Sans font loads and renders properly
- [ ] **Logo animations verified**: Subtle hover effects work smoothly
- [ ] **Logo responsiveness verified**: Scales properly across different sizes
- [ ] **Theme compatibility verified**: Logo works in both light and dark themes
- [ ] **Accessibility verified**: High contrast and readable in all contexts
- [ ] **Favicon created**: Browser tab shows custom favicon (optional)
- [ ] **Manifest configured**: PWA settings are correct (optional)

## ✅ Supabase Setup

- [ ] **Supabase project created**: Account setup and project initialized
- [ ] **Database accessible**: Connection working
- [ ] **API keys obtained**: URL and anon key available
- [ ] **Authentication enabled**: For admin and chat features
- [ ] **Storage configured**: For file uploads (optional)
- [ ] **Edge functions deployed**: For server functionality (optional)

## ✅ Development Environment

- [ ] **Development server starts**: `npm run dev` works without errors
- [ ] **Application loads**: http://localhost:3000 accessible
- [ ] **No console errors**: Browser dev tools show no critical errors
- [ ] **All pages accessible**: Navigation between pages works
- [ ] **Responsive design**: Works on mobile and desktop
- [ ] **Dark/light mode toggle**: Theme switcher functional

## ✅ Code Quality Checks

- [ ] **Type checking passes**: `npm run type-check` succeeds
- [ ] **Linting passes**: `npm run lint` succeeds  
- [ ] **Build succeeds**: `npm run build` completes successfully
- [ ] **Preview works**: `npm run preview` serves built application

## ✅ Feature Testing

### Core Features
- [ ] **Homepage loads**: Hero section displays correctly
- [ ] **Service pages work**: All 6 service detail pages accessible
- [ ] **Projects section**: Portfolio displays properly
- [ ] **About page**: Company information shows correctly
- [ ] **Contact form**: Form submits without errors
- [ ] **Blog section**: Blog posts display correctly

### Interactive Features
- [ ] **Navigation**: Header navigation works on all pages
- [ ] **Service requests**: Request forms submit successfully
- [ ] **Chat widget**: Floating chat component appears
- [ ] **Admin panel**: Accessible via `?admin=true` parameter
- [ ] **Search functionality**: If implemented, works correctly
- [ ] **Newsletter signup**: Email subscription works

### Performance Features
- [ ] **Page transitions**: Smooth animations between pages
- [ ] **Loading states**: Preloader displays correctly
- [ ] **Image optimization**: Images load efficiently
- [ ] **Mobile performance**: Good performance on mobile devices

## ✅ Production Readiness

- [ ] **Environment variables set**: Production values configured
- [ ] **Build optimization**: `npm run build` creates optimized bundle
- [ ] **Bundle size acceptable**: Check with `ls -la dist/`
- [ ] **SEO meta tags**: Proper titles and descriptions
- [ ] **Social media tags**: Open Graph and Twitter cards
- [ ] **Sitemap present**: `/public/sitemap.xml` exists
- [ ] **Robots.txt configured**: `/public/robots.txt` setup

## ✅ Deployment Preparation

### Choose Your Platform
- [ ] **Vercel**: `vercel.json` configuration reviewed
- [ ] **Netlify**: `netlify.toml` configuration reviewed  
- [ ] **Docker**: Docker files tested locally
- [ ] **Static hosting**: Built files ready for upload

### Final Checks
- [ ] **Domain configured**: Custom domain settings (if applicable)
- [ ] **SSL certificate**: HTTPS enabled
- [ ] **Environment variables**: Production secrets configured
- [ ] **Monitoring setup**: Error tracking configured (optional)
- [ ] **Analytics**: Google Analytics or similar (optional)

## ✅ Post-Deployment Verification

- [ ] **Site accessibility**: Production URL loads correctly
- [ ] **All pages working**: Navigate through entire site
- [ ] **Forms functional**: Contact and service request forms work
- [ ] **Admin access**: Admin panel accessible in production
- [ ] **Mobile compatibility**: Test on actual mobile devices
- [ ] **Performance metrics**: Check PageSpeed Insights score
- [ ] **SEO validation**: Verify search engine visibility

## 🚨 Troubleshooting

If any step fails:
1. **Check TROUBLESHOOTING.md** for specific solutions
2. **Verify Node.js version**: Must be 18+
3. **Clear caches**: `npm cache clean --force`
4. **Reset installation**: Delete `node_modules` and reinstall
5. **Check logs**: Look for specific error messages
6. **Contact support**: hello@zeuslabs.site if issues persist

## 📞 Support Resources

- **Documentation**: README.md (comprehensive guide)
- **Troubleshooting**: TROUBLESHOOTING.md (common issues)
- **Code Quality**: ESLint and TypeScript configurations included
- **Development Tools**: VS Code settings and extensions recommended
- **Deployment Guides**: Platform-specific configuration files included

---

**Estimated Setup Time**: 15-30 minutes for basic setup, 1-2 hours including customization and deployment.