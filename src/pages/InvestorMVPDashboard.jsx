import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Compass, Bookmark, MessageCircle, CalendarClock,
  Sparkles, UserCircle, Settings, Search, Bell, Crown, ChevronRight,
  MapPin, Users, Zap, Target, Eye, Send, X, ExternalLink,
  ChevronDown, Clock, Flame, Heart, Phone, TrendingUp, Lock
} from 'lucide-react'

/* ═══════════════════════════════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════════════════════════════ */

const MOCK_STARTUPS = [
  {
    id: 1, name: 'PaySure', logo: '💳', sector: 'FinTech', stage: 'Pre-Seed',
    city: 'Bangalore', state: 'Karnataka',
    description: 'UPI-first B2B payments infrastructure for tier-2 merchants.',
    founders: ['Anika Mehta', 'Rohan Iyer'],
    traction: '12k merchants onboarded · ₹2.4Cr GMV/month',
    ask: '₹1.5 Cr', aiScore: 94,
    aiReason: 'Strong fit: FinTech + India + payments infra thesis',
    conviction: 'High Conviction',
  },
  {
    id: 2, name: 'FarmLens', logo: '🌾', sector: 'AgriTech', stage: 'Seed',
    city: 'Ludhiana', state: 'Punjab',
    description: 'AI-powered crop disease detection via smartphone camera.',
    founders: ['Priya Kaur', 'Sukhdeep Singh'],
    traction: '45k farmers active · 3 state govt pilots',
    ask: '₹3 Cr', aiScore: 87,
    aiReason: 'Matches AgriTech + Punjab + govt B2G thesis',
    conviction: 'High Conviction',
  },
  {
    id: 3, name: 'StudyPod', logo: '📚', sector: 'EdTech', stage: 'Pre-Seed',
    city: 'Delhi', state: 'Delhi',
    description: 'AI tutor for competitive exam prep in regional languages.',
    founders: ['Harsh Vardhan'],
    traction: '8.2k DAU · 4.6★ rating · 23% W-o-W growth',
    ask: '₹80L', aiScore: 79,
    aiReason: 'EdTech + Bharat + regional language play',
    conviction: 'Worth Tracking',
  },
  {
    id: 4, name: 'GreenCell', logo: '🔋', sector: 'CleanTech', stage: 'Seed',
    city: 'Pune', state: 'Maharashtra',
    description: 'Second-life EV battery repurposing for grid storage.',
    founders: ['Vikram Desai', 'Neha Joshi'],
    traction: '2 enterprise contracts · ₹40L ARR',
    ask: '₹4 Cr', aiScore: 82,
    aiReason: 'CleanTech + hardware + sustainability thesis',
    conviction: 'Worth Tracking',
  },
  {
    id: 5, name: 'Konnect', logo: '🤝', sector: 'SaaS', stage: 'Pre-Seed',
    city: 'Chandigarh', state: 'Punjab',
    description: 'Founder-investor matching CRM for angel networks.',
    founders: ['Arshia Sukheja'],
    traction: '340 investors onboarded · 120 startups matched',
    ask: '₹50L', aiScore: 91,
    aiReason: 'SaaS + network effects + Punjab ecosystem play',
    conviction: 'High Conviction',
  },
]

const SAVED_DEALS = {
  interested: [MOCK_STARTUPS[0], MOCK_STARTUPS[4]],
  maybe: [MOCK_STARTUPS[2]],
  intro: [MOCK_STARTUPS[1]],
  meeting: [],
}

const MESSAGES = [
  { id: 1, founder: 'Anika Mehta', startup: 'PaySure', avatar: '💳', lastMsg: 'Sent deck v3 – updated unit economics slide', time: '2h ago', unread: true },
  { id: 2, founder: 'Priya Kaur', startup: 'FarmLens', avatar: '🌾', lastMsg: 'Thanks for the intro to Agri Fund!', time: '1d ago', unread: false },
  { id: 3, founder: 'Arshia Sukheja', startup: 'Konnect', avatar: '🤝', lastMsg: 'Would love to schedule a 15-min call this week', time: '3d ago', unread: true },
]

const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'discover', label: 'Discover Startups', icon: Compass },
  { id: 'saved', label: 'Saved Deals', icon: Bookmark },
  { id: 'messages', label: 'Messages', icon: MessageCircle, badge: 2 },
  { id: 'meetings', label: 'Meetings', icon: CalendarClock },
  { id: 'insights', label: 'AI Match Insights', icon: Sparkles },
  { id: 'profile', label: 'Investor Profile', icon: UserCircle },
  { id: 'settings', label: 'Settings', icon: Settings },
]

/* ═══════════════════════════════════════════════════════════════════════════════
   PREMIUM DARK COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════════ */

const ConvictionBadge = ({ level }) => {
  const map = {
    'High Conviction': { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', icon: Flame },
    'Worth Tracking': { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', icon: Eye },
    'Early Signal': { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30', icon: Zap },
  }
  const s = map[level] || map['Early Signal']
  const Icon = s.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${s.bg} ${s.text} ${s.border} shadow-sm backdrop-blur-md`}>
      <Icon size={12} strokeWidth={2.5} /> {level}
    </span>
  )
}

const AIScoreRing = ({ score, size = 52 }) => {
  const r = (size - 8) / 2
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const color = score >= 85 ? '#10b981' : score >= 70 ? '#f59e0b' : '#5B65DC'

  return (
    <div className="relative flex items-center justify-center cursor-default group" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          className="group-hover:opacity-80 transition-all duration-500"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dasharray 1s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <span className="text-[14px] font-bold tracking-tight" style={{ color }}>{score}</span>
    </div>
  )
}

const LockOverlay = ({ label = 'Upgrade to Pro' }) => (
  <div className="absolute inset-0 z-20 backdrop-blur-xl rounded-3xl flex flex-col items-center justify-center bg-[#070B19]/50 border border-white/5">
    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-white/50">
      <Lock size={20} />
    </div>
    <span className="text-[12px] font-black text-white uppercase tracking-wider mb-4 drop-shadow-md">{label}</span>
    <button className="px-5 py-2.5 rounded-xl bg-white text-[#122056] text-[12px] font-extrabold uppercase tracking-widest hover:opacity-90 hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.15)] flex items-center gap-2">
      Unlock <Crown size={14} className="text-[#5B65DC]" />
    </button>
  </div>
)

/* ═══════════════════════════════════════════════════════════════════════════════
   STARTUP CARD
   ═══════════════════════════════════════════════════════════════════════════════ */

const StartupCard = ({ startup, onView }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden"
  >
    {/* Subtle gradient glow inside card */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-[#5B65DC]/5 rounded-full blur-[60px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

    <div className="relative z-10 flex gap-5">
      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl shadow-inner shadow-white/5">
        {startup.logo}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight leading-tight">{startup.name}</h3>
            <div className="flex items-center gap-2.5 mt-1.5 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-[#5B65DC]/15 border border-[#5B65DC]/20 text-[10px] font-black text-[#8B93F0] uppercase tracking-wider">{startup.sector}</span>
              <span className="text-[11px] font-medium text-white/50">{startup.stage}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-[11px] font-medium text-white/50 flex items-center gap-1"><MapPin size={10} /> {startup.city}</span>
            </div>
          </div>
          <AIScoreRing score={startup.aiScore} />
        </div>

        <p className="text-[14px] text-white/70 leading-relaxed font-medium mb-4">{startup.description}</p>

        <div className="flex items-center gap-2 mb-4">
          <Users size={14} className="text-white/40" />
          <span className="text-[12px] font-medium text-white/60">{startup.founders.join(' · ')}</span>
        </div>

        {/* Highlighted Traction Box matching landing page style */}
        <div className="p-4 rounded-2xl bg-[#030613]/40 border border-white/5 mb-5 shadow-inner">
          <div className="flex items-center gap-2 mb-1.5">
            <TrendingUp size={14} className="text-[#5B65DC]" />
            <span className="text-[10px] font-black text-[#5B65DC] uppercase tracking-[0.15em]">Traction Signal</span>
          </div>
          <p className="text-[13px] text-white/90 font-medium">{startup.traction}</p>
        </div>

        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[14px] font-bold text-white">Ask: {startup.ask}</span>
            </div>
            <ConvictionBadge level={startup.conviction} />
          </div>
          <div className="flex items-center gap-2.5">
            <button className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center">
              <Bookmark size={15} />
            </button>
            <button className="h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-[12px] font-bold text-white/80 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-1.5">
              <Send size={13} /> Request Intro
            </button>
            <button onClick={() => onView?.(startup.id)} className="h-10 px-5 rounded-xl bg-gradient-to-r from-[#5B65DC] to-[#7C6EE6] text-[12px] font-bold text-white hover:shadow-[0_10px_20px_rgba(91,101,220,0.3)] hover:scale-[1.02] transition-all flex items-center gap-1.5 shadow-lg">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Elegant AI Reason Strip */}
    <div className="mt-5 px-4 py-3 rounded-xl bg-[#5B65DC]/10 border border-[#5B65DC]/20">
      <div className="flex items-center gap-2">
        <Sparkles size={13} className="text-[#8B93F0]" />
        <span className="text-[11px] font-bold tracking-wider text-[#8B93F0] uppercase">AI Match Thesis: </span>
        <span className="text-[12px] text-[#EEF0FD]">{startup.aiReason}</span>
      </div>
    </div>
  </motion.div>
)

/* ═══════════════════════════════════════════════════════════════════════════════
   AI INSIGHTS PANEL (Dark)
   ═══════════════════════════════════════════════════════════════════════════════ */

const AIInsightsPanel = ({ startup }) => {
  if (!startup) return null
  const metrics = [
    { label: 'Thesis Fit', value: 94, color: '#10b981' },
    { label: 'Market Trend', value: 88, color: '#5B65DC' },
    { label: 'Founder Credibility', value: 82, color: '#f59e0b' },
    { label: 'Traction Realism', value: 91, color: '#10b981' },
    { label: 'Risk Level', value: 35, color: '#ef4444', invert: true },
  ]

  return (
    <div className="w-[320px] flex-shrink-0 space-y-6 sticky top-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5B65DC] to-[#7C6EE6] flex items-center justify-center shadow-lg shadow-[#5B65DC]/30">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <h4 className="text-[14px] font-bold text-white tracking-tight">AI Analyst</h4>
            <p className="text-[10px] text-white/50 uppercase tracking-widest font-black mt-0.5">FoundrHub Intelligence</p>
          </div>
        </div>

        <div className="px-4 py-3 rounded-2xl bg-[#030613]/50 border border-white/5 mb-6">
          <p className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-1">Analyzing Data</p>
          <p className="text-[15px] font-bold text-white">{startup.name}</p>
        </div>

        <div className="space-y-4">
          {metrics.map(m => (
            <div key={m.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] text-white/70 font-semibold">{m.label}</span>
                <span className="text-[11px] font-black tracking-wide" style={{ color: m.color }}>{m.invert ? `${100 - m.value}%` : `${m.value}%`}</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/5 overflow-hidden border border-white/[0.02]">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: m.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${m.invert ? 100 - m.value : m.value}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locked Deep Diligence */}
      <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-hidden min-h-[160px]">
        <LockOverlay label="Deep Diligence" />
        <div className="blur-xl opacity-30 select-none">
          <div className="h-4 bg-white rounded w-1/2 mb-4"></div>
          <div className="space-y-2">
            <div className="h-2 bg-white rounded w-3/4"></div>
            <div className="h-2 bg-white rounded w-full"></div>
            <div className="h-2 bg-white rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */

const InvestorMVPDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard')

  return (
    <div className="min-h-screen bg-[#070B19] text-white font-sans selection:bg-[#5B65DC]/30 relative overflow-hidden flex">
      {/* ── Global Animated Dark Glows matching FoundrHUB vibe ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[#5B65DC]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#7C6EE6]/10 rounded-full blur-[100px]" />
      </div>

      {/* ═══ LEFT SIDEBAR ═══ */}
      <aside className="w-[260px] flex-shrink-0 bg-white/[0.02] border-r border-white/5 backdrop-blur-3xl flex flex-col z-20 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
        {/* Logo */}
        <div className="px-6 py-8 border-b border-white/5">
          <h1 className="text-2xl font-black tracking-tighter">
            <span className="text-white">Foundr</span>
            <span className="text-[#5B65DC]">HUB</span>
          </h1>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#5B65DC] mt-2 bg-[#5B65DC]/10 inline-block px-2 py-0.5 rounded-sm">Investor Workspace</p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
          {SIDEBAR_ITEMS.map(item => {
            const Icon = item.icon
            const active = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all duration-300 group ${
                  active
                    ? 'bg-gradient-to-r from-[#5B65DC] to-[#7C6EE6] text-white shadow-md shadow-[#5B65DC]/20 scale-[1.02]'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} strokeWidth={active ? 2.5 : 2} className={active ? '' : 'text-white/40 group-hover:text-white/80 transition-colors'} />
                {item.label}
                {item.badge && (
                  <span className={`ml-auto px-2 py-0.5 rounded-full text-[9px] font-black ${active ? 'bg-white text-[#5B65DC]' : 'bg-[#5B65DC] text-white'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Upgrade Block */}
        <div className="p-5">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#1A2247] to-[#0A1128] border border-white/10 p-5 text-center overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#5B65DC]/20 blur-2xl rounded-full" />
            <Crown size={24} className="text-[#8B93F0] mx-auto mb-3" />
            <p className="text-[14px] font-black text-white tracking-tight mb-2">Upgrade to Pro</p>
            <p className="text-[11px] font-medium text-[#8B93F0] mb-5 leading-relaxed">Unlock deep AI diligence, limitless connects & CRM.</p>
            <button className="w-full py-3 rounded-xl bg-white text-[#122056] text-[11px] font-black uppercase tracking-widest hover:scale-[1.03] transition-all shadow-[0_10px_20px_rgba(255,255,255,0.15)]">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>

      {/* ═══ MAIN STAGE ═══ */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-20 flex-shrink-0 border-b border-white/5 bg-transparent backdrop-blur-md flex items-center px-10 gap-6">
          <div className="flex-1 max-w-xl relative group">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#5B65DC] transition-colors" />
            <input
              type="text"
              placeholder="Search startup universe..."
              className="w-full pl-12 pr-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-[13px] font-medium text-white placeholder-white/30 focus:bg-white/10 focus:border-[#5B65DC]/50 focus:outline-none focus:ring-4 focus:ring-[#5B65DC]/10 transition-all shadow-inner"
            />
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button className="relative w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:scale-105 transition-all">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#070B19]" />
            </button>

            <div className="h-8 w-px bg-white/10" />

            <div className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="w-11 h-11 rounded-full bg-white p-0.5">
                <div className="w-full h-full rounded-full bg-[#122056] flex items-center justify-center text-[12px] font-black text-white tracking-widest">RS</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto px-10 py-10">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">

              {/* DASHBOARD HOME */}
              {activeSection === 'dashboard' && (
                <motion.div key="dashboard" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  
                  {/* Cinematic Hero adapted for Dashboard */}
                  <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#122056] to-[#0A1128] border border-white/10 p-12 mb-10 overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.4)]">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#5B65DC]/20 blur-[100px] pointer-events-none rounded-full" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-px w-8 bg-[#5B65DC]/50" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8B93F0]">Your Workspace</span>
                      </div>
                      
                      <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4 max-w-2xl">
                        Discover startups aligned with <span className="text-[#5B65DC] italic pr-2">your thesis.</span>
                      </h2>
                      <p className="text-[16px] text-[#EEF0FD]/70 max-w-lg mb-10 font-medium leading-relaxed">
                        FoundrHUB's intelligence engine curates real-time deal flow based on your sector, stage, and risk preferences.
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <button onClick={() => setActiveSection('discover')} className="px-8 py-4 rounded-2xl bg-white text-[#122056] text-[13px] font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_15px_30px_rgba(255,255,255,0.1)]">
                          <Compass size={16} /> Explore Feed
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* High-level KPIs */}
                  <div className="grid grid-cols-3 gap-6 mb-12">
                    {[
                      { label: 'High Conviction', value: '12', icon: Flame, color: '#f59e0b', delta: 'Matches Today' },
                      { label: 'Saved Startups', value: '24', icon: Bookmark, color: '#5B65DC', delta: 'Across 4 Sectors' },
                      { label: 'Connects Left', value: '7', icon: Send, color: '#10b981', delta: 'Free Tier Limit' },
                    ].map(stat => (
                      <div key={stat.label} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-[2rem] p-8 hover:bg-white/[0.08] hover:border-white/20 transition-all group">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#030613]/50 border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                            <stat.icon size={20} style={{ color: stat.color }} strokeWidth={2.5} />
                          </div>
                          <span className="text-[11px] font-black tracking-widest uppercase text-white/50">{stat.label}</span>
                        </div>
                        <p className="text-5xl font-black text-white tracking-tighter mb-2">{stat.value}</p>
                        <p className="text-[12px] font-medium text-white/40">{stat.delta}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mb-10">
                    <h3 className="text-2xl font-bold tracking-tight text-white mb-6">Priority Matches</h3>
                    <div className="space-y-6">
                      {MOCK_STARTUPS.slice(0, 2).map(s => (
                        <StartupCard key={s.id} startup={s} onView={() => setActiveSection('discover')} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* DISCOVER VIEW */}
              {activeSection === 'discover' && (
                <motion.div key="discover" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <div className="flex items-end justify-between mb-8">
                    <div>
                      <h2 className="text-4xl font-bold tracking-tight text-white mb-2">Discovery Feed</h2>
                      <p className="text-[14px] text-white/50 font-medium tracking-wide">Ranked intelligently against your thesis</p>
                    </div>
                  </div>

                  <div className="flex gap-10">
                    <div className="flex-1 space-y-6">
                      {MOCK_STARTUPS.map(s => (
                        <StartupCard key={s.id} startup={s} />
                      ))}
                    </div>
                    <AIInsightsPanel startup={MOCK_STARTUPS[0]} />
                  </div>
                </motion.div>
              )}

              {/* PENDING / OTHER VIEWS */}
              {['saved', 'messages', 'meetings', 'insights', 'profile', 'settings'].includes(activeSection) && (
                <motion.div key="fallback" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
                  <h2 className="text-2xl font-bold text-white mb-2 capitalize">{activeSection}</h2>
                  <p className="text-white/50">Section adapted for premium MVP.</p>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}

export default InvestorMVPDashboard
