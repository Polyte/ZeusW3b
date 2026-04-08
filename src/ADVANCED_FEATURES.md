# ZeusLabs Advanced Features Guide

This document outlines all the advanced features integrated into the ZeusLabs website.

## 🎨 Theme System

### Features
- **Light Mode**: Classic light theme for daytime viewing
- **Dark Mode**: Eye-friendly dark theme for low-light environments
- **System Mode**: Automatically matches your operating system's theme preference
- **Persistent Settings**: Theme preference is saved in localStorage
- **Smooth Transitions**: Animated transitions when switching themes

### Usage
- Click the theme toggle button in the header
- Select from Light, Dark, or System mode
- Theme preference is automatically saved

### Technical Implementation
- Located in `/utils/theme.ts`
- Component: `/components/ThemeToggle.tsx`
- Integrated in Header component

---

## 🔍 Advanced Search

### Features
- **Universal Search**: Search across services, projects, and blog posts simultaneously
- **Type Filters**: Filter results by content type (Services, Projects, Blog)
- **Tag-Based Search**: Search by technology tags and keywords
- **Real-time Results**: Instant search results as you type
- **Keyboard Navigation**: Use arrow keys to navigate, Enter to select, ESC to close
- **Result Preview**: See descriptions and tags before navigating

### Usage
- Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) to open Command Palette
- Select "Search..." or use the "/" shortcut
- Type your query and filter by type if needed
- Click any result to navigate to that page

### Technical Implementation
- Component: `/components/AdvancedSearch.tsx`
- Searches through all content from constants files
- Modal overlay with backdrop blur

---

## 🔔 Notification System

### Features
- **Real-time Notifications**: Get updates about bookings, messages, and site activities
- **Unread Count Badge**: Visual indicator for new notifications
- **Mark as Read**: Individual or bulk mark as read functionality
- **Notification Types**: Info, Success, Warning, and Error notifications with color coding
- **Timestamp Display**: Relative time display (e.g., "5m ago", "2h ago")
- **Delete & Clear**: Remove individual notifications or clear all at once

### Usage
- Click the bell icon in the header
- View all notifications in the dropdown panel
- Click a notification to mark it as read
- Use "Mark all read" or "Clear all" buttons for bulk actions

### Technical Implementation
- Component: `/components/NotificationSystem.tsx`
- Notification type definition exported for use throughout the app
- State managed in App.tsx

---

## 📅 Booking System

### Features
- **3-Step Booking Process**:
  1. Select service and date
  2. Choose available time slot
  3. Enter contact information
- **Service Selection**: Choose from all available consultation types
- **Date Picker**: Calendar input with minimum date validation
- **Time Slot Selection**: Visual time slot picker showing availability
- **Form Validation**: Required field validation before proceeding
- **Confirmation Screen**: Success animation with booking details
- **Email Confirmation**: Simulated email confirmation (ready for backend integration)

### Usage
- Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux) and select "Book Consultation"
- Or click "Book Consultation" from the navigation
- Follow the 3-step process
- Submit your booking request

### Technical Implementation
- Component: `/components/BookingSystem.tsx`
- Multi-step form with state management
- Ready for backend integration (POST to /api/bookings)

---

## ⌨️ Command Palette

### Features
- **Quick Navigation**: Instant access to all major pages
- **Keyboard Shortcuts**: Individual shortcuts for each command
- **Search Functionality**: Filter commands by typing
- **Action Triggers**: Can open other modals (Search, Booking)
- **Visual Feedback**: Hover animations and keyboard hints

### Shortcuts
- `Cmd+K` / `Ctrl+K`: Open Command Palette
- `H`: Go to Home
- `S`: View Services
- `P`: View Projects
- `B`: View Blog
- `C`: Contact Us
- `/`: Open Search
- `K`: Book Consultation
- `ESC`: Close palette

### Technical Implementation
- Component: `/components/CommandPalette.tsx`
- Global keyboard listener
- Action-based architecture

---

## 📊 Performance Monitor

### Features
- **FPS Counter**: Real-time frames per second tracking
- **Memory Usage**: JavaScript heap memory monitoring (when available)
- **Load Time**: Initial page load performance metrics
- **Page Views**: Session page view counter
- **Performance Status**: Visual indicators (Excellent, Good, Poor)
- **Real-time Updates**: Live metrics that update automatically

### Usage
- Click the Activity icon in the bottom-right corner
- View real-time performance metrics
- Monitor site performance during use

### Technical Implementation
- Component: `/components/PerformanceMonitor.tsx`
- Uses Performance API
- Floating widget with collapsible panel

---

## 🎯 Integration Points

All advanced features are integrated into the main App.tsx:

```typescript
// State management for features
const [showSearch, setShowSearch] = useState(false);
const [showBooking, setShowBooking] = useState(false);
const [notifications, setNotifications] = useState<Notification[]>([]);

// Feature components rendered at app level
<AdvancedSearch isOpen={showSearch} onClose={() => setShowSearch(false)} />
<BookingSystem isOpen={showBooking} onClose={() => setShowBooking(false)} />
<NotificationSystem notifications={notifications} ... />
<CommandPalette onNavigate={...} onOpenSearch={...} onOpenBooking={...} />
<PerformanceMonitor />
```

---

## 🚀 Future Enhancements

Planned features for future releases:

1. **Analytics Dashboard**: Full analytics with charts and graphs
2. **Multi-language Support**: i18n integration for international clients
3. **Progressive Web App**: Offline support and installable app
4. **Advanced Filters**: More granular filtering in search and projects
5. **Real-time Sync**: WebSocket integration for live updates
6. **Export Functionality**: Export bookings, reports, and data
7. **AI Chat Assistant**: Intelligent chatbot for customer support
8. **Video Integration**: Video calls for consultations
9. **Payment Integration**: Online payment processing
10. **Advanced Security**: 2FA, rate limiting, and enhanced security features

---

## 📝 Notes for Developers

### Adding New Notifications
```typescript
setNotifications(prev => [...prev, {
  id: Date.now().toString(),
  type: 'success',
  title: 'New Feature!',
  message: 'Check out our latest update',
  timestamp: new Date(),
  read: false
}]);
```

### Adding New Commands
Edit `/components/CommandPalette.tsx` and add to the `commands` array:
```typescript
{
  id: 'new-command',
  label: 'New Action',
  icon: YourIcon,
  action: () => yourAction(),
  shortcut: 'N'
}
```

### Customizing Themes
Edit `/utils/theme.ts` to add custom theme logic or `/styles/globals.css` for theme-specific styles.

---

## 🎨 Design Consistency

All advanced features follow the ZeusLabs design guidelines:
- **Font Family**: Josefin Sans
- **Color Palette**: Electric Blue (#3b82f6), Deep Purple (#8b5cf6)
- **Animations**: 0.3-0.6s duration with easeInOut
- **Spacing**: 8px grid system
- **Border Radius**: 0.625rem (10px) for buttons and cards

---

## 📞 Support

For questions or issues with any advanced features, please contact:
- Email: hello@zeuslabs.site
- Phone: +27 726911 887

---

**Last Updated**: November 13, 2025
**Version**: 2.0.0
