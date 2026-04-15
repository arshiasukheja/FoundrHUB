import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import Footer from '../components/Footer'
import {
  Rocket, Users, Trophy, GraduationCap, Code2,
  Search, Briefcase, BookOpen, FileText, Award,
  Building2, Globe, Lightbulb, Zap, TrendingUp, Crown,
  MessageSquare, Target, Sparkles, ArrowRight,
  Star, ExternalLink, CheckCircle2,
  MapPin, Calendar, DollarSign, Eye, Filter,
  Layers, Heart, Share2, Bookmark, ChevronRight
} from 'lucide-react'

/* ── Niche-Specific Data ── */
const nicheData = {
  'AI / ML': {
    color: '#5B65DC',
    gradient: 'from-[#5B65DC] to-[#7C3AED]',
    icon: '🤖',
    startups: [
      { name: 'NeuralBrew AI', desc: 'AI-powered creative tools for D2C brand narratives at scale.', founder: 'Rahul K.', stage: 'Seed', raised: '₹45L', badge: 'Rising', city: 'Chandigarh', hot: true },
      { name: 'VisionStack', desc: 'Computer vision pipeline for quality control in manufacturing.', founder: 'Meera P.', stage: 'Pre-Seed', raised: '₹12L', badge: 'New', city: 'Bangalore', hot: false },
      { name: 'SynthAI Lab', desc: 'Synthetic data generation for ML model training.', founder: 'Arjun D.', stage: 'MVP', raised: '—', badge: 'Building', city: 'Hyderabad', hot: true },
      { name: 'DeepDoc Health', desc: 'AI diagnostics for rural healthcare centers.', founder: 'Sneha G.', stage: 'Seed', raised: '₹80L', badge: 'Funded', city: 'Pune', hot: false },
      { name: 'CopyGenius', desc: 'GPT-powered copywriting assistant for Indian brands.', founder: 'Vikram S.', stage: 'Growth', raised: '₹2Cr', badge: 'Verified', city: 'Mumbai', hot: true },
      { name: 'DataWave', desc: 'Real-time analytics platform using edge AI.', founder: 'Priya M.', stage: 'Pre-Seed', raised: '₹8L', badge: 'New', city: 'Delhi', hot: false },
    ],
    opportunities: [
      { title: 'Google for Startups AI Academy', type: 'Program', deadline: 'May 30, 2026', prize: 'Mentorship + Credits', icon: GraduationCap },
      { title: 'NASSCOM AI Innovation Challenge', type: 'Competition', deadline: 'Jun 15, 2026', prize: '₹10L Prize Pool', icon: Trophy },
      { title: 'Microsoft for Startups – Founders Hub', type: 'Grant', deadline: 'Rolling', prize: '$150K Azure Credits', icon: DollarSign },
      { title: 'IIT Madras RBCDSAI Fellowship', type: 'Fellowship', deadline: 'Jul 1, 2026', prize: 'Research + Funding', icon: Award },
    ],
    stats: { startups: 234, founders: 489, funding: '₹12.4Cr', growth: '+28%' },
  },
  'SaaS / Tech': {
    color: '#0EA5E9',
    gradient: 'from-[#0EA5E9] to-[#5B65DC]',
    icon: '💻',
    startups: [
      { name: 'StackFin', desc: 'Embedded finance for SaaS founders to add payments in minutes.', founder: 'Arjun D.', stage: 'Seed', raised: '₹1.2Cr', badge: 'Verified', city: 'Panchkula', hot: true },
      { name: 'DevMetrics', desc: 'Developer productivity analytics for engineering teams.', founder: 'Karan T.', stage: 'Pre-Seed', raised: '₹20L', badge: 'Rising', city: 'Bangalore', hot: false },
      { name: 'FormBase', desc: 'No-code backend for form-heavy SaaS applications.', founder: 'Riya M.', stage: 'MVP', raised: '—', badge: 'Building', city: 'Chandigarh', hot: true },
      { name: 'CloudPilot', desc: 'Multi-cloud cost optimization platform.', founder: 'Harsh V.', stage: 'Seed', raised: '₹55L', badge: 'Funded', city: 'Hyderabad', hot: false },
      { name: 'APIBridge', desc: 'Universal API integration platform for Indian SaaS.', founder: 'Neha K.', stage: 'Growth', raised: '₹3.5Cr', badge: 'Verified', city: 'Mumbai', hot: true },
      { name: 'PingBoard', desc: 'Team communication tool built for async-first teams.', founder: 'Aditya R.', stage: 'Pre-Seed', raised: '₹10L', badge: 'New', city: 'Delhi', hot: false },
    ],
    opportunities: [
      { title: 'Y Combinator W27 Batch', type: 'Accelerator', deadline: 'Jun 1, 2026', prize: '$500K Investment', icon: Rocket },
      { title: 'AWS Activate', type: 'Grant', deadline: 'Rolling', prize: '$100K Credits', icon: DollarSign },
      { title: 'TiE Young Entrepreneurs', type: 'Program', deadline: 'May 20, 2026', prize: 'Mentorship + Network', icon: Users },
      { title: 'Product Hunt Launch Week', type: 'Event', deadline: 'Jun 10, 2026', prize: 'Global Exposure', icon: Globe },
    ],
    stats: { startups: 312, founders: 567, funding: '₹18.2Cr', growth: '+34%' },
  },
  'EdTech': {
    color: '#10B981',
    gradient: 'from-[#10B981] to-[#059669]',
    icon: '📚',
    startups: [
      { name: 'SkillForge', desc: 'Gamified skill-building for college students.', founder: 'Ankit B.', stage: 'Pre-Seed', raised: '₹15L', badge: 'Rising', city: 'Chandigarh', hot: true },
      { name: 'QuizMate AI', desc: 'AI-driven adaptive testing platform for K-12.', founder: 'Pooja S.', stage: 'Seed', raised: '₹40L', badge: 'Funded', city: 'Bangalore', hot: false },
      { name: 'CampusConnect', desc: 'Campus-first social learning platform.', founder: 'Rahul B.', stage: 'MVP', raised: '—', badge: 'Building', city: 'Delhi', hot: true },
      { name: 'MentorLink', desc: 'Peer mentoring marketplace for university students.', founder: 'Deepa K.', stage: 'Pre-Seed', raised: '₹8L', badge: 'New', city: 'Pune', hot: false },
      { name: 'CodeCraft', desc: 'Interactive coding bootcamp for Tier 2/3 cities.', founder: 'Sanjay P.', stage: 'Growth', raised: '₹1.5Cr', badge: 'Verified', city: 'Jaipur', hot: true },
      { name: 'EduVerse', desc: 'VR-based immersive learning experiences.', founder: 'Tanya M.', stage: 'Pre-Seed', raised: '₹22L', badge: 'Rising', city: 'Hyderabad', hot: false },
    ],
    opportunities: [
      { title: 'Atal Innovation Mission Grant', type: 'Grant', deadline: 'Jul 15, 2026', prize: '₹25L Grant', icon: DollarSign },
      { title: 'EdTech India Summit Pitch', type: 'Competition', deadline: 'Jun 20, 2026', prize: '₹5L + Mentorship', icon: Trophy },
      { title: 'Google.org Impact Challenge', type: 'Grant', deadline: 'Rolling', prize: '$250K Grant', icon: Award },
      { title: 'Teach For India Fellowship', type: 'Fellowship', deadline: 'May 30, 2026', prize: 'Network + Impact', icon: GraduationCap },
    ],
    stats: { startups: 189, founders: 342, funding: '₹8.1Cr', growth: '+22%' },
  },
}

// Default fallback for niches not explicitly defined
const defaultNicheData = {
  color: '#5B65DC',
  gradient: 'from-[#5B65DC] to-[#122056]',
  icon: '🚀',
  startups: [
    { name: 'InnovateLab', desc: 'Building innovative solutions for tomorrow\'s challenges.', founder: 'Alex R.', stage: 'Pre-Seed', raised: '₹10L', badge: 'New', city: 'Chandigarh', hot: true },
    { name: 'GrowthPulse', desc: 'Analytics-driven growth engine for early-stage startups.', founder: 'Sam K.', stage: 'MVP', raised: '—', badge: 'Building', city: 'Bangalore', hot: false },
    { name: 'FutureStack', desc: 'Next-gen infrastructure for emerging market startups.', founder: 'Maya P.', stage: 'Seed', raised: '₹35L', badge: 'Rising', city: 'Mumbai', hot: true },
    { name: 'LaunchPad HQ', desc: 'Co-working meets co-building for student founders.', founder: 'Dev S.', stage: 'Pre-Seed', raised: '₹5L', badge: 'New', city: 'Delhi', hot: false },
    { name: 'NexGen Studios', desc: 'Creative studio empowering local brands to go national.', founder: 'Nidhi T.', stage: 'Growth', raised: '₹1Cr', badge: 'Verified', city: 'Pune', hot: true },
    { name: 'VentureMap', desc: 'Connecting dots between founders, mentors, and investors.', founder: 'Rohan D.', stage: 'Seed', raised: '₹60L', badge: 'Funded', city: 'Hyderabad', hot: false },
  ],
  opportunities: [
    { title: 'Startup India Seed Fund', type: 'Grant', deadline: 'Rolling', prize: '₹50L Funding', icon: DollarSign },
    { title: 'National Startup Awards 2026', type: 'Competition', deadline: 'Jun 30, 2026', prize: '₹15L + Recognition', icon: Trophy },
    { title: 'NASSCOM DeepTech Club', type: 'Program', deadline: 'May 25, 2026', prize: 'Network + Mentorship', icon: Users },
    { title: 'LinkedIn Creator Accelerator', type: 'Program', deadline: 'Jul 1, 2026', prize: 'Branding + Exposure', icon: Globe },
  ],
  stats: { startups: 150, founders: 280, funding: '₹6.5Cr', growth: '+18%' },
}

const badgeStyles = {
  'Verified': 'bg-emerald-500/10 text-emerald-700 border-emerald-200/60',
  'Rising': 'bg-amber-500/10 text-amber-700 border-amber-200/60',
  'Funded': 'bg-blue-500/10 text-blue-700 border-blue-200/60',
  'New': 'bg-violet-500/10 text-violet-700 border-violet-200/60',
  'Building': 'bg-neutral-500/10 text-neutral-600 border-neutral-200/60',
}

const oppTypeStyles = {
  'Grant': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Competition': 'bg-amber-50 text-amber-700 border-amber-200',
  'Program': 'bg-blue-50 text-blue-700 border-blue-200',
  'Accelerator': 'bg-violet-50 text-violet-700 border-violet-200',
  'Fellowship': 'bg-rose-50 text-rose-700 border-rose-200',
  'Event': 'bg-cyan-50 text-cyan-700 border-cyan-200',
}

/* ── Components ── */
const StartupCard = ({ startup, index, nicheColor }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="group relative rounded-3xl bg-white border border-[#EEF0FD] p-6 hover:border-[#5B65DC]/20 hover:shadow-[0_20px_50px_rgba(18,32,86,0.08)] hover:-translate-y-1 transition-all duration-500 cursor-pointer overflow-hidden"
  >
    {/* Hot indicator */}
    {startup.hot && (
      <div className="absolute top-4 right-4">
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-orange-500/10 to-rose-500/10 border border-orange-200/50 text-[10px] font-bold text-orange-600">
          🔥 Hot
        </span>
      </div>
    )}

    {/* Hover gradient accent */}
    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#5B65DC] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

    <div className="flex items-start gap-4 mb-4">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-[18px] font-bold text-white shrink-0 shadow-lg"
        style={{ background: `linear-gradient(135deg, ${nicheColor}, ${nicheColor}88)` }}
      >
        {startup.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[18px] font-bold text-[#122056] group-hover:text-[#5B65DC] transition-colors truncate">{startup.name}</h4>
        <p className="text-[18px] text-neutral-400 font-medium">{startup.founder} · {startup.city}</p>
      </div>
    </div>

    <p className="text-[18px] text-neutral-500 leading-relaxed mb-5 line-clamp-2">
      {startup.desc}
    </p>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${badgeStyles[startup.badge] || badgeStyles['New']}`}>
          {startup.badge}
        </span>
        <span className="text-[11px] font-semibold text-neutral-400">{startup.stage}</span>
      </div>
      {startup.raised !== '—' && (
        <span className="text-[18px] font-bold text-[#122056]/60">{startup.raised}</span>
      )}
    </div>

    {/* Quick actions on hover */}
    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button className="w-8 h-8 rounded-xl bg-[#FAFAFD] border border-[#EEF0FD] flex items-center justify-center text-neutral-400 hover:text-[#5B65DC] hover:border-[#5B65DC]/20 transition-all">
        <Bookmark size={13} />
      </button>
      <button className="w-8 h-8 rounded-xl bg-[#FAFAFD] border border-[#EEF0FD] flex items-center justify-center text-neutral-400 hover:text-[#5B65DC] hover:border-[#5B65DC]/20 transition-all">
        <Share2 size={13} />
      </button>
    </div>
  </motion.div>
)

const OpportunityCard = ({ opp, index }) => {
  const Icon = opp.icon
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group flex items-start gap-4 p-5 rounded-2xl border border-[#EEF0FD] bg-white hover:border-[#5B65DC]/20 hover:shadow-[0_12px_30px_rgba(18,32,86,0.06)] transition-all duration-300 cursor-pointer"
    >
      <div className="w-11 h-11 rounded-2xl bg-[#FAFAFD] border border-[#EEF0FD] flex items-center justify-center shrink-0 group-hover:border-[#5B65DC]/20 transition-colors">
        <Icon size={18} className="text-[#5B65DC]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <h4 className="text-[18px] font-bold text-[#122056] truncate">{opp.title}</h4>
          <ExternalLink size={12} className="text-neutral-300 group-hover:text-[#5B65DC] transition-colors shrink-0" />
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${oppTypeStyles[opp.type] || oppTypeStyles['Program']}`}>
            {opp.type}
          </span>
          <span className="text-[11px] text-neutral-400 font-medium flex items-center gap-1">
            <Calendar size={10} />
            {opp.deadline}
          </span>
        </div>
        <p className="text-[18px] text-neutral-500 mt-1.5 font-medium">{opp.prize}</p>
      </div>
      <ChevronRight size={16} className="text-neutral-200 group-hover:text-[#5B65DC] shrink-0 mt-1 transition-colors" />
    </motion.div>
  )
}

/* ═══════════════════════════════════════
   PAGE
   ═══════════════════════════════════════ */
const EarlyAccessOpportunitiesPage = () => {
  const [searchParams] = useSearchParams()
  const niche = searchParams.get('niche') || 'AI / ML'
  const founderName = searchParams.get('name') || 'Founder'
  const data = nicheData[niche] || defaultNicheData
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredStartups = data.startups.filter(s => {
    if (filter === 'hot') return s.hot
    if (filter === 'funded') return s.raised !== '—'
    return true
  }).filter(s =>
    searchQuery === '' ||
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#EEF0FD]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <Link to="/" className="text-[22px] font-extrabold tracking-tight text-[#122056]">
            Foundr<span className="text-[#5B65DC]">HUB</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] font-bold text-emerald-600">
              <CheckCircle2 size={12} />
              Early Access Member
            </span>
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#122056] to-[#5B65DC] flex items-center justify-center text-white text-[11px] font-bold">
              {founderName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </motion.header>

      <main className="min-h-screen bg-[#FAFAFD] relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#5B65DC]/5 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-emerald-400/5 rounded-full blur-[120px]" />
        </div>

        {/* Hero Banner */}
        <section className="relative pt-12 pb-8 lg:pt-16 lg:pb-12 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{data.icon}</span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B65DC]">Your Niche</span>
                  <h1 className="text-[28px] lg:text-[36px] font-bold text-[#122056] tracking-tight leading-tight">
                    {niche} Ecosystem
                  </h1>
                </div>
              </div>
              <p className="text-[18px] text-neutral-500 max-w-2xl leading-relaxed mb-8">
                Welcome, <span className="font-bold text-[#122056]">{founderName}</span>! Here are the top startups, opportunities, and resources tailored to your niche.
              </p>
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Active Startups', value: data.stats.startups, icon: Rocket },
                  { label: 'Founders', value: data.stats.founders, icon: Users },
                  { label: 'Total Funding', value: data.stats.funding, icon: DollarSign },
                  { label: 'Monthly Growth', value: data.stats.growth, icon: TrendingUp },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.6 }}
                    className="rounded-2xl bg-white border border-[#EEF0FD] p-4 shadow-[0_4px_20px_rgba(18,32,86,0.03)]"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-xl bg-[#FAFAFD] border border-[#EEF0FD] flex items-center justify-center">
                        <stat.icon size={14} className="text-[#5B65DC]" />
                      </div>
                    </div>
                    <p className="text-[20px] font-bold text-[#122056] tabular-nums">{stat.value}</p>
                    <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="relative pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
            <div className="grid lg:grid-cols-[1fr_380px] gap-8">
              {/* Left: Startups */}
              <div>
                {/* Search + Filter Bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-3 mb-6"
                >
                  <div className="flex-1 flex items-center gap-3 rounded-2xl bg-white border border-[#EEF0FD] px-4 py-3 shadow-sm">
                    <Search size={16} className="text-neutral-300" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={`Search ${niche} startups...`}
                      className="w-full text-sm text-[#122056] placeholder:text-neutral-300 outline-none bg-transparent font-medium"
                    />
                  </div>
                  <div className="flex gap-2">
                    {[
                      { key: 'all', label: 'All' },
                      { key: 'hot', label: '🔥 Hot' },
                      { key: 'funded', label: 'Funded' },
                    ].map(f => (
                      <button
                        key={f.key}
                        onClick={() => setFilter(f.key)}
                        className={`px-4 py-2.5 rounded-xl text-[18px] font-bold border transition-all duration-300 ${
                          filter === f.key
                            ? 'bg-[#122056] text-white border-[#122056] shadow-lg shadow-[#122056]/10'
                            : 'bg-white text-neutral-500 border-[#EEF0FD] hover:border-[#5B65DC]/20'
                        }`}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Title */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[18px] font-bold text-[#122056]">
                    Featured Startups
                    <span className="ml-2 text-[18px] font-medium text-neutral-400">({filteredStartups.length})</span>
                  </h2>
                </div>

                {/* Startup Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {filteredStartups.map((startup, i) => (
                    <StartupCard key={startup.name} startup={startup} index={i} nicheColor={data.color} />
                  ))}
                </div>

                {filteredStartups.length === 0 && (
                  <div className="text-center py-16">
                    <Search size={32} className="mx-auto text-neutral-200 mb-4" />
                    <p className="text-[18px] font-bold text-neutral-400">No startups match your filter</p>
                    <p className="text-[18px] text-neutral-300 mt-1">Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>

              {/* Right: Opportunities Sidebar */}
              <div className="space-y-6">
                {/* Opportunities */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="rounded-3xl bg-white border border-[#EEF0FD] p-6 shadow-[0_8px_30px_rgba(18,32,86,0.04)]"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5B65DC]">Curated</span>
                      <h3 className="text-[18px] font-bold text-[#122056] mt-0.5">Opportunities</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#5B65DC]/10 text-[10px] font-bold text-[#5B65DC]">
                      {data.opportunities.length} Active
                    </span>
                  </div>
                  <div className="space-y-3">
                    {data.opportunities.map((opp, i) => (
                      <OpportunityCard key={opp.title} opp={opp} index={i} />
                    ))}
                  </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="rounded-3xl bg-gradient-to-br from-[#122056] to-[#0A1128] border border-[#1e2d63] p-6 text-white relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#5B65DC]/20 rounded-full blur-[60px]" />
                  <div className="relative z-10">
                    <SparklesIcon />
                    <h3 className="text-[18px] font-bold mb-2 mt-3">Unlock Pro Features</h3>
                    <p className="text-[18px] text-white/60 leading-relaxed mb-4">
                      Get personalized investor matchmaking, priority listing, and growth analytics.
                    </p>
                    <button className="w-full px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-[18px] font-bold text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                      <Crown size={14} />
                      Coming Soon
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

const SparklesIcon = () => (
  <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
    <Sparkles size={18} className="text-white/80" />
  </div>
)

export default EarlyAccessOpportunitiesPage
