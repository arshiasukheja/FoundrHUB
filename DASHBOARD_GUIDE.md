# FoundrHUB Founder Dashboard — Design Guide

## 🎨 Overview

A modern, clean SaaS-style founder dashboard built with React + TailwindCSS + Framer Motion. Designed for startup founders to track growth, visibility, engagement, and key metrics.

---

## 📁 Component Structure

### **Core Components Created:**

#### 1. **SidebarMenu.jsx**
- Fixed left sidebar (64px width on lg screens)
- Logo: FoundrHUB with gradient icon (F)
- Menu items: Dashboard, Analytics, Discovery, Messages, Settings
- Active state indicator (pulsing dot)
- User profile section at bottom
- Logout button
- Smooth animations on mount

**Features:**
- Active menu item highlight
- Hover effects on menu items
- Clean spacing & typography
- User profile preview with avatar

---

#### 2. **DashboardHeader.jsx**
- Greeting section: "Hello, [Founder Name]"
- Subtext: "Here's your startup performance"
- Right side actions:
  - Search button
  - Notification bell (with red badge)
  - "Add Update" button (primary accent color)

**Features:**
- Responsive layout (stacks on mobile)
- Smooth hover animations
- Window icons from lucide-react

---

#### 3. **StatCardsGrid.jsx**
- 4 colorful stat cards in responsive grid (1 col mobile, 2 col tablet, 4 col desktop)
- Cards display:
  - Icon with gradient background
  - Metric label (uppercase, small)
  - Large value
  - Change percentage (green for positive)
  - Animated progress bar
  
**Stats Tracked:**
1. Profile Views (Blue gradient)
2. Followers (Emerald gradient)
3. Saved/Bookmarks (Pink gradient)
4. Growth Rate (Amber gradient)

**Features:**
- Smooth stagger animation (cards appear with delay)
- Hover effect: lift up, increase shadow
- Gradient progress bars
- Responsive design

---

#### 4. **TasksSection.jsx**
- List of tasks with checkboxes
- Task states: completed/incomplete
- Task information:
  - Title
  - Description
  - Priority badge (high/medium/low)
  
**Features:**
- Toggle task completion
- Progress bar at top (shows x/total completed)
- Strikethrough on completed tasks
- Smooth animations
- Color-coded priority badges

---

#### 5. **ActivityFeed.jsx**
- List of recent startup activities
- Each activity shows:
  - Icon with gradient
  - Activity text
  - Time elapsed
  - Count badge

**Sample Activities:**
- 12 people viewed your startup (2h ago)
- 3 saves today (4h ago)
- 1 collaboration request (6h ago)
- 5 new investor messages (8h ago)
- Feature highlight (1d ago)

---

#### 6. **StatisticsGrid.jsx**
- 3 metric cards in responsive column
- Each shows:
  - Label & value
  - Mini comparison text
  - Icon with gradient

**Metrics:**
1. Weekly Growth: +18.4% (+2.1% from last week)
2. Total Reach: 8,924 people (+340 new)
3. Engagement Rate: 6.2% (above industry average)

---

#### 7. **EventsPanel.jsx**
- Upcoming events list (3 items shown)
- Event details:
  - Title
  - Date & time
  - Location/description
  - Event type badge (Video/In-Person/Event)
  - Icon with gradient

**Sample Events:**
1. Product Demo Call — Today 2:30 PM (Video)
2. Investor Meeting — Tomorrow 10:00 AM (In-Person)
3. Product Launch — Mar 28, 6:00 PM (Event)

---

#### 8. **FounderDashboard.jsx (Main Page)**
- Integrates all components
- Layout structure:
  ```
  ┌─────────────────────────────┐
  │      Sidebar (Fixed)         │
  └─────────────────────────────┘
  ┌─────────────────────────────┐
  │   Header (Sticky Top)        │
  ├─────────────────────────────┤
  │  Stat Cards (4 columns)      │
  ├─────────────────────────────┤
  │ Left (2/3):    │ Right (1/3) │
  │ • Tasks        │ • Metrics   │
  │ • Activity     │ • Events    │
  ├─────────────────────────────┤
  │ Growth Trend Chart (Full)    │
  ├─────────────────────────────┤
  │ CTA Section (Gradient)       │
  ├─────────────────────────────┤
  │ Footer                       │
  └─────────────────────────────┘
  ```

---

## 🎯 Design System

### **Color Palette:**
- **Primary Blue**: `#5B65DC` (accent, buttons, highlights)
- **Dark Blue**: `#122056` (text, dark elements)
- **Light Background**: `#FAFAFD` (main bg, very light)
- **Card Background**: `#EEF0FD` (borders, light elements)
- **White**: Pure white for cards & contrast

### **Gradients:**
- Blue → Dark Blue: `from-[#5B65DC] to-[#122056]`
- Soft Blue: `from-blue-50 to-indigo-50`
- Emerald: `from-emerald-400 to-teal-500`
- Pink: `from-pink-400 to-rose-500`
- Amber: `from-amber-400 to-orange-500`

### **Spacing:**
- Card padding: 24px (6 units)
- Gap between cards: 32px (8 units)
- Rounded corners: 16px (border-radius-2xl)

### **Typography:**
- Font Family: Inter (sans-serif)
- Font weights: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Heading sizes: 12px (labels), 14px (small), 16px (body), 18px (subheadings), 24px+ (big headings)

---

## ✨ Animations

### **Entrance Animations (Framer Motion):**
- Fade in + Up movement (y: 20 → 0)
- Duration: 500-600ms
- Easing: `[0.16, 1, 0.3, 1]` (smooth custom ease)
- Stagger on lists: 50-100ms delay between items

### **Hover Interactions:**
- Cards: Scale 1.02, increase shadow
- Buttons: Scale 1.05 on hover, 0.95 on tap
- Icon containers: Scale 1.1 on hover

### **Progress Animations:**
- Progress bars: Smooth fill from 0 to target width (800ms)
- Chart bars: Height animation with stagger

---

## 📱 Responsive Design

### **Breakpoints:**
- **Mobile (< 640px):** Stack components vertically
- **Tablet (640px - 1024px):** 2-column layouts
- **Desktop (1024px+):** 3-column main layout + sidebar

### **Sidebar:**
- Hidden on mobile (ml-0)
- Fixed left on desktop (ml-64)
- Smooth transition

### **Card Grid:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 4 columns (stat cards), 3 columns (main grid)

---

## 🔧 Key Features

### **1. Task Management**
- Check off daily tasks
- Track progress with visual bar
- Priority levels: High (red), Medium (amber), Low (gray)
- Persistent state (can be connected to backend)

### **2. Activity Feed**
- Real-time activity updates
- Color-coded by activity type
- Time-relative timestamps ("2h ago", "1d ago")
- Quick metrics ("12 people", "+3 saves")

### **3. Growth Visualization**
- 30-day bar chart
- Hover tooltips (shows day and value)
- Animated bars that fill on load
- Gradient coloring (light to dark blue)

### **4. Events Calendar**
- Upcoming important dates
- Event type badges
- Time & location info
- Color-coded by type

### **5. Sticky Header**
- Always accessible navigation
- Backdrop blur effect
- Search, notifications, and primary CTA

---

## 🚀 Usage

### **Import Main Component:**
```jsx
import FounderDashboard from './pages/FounderDashboard'

export default App() {
  return <FounderDashboard />
}
```

### **Customize User Data:**
In `DashboardHeader.jsx`, change:
```jsx
<DashboardHeader userName="Your Name" />
```

### **Modify Stat Cards:**
Edit arrays in `StatCardsGrid.jsx`, `TasksSection.jsx`, etc.

### **Connect to Backend:**
Each component can be connected to API calls:
- TasksSection: `GET /api/tasks`, `PUT /api/tasks/:id`
- ActivityFeed: `GET /api/activities`
- StatisticsGrid: `GET /api/metrics`
- EventsPanel: `GET /api/events`

---

## 🎨 Customization Tips

### **Change Primary Colors:**
Replace all instances of:
- `#5B65DC` → your accent color
- `#122056` → your dark color
- `#FAFAFD` → your light background
- `#EEF0FD` → your light accent

### **Add/Remove Cards:**
Each section is modular:
1. Edit the data array
2. Update map/render logic
3. Adjust grid columns

### **Adjust Animation Speed:**
In any component, change `transition` delay values:
```jsx
transition={{ delay: 0.2, duration: 0.8 }}
// Change 0.2 for delay, 0.8 for duration
```

### **Modify Layout:**
Change `lg:ml-64` (sidebar width) and `lg:col-span-2` (column ratios) for different layouts.

---

## 📦 Dependencies

- **React** ^18.2.0 — Core framework
- **Framer Motion** ^11.0.8 — Animations
- **TailwindCSS** ^3.4.1 — Styling
- **Lucide React** ^1.7.0 — Icons
- **React Router** ^6.22.3 — Navigation

---

## 🔍 File Locations

```
src/
├── pages/
│   └── FounderDashboard.jsx       (Main page)
├── components/
│   ├── SidebarMenu.jsx            (Left navigation)
│   ├── DashboardHeader.jsx        (Top header)
│   ├── StatCardsGrid.jsx          (4 stat cards)
│   ├── TasksSection.jsx           (Task list)
│   ├── ActivityFeed.jsx           (Activity log)
│   ├── StatisticsGrid.jsx         (3 metric cards)
│   └── EventsPanel.jsx            (Upcoming events)
```

---

## ✅ Quality Checklist

- [x] Clean, modern SaaS aesthetic
- [x] Soft pastel + blue color palette
- [x] Rounded cards with subtle shadows
- [x] Smooth Framer Motion animations
- [x] Responsive mobile-to-desktop
- [x] Proper spacing & typography
- [x] Staggered animations for lists
- [x] Hover effects on interactive elements
- [x] Accessible icons (lucide-react)
- [x] Modular, reusable components

---

## 🎯 Next Steps

1. **Connect to API**: Update components to fetch real data
2. **Add More Pages**: Create Analytics, Discovery, Messages pages
3. **Authentication**: Integrate login/logout
4. **Notifications**: Add real-time updates
5. **Dark Mode**: Add theme switcher (optional)
6. **Export Data**: Add CSV/PDF export features

---

## 📞 Support

For customizations or issues, check:
- Component props in JSX files
- TailwindCSS class definitions
- Framer Motion transition settings
- lucide-react icon library

Enjoy your modern Founder Dashboard! 🚀

