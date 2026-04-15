import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import {
  Rocket, Users, Trophy, GraduationCap, Code2, Megaphone,
  UserPlus, Search, Briefcase, BookOpen, FileText, Award,
  Building2, Globe, Lightbulb, Zap, TrendingUp, Crown,
  MessageSquare, Target, Shield, Sparkles, ArrowRight,
  ChevronRight, Star, Heart, ExternalLink, CheckCircle2,
  Send, BadgeCheck, Flame, Eye, HandshakeIcon
} from 'lucide-react'

/* ── Reveal Observer ── */
const useReveal = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      )
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el))
      return () => observer.disconnect()
    }, 150)
    return () => clearTimeout(timer)
  }, [])
}

/* ── Animated Counter ── */
const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0
          const duration = 1500
          const step = (timestamp) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            setCount(Math.floor(progress * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ═══════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════ */
const HeroSection = () => (
  <section className="relative pt-40 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#5B65DC]/8 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#122056]/5 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[300px] bg-emerald-400/5 rounded-full blur-[100px]" />
    </div>

    {/* Subtle grid */}
    <div className="absolute inset-0 [background:linear-gradient(rgba(18,32,86,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(18,32,86,0.02)_1px,transparent_1px)] [background-size:60px_60px] pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EEF0FD] bg-white/70 backdrop-blur-xl mb-8 shadow-[0_8px_30px_rgba(18,32,86,0.04)]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B65DC]">Early Access — Limited Spots</span>
        </motion.div>

        {/* Headline */}
        <h1 className="font-bold text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05] tracking-tight text-[#122056] mb-6">
          India's Home for{' '}
          <span className="relative">
            <span className="text-[#5B65DC]">Student Founders</span>
            <motion.div
              className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#5B65DC] to-emerald-400 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
            />
          </span>{' '}
          🚀
        </h1>

        {/* Subheadline */}
        <p className="text-[17px] lg:text-[19px] text-neutral-500 leading-relaxed max-w-2xl mx-auto mb-10">
          Join the private founder network built for college startups, hackathon winners, incubated teams, and student entrepreneurs.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mb-12">
          <a
            href="#signup-form"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#122056] text-white text-[15px] font-semibold tracking-wide hover:bg-[#5B65DC] transition-all duration-300 hover:shadow-xl hover:shadow-[#122056]/10 group"
          >
            Join Founder Early Access
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Trust Chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {[
            { label: 'Hackathon Winners', icon: Trophy },
            { label: 'Student Startups', icon: Rocket },
            { label: 'Incubated Teams', icon: Building2 },
            { label: 'Campus Founders', icon: GraduationCap },
            { label: 'MVP Builders', icon: Code2 },
          ].map(({ label, icon: Icon }) => (
            <div
              key={label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-[#EEF0FD] text-[12px] font-semibold text-[#122056]/80 hover:bg-white/80 hover:border-[#5B65DC]/20 transition-all duration-300 cursor-default"
            >
              <Icon size={14} className="text-[#5B65DC]" />
              {label}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </section>
)

/* ═══════════════════════════════════════
   SECTION 2 — FEATURE TEASER
   ═══════════════════════════════════════ */
const featureCategories = [
  {
    title: 'Founder Identity',
    icon: Shield,
    color: '#5B65DC',
    features: [
      { label: 'Build your founder profile', icon: UserPlus },
      { label: 'Showcase startup credibility', icon: BadgeCheck },
      { label: 'Unlock founder badges', icon: Award },
    ]
  },
  {
    title: 'Team Discovery',
    icon: HandshakeIcon,
    color: '#122056',
    features: [
      { label: 'Find cofounders', icon: Search },
      { label: 'Discover interns', icon: Users },
      { label: 'Join startup teams', icon: UserPlus },
    ]
  },
  {
    title: 'Resource Access',
    icon: BookOpen,
    color: '#5B65DC',
    features: [
      { label: 'Premium templates', icon: FileText },
      { label: 'Grant opportunities', icon: Building2 },
      { label: 'Founder perks', icon: Crown },
    ]
  }
]

const FeaturesSection = () => (
  <section className="py-24 lg:py-32 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#5B65DC]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-emerald-400/3 rounded-full blur-[120px]" />
    </div>

    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <div className="reveal text-center mb-16">
        <span className="section-label">What You Get — Free</span>
        <h2 className="section-title">Everything a student founder needs</h2>
        <p className="text-[16px] text-neutral-500 max-w-xl mx-auto leading-relaxed">
          No credit card. No trial period. Just powerful tools built for campus founders.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {featureCategories.map((cat, ci) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: ci * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group glass-card glass-card-hover p-7 lg:p-8 relative overflow-hidden"
          >
            {/* Accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5B65DC]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Category Header */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-11 h-11 rounded-2xl border border-[#EEF0FD] bg-[#FAFAFD] flex items-center justify-center transition-all group-hover:border-[#5B65DC]/20"
                style={{ color: cat.color }}
              >
                <cat.icon size={20} />
              </div>
              <h3 className="text-[16px] font-bold text-[#122056]">{cat.title}</h3>
            </div>

            {/* Feature List */}
            <div className="space-y-2.5">
              {cat.features.map((f) => (
                <div key={f.label} className="flex items-center gap-2.5 group/item">
                  <f.icon size={14} className="text-[#5B65DC] shrink-0" />
                  <p className="text-[13px] font-semibold text-[#122056]/80">{f.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

/* ═══════════════════════════════════════
   SECTION 3 — CAMPUS VIRAL LOOP
   ═══════════════════════════════════════ */
const campuses = [
  { name: 'Chitkara University', founders: 47, trend: '+12', color: '#5B65DC' },
  { name: 'Thapar Institute', founders: 38, trend: '+8', color: '#122056' },
  { name: 'UIET Chandigarh', founders: 31, trend: '+6', color: '#5B65DC' },
  { name: 'PEC Chandigarh', founders: 28, trend: '+5', color: '#122056' },
  { name: 'Chandigarh University', founders: 52, trend: '+15', color: '#5B65DC' },
]

const CampusLeaderboard = () => (
  <section className="py-24 lg:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#5B65DC]/5 via-transparent to-transparent" />

    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <div className="reveal text-center mb-16">
        <span className="section-label">Campus Leaderboard</span>
        <h2 className="section-title">Top Startup Campuses This Week</h2>
        <p className="text-[16px] text-neutral-500 max-w-xl mx-auto leading-relaxed">
          See which colleges are producing the most student founders. Represent your campus.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        {campuses
          .sort((a, b) => b.founders - a.founders)
          .map((campus, i) => (
            <motion.div
              key={campus.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group glass-card glass-card-hover flex items-center gap-4 p-5 lg:p-6"
            >
              {/* Rank */}
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-[14px] font-black shrink-0 ${
                i === 0
                  ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-lg shadow-amber-400/20'
                  : i === 1
                    ? 'bg-gradient-to-br from-neutral-300 to-neutral-400 text-white'
                    : i === 2
                      ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
                      : 'bg-[#FAFAFD] border border-[#EEF0FD] text-[#122056]'
              }`}>
                {i + 1}
              </div>

              {/* Campus Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold text-[#122056] truncate">{campus.name}</p>
                <p className="text-[12px] text-neutral-400 font-medium">
                  <AnimatedCounter target={campus.founders} /> active founders
                </p>
              </div>

              {/* Trend Chip */}
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                <TrendingUp size={12} className="text-emerald-600" />
                <span className="text-[12px] font-bold text-emerald-600">{campus.trend}</span>
              </div>

              {/* Activity bar */}
              <div className="hidden sm:block w-28">
                <div className="h-2 rounded-full bg-[#EEF0FD] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${campus.color}, ${campus.color}88)` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(campus.founders / 52) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="text-center text-[13px] text-neutral-400 mt-8"
      >
        <Sparkles size={14} className="inline mr-1 text-[#5B65DC]" />
        Your campus not here? <a href="#signup-form" className="text-[#5B65DC] font-semibold hover:underline">Join and represent →</a>
      </motion.p>
    </div>
  </section>
)

/* ═══════════════════════════════════════
   SECTION 4 — BUILD IN PUBLIC WALL
   ═══════════════════════════════════════ */
const publicUpdates = [
  {
    name: 'Arjun M.',
    college: 'Chitkara University',
    update: 'Won SIH internal hackathon 🏆',
    time: '2h ago',
    badge: 'Hackathon Winner',
    badgeColor: 'bg-amber-500/10 text-amber-700 border-amber-200/60',
    initials: 'AM',
    color: '#d5d0e8',
  },
  {
    name: 'Priya S.',
    college: 'Thapar Institute',
    update: 'Looking for AI cofounder — building EdTech tool 🤖',
    time: '4h ago',
    badge: 'Looking for Cofounder',
    badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-200/60',
    initials: 'PS',
    color: '#c9d5e0',
  },
  {
    name: 'Rahul K.',
    college: 'PEC Chandigarh',
    update: 'Launching MVP this week — FinTech for students 🚀',
    time: '6h ago',
    badge: 'MVP Launch',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-200/60',
    initials: 'RK',
    color: '#d5e0c9',
  },
  {
    name: 'Sneha D.',
    college: 'UIET Chandigarh',
    update: 'Hiring campus interns for content & growth 📢',
    time: '8h ago',
    badge: 'Hiring',
    badgeColor: 'bg-purple-500/10 text-purple-700 border-purple-200/60',
    initials: 'SD',
    color: '#e8d5c0',
  },
]

const BuildInPublicWall = () => (
  <section className="py-24 lg:py-32 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-[#5B65DC]/4 rounded-full blur-[120px]" />
    </div>

    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <div className="reveal text-center mb-16">
        <span className="section-label">Build in Public</span>
        <h2 className="section-title">The Founder Wall</h2>
        <p className="text-[16px] text-neutral-500 max-w-xl mx-auto leading-relaxed">
          Real updates from real student founders. Share your journey, celebrate wins, find collaborators.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
        {publicUpdates.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group glass-card glass-card-hover p-6 relative overflow-hidden"
          >
            {/* Top: Avatar + Name + Time */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-[12px] font-bold text-white shrink-0"
                style={{ background: item.color }}
              >
                {item.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-[#122056]">{item.name}</p>
                <p className="text-[11px] text-neutral-400 font-medium">{item.college}</p>
              </div>
              <span className="text-[11px] text-neutral-300 font-medium shrink-0">{item.time}</span>
            </div>

            {/* Update */}
            <p className="text-[14px] text-[#122056]/80 font-medium leading-relaxed mb-4">
              {item.update}
            </p>

            {/* Badge */}
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${item.badgeColor}`}>
              {item.badge}
            </span>

            {/* Hover Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#5B65DC] to-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

/* ═══════════════════════════════════════
   SECTION 5 — SIGNUP FORM
   ═══════════════════════════════════════ */
const SignupForm = () => {
  const [formData, setFormData] = useState({
    isStudentFounder: '',
    founderName: '',
    startupName: '',
    startupOneLiner: '',
    college: '',
    incubator: '',
    domain: '',
    lookingForCofounder: '',
    teamSize: '',
    hackathonAchievements: '',
    mvpStatus: '',
    email: '',
    whatsapp: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    // In production, send to backend/Firebase
    console.log('Founder signup:', formData)
  }

  const inputClass = "w-full px-4 py-3.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#EEF0FD] text-[14px] text-[#122056] font-medium placeholder:text-neutral-300 focus:outline-none focus:border-[#5B65DC]/40 focus:ring-2 focus:ring-[#5B65DC]/10 transition-all"
  const labelClass = "block text-[12px] font-bold uppercase tracking-[0.12em] text-[#122056]/60 mb-2"
  const selectClass = "w-full px-4 py-3.5 rounded-2xl bg-white/60 backdrop-blur-sm border border-[#EEF0FD] text-[14px] text-[#122056] font-medium focus:outline-none focus:border-[#5B65DC]/40 focus:ring-2 focus:ring-[#5B65DC]/10 transition-all appearance-none cursor-pointer"

  if (submitted) {
    return (
      <section id="signup-form" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(91,101,220,0.08),transparent_60%)]" />
        <div className="max-w-xl mx-auto px-6 lg:px-10 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-12"
          >
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-400/20">
              <CheckCircle2 size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-[#122056] mb-3">You're In! 🎉</h3>
            <p className="text-[15px] text-neutral-500 leading-relaxed mb-2">
              Your founder access request has been successfully received.
            </p>
            <p className="text-[13px] text-neutral-400">
              Our team reviews founder applications on a rolling basis.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="signup-form" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(91,101,220,0.08),transparent_60%)]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-emerald-400/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="reveal text-center mb-12">
          <span className="section-label">Claim Your Spot</span>
          <h2 className="section-title">Join the Founder Network</h2>
          <p className="text-[16px] text-neutral-500 max-w-lg mx-auto leading-relaxed">
            Fill in your details. It takes 2 minutes. Be among the first founders shaping this ecosystem.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card p-8 lg:p-10 space-y-5"
        >
          {/* Are you a student founder? */}
          <div>
            <label className={labelClass}>Are you a student founder?</label>
            <div className="flex gap-3">
              {['Yes, currently in college', 'Recent graduate (<2 years)', 'No, but interested'].map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, isStudentFounder: opt }))}
                  className={`flex-1 px-3 py-3 rounded-2xl text-[12px] font-semibold border transition-all duration-300 ${
                    formData.isStudentFounder === opt
                      ? 'bg-[#122056] text-white border-[#122056] shadow-lg shadow-[#122056]/10'
                      : 'bg-white/50 text-[#122056]/70 border-[#EEF0FD] hover:border-[#5B65DC]/20'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Two-column grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Founder Name *</label>
              <input
                type="text"
                name="founderName"
                required
                placeholder="Your full name"
                className={inputClass}
                value={formData.founderName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={labelClass}>Startup Name *</label>
              <input
                type="text"
                name="startupName"
                required
                placeholder="Your startup name"
                className={inputClass}
                value={formData.startupName}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Startup One-liner */}
          <div>
            <label className={labelClass}>Startup One-liner *</label>
            <input
              type="text"
              name="startupOneLiner"
              required
              placeholder="Describe your startup in one line"
              className={inputClass}
              value={formData.startupOneLiner}
              onChange={handleChange}
            />
          </div>

          {/* College + Incubator */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>College *</label>
              <input
                type="text"
                name="college"
                required
                placeholder="Your college name"
                className={inputClass}
                value={formData.college}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={labelClass}>Incubator</label>
              <input
                type="text"
                name="incubator"
                placeholder="If part of any incubator"
                className={inputClass}
                value={formData.incubator}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Domain */}
          <div>
            <label className={labelClass}>Startup Niche *</label>
            <select name="domain" required className={selectClass} value={formData.domain} onChange={handleChange}>
              <option value="">Select your niche</option>
              <option value="AI / ML">AI / ML</option>
              <option value="SaaS / Tech">SaaS / Tech</option>
              <option value="EdTech">EdTech</option>
              <option value="FinTech">FinTech</option>
              <option value="HealthTech">HealthTech</option>
              <option value="D2C / E-commerce">D2C / E-commerce</option>
              <option value="Consumer Brands">Consumer Brands</option>
              <option value="Food & Beverage">Food & Beverage</option>
              <option value="Beauty & Skincare">Beauty & Skincare</option>
              <option value="Fashion">Fashion</option>
              <option value="Sustainability / CleanTech">Sustainability / CleanTech</option>
              <option value="Service Business">Service Business</option>
              <option value="Creator-led Startup">Creator-led Startup</option>
              <option value="Campus / Community">Campus / Community</option>
              <option value="Social Venture">Social Venture</option>
              <option value="Deep Tech">Deep Tech</option>
              <option value="Web3 / Blockchain">Web3 / Blockchain</option>
              <option value="Gaming">Gaming</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Looking for Cofounder + Team Size */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Looking for a cofounder?</label>
              <div className="flex gap-3">
                {['Yes', 'No'].map(opt => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, lookingForCofounder: opt }))}
                    className={`flex-1 px-4 py-3 rounded-2xl text-[13px] font-semibold border transition-all duration-300 ${
                      formData.lookingForCofounder === opt
                        ? 'bg-[#122056] text-white border-[#122056] shadow-lg shadow-[#122056]/10'
                        : 'bg-white/50 text-[#122056]/70 border-[#EEF0FD] hover:border-[#5B65DC]/20'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className={labelClass}>Team Size</label>
              <select name="teamSize" className={selectClass} value={formData.teamSize} onChange={handleChange}>
                <option value="">Select team size</option>
                <option value="Solo">Solo</option>
                <option value="2">2</option>
                <option value="3-5">3–5</option>
                <option value="6-10">6–10</option>
                <option value="10+">10+</option>
              </select>
            </div>
          </div>

          {/* Hackathon Achievements */}
          <div>
            <label className={labelClass}>Hackathon Achievements</label>
            <input
              type="text"
              name="hackathonAchievements"
              placeholder="e.g. SIH Winner, HackMIT Top 10, etc."
              className={inputClass}
              value={formData.hackathonAchievements}
              onChange={handleChange}
            />
          </div>

          {/* MVP Status */}
          <div>
            <label className={labelClass}>MVP Status</label>
            <select name="mvpStatus" className={selectClass} value={formData.mvpStatus} onChange={handleChange}>
              <option value="">Select MVP status</option>
              <option value="Just an idea">Just an idea</option>
              <option value="Building MVP">Building MVP</option>
              <option value="MVP launched">MVP launched</option>
              <option value="Live with users">Live with users</option>
              <option value="Revenue generating">Revenue generating</option>
            </select>
          </div>

          {/* Email + WhatsApp */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Email *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@college.edu"
                className={inputClass}
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={labelClass}>WhatsApp *</label>
              <input
                type="tel"
                name="whatsapp"
                required
                placeholder="+91 XXXXX XXXXX"
                className={inputClass}
                value={formData.whatsapp}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Separator */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full px-8 py-4.5 rounded-full bg-[#122056] text-white text-[15px] font-bold tracking-wide hover:bg-[#5B65DC] transition-all duration-300 hover:shadow-xl hover:shadow-[#122056]/10 flex items-center justify-center gap-2 group"
            >
              <Rocket size={18} />
              Claim Founder Access
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
            <p className="text-[11px] text-neutral-400 text-center mt-3">
              By signing up, you agree to our Terms & Privacy Policy. Your data is safe.
            </p>
          </div>
        </motion.form>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   SECTION 6 — FOOTER CTA
   ═══════════════════════════════════════ */
const FooterCTA = () => (
  <section className="py-32 lg:py-44 bg-neutral-950 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-800/40 via-neutral-950 to-neutral-950" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-900/20 rounded-full blur-[140px]" />
    <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-[100px]" />

    <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-neutral-700 bg-white/5 backdrop-blur-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-400">First 100 Spots</span>
        </span>

        <h2 className="font-bold text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.08] tracking-tight text-white mb-6">
          Be among the first 100 student founders<br className="hidden sm:block" /> shaping the next startup ecosystem.
        </h2>

        <p className="text-[17px] text-neutral-400 leading-relaxed max-w-xl mx-auto mb-10">
          This isn't just a platform — it's your launchpad. Get exclusive access, connect with fellow founders, and build something that matters.
        </p>

        <a
          href="#signup-form"
          className="inline-flex items-center px-10 py-4.5 rounded-full bg-white text-neutral-950 text-[15px] font-semibold tracking-wide hover:bg-neutral-100 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)] group"
        >
          Reserve My Spot
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </motion.div>
    </div>
  </section>
)

/* ═══════════════════════════════════════
   PAGE WRAPPER
   ═══════════════════════════════════════ */
const StudentFounderEarlyAccessPage = () => {
  useReveal()

  return (
    <>
      {/* Logo-only header — no nav capsule */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-8 left-8 lg:left-10 z-50"
      >
        <Link
          to="/"
          className="text-[24px] font-extrabold tracking-tighter text-[#122056] hover:opacity-70 transition-opacity"
        >
          Foundr<span className="text-[#5B65DC]">HUB</span>
        </Link>
      </motion.div>

      <main className="relative bg-[#FAFAFD]">
        <HeroSection />
        <FeaturesSection />
        <CampusLeaderboard />
        <BuildInPublicWall />
        <SignupForm />
        <FooterCTA />
      </main>
      <Footer />
    </>
  )
}

export default StudentFounderEarlyAccessPage
