import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Rocket, Users, Handshake, BookOpen, Trophy,
  Globe, MessageSquare, Settings, LogOut, ChevronDown, Search,
  Bell, Mail, Menu, X, ArrowRight, Sparkles, FileText,
  Building2, Crown, User, CheckCircle2, TrendingUp, Zap,
  GraduationCap, Target, Award
} from 'lucide-react'

/* ── Animation Presets ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.12 },
  },
}
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ── Card Wrapper ── */
const Card = ({ children, className = '' }) => (
  <motion.div
    variants={itemVariants}
    className={`rounded-2xl bg-white border border-[#EEF0FD] shadow-[0_4px_24px_rgba(18,32,86,0.04)] p-5 ${className}`}
  >
    {children}
  </motion.div>
)

/* ── Sidebar Navigation Items ── */
const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'startup', label: 'My Startup', icon: Rocket },
  { id: 'network', label: 'Founder Network', icon: Users },
  { id: 'cofounder', label: 'Co-founder Match', icon: Handshake },
  { id: 'resources', label: 'Resource Hub', icon: BookOpen },
  { id: 'leaderboard', label: 'Campus Leaderboard', icon: Trophy },
  { id: 'public', label: 'Build in Public', icon: Globe },
]

const generalItems = [
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'settings', label: 'Settings', icon: Settings },
]

/* ═══════════════════════════════════════
   SIDEBAR
   ═══════════════════════════════════════ */
const Sidebar = ({ activeItem, onNavigate, isMobileOpen, onMobileClose }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  const sidebarContent = (
    <div className="flex flex-col h-full px-6 py-7">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-10"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#5B65DC]/15 flex items-center justify-center text-[#122056] font-extrabold text-lg border border-white/80 shadow-lg shadow-[#5B65DC]/20">
            F
          </div>
          <div>
            <Link to="/" className="font-extrabold text-[#122056] text-[15px] tracking-tight">
              Foundr<span className="text-[#5B65DC]">HUB</span>
            </Link>
            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">Student Founder</p>
          </div>
        </div>
      </motion.div>

      {/* Main Menu */}
      <nav className="flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mb-3">Menu</p>
        <div className="space-y-1.5">
          {sidebarItems.map((item, i) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id)
                  onMobileClose?.()
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.04, duration: 0.5 }}
                className={`w-full group flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 relative ${
                  isActive
                    ? 'bg-[#5B65DC]/10 text-[#122056] shadow-[0_10px_24px_rgba(18,32,86,0.06)]'
                    : 'text-neutral-400 hover:text-[#122056] hover:bg-[#FAFAFD]'
                }`}
              >
                <Icon
                  size={18}
                  className="flex-shrink-0 transition-transform duration-300"
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                <span className={`text-[13px] font-bold flex-1 text-left tracking-tight ${isActive ? 'text-[#122056]' : ''}`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="sidebarActive"
                    className="w-1 h-3 rounded-full bg-[#5B65DC]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 mt-8 mb-3">General</p>
        <div className="space-y-1.5">
          {generalItems.map((item, i) => {
            const Icon = item.icon
            const isActive = activeItem === item.id
            return (
              <motion.button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id)
                  onMobileClose?.()
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.04, duration: 0.5 }}
                className={`w-full group flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-[#5B65DC]/10 text-[#122056]'
                    : 'text-neutral-400 hover:text-[#122056] hover:bg-[#FAFAFD]'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className={`text-[13px] font-semibold flex-1 text-left tracking-tight ${isActive ? 'text-[#122056]' : ''}`}>
                  {item.label}
                </span>
                {item.id === 'messages' && (
                  <span className="w-5 h-5 rounded-full bg-[#5B65DC] text-white text-[10px] font-bold flex items-center justify-center">3</span>
                )}
              </motion.button>
            )
          })}
        </div>
      </nav>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="pt-8 border-t border-[#EEF0FD]"
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-5 py-3 rounded-2xl text-neutral-400 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300 text-[13px] font-bold"
        >
          <LogOut size={16} strokeWidth={2} />
          Logout
        </button>
      </motion.div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#EEF0FD] flex-col z-50 shadow-[4px_0_24px_rgba(18,32,86,0.03)]"
      >
        {sidebarContent}
      </motion.div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#122056]/30 backdrop-blur-sm z-50 lg:hidden"
              onClick={onMobileClose}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-[#EEF0FD] flex flex-col z-50 shadow-[4px_0_24px_rgba(18,32,86,0.08)] lg:hidden"
            >
              <button
                onClick={onMobileClose}
                className="absolute top-6 right-5 w-8 h-8 rounded-xl bg-[#FAFAFD] border border-[#EEF0FD] flex items-center justify-center text-neutral-400 hover:text-[#122056] transition-colors"
              >
                <X size={16} />
              </button>
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/* ═══════════════════════════════════════
   TOP BAR
   ═══════════════════════════════════════ */
const TopBar = ({ onMenuClick }) => {
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[#EEF0FD]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-4 flex items-center gap-4">
        {/* Mobile Hamburger */}
        <button
          onClick={onMenuClick}
          className="lg:hidden w-10 h-10 rounded-xl bg-[#FAFAFD] border border-[#EEF0FD] flex items-center justify-center text-[#122056]"
        >
          <Menu size={18} />
        </button>

        {/* Search */}
        <div className="flex-1">
          <div className="flex items-center gap-3 rounded-2xl bg-[#FAFAFD] border border-[#EEF0FD] px-4 py-3 max-w-md shadow-sm">
            <Search size={16} className="text-neutral-300" />
            <input
              type="text"
              placeholder="Search startups, founders, resources..."
              className="w-full text-sm text-[#122056] placeholder:text-neutral-300 outline-none bg-transparent font-medium"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="h-10 w-10 rounded-xl bg-[#FAFAFD] border border-[#EEF0FD] flex items-center justify-center text-neutral-400 hover:text-[#122056] transition-colors relative">
            <Bell size={16} />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#5B65DC] border-2 border-white" />
          </button>
          <button className="h-10 w-10 rounded-xl bg-[#FAFAFD] border border-[#EEF0FD] flex items-center justify-center text-neutral-400 hover:text-[#122056] transition-colors">
            <Mail size={16} />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3 rounded-2xl bg-white border border-[#EEF0FD] px-3 py-2 shadow-sm hover:border-[#5B65DC]/20 transition-all"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#122056] to-[#5B65DC] flex items-center justify-center text-white text-[11px] font-bold">
                SF
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[13px] font-bold text-[#122056] leading-tight">Founder</p>
                <p className="text-[11px] text-neutral-400">Early Access</p>
              </div>
              <ChevronDown size={14} className={`text-neutral-300 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-56 rounded-2xl border border-[#EEF0FD] bg-white shadow-[0_16px_40px_rgba(18,32,86,0.1)] p-4 z-20"
                >
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#EEF0FD]">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#122056] to-[#5B65DC] flex items-center justify-center text-white text-[11px] font-bold">
                      SF
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-[#122056]">Student Founder</p>
                      <p className="text-[11px] text-neutral-400">Early Access Member</p>
                    </div>
                  </div>
                  <Link to="/student-founders" className="flex items-center gap-2 text-[12px] text-neutral-500 hover:text-[#5B65DC] font-semibold transition-colors">
                    <ArrowRight size={12} />
                    Back to landing page
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   EMPTY STATE CARD
   ═══════════════════════════════════════ */
const EmptyCard = ({ icon: Icon, title, desc, className = '' }) => (
  <div className={`rounded-2xl border border-dashed border-[#EEF0FD] bg-[#FAFAFD]/50 p-6 flex flex-col items-center justify-center text-center min-h-[140px] ${className}`}>
    <div className="w-10 h-10 rounded-2xl bg-[#EEF0FD] flex items-center justify-center mb-3">
      <Icon size={18} className="text-[#5B65DC]" />
    </div>
    <p className="text-[13px] font-bold text-[#122056]/60 mb-1">{title}</p>
    <p className="text-[11px] text-neutral-400">{desc}</p>
  </div>
)

/* ═══════════════════════════════════════
   DASHBOARD CONTENT
   ═══════════════════════════════════════ */
const DashboardContent = () => (
  <motion.main
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="max-w-[1280px] mx-auto px-6 lg:px-8 py-6 space-y-6"
  >
    {/* ── SECTION 1: Welcome + Progress ── */}
    <Card className="relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#5B65DC]/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B65DC] mb-1">Early Access Dashboard</p>
            <h1 className="text-[24px] lg:text-[28px] font-bold text-[#122056] tracking-tight">
              Welcome back, Founder 🚀
            </h1>
            <p className="text-[14px] text-neutral-400 mt-1">Complete your startup profile to unlock the full founder network.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] font-bold text-emerald-600">
              <CheckCircle2 size={12} />
              Early Access Active
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="rounded-2xl bg-[#FAFAFD] border border-[#EEF0FD] p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-bold text-[#122056]">Startup Profile Completion</p>
            <p className="text-[13px] font-bold text-[#5B65DC]">35%</p>
          </div>
          <div className="h-2.5 rounded-full bg-[#EEF0FD] overflow-hidden mb-4">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#5B65DC] to-[#122056]"
              initial={{ width: 0 }}
              animate={{ width: '35%' }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Founder Bio', done: true },
              { label: 'Startup Details', done: true },
              { label: 'Team Members', done: false },
              { label: 'Pitch Deck', done: false },
            ].map(step => (
              <div
                key={step.label}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[12px] font-semibold ${
                  step.done
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    : 'bg-white text-neutral-400 border border-[#EEF0FD]'
                }`}
              >
                {step.done ? <CheckCircle2 size={13} /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-neutral-200" />}
                {step.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>

    {/* ── SECTION 2: Suggested Cofounders ── */}
    <Card>
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B65DC]">Co-founder Match</p>
          <h3 className="text-[17px] font-bold text-[#122056] mt-1">Suggested Cofounders</h3>
        </div>
        <span className="text-[11px] font-semibold text-[#5B65DC] bg-[#EEF0FD] px-3 py-1 rounded-full">Coming Soon</span>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {['Technical Cofounder', 'Growth & Marketing', 'Design Partner'].map((role, i) => (
          <EmptyCard
            key={role}
            icon={[Target, TrendingUp, Sparkles][i]}
            title={role}
            desc="AI-matched profiles will appear here"
          />
        ))}
      </div>
    </Card>

    {/* ── SECTION 3: Campus Activity ── */}
    <Card>
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B65DC]">Community</p>
          <h3 className="text-[17px] font-bold text-[#122056] mt-1">Campus Founder Activity</h3>
        </div>
        <span className="text-[11px] font-semibold text-[#5B65DC] bg-[#EEF0FD] px-3 py-1 rounded-full">Live Feed</span>
      </div>
      <div className="space-y-3">
        {[
          { name: 'Arjun M.', action: 'joined the founder network', campus: 'Chitkara University', time: '2m ago', initials: 'AM', color: '#d5d0e8' },
          { name: 'Priya S.', action: 'posted a build update', campus: 'Thapar Institute', time: '15m ago', initials: 'PS', color: '#c9d5e0' },
          { name: 'Rahul K.', action: 'is looking for a cofounder', campus: 'PEC Chandigarh', time: '1h ago', initials: 'RK', color: '#d5e0c9' },
        ].map(activity => (
          <div key={activity.name} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-[#EEF0FD] bg-[#FAFAFD]/50 hover:bg-white transition-colors">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold text-white shrink-0"
              style={{ background: activity.color }}
            >
              {activity.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] text-[#122056]">
                <span className="font-bold">{activity.name}</span>{' '}
                <span className="text-neutral-500">{activity.action}</span>
              </p>
              <p className="text-[11px] text-neutral-400">{activity.campus}</p>
            </div>
            <span className="text-[11px] text-neutral-300 shrink-0">{activity.time}</span>
          </div>
        ))}

        {/* Placeholder slots */}
        <div className="flex items-center justify-center py-4 text-[12px] text-neutral-300 font-medium">
          <Sparkles size={14} className="mr-2 text-[#5B65DC]/30" />
          More activity will appear as founders join your campus
        </div>
      </div>
    </Card>

    {/* ── SECTION 4: Resources Unlocked ── */}
    <Card>
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B65DC]">Resource Hub</p>
          <h3 className="text-[17px] font-bold text-[#122056] mt-1">Resources Unlocked</h3>
        </div>
        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Free Tier</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Pitch Deck Templates', desc: '5 templates available', icon: FileText, count: '5' },
          { title: 'Grant Opportunities', desc: 'Government & private', icon: Building2, count: '12' },
          { title: 'Competitions', desc: 'Active hackathons', icon: Trophy, count: '8' },
          { title: 'Founder Perks', desc: 'Tools & credits', icon: Crown, count: '15+' },
        ].map(resource => (
          <div
            key={resource.title}
            className="group rounded-2xl border border-[#EEF0FD] bg-white p-5 hover:border-[#5B65DC]/20 hover:shadow-[0_8px_30px_rgba(18,32,86,0.06)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FAFAFD] border border-[#EEF0FD] flex items-center justify-center group-hover:border-[#5B65DC]/20 transition-colors">
                <resource.icon size={18} className="text-[#5B65DC]" />
              </div>
              <span className="text-[20px] font-black text-[#122056]/10 group-hover:text-[#5B65DC]/20 transition-colors">{resource.count}</span>
            </div>
            <p className="text-[13px] font-bold text-[#122056] mb-0.5">{resource.title}</p>
            <p className="text-[11px] text-neutral-400">{resource.desc}</p>
          </div>
        ))}
      </div>
    </Card>
  </motion.main>
)

/* ═══════════════════════════════════════
   PAGE WRAPPER
   ═══════════════════════════════════════ */
const StudentFounderDashboardPage = () => {
  const [activeItem, setActiveItem] = useState('dashboard')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#FAFAFD] text-[#122056] relative overflow-hidden">
      {/* Ambient blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[420px] bg-[#5B65DC]/5 blur-[180px]" />
        <div className="absolute bottom-[-12%] right-[-12%] w-[520px] h-[520px] bg-neutral-200/20 blur-[200px]" />
      </div>

      <Sidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
        isMobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      <div className="ml-0 lg:ml-64 relative z-10">
        <TopBar onMenuClick={() => setMobileMenuOpen(true)} />
        <DashboardContent />
      </div>
    </div>
  )
}

export default StudentFounderDashboardPage
