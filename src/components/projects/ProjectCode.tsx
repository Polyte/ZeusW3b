import { motion } from "motion/react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ArrowLeft, Github, Star, GitBranch, Users, Download, Eye, Code2, FileCode, Folder, File } from "lucide-react";
import { useState } from "react";

interface ProjectCodeProps {
  projectId: string;
}

export default function ProjectCode({ projectId }: ProjectCodeProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const codeRepositories = {
    'financeflow': {
      title: "FinanceFlow - Banking Platform",
      description: "Complete source code for the revolutionary banking platform with real-time processing and AI insights.",
      category: "Software Development",
      categoryColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      repoUrl: "https://github.com/zeuslabs/financeflow",
      stats: {
        stars: "2.4k",
        forks: "485",
        contributors: "12",
        commits: "1,247"
      },
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"],
      license: "MIT",
      fileStructure: [
        {
          name: "client",
          type: "folder",
          children: [
            { name: "src", type: "folder", children: [
              { name: "components", type: "folder" },
              { name: "pages", type: "folder" },
              { name: "hooks", type: "folder" },
              { name: "utils", type: "folder" },
              { name: "types", type: "folder" },
              { name: "App.tsx", type: "file", language: "tsx" },
              { name: "index.tsx", type: "file", language: "tsx" }
            ]},
            { name: "package.json", type: "file", language: "json" },
            { name: "tsconfig.json", type: "file", language: "json" },
            { name: "Dockerfile", type: "file", language: "dockerfile" }
          ]
        },
        {
          name: "server",
          type: "folder",
          children: [
            { name: "src", type: "folder", children: [
              { name: "controllers", type: "folder" },
              { name: "models", type: "folder" },
              { name: "routes", type: "folder" },
              { name: "middleware", type: "folder" },
              { name: "services", type: "folder" },
              { name: "utils", type: "folder" },
              { name: "app.ts", type: "file", language: "typescript" },
              { name: "server.ts", type: "file", language: "typescript" }
            ]},
            { name: "package.json", type: "file", language: "json" },
            { name: "Dockerfile", type: "file", language: "dockerfile" }
          ]
        },
        {
          name: "database",
          type: "folder",
          children: [
            { name: "migrations", type: "folder" },
            { name: "seeds", type: "folder" },
            { name: "schema.sql", type: "file", language: "sql" }
          ]
        },
        {
          name: "infrastructure",
          type: "folder",
          children: [
            { name: "terraform", type: "folder" },
            { name: "kubernetes", type: "folder" },
            { name: "docker-compose.yml", type: "file", language: "yaml" }
          ]
        },
        { name: "README.md", type: "file", language: "markdown" },
        { name: ".gitignore", type: "file", language: "gitignore" },
        { name: "LICENSE", type: "file", language: "text" }
      ],
      codeExamples: {
        "client/src/App.tsx": `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';
import { Analytics } from './pages/Analytics';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/transactions" 
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;`,
        "server/src/app.ts": `import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createConnection } from 'typeorm';
import { authRoutes } from './routes/auth';
import { transactionRoutes } from './routes/transactions';
import { analyticsRoutes } from './routes/analytics';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/analytics', analyticsRoutes);

// Error handling
app.use(errorHandler);

// Database connection
createConnection().then(() => {
  logger.info('Database connected successfully');
}).catch(error => {
  logger.error('Database connection failed:', error);
});

export default app;`,
        "README.md": `# FinanceFlow - Modern Banking Platform

A revolutionary digital banking platform built with modern technologies and best practices.

## Features

- 🏦 **Real-time Banking**: Instant transaction processing and updates
- 🤖 **AI Insights**: Machine learning-powered financial recommendations
- 🔒 **Enterprise Security**: Multi-factor authentication and fraud detection
- 📱 **Mobile First**: Responsive design optimized for all devices
- 📊 **Advanced Analytics**: Comprehensive financial reporting and insights

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- React Query for state management
- React Router for navigation

### Backend
- Node.js with Express
- TypeScript for type safety
- PostgreSQL database
- Redis for caching
- JWT authentication

### Infrastructure
- Docker containerization
- Kubernetes orchestration
- AWS cloud deployment
- Terraform for IaC

## Getting Started

### Prerequisites
- Node.js 16+
- Docker
- PostgreSQL
- Redis

### Installation

1. Clone the repository
\`\`\`bash
git clone https://github.com/zeuslabs/financeflow.git
cd financeflow
\`\`\`

2. Install dependencies
\`\`\`bash
# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
\`\`\`

3. Set up environment variables
\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

4. Start the development servers
\`\`\`bash
# Start backend
npm run dev:server

# Start frontend (in another terminal)
npm run dev:client
\`\`\`

## API Documentation

### Authentication
\`\`\`
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
POST /api/auth/logout
\`\`\`

### Transactions
\`\`\`
GET /api/transactions
POST /api/transactions
GET /api/transactions/:id
PUT /api/transactions/:id
DELETE /api/transactions/:id
\`\`\`

### Analytics
\`\`\`
GET /api/analytics/spending
GET /api/analytics/income
GET /api/analytics/trends
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

ZeusLabs - [@zeuslabs](https://twitter.com/zeuslabs) - hello@zeuslabs.site

Project Link: [https://github.com/zeuslabs/financeflow](https://github.com/zeuslabs/financeflow)`
      }
    },
    'secureshield': {
      title: "SecureShield - Enterprise Security Suite",
      description: "Advanced cybersecurity platform with AI-powered threat detection and automated incident response.",
      category: "Cybersecurity",
      categoryColor: "bg-red-500/10 text-red-600 border-red-500/20",
      repoUrl: "https://github.com/zeuslabs/secureshield",
      stats: {
        stars: "3.1k",
        forks: "672",
        contributors: "18",
        commits: "2,156"
      },
      technologies: ["Python", "TensorFlow", "Elasticsearch", "Kafka", "Docker", "Kubernetes"],
      license: "Apache 2.0",
      fileStructure: [
        {
          name: "core",
          type: "folder",
          children: [
            { name: "detection", type: "folder" },
            { name: "analysis", type: "folder" },
            { name: "response", type: "folder" },
            { name: "models", type: "folder" },
            { name: "__init__.py", type: "file", language: "python" }
          ]
        },
        {
          name: "api",
          type: "folder",
          children: [
            { name: "routes", type: "folder" },
            { name: "middleware", type: "folder" },
            { name: "schemas", type: "folder" },
            { name: "app.py", type: "file", language: "python" }
          ]
        },
        {
          name: "ml",
          type: "folder",
          children: [
            { name: "models", type: "folder" },
            { name: "training", type: "folder" },
            { name: "inference", type: "folder" },
            { name: "preprocessing", type: "folder" }
          ]
        },
        {
          name: "config",
          type: "folder",
          children: [
            { name: "elasticsearch.yml", type: "file", language: "yaml" },
            { name: "kafka.yml", type: "file", language: "yaml" },
            { name: "settings.py", type: "file", language: "python" }
          ]
        },
        { name: "requirements.txt", type: "file", language: "text" },
        { name: "Dockerfile", type: "file", language: "dockerfile" },
        { name: "README.md", type: "file", language: "markdown" }
      ],
      codeExamples: {
        "core/detection/threat_detector.py": `import asyncio
import logging
from typing import Dict, List, Optional
from dataclasses import dataclass
import numpy as np
from tensorflow import keras
from elasticsearch import AsyncElasticsearch

@dataclass
class ThreatEvent:
    timestamp: str
    source_ip: str
    event_type: str
    severity: float
    raw_data: Dict

class ThreatDetector:
    def __init__(self, model_path: str, es_client: AsyncElasticsearch):
        self.model = keras.models.load_model(model_path)
        self.es_client = es_client
        self.logger = logging.getLogger(__name__)
        
    async def analyze_event(self, event_data: Dict) -> Optional[ThreatEvent]:
        """Analyze incoming security event for threats."""
        try:
            # Preprocess the event data
            features = self._extract_features(event_data)
            
            # Run ML inference
            threat_score = await self._predict_threat(features)
            
            if threat_score > 0.8:  # High threat threshold
                threat_event = ThreatEvent(
                    timestamp=event_data.get('timestamp'),
                    source_ip=event_data.get('source_ip'),
                    event_type=event_data.get('type'),
                    severity=threat_score,
                    raw_data=event_data
                )
                
                # Store in Elasticsearch for analysis
                await self._store_threat(threat_event)
                
                return threat_event
                
        except Exception as e:
            self.logger.error(f"Error analyzing event: {e}")
            
        return None
    
    def _extract_features(self, event_data: Dict) -> np.ndarray:
        """Extract numerical features from event data."""
        # Feature extraction logic
        features = [
            len(event_data.get('payload', '')),
            event_data.get('port', 0),
            event_data.get('packet_size', 0),
            # ... more features
        ]
        return np.array(features).reshape(1, -1)
    
    async def _predict_threat(self, features: np.ndarray) -> float:
        """Run ML model prediction."""
        prediction = self.model.predict(features)
        return float(prediction[0][0])
    
    async def _store_threat(self, threat: ThreatEvent):
        """Store threat event in Elasticsearch."""
        doc = {
            'timestamp': threat.timestamp,
            'source_ip': threat.source_ip,
            'event_type': threat.event_type,
            'severity': threat.severity,
            'raw_data': threat.raw_data
        }
        
        await self.es_client.index(
            index='security-threats',
            body=doc
        )`,
        "api/app.py": `from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import uvicorn
import asyncio
from core.detection.threat_detector import ThreatDetector
from core.response.incident_response import IncidentResponseManager
from elasticsearch import AsyncElasticsearch

app = FastAPI(title="SecureShield API", version="2.0.0")
security = HTTPBearer()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global instances
es_client = None
threat_detector = None
incident_manager = None

@app.on_event("startup")
async def startup_event():
    global es_client, threat_detector, incident_manager
    
    # Initialize Elasticsearch
    es_client = AsyncElasticsearch([
        {'host': 'localhost', 'port': 9200}
    ])
    
    # Initialize threat detector
    threat_detector = ThreatDetector(
        model_path="models/threat_detection_model.h5",
        es_client=es_client
    )
    
    # Initialize incident response manager
    incident_manager = IncidentResponseManager(es_client)

@app.post("/api/events/analyze")
async def analyze_security_event(
    event_data: dict,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Analyze a security event for threats."""
    try:
        threat = await threat_detector.analyze_event(event_data)
        
        if threat:
            # Trigger incident response if high severity
            if threat.severity > 0.9:
                await incident_manager.create_incident(threat)
            
            return {
                "threat_detected": True,
                "severity": threat.severity,
                "event_type": threat.event_type,
                "source_ip": threat.source_ip
            }
        else:
            return {"threat_detected": False}
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/threats")
async def get_threats(
    limit: int = 100,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """Get recent threats."""
    try:
        query = {
            "query": {"match_all": {}},
            "sort": [{"timestamp": {"order": "desc"}}],
            "size": limit
        }
        
        response = await es_client.search(
            index='security-threats',
            body=query
        )
        
        threats = [hit['_source'] for hit in response['hits']['hits']]
        return {"threats": threats}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)`
      }
    }
    // Add more repositories for other projects...
  };

  const repository = codeRepositories[projectId as keyof typeof codeRepositories];

  if (!repository) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Repository Not Found</h1>
          <Button onClick={() => window.location.hash = 'projects'}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const renderFileTree = (files: any[], level = 0) => {
    return files.map((file, index) => (
      <div key={index} style={{ marginLeft: `${level * 20}px` }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          className={`flex items-center space-x-2 py-1 px-2 rounded hover:bg-accent/50 cursor-pointer transition-colors ${
            selectedFile === file.name ? 'bg-accent' : ''
          }`}
          onClick={() => file.type === 'file' && setSelectedFile(file.name)}
        >
          {file.type === 'folder' ? (
            <Folder className="w-4 h-4 text-blue-500" />
          ) : (
            <File className="w-4 h-4 text-muted-foreground" />
          )}
          <span 
            className="text-sm font-medium"
            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
          >
            {file.name}
          </span>
        </motion.div>
        {file.children && renderFileTree(file.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-accent/20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => window.location.hash = 'projects'}
                variant="outline" 
                className="mb-8 border-2 hover:bg-accent/50 hover:border-primary/30 transition-all duration-300"
                style={{ fontFamily: 'Josefin Sans, sans-serif' }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </motion.div>
            
            <Badge className={`${repository.categoryColor} border backdrop-blur-sm font-medium mb-6`}>
              <Github className="w-3 h-3 mr-1" />
              {repository.category}
            </Badge>
            
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl mb-6 text-foreground font-bold tracking-tight leading-none"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              {repository.title}
            </h1>
            
            <p 
              className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light mb-8"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              {repository.description}
            </p>

            {/* Repository Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: "Stars", value: repository.stats.stars, icon: Star },
                { label: "Forks", value: repository.stats.forks, icon: GitBranch },
                { label: "Contributors", value: repository.stats.contributors, icon: Users },
                { label: "Commits", value: repository.stats.commits, icon: Code2 }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-card border border-border/50"
                  >
                    <IconComponent className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div 
                      className="text-2xl font-bold text-foreground"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {stat.value}
                    </div>
                    <div 
                      className="text-sm text-muted-foreground"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="btn-gradient-purple transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  <Github className="w-5 h-5 mr-2" />
                  View on GitHub
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 hover:bg-accent/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download ZIP
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Code Explorer */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto"
          >
            <h3 
              className="text-3xl font-bold text-foreground text-center mb-12"
              style={{ fontFamily: 'Josefin Sans, sans-serif' }}
            >
              Repository Explorer
            </h3>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* File Tree */}
              <div className="lg:col-span-4">
                <Card className="h-[600px] border-2 border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Folder className="w-5 h-5 text-primary" />
                      <span 
                        className="text-lg"
                        style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                      >
                        Project Structure
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="overflow-y-auto h-[500px]">
                    {renderFileTree(repository.fileStructure)}
                  </CardContent>
                </Card>
              </div>

              {/* Code Viewer */}
              <div className="lg:col-span-8">
                <Card className="h-[600px] border-2 border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileCode className="w-5 h-5 text-primary" />
                        <span 
                          className="text-lg"
                          style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                        >
                          {selectedFile || 'Select a file to view'}
                        </span>
                      </div>
                      {selectedFile && (
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Raw
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[500px] overflow-y-auto">
                    {selectedFile && repository.codeExamples[selectedFile] ? (
                      <motion.div
                        key={selectedFile}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <pre className="bg-muted/30 p-4 rounded-lg overflow-x-auto text-sm">
                          <code className="text-foreground font-mono">
                            {repository.codeExamples[selectedFile]}
                          </code>
                        </pre>
                      </motion.div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        <div className="text-center">
                          <FileCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p 
                            className="text-lg font-medium"
                            style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                          >
                            Select a file from the tree to view its contents
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technologies & License */}
      <section className="py-16 bg-gradient-to-b from-accent/5 via-background to-accent/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Technologies */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h4 
                  className="text-2xl font-bold text-foreground mb-6"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-3">
                  {repository.technologies.map((tech, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                    >
                      <Badge 
                        variant="outline" 
                        className="px-3 py-1 bg-card border-border/50 hover:border-primary/30 transition-all duration-300"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* License & Info */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h4 
                  className="text-2xl font-bold text-foreground mb-6"
                  style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                >
                  Repository Info
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-card rounded-lg border border-border/50">
                    <span 
                      className="font-medium text-foreground"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      License
                    </span>
                    <Badge variant="secondary">{repository.license}</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-card rounded-lg border border-border/50">
                    <span 
                      className="font-medium text-foreground"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      Language
                    </span>
                    <Badge variant="secondary">
                      {repository.technologies[0]}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-card rounded-lg border border-border/50">
                    <span 
                      className="font-medium text-foreground"
                      style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                    >
                      Last Updated
                    </span>
                    <Badge variant="secondary">2 days ago</Badge>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-12"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => window.location.hash = `project-demo-${projectId}`}
                    size="lg" 
                    className="btn-gradient-green transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    View Live Demo
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => window.location.hash = `project-case-study-${projectId}`}
                    variant="outline" 
                    size="lg" 
                    className="border-2 hover:bg-accent/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-14 px-8 text-lg font-medium tracking-wide"
                    style={{ fontFamily: 'Josefin Sans, sans-serif' }}
                  >
                    Read Case Study
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}