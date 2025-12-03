import { useState } from 'react';
import { Activity, Code, FileText, MessageSquare, Users, Calendar, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface ActivityItem {
  id: string;
  type: 'project' | 'blog' | 'chat' | 'booking' | 'service';
  title: string;
  description: string;
  timestamp: Date;
  icon: any;
  color: string;
}

export default function ActivityFeed() {
  const [isOpen, setIsOpen] = useState(false);

  // Mock activity data - in a real app, this would come from your backend
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'project',
      title: 'New Project Added',
      description: 'E-commerce Platform launched in portfolio',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      icon: Code,
      color: 'text-blue-500'
    },
    {
      id: '2',
      type: 'blog',
      title: 'Blog Post Published',
      description: 'The Future of Web Development',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      icon: FileText,
      color: 'text-purple-500'
    },
    {
      id: '3',
      type: 'chat',
      title: 'New Message',
      description: '5 unread messages from clients',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      icon: MessageSquare,
      color: 'text-green-500'
    },
    {
      id: '4',
      type: 'booking',
      title: 'Consultation Booked',
      description: 'Web development consultation scheduled',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      icon: Calendar,
      color: 'text-yellow-500'
    },
    {
      id: '5',
      type: 'service',
      title: 'Service Request',
      description: 'New cybersecurity inquiry received',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
      icon: Zap,
      color: 'text-red-500'
    }
  ];

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Activity Feed"
      >
        <Activity className="h-6 w-6" />
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
        >
          {activities.length}
        </motion.span>
      </motion.button>

      {/* Activity Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-96 bg-background border-l border-border shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-border bg-gradient-to-br from-purple-500/10 to-blue-500/10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold flex items-center gap-2" style={{ fontFamily: 'Josefin Sans, sans-serif' }}>
                  <Activity className="h-6 w-6 text-primary" />
                  Activity Feed
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-muted-foreground">
                Recent updates and activities
              </p>
            </div>

            {/* Activity List */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {activities.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex gap-3">
                          <div className={`mt-1 ${activity.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="font-medium text-sm">
                                {activity.title}
                              </h4>
                              <Badge variant="outline" className="capitalize text-xs">
                                {activity.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {activity.description}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {formatTime(activity.timestamp)}
                            </span>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-muted/30">
              <p className="text-xs text-muted-foreground text-center">
                Showing {activities.length} recent activities
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>
    </>
  );
}
