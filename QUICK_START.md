# FoundrHUB Founder Dashboard — Quick Start Guide

## 🚀 Getting Started

### 1. **Install Dependencies** (if not already done)
```bash
npm install
```

Your project already has all required packages:
- React ^18.2.0
- Framer Motion ^11.0.8
- TailwindCSS ^3.4.1
- Lucide React ^1.7.0

### 2. **Start Development Server**
```bash
npm run dev
```

### 3. **View the Dashboard**
Navigate to: `http://localhost:5173/founder-dashboard`

(Make sure your routing includes the FounderDashboard page)

---

## 📋 Dashboard Layout at a Glance

```
┌──────────────────────────────────────────────────────┐
│  FoundrHUB    │  Hello, Sarah Chen                 🔍 🔔 ➕ │
│  Dashboard    │  Here's your startup performance           │
│  Analytics    ├──────────────────────────────────────────┤
│  Discovery    │ 📊 2,847  │ 👥 1,243 │ 💾 392  │ 📈 24.5% │
│  Messages     ├─────────────────┬──────────────────────────┤
│  Settings     │  Tasks (Today)  │  Key Metrics           │
│               │ ✓ Complete..   │ 📈 Weekly Growth +18.4%│
│  👤 Sarah..   │ ⏳ Add demo...  │ 👥 Total Reach 8,924  │
│  Logout       │ ⏳ Respond...   │ ⚡ Engagement 6.2%    │
│               │                 │                        │
│               │  Activity       │  Upcoming Events      │
│               │ 👁️ 12 views     │ 🎥 Demo Call Today   │
│               │ 💾 3 saves      │ 🤝 Investor Mtg Tom  │
│               │ 👤 1 collab req │ 🚀 Launch Event Mar28│
│               ├─────────────────┴──────────────────────────┤
│               │  📊 Growth Trend (30-day bar chart)        │
│               ├─────────────────────────────────────────────┤
│               │  Ready to grow? [Upgrade Profile]         │
│               └─────────────────────────────────────────────┘
```

---

## 🎨 Color System

| Element | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary | Blue | `#5B65DC` | Buttons, accents, highlights |
| Dark | Navy | `#122056` | Text, dark elements |
| Light BG | off-white | `#FAFAFD` | Main background |
| Cards | Very Light Blue | `#EEF0FD` | Borders, light accents |
| Emerald | Teal | `#10B981` | Positive metrics, success |
| Warning | Amber | `#F59E0B` | Medium priority, warnings |
| Danger | Red | `#EF4444` | High priority, alerts |

---

## 📐 Responsive Breakpoints

### Mobile (< 640px)
- Sidebar: Hidden/Collapsed
- Cards: Single column
- Header: Stacked vertically

### Tablet (640px - 1024px)
- Sidebar: Toggle optional
- Cards: 2 columns (stat cards), 2 columns (main grid)
- Header: Horizontal layout

### Desktop (≥ 1024px)
- Sidebar: Fixed left (256px wide)
- Cards: 4 columns (stat cards), 3 columns (main grid with 2-1 split)
- Full layout with all features visible

---

## 🔧 Component Props Reference

### **SidebarMenu**
```jsx
<SidebarMenu activeItem="dashboard" />
```
Props:
- `activeItem` (string): Current active menu page

### **DashboardHeader**
```jsx
<DashboardHeader userName="Sarah Chen" />
```
Props:
- `userName` (string): Display founder name

### **StatCardsGrid**
No props required (uses hardcoded data). To customize, edit the `cards` array inside component.

### **TasksSection**
No props required. Uses internal `tasks` state with React hooks.

### **ActivityFeed**
No props required. Uses hardcoded activity data.

### **StatisticsGrid**
No props required. Uses hardcoded stats.

### **EventsPanel**
No props required. Uses hardcoded upcoming events.

---

## 📂 File Structure

```
FoundrHUB/
├── src/
│   ├── pages/
│   │   └── FounderDashboard.jsx          ← Main dashboard
│   ├── components/
│   │   ├── SidebarMenu.jsx
│   │   ├── DashboardHeader.jsx
│   │   ├── StatCardsGrid.jsx
│   │   ├── TasksSection.jsx
│   │   ├── ActivityFeed.jsx
│   │   ├── StatisticsGrid.jsx
│   │   └── EventsPanel.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── tailwind.config.js
├── vite.config.js
└── DASHBOARD_GUIDE.md                    ← Full design docs
```

---

## 🎯 Common Customizations

### **Change Dashboard Greeting**
Edit `DashboardHeader.jsx`:
```jsx
<DashboardHeader userName="Your Name Here" />
```

### **Update Stat Cards**
Edit the `cards` array in `StatCardsGrid.jsx`:
```jsx
const cards = [
  {
    id: 1,
    label: 'Your Label',
    value: '1,234',
    change: '+12%',
    icon: YourIcon,
    progress: 65,
    // ...
  },
  // Add more cards
]
```

### **Modify Tasks**
Edit the initial `tasks` state in `TasksSection.jsx`:
```jsx
const [tasks, setTasks] = useState([
  {
    id: 1,
    title: 'Your Task',
    description: 'Task description',
    completed: false,
    priority: 'high',
  },
  // Add more tasks
])
```

### **Update Events**
Edit the `events` array in `EventsPanel.jsx`:
```jsx
const events = [
  {
    id: 1,
    title: 'Event Name',
    date: 'Today',
    time: '2:30 PM',
    type: 'video',
    description: 'Event details',
  },
  // Add more events
]
```

---

## 🎬 Animation Timing

All animations use Framer Motion with these defaults:

| Animation | Duration | Delay | Easing |
|-----------|----------|-------|--------|
| Component Mount | 500ms-600ms | 0-800ms | custom |
| List Stagger | Per item | 50-100ms | custom |
| Hover Scale | 200ms | 0ms | ease-out |
| Progress Bar | 800ms | 200ms | ease-out |

To adjust animation speed globally, edit transition values in individual components:
```jsx
transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
```

---

## 🔗 Connecting to Backend

### **Example: Fetch Real Tasks**
Replace hardcoded data in `TasksSection.jsx`:
```jsx
useEffect(() => {
  const fetchTasks = async () => {
    const response = await fetch('/api/tasks')
    const data = await response.json()
    setTasks(data)
  }
  fetchTasks()
}, [])
```

### **Example: Fetch Activities**
In `ActivityFeed.jsx`, replace the hardcoded activities with an API call.

### **Example: Fetch Metrics**
In `StatisticsGrid.jsx`, fetch from `/api/metrics` endpoint.

---

## 📱 Mobile Testing

### **Test Responsive Design:**
```bash
# In browser DevTools:
1. Open Chrome DevTools (F12)
2. Click Device Toggle (mobile icon)
3. Select different device sizes
4. Test: Mobile → Tablet → Desktop
```

### **Common Mobile Issues:**
- Sidebar: Hidden by default, might need toggle button
- Cards: Stack to 1 column on mobile
- Header: Text may wrap - adjust padding if needed

---

## 🎨 Dark Mode (Optional Future Enhancement)

To add dark mode support, update:
1. `tailwind.config.js` - Add dark scheme
2. Components - Wrap with `dark:` classes
3. Context/State - Track theme preference

Example:
```jsx
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  {/* Content */}
</div>
```

---

## ✨ Features Checklist

- [x] Modern SaaS dashboard design
- [x] Soft blue + pastel color palette
- [x] Sidebar navigation (fixed on desktop)
- [x] Sticky header with search & notifications
- [x] 4 colorful stat cards with animated progress
- [x] Task management with checkboxes
- [x] Activity feed with real-time feel
- [x] Key metrics cards
- [x] Upcoming events panel
- [x] 30-day growth visualization chart
- [x] Call-to-action section
- [x] Footer with links
- [x] Fully responsive design
- [x] Smooth Framer Motion animations
- [x] Lucide React icons throughout
- [x] Modular, reusable components
- [x] No dark/harsh colors
- [x] Friendly SaaS aesthetic

---

## 🐛 Troubleshooting

### **Components not showing?**
- Check if imports are correct in `FounderDashboard.jsx`
- Verify component file paths
- Make sure all dependencies are installed

### **Styles not applying?**
- Clear Tailwind cache: `rm -rf node_modules/.cache`
- Restart dev server: `npm run dev`
- Check if `tailwind.config.js` is configured correctly

### **Animations not working?**
- Verify Framer Motion is installed: `npm list framer-motion`
- Check browser console for errors (F12)
- Try simplifying animation code temporarily

### **Icons not showing?**
- Verify lucide-react is installed: `npm list lucide-react`
- Check icon names are correct (case-sensitive)
- Reload page after updating icon imports

---

## 🚀 Deployment Tips

1. **Build for Production:**
   ```bash
   npm run build
   ```

2. **Preview Build Locally:**
   ```bash
   npm run preview
   ```

3. **Deploy to Vercel/Netlify:**
   - Push code to GitHub
   - Connect repo to Vercel/Netlify
   - Deploy with one click

4. **Environment Variables (if needed):**
   Create `.env` file:
   ```
   VITE_API_URL=https://api.example.com
   ```

---

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/)
- [React Docs](https://react.dev/)

---

## 💡 Next Steps

1. ✅ Dashboard created
2. → Connect to real data/API
3. → Add more dashboard pages (Analytics, Discovery, etc.)
4. → Implement user authentication
5. → Add real-time notifications
6. → Deploy to production

enjoy your new founder dashboard! 🎉

