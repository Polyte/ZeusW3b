# ZeusLabs Website

A modern, responsive website for ZeusLabs - showcasing expertise in software development, web development, cybersecurity, and game development.

## 🚀 Features

- **Modern Design**: Built with React 18, TypeScript, and Tailwind CSS v4
- **Smooth Animations**: Powered by Motion (Framer Motion)
- **Multi-page Application**: Complete routing system with page transitions
- **Admin Dashboard**: Comprehensive content management system
- **Real-time Chat**: Customer support integration
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags and structured data
- **Performance Optimized**: Code splitting and lazy loading
- **Supabase Integration**: Backend functionality for data management
- **Stock Images System**: Comprehensive image management with Unsplash integration

## 📸 Stock Images Integration

### Comprehensive Image System
The ZeusLabs website includes a complete stock image management system using high-quality Unsplash images:

#### Image Categories
- **Hero/Banner Images** - Technology and innovation themed backgrounds
- **Service Images** - Specific images for each service category (Software Development, Web Development, Cybersecurity, Game Development, Cloud Solutions, Mobile Apps)
- **Project Images** - Industry-specific project visuals (Fintech, Healthcare, E-commerce, Gaming, Education, Logistics)
- **Team Images** - Professional headshots for team members and testimonials
- **Blog Images** - Relevant images for blog posts and articles
- **Background Images** - Abstract and geometric patterns for sections

#### Technical Features
- **StockImage Component** - Smart image loading with fallbacks and skeleton states
- **Optimized Loading** - Automatic image optimization with width/height parameters
- **Error Handling** - Graceful fallbacks when images fail to load
- **Performance** - Lazy loading and progressive enhancement
- **Responsive** - Automatic sizing for different screen sizes
- **Accessibility** - Proper alt text and semantic markup

#### Image Variants
- **HeroImage** - High-priority hero images with immediate loading
- **CardImage** - Standard card images with lazy loading
- **ProfileImage** - Circular profile images for team members
- **BannerImage** - Full-width banner images for sections

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4, CSS-in-JS animations
- **Animation**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Backend**: Supabase
- **Forms**: React Hook Form
- **UI Components**: Custom shadcn/ui components

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm or yarn
- Git

## 🚦 Getting Started

### Option 1: Quick Setup (Recommended)
```bash
git clone <your-repository-url>
cd zeuslabs-website
chmod +x scripts/setup.sh
./scripts/setup.sh
```

### Option 2: Manual Setup

#### 1. Clone the repository
```bash
git clone <your-repository-url>
cd zeuslabs-website
```

#### 2. Install dependencies
```bash
npm install
# or
yarn install
```

#### 3. Environment Setup
Copy the environment variables file and configure it:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your configuration:
```env
# Required - Supabase Configuration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Optional - Application Configuration
VITE_APP_NAME=ZeusLabs
VITE_APP_DESCRIPTION=Professional Technology Solutions
VITE_APP_URL=http://localhost:3000

# Contact Information
VITE_CONTACT_EMAIL=hello@zeuslabs.site
VITE_CONTACT_PHONE=+27726911887
VITE_CONTACT_ADDRESS=Sandton, Johannesburg, 2090, South Africa
```

#### 4. Logo Design
The ZeusLabs logo features the mythological Zeus with his lightning bolt in a modern circular gradient design.

**Logo specifications:**
- **Primary Logo**: Zeus figure with lightning bolt in circular purple-to-teal gradient + "ZeusLabs" text
- **Icon Logo**: Compact version of the Zeus logo for smaller spaces
- **Design**: Mythological Zeus figure with lightning bolt, white line art style
- **Background**: Purple to teal gradient in circular format
- **Text**: "ZEUS" prominently displayed with "ZeusLabs" branding
- **Animation**: Subtle scale, rotation, and glow effects on hover
- **Format**: High-quality PNG with transparent elements
- **Usage**: Professional branding that combines mythology with modern design
- **Accessibility**: High contrast figure against gradient background

#### 5. Start the development server
```bash
npm run dev
# or
yarn dev
```

The application will open in your browser at `http://localhost:3000`

### 🔧 Development Tools

#### Type Checking
```bash
npm run type-check
```

#### Linting
```bash
npm run lint
```

#### Build Production Version
```bash
npm run build
```

#### Preview Production Build
```bash
npm run preview
```

## 🏗️ Project Structure

```
zeuslabs-website/
├── public/                 # Static assets
├── src/
│   └── main.tsx           # Application entry point
├── components/            # React components
│   ├── pages/            # Page components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── projects/         # Project-related components
│   └── services/         # Service-related components
├── constants/            # Application constants
├── styles/              # Global styles
├── utils/               # Utility functions
├── supabase/           # Supabase configuration
├── App.tsx             # Main app component
└── package.json
```

## 🎨 Customization

### Colors
The color system is defined in `styles/globals.css`. You can customize the color palette by modifying the CSS variables in the `:root` section.

### Typography
The website uses Josefin Sans font. Typography settings can be modified in the global CSS file.

### Components
All UI components are located in the `components/` directory and use Tailwind CSS for styling.

## 🚀 Building for Production

### Quick Build & Deploy
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

### Manual Build Process

#### Build the application
```bash
npm run build
# or
yarn build
```

#### Preview the production build locally
```bash
npm run preview
# or
yarn preview
```

The built files will be in the `dist` directory, ready for deployment.

## 🧪 Development

### Type checking
```bash
npm run type-check
# or
yarn type-check
```

### Linting
```bash
npm run lint
# or
yarn lint
```

## 📱 Features Overview

### Pages
- **Home**: Hero section with services overview
- **Services**: Detailed service offerings
- **Projects**: Portfolio showcase
- **About**: Company information and team
- **Blog**: Company updates and insights
- **Contact**: Contact form and information

### Admin Features
- Content management dashboard
- Project portfolio management
- Blog post management
- Service request handling
- Customer chat management

### Supabase Integration
- User authentication
- Data storage and retrieval
- Real-time functionality
- File storage

## 🌍 Deployment

The application can be deployed to various platforms. Configuration files are included for popular hosting services.

### Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Configure environment variables in Vercel dashboard
4. Automatic deployments on push to main branch

**Included files:**
- `vercel.json` - Vercel configuration
- `.github/workflows/ci.yml` - GitHub Actions CI/CD

### Netlify
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Run: `netlify deploy`
3. For production: `netlify deploy --prod`
4. Configure environment variables in Netlify dashboard

**Included files:**
- `netlify.toml` - Netlify configuration

### Docker Deployment
For containerized deployment: 

#### Development
```bash
docker-compose up zeuslabs-dev
```

#### Production
```bash
docker-compose up zeuslabs-app
```

**Included files:**
- `Dockerfile` - Production container
- `Dockerfile.dev` - Development container  
- `docker-compose.yml` - Docker Compose configuration
- `nginx.conf` - Nginx configuration for production

### Static Hosting (GitHub Pages, AWS S3, etc.)
1. Run `npm run build`
2. Upload the `dist` directory contents to your hosting service
3. Configure your hosting service to serve `index.html` for all routes

### VPS/Server Deployment
1. Build the application: `npm run build`
2. Use the included `nginx.conf` for Nginx configuration
3. Serve the `dist` directory
4. Configure SSL certificates (Let's Encrypt recommended)

## 🔧 Configuration

### Environment Variables
See `.env.example` for all available configuration options.

### Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings → API
3. Add them to your `.env.local` file:
   ```env
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```
4. The application uses a simple key-value store table that is automatically created
5. For advanced features, you may need to set up additional tables through the Supabase dashboard

#### Required Supabase Configuration:
- **Authentication**: Enabled for admin panel and chat features
- **Database**: Key-value store table (automatically managed)
- **Storage**: For file uploads in projects and blog posts
- **Edge Functions**: For server-side functionality (optional)

#### Security Notes:
- Never expose your `SUPABASE_SERVICE_ROLE_KEY` in client-side code
- Use Row Level Security (RLS) policies for sensitive data
- Configure proper CORS settings in Supabase dashboard

## 🔧 Services Content

The website includes comprehensive service pages for:

### 🖥️ Software Development
- **Starting from**: R280,000
- **Technologies**: React, Node.js, Python, Java, PostgreSQL, MongoDB, Docker, Kubernetes
- **Features**: Custom enterprise applications, API development, microservices architecture

### 🌐 Web Development  
- **Starting from**: R150,000
- **Technologies**: React, Next.js, Vue.js, TypeScript, Tailwind CSS, GraphQL
- **Features**: Responsive design, PWAs, e-commerce platforms, SEO optimization

### 🛡️ Cybersecurity
- **Starting from**: R220,000
- **Technologies**: Python, SIEM tools, penetration testing tools, firewalls
- **Features**: Security assessments, penetration testing, 24/7 monitoring

### 🎮 Game Development
- **Starting from**: R450,000
- **Technologies**: Unity, Unreal Engine, C#, C++, Blender, Maya
- **Features**: Mobile games, VR/AR experiences, multiplayer systems

### ☁️ Cloud Solutions
- **Starting from**: R180,000
- **Technologies**: AWS, Azure, Google Cloud, Terraform, Kubernetes, Docker
- **Features**: Cloud migration, infrastructure as code, DevOps pipelines

### 📱 Mobile Apps
- **Starting from**: R280,000
- **Technologies**: React Native, Flutter, Swift, Kotlin, Firebase
- **Features**: Native iOS/Android apps, cross-platform development, app store optimization

All pricing is displayed in South African Rands (ZAR) and includes comprehensive service descriptions, process workflows, and client testimonials.

## 📞 Support

For support and questions:
- **Email**: hello@zeuslabs.site
- **Phone**: +27 726911 887
- **Address**: Sandton, Johannesburg, 2090, South Africa

### Development Support
- Check the `scripts/` directory for helpful automation scripts
- Use the included Docker configuration for consistent environments
- Follow the CI/CD pipeline in `.github/workflows/` for automated deployments
- Refer to the comprehensive error handling in the codebase

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Made with ❤️ by ZeusLabs
```