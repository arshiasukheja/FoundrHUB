import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import {
  Rocket, Users, Trophy, GraduationCap, Code2, Megaphone,
  UserPlus, Search, Briefcase, BookOpen, FileText, Award,
  Building2, Globe, Lightbulb, Zap, TrendingUp, Crown,
  MessageSquare, Target, Shield, Sparkles, ArrowRight,
  ChevronRight, Star, Heart, ExternalLink, CheckCircle2,
  Send, BadgeCheck, Flame, Eye, HandshakeIcon, X,
  Play, ArrowUpRight, MapPin, Lock, MousePointerClick
} from 'lucide-react'

/* ── Reveal Observer ── */
const useReveal = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => observer.observe(el));
    }, 150);
    return () => {
      clearTimeout(timer);
      // Disconnect all observers if any
      document.querySelectorAll('.reveal.visible').forEach(el => {
        el.classList.remove('visible');
      });
    };
  }, []);
};

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

/* ── Mouse Parallax Hook ── */
const useParallax = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  useEffect(() => {
    const handler = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setPos({ x, y })
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
  return pos
}

/* ═══════════════════════════════════════
   SECTION 1 — HERO (Redesigned)
   ═══════════════════════════════════════ */
const HeroSection = ({ onOpenForm }) => {
  const parallax = useParallax()

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Dynamic background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: parallax.x * 20, y: parallax.y * 15 }}
          transition={{ type: 'spring', damping: 50 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#5B65DC]/10 to-transparent rounded-full blur-[140px]"
        />
        <motion.div
          animate={{ x: parallax.x * -15, y: parallax.y * -10 }}
          transition={{ type: 'spring', damping: 50 }}
          className="absolute bottom-0 right-0 w-[600px] h-[500px] bg-gradient-to-tl from-emerald-400/8 to-transparent rounded-full blur-[120px]"
        />
        <div className="absolute top-1/3 left-0 w-[400px] h-[300px] bg-violet-400/5 rounded-full blur-[100px]" />
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0 [background:linear-gradient(rgba(91,101,220,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(91,101,220,0.03)_1px,transparent_1px)] [background-size:48px_48px] pointer-events-none" />

      {/* Floating Orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 right-[15%] w-20 h-20 rounded-full bg-gradient-to-br from-[#5B65DC]/20 to-violet-400/10 blur-sm pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-40 left-[10%] w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 blur-sm pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-20 right-[25%] w-16 h-16 rounded-full bg-gradient-to-br from-amber-400/15 to-orange-400/10 blur-sm pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Animated Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#EEF0FD] bg-white/80 backdrop-blur-xl mb-8 shadow-[0_8px_30px_rgba(18,32,86,0.06)] group hover:border-[#5B65DC]/30 transition-all duration-300 cursor-default"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B65DC]">Early Access — Limited Spots Left</span>
            <Flame size={14} className="text-amber-500 group-hover:animate-bounce" />
          </motion.div>

          {/* Headline with gradient reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="font-bold text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.05] tracking-tight text-[#122056] mb-6"
          >
            India's First Network for{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#5B65DC] via-violet-500 to-[#5B65DC] bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_ease_infinite]">
                Student Founders
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#5B65DC] via-emerald-400 to-violet-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left' }}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="text-[18px] lg:text-[19px] text-neutral-500 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Join the private founder network built for college startups, hackathon winners, incubated teams, and student entrepreneurs building the next big thing.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-14"
          >
            <button
              onClick={onOpenForm}
              className="group relative inline-flex items-center justify-center px-10 py-4 rounded-full text-white text-[18px] font-semibold tracking-wide overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(91,101,220,0.25)]"
              style={{ background: 'linear-gradient(135deg, #5B65DC 0%, #122056 100%)' }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-[#5B65DC] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-2">
                <Rocket size={16} className="group-hover:animate-bounce" />
                Join Founder Early Access
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>

            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#EEF0FD] bg-white/70 backdrop-blur-sm text-[#122056] text-[18px] font-semibold hover:bg-white hover:border-[#5B65DC]/20 transition-all duration-300"
            >
              <Play size={16} className="text-[#5B65DC]" />
              Explore Features
            </a>
          </motion.div>

          {/* Trust Chips with hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { label: 'Hackathon Winners', icon: Trophy, color: '#F59E0B' },
              { label: 'Student Startups', icon: Rocket, color: '#5B65DC' },
              { label: 'Incubated Teams', icon: Building2, color: '#10B981' },
              { label: 'Campus Founders', icon: GraduationCap, color: '#8B5CF6' },
              { label: 'MVP Builders', icon: Code2, color: '#0EA5E9' },
            ].map(({ label, icon: Icon, color }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.06 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/60 backdrop-blur-sm border border-[#EEF0FD] text-[18px] font-semibold text-[#122056]/80 hover:bg-white hover:border-[#5B65DC]/20 hover:shadow-[0_8px_20px_rgba(18,32,86,0.06)] transition-all duration-300 cursor-default"
              >
                <Icon size={14} style={{ color }} />
                {label}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Live Activity Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 max-w-md mx-auto"
        >
          <LiveActivityTicker />
        </motion.div>
      </div>
    </section>
  )
}

/* ── Live Activity Ticker ── */
const activities = [
  { name: 'Arjun M.', action: 'just joined as a founder', time: '2m ago', emoji: '🚀' },
  { name: 'Priya S.', action: 'submitted her startup profile', time: '5m ago', emoji: '📝' },
  { name: 'Rahul K.', action: 'won the campus pitch contest', time: '12m ago', emoji: '🏆' },
  { name: 'Sneha D.', action: 'is looking for a cofounder', time: '18m ago', emoji: '🤝' },
  { name: 'Vikram T.', action: 'launched their MVP', time: '25m ago', emoji: '⚡' },
]

const LiveActivityTicker = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % activities.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-2xl bg-white/70 backdrop-blur-xl border border-[#EEF0FD] px-5 py-3.5 shadow-[0_8px_30px_rgba(18,32,86,0.06)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <span className="text-lg">{activities[current].emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-[18px] text-[#122056]">
              <span className="font-bold">{activities[current].name}</span>{' '}
              <span className="text-neutral-500">{activities[current].action}</span>
            </p>
          </div>
          <span className="text-[11px] text-neutral-300 font-medium shrink-0">{activities[current].time}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════
   SECTION 2 — INTERACTIVE BENTO FEATURES
   ═══════════════════════════════════════ */
const interactiveFeatures = [
  {
    title: 'Founder Identity',
    desc: 'Build your verified founder profile. Showcase credentials, achievements, and startup credibility.',
    icon: Shield,
    color: '#5B65DC',
    gradient: 'from-[#5B65DC]/10 to-violet-500/5',
    size: 'lg:col-span-2',
    visual: 'profile',
  },
  {
    title: 'Co-founder Match',
    desc: 'AI-powered matching to find your perfect co-founder based on skills, goals, and compatibility.',
    icon: HandshakeIcon,
    color: '#10B981',
    gradient: 'from-emerald-500/10 to-cyan-500/5',
    size: '',
    visual: 'match',
  },
  {
    title: 'Campus Leaderboard',
    desc: 'Compete with other campuses. Track founder activity and represent your college.',
    icon: Trophy,
    color: '#F59E0B',
    gradient: 'from-amber-500/10 to-orange-500/5',
    size: '',
    visual: 'leaderboard',
  },
  {
    title: 'Resource Hub',
    desc: 'Pitch deck templates, grant opportunities, startup perks — everything a founder needs, free.',
    icon: BookOpen,
    color: '#8B5CF6',
    gradient: 'from-violet-500/10 to-purple-500/5',
    size: 'lg:col-span-2',
    visual: 'resources',
  },
  {
    title: 'Build in Public',
    desc: 'Share updates, celebrate wins, and build your personal brand with the founder community.',
    icon: Globe,
    color: '#0EA5E9',
    gradient: 'from-cyan-500/10 to-blue-500/5',
    size: '',
    visual: 'public',
  },
]

const FeatureVisual = ({ type, color }) => {
  switch (type) {
    case 'profile':
      return (
        <div className="flex items-center gap-3 mt-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#122056] to-[#5B65DC] flex items-center justify-center text-white text-lg font-bold shadow-lg">
            AS
          </div>
          <div>
            <div className="h-3 w-28 bg-[#122056]/10 rounded-full mb-2" />
            <div className="h-2.5 w-20 bg-neutral-100 rounded-full mb-1.5" />
            <div className="flex gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-100 text-[9px] font-bold text-emerald-600">Verified</span>
              <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-100 text-[9px] font-bold text-amber-600">SIH Winner</span>
            </div>
          </div>
        </div>
      )
    case 'match':
      return (
        <div className="flex items-center gap-2 mt-4">
          {['AS', 'RK', 'MP'].map((init, i) => (
            <motion.div
              key={init}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-bold text-white shadow-md"
              style={{ background: ['#5B65DC', '#10B981', '#8B5CF6'][i] }}
            >
              {init}
            </motion.div>
          ))}
          <div className="text-[11px] text-neutral-400 font-semibold ml-1">+47 matches</div>
        </div>
      )
    case 'leaderboard':
      return (
        <div className="mt-4 space-y-1.5">
          {[
            { name: 'Chandigarh University', val: 85 },
            { name: 'Chitkara University', val: 72 },
            { name: 'Thapar Institute', val: 60 },
          ].map((c, i) => (
            <div key={c.name} className="flex items-center gap-2">
              <span className="text-[10px] font-black text-neutral-300 w-4">{i + 1}</span>
              <div className="flex-1 h-2 rounded-full bg-[#EEF0FD] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: i === 0 ? '#F59E0B' : i === 1 ? '#5B65DC' : '#10B981' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${c.val}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                />
              </div>
              <span className="text-[9px] font-bold text-neutral-400 w-20 truncate">{c.name}</span>
            </div>
          ))}
        </div>
      )
    case 'resources':
      return (
        <div className="flex gap-2 mt-4 flex-wrap">
          {[
            { label: 'Pitch Decks', count: '5', icon: FileText },
            { label: 'Grants', count: '12', icon: DollarSign },
            { label: 'Perks', count: '15+', icon: Crown },
          ].map(r => (
            <div key={r.label} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/60 border border-[#EEF0FD] text-[11px] font-semibold text-[#122056]/70">
              <r.icon size={12} className="text-[#5B65DC]" />
              {r.label}
              <span className="text-[#5B65DC] font-bold">{r.count}</span>
            </div>
          ))}
        </div>
      )
    case 'public':
      return (
        <div className="mt-4 rounded-xl bg-white/50 border border-[#EEF0FD] p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-[#0EA5E9]/20 flex items-center justify-center text-[8px] font-bold text-[#0EA5E9]">AM</div>
            <span className="text-[10px] font-bold text-[#122056]">Arjun M.</span>
            <span className="text-[9px] text-neutral-300">2h ago</span>
          </div>
          <p className="text-[10px] text-neutral-500 italic">"Just hit 100 signups for my MVP! 🎉"</p>
        </div>
      )
    default:
      return null
  }
}

const DollarSign = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)

const FeaturesSection = ({ onOpenForm }) => (
  <section id="features" className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white via-white to-[#FAFAFD]">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#5B65DC]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-emerald-400/3 rounded-full blur-[120px]" />
    </div>

    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#EEF0FD] bg-white/60 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B65DC] mb-6">
          What You Get — 100% Free
        </span>
        <h2 className="font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-[#122056] mb-4">
          Everything a student founder <span className="text-[#5B65DC] italic">needs</span>
        </h2>
        <p className="text-[18px] text-neutral-500 max-w-xl mx-auto leading-relaxed">
          No credit card. No trial period. Just powerful tools built for campus founders.
        </p>
      </motion.div>

      {/* Features Grid: 5 columns on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {interactiveFeatures.map((feat, i) => (
          <motion.div
            key={feat.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className={`group relative rounded-[2rem] bg-gradient-to-br ${feat.gradient} border border-[#EEF0FD] p-7 lg:p-8 overflow-hidden cursor-default ${feat.size}`}
          >
            {/* Hover accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500" style={{ color: feat.color }} />
            
            {/* Glow on hover */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[60px]" style={{ background: `${feat.color}15` }} />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-11 h-11 rounded-2xl border border-white/40 bg-white/50 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:shadow-lg"
                  style={{ color: feat.color }}
                >
                  <feat.icon size={20} />
                </div>
                <h3 className="text-[18px] font-bold text-[#122056]">{feat.title}</h3>
              </div>
              <p className="text-[18px] text-neutral-500 leading-relaxed">{feat.desc}</p>
              <FeatureVisual type={feat.visual} color={feat.color} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-12"
      >
        <button
          onClick={onOpenForm}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#122056] text-white text-[18px] font-semibold hover:bg-[#5B65DC] transition-all duration-300 hover:shadow-xl hover:shadow-[#122056]/15 group"
        >
          <MousePointerClick size={16} />
          Claim Your Free Access
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  </section>
)

/* ═══════════════════════════════════════
   SECTION 3 — CAMPUS LEADERBOARD (Redesigned)
   ═══════════════════════════════════════ */
const campuses = [
  { name: 'Chandigarh University', founders: 52, trend: '+15', color: '#F59E0B', logo: '🏛️' },
  { name: 'Chitkara University', founders: 47, trend: '+12', color: '#5B65DC', logo: '🎓' },
  { name: 'Thapar Institute', founders: 38, trend: '+8', color: '#10B981', logo: '🏫' },
  { name: 'UIET Chandigarh', founders: 31, trend: '+6', color: '#8B5CF6', logo: '📚' },
  { name: 'PEC Chandigarh', founders: 28, trend: '+5', color: '#0EA5E9', logo: '🔬' },
]

const CampusLeaderboard = ({ onOpenForm }) => (
  <section className="py-24 lg:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#5B65DC]/5 via-transparent to-transparent" />

    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#EEF0FD] bg-white/60 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B65DC] mb-6">
          Campus Leaderboard
        </span>
        <h2 className="font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-[#122056] mb-4">
          Top Startup Campuses <span className="text-[#5B65DC] italic">This Week</span>
        </h2>
        <p className="text-[18px] text-neutral-500 max-w-xl mx-auto leading-relaxed">
          See which colleges are producing the most student founders. Represent your campus.
        </p>
      </motion.div>

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
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl bg-white border border-[#EEF0FD] shadow-[0_4px_20px_rgba(18,32,86,0.03)] flex items-center gap-4 p-5 lg:p-6 hover:border-[#5B65DC]/20 hover:shadow-[0_12px_30px_rgba(18,32,86,0.06)] transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Rank indicator line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-colors duration-300" style={{ background: i < 3 ? campus.color : 'transparent' }} />
              
              {/* Rank */}
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-[18px] font-black shrink-0 ${
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

              {/* Campus emoji */}
              <span className="text-xl">{campus.logo}</span>

              {/* Campus Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[18px] font-bold text-[#122056] truncate group-hover:text-[#5B65DC] transition-colors">{campus.name}</p>
                <p className="text-[18px] text-neutral-400 font-medium">
                  <AnimatedCounter target={campus.founders} /> active founders
                </p>
              </div>

              {/* Trend Chip */}
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
                <TrendingUp size={12} className="text-emerald-600" />
                <span className="text-[18px] font-bold text-emerald-600">{campus.trend}</span>
              </div>

              {/* Activity bar */}
              <div className="hidden sm:block w-28">
                <div className="h-2.5 rounded-full bg-[#EEF0FD] overflow-hidden">
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
        className="text-center text-[18px] text-neutral-400 mt-8"
      >
        <Sparkles size={14} className="inline mr-1 text-[#5B65DC]" />
        Your campus not here?{' '}
        <button onClick={onOpenForm} className="text-[#5B65DC] font-semibold hover:underline">
          Join and represent →
        </button>
      </motion.p>
    </div>
  </section>
)

/* ═══════════════════════════════════════
   SECTION 4 — BUILD IN PUBLIC WALL (Redesigned)
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
    color: '#8B5CF6',
    reactions: { '🔥': 12, '🙌': 8 },
  },
  {
    name: 'Priya S.',
    college: 'Thapar Institute',
    update: 'Looking for AI cofounder — building EdTech tool 🤖',
    time: '4h ago',
    badge: 'Looking for Cofounder',
    badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-200/60',
    initials: 'PS',
    color: '#0EA5E9',
    reactions: { '🤝': 15, '💡': 6 },
  },
  {
    name: 'Rahul K.',
    college: 'PEC Chandigarh',
    update: 'Launching MVP this week — FinTech for students 🚀',
    time: '6h ago',
    badge: 'MVP Launch',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-200/60',
    initials: 'RK',
    color: '#10B981',
    reactions: { '🚀': 20, '❤️': 11 },
  },
  {
    name: 'Sneha D.',
    college: 'UIET Chandigarh',
    update: 'Hiring campus interns for content & growth 📢',
    time: '8h ago',
    badge: 'Hiring',
    badgeColor: 'bg-purple-500/10 text-purple-700 border-purple-200/60',
    initials: 'SD',
    color: '#F59E0B',
    reactions: { '🎯': 9, '✅': 7 },
  },
]

const BuildInPublicWall = () => (
  <section className="py-24 lg:py-32 relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-[#5B65DC]/4 rounded-full blur-[120px]" />
    </div>

    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#EEF0FD] bg-white/60 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B65DC] mb-6">
          Build in Public
        </span>
        <h2 className="font-bold text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-tight text-[#122056] mb-4">
          The Founder <span className="text-[#5B65DC] italic">Wall</span>
        </h2>
        <p className="text-[18px] text-neutral-500 max-w-xl mx-auto leading-relaxed">
          Real updates from real student founders. Share your journey, celebrate wins, find collaborators.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
        {publicUpdates.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            className="group relative rounded-3xl bg-white border border-[#EEF0FD] shadow-[0_4px_20px_rgba(18,32,86,0.03)] p-6 hover:border-[#5B65DC]/20 hover:shadow-[0_16px_40px_rgba(18,32,86,0.08)] transition-all duration-300 cursor-default overflow-hidden"
          >
            {/* Top: Avatar + Name + Time */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-[18px] font-bold text-white shrink-0 shadow-md"
                style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}88)` }}
              >
                {item.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[18px] font-bold text-[#122056]">{item.name}</p>
                <p className="text-[11px] text-neutral-400 font-medium">{item.college}</p>
              </div>
              <span className="text-[11px] text-neutral-300 font-medium shrink-0">{item.time}</span>
            </div>

            {/* Update */}
            <p className="text-[18px] text-[#122056]/80 font-medium leading-relaxed mb-4">
              {item.update}
            </p>

            {/* Badge + Reactions */}
            <div className="flex items-center justify-between">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${item.badgeColor}`}>
                {item.badge}
              </span>
              <div className="flex items-center gap-1.5">
                {Object.entries(item.reactions).map(([emoji, count]) => (
                  <span key={emoji} className="inline-flex items-center gap-0.5 px-2 py-1 rounded-full bg-[#FAFAFD] border border-[#EEF0FD] text-[11px] font-semibold text-neutral-500 hover:bg-[#5B65DC]/5 hover:border-[#5B65DC]/20 transition-all cursor-pointer">
                    {emoji} {count}
                  </span>
                ))}
              </div>
            </div>

            {/* Hover Accent */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#5B65DC] to-emerald-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

/* ═══════════════════════════════════════
   FLOATING FORM MODAL
   ═══════════════════════════════════════ */
const FloatingFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    isStudentFounder: '',
    founderName: '',
    startupName: '',
    startupOneLiner: '',
    college: '',
    incubator: '',
    niche: '',
    lookingForCofounder: '',
    teamSize: '',
    hackathonAchievements: '',
    mvpStatus: '',
    email: '',
    whatsapp: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const inputClass = "w-full px-4 py-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#EEF0FD] text-[18px] text-[#122056] font-medium placeholder:text-neutral-300 focus:outline-none focus:border-[#5B65DC]/40 focus:ring-2 focus:ring-[#5B65DC]/10 transition-all"
  const labelClass = "block text-[18px] font-bold uppercase tracking-[0.12em] text-[#122056]/60 mb-2"
  const selectClass = "w-full px-4 py-3.5 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#EEF0FD] text-[18px] text-[#122056] font-medium focus:outline-none focus:border-[#5B65DC]/40 focus:ring-2 focus:ring-[#5B65DC]/10 transition-all appearance-none cursor-pointer"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#122056]/40 backdrop-blur-md z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 flex items-center justify-center z-[101] p-4"
          >
            <div className="w-full max-w-2xl max-h-[90vh] bg-white/95 backdrop-blur-2xl rounded-[2rem] border border-[#EEF0FD] shadow-[0_40px_100px_rgba(18,32,86,0.25)] overflow-y-auto relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-[#FAFAFD] border border-[#EEF0FD] flex items-center justify-center text-neutral-400 hover:text-[#122056] hover:bg-white transition-all z-10"
              >
                <X size={18} />
              </button>

              {/* Form Header */}
              <div className="px-8 pt-8 pb-4 border-b border-[#EEF0FD]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5B65DC] to-[#122056] flex items-center justify-center shadow-lg shadow-[#5B65DC]/20">
                    <Rocket size={18} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-[20px] font-bold text-[#122056]">Join the Founder Network</h2>
                    <p className="text-[18px] text-neutral-400">It takes 2 minutes. Be among the first founders.</p>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
              {/* Are you a student founder? */}
              <div>
                <label className={labelClass}>Are you a student founder?</label>
                <div className="flex gap-3">
                  {['Yes, currently in college', 'Recent graduate (<2 years)', 'No, but interested'].map(opt => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, isStudentFounder: opt }))}
                      className={`flex-1 px-3 py-3 rounded-2xl text-[18px] font-semibold border transition-all duration-300 ${
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
                  <input type="text" name="founderName" required placeholder="Your full name" className={inputClass} value={formData.founderName} onChange={handleChange} />
                </div>
                <div>
                  <label className={labelClass}>Startup Name *</label>
                  <input type="text" name="startupName" required placeholder="Your startup name" className={inputClass} value={formData.startupName} onChange={handleChange} />
                </div>
              </div>

              {/* Startup One-liner */}
              <div>
                <label className={labelClass}>Startup One-liner *</label>
                <input type="text" name="startupOneLiner" required placeholder="Describe your startup in one line" className={inputClass} value={formData.startupOneLiner} onChange={handleChange} />
              </div>

              {/* College + Incubator */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>College *</label>
                  <input type="text" name="college" required placeholder="Your college name" className={inputClass} value={formData.college} onChange={handleChange} />
                </div>
                <div>
                  <label className={labelClass}>Incubator</label>
                  <input type="text" name="incubator" placeholder="If part of any incubator" className={inputClass} value={formData.incubator} onChange={handleChange} />
                </div>
              </div>

              {/* Niche (NEW FIELD) */}
              <div>
                <label className={labelClass}>Your Niche *</label>
                <select name="niche" required className={selectClass} value={formData.niche} onChange={handleChange}>
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
                        className={`flex-1 px-4 py-3 rounded-2xl text-[18px] font-semibold border transition-all duration-300 ${
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
                <input type="text" name="hackathonAchievements" placeholder="e.g. SIH Winner, HackMIT Top 10, etc." className={inputClass} value={formData.hackathonAchievements} onChange={handleChange} />
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
                  <input type="email" name="email" required placeholder="you@college.edu" className={inputClass} value={formData.email} onChange={handleChange} />
                </div>
                <div>
                  <label className={labelClass}>WhatsApp *</label>
                  <input type="tel" name="whatsapp" required placeholder="+91 XXXXX XXXXX" className={inputClass} value={formData.whatsapp} onChange={handleChange} />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2 pb-2">
                <button
                  type="submit"
                  className="w-full px-8 py-4.5 rounded-full bg-[#6366f1] text-white text-[19px] font-bold tracking-wide shadow-md hover:bg-[#4f46e5] transition-all duration-200 flex items-center justify-center gap-2 group focus:outline-none focus:ring-4 focus:ring-[#6366f1]/20"
                >
                  <Sparkles size={20} className="-ml-1" />
                  Claim Your Free Access
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[11px] text-neutral-400 text-center mt-3">
                  By signing up, you agree to our Terms & Privacy Policy. Your data is safe.
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════
   THANK YOU PAGE (Full Page)
   ═══════════════════════════════════════ */
const ThankYouPage = ({ founderName, niche }) => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate(`/early-access-opportunities?niche=${encodeURIComponent(niche)}&name=${encodeURIComponent(founderName)}`)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [navigate, niche, founderName])

  return (
    <div className="fixed inset-0 z-[200] bg-white flex items-center justify-center overflow-hidden">
      {/* Background celebration effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#5B65DC]/10 via-emerald-400/10 to-violet-500/10 rounded-full blur-[180px] animate-pulse" />
      </div>

      {/* Confetti-like floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: -20,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: window.innerHeight + 20,
            x: Math.random() * window.innerWidth,
            rotate: 360,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'linear',
          }}
          className="absolute w-3 h-3 rounded-full pointer-events-none"
          style={{
            background: ['#5B65DC', '#10B981', '#F59E0B', '#8B5CF6', '#0EA5E9', '#EC4899'][i % 6],
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-lg mx-auto px-6"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 12 }}
          className="w-24 h-24 mx-auto rounded-[2rem] bg-gradient-to-br from-emerald-400 to-emerald-500 flex items-center justify-center mb-8 shadow-[0_20px_50px_rgba(16,185,129,0.3)]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <CheckCircle2 size={40} className="text-white" />
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-[32px] lg:text-[40px] font-bold text-[#122056] tracking-tight mb-4"
        >
          Thank You for Registering! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-[18px] text-neutral-500 leading-relaxed mb-3"
        >
          Welcome aboard, <span className="font-bold text-[#122056]">{founderName}</span>!
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-[18px] text-neutral-400 leading-relaxed mb-8"
        >
          You have registered as an <span className="font-bold text-[#5B65DC]">Early Access Member</span>.
          We're taking you to curated startups and opportunities in your niche.
        </motion.p>

        {/* Niche Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5B65DC]/10 border border-[#5B65DC]/20 mb-8"
        >
          <Target size={14} className="text-[#5B65DC]" />
          <span className="text-[18px] font-bold text-[#5B65DC]">{niche}</span>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-xs mx-auto"
        >
          <div className="h-2 rounded-full bg-[#EEF0FD] overflow-hidden mb-3">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#5B65DC] to-emerald-400"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
            />
          </div>
          <p className="text-[18px] text-neutral-400">
            Redirecting in <span className="font-bold text-[#122056]">{countdown}s</span>...
          </p>
        </motion.div>

        {/* Skip button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => navigate(`/early-access-opportunities?niche=${encodeURIComponent(niche)}&name=${encodeURIComponent(founderName)}`)}
          className="mt-6 inline-flex items-center gap-2 text-[18px] font-semibold text-[#5B65DC] hover:underline"
        >
          Skip to opportunities
          <ArrowRight size={14} />
        </motion.button>
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════
   FOOTER CTA
   ═══════════════════════════════════════ */
const FooterCTA = ({ onOpenForm }) => (
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

        <p className="text-[18px] text-neutral-400 leading-relaxed max-w-xl mx-auto mb-10">
          This isn't just a platform — it's your launchpad. Get exclusive access, connect with fellow founders, and build something that matters.
        </p>

        <button
          onClick={onOpenForm}
          className="inline-flex items-center gap-2 px-12 py-4.5 rounded-full bg-[#6366f1] text-white text-[19px] font-bold tracking-wide shadow-md hover:bg-[#4f46e5] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#6366f1]/20 group"
        >
          <Sparkles size={20} className="-ml-1" />
          Claim Your Free Access
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  </section>
)

/* ═══════════════════════════════════════
   PAGE WRAPPER
   ═══════════════════════════════════════ */
const StudentFounderEarlyAccessPage = () => {
  useReveal()
  const [showForm, setShowForm] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)

  const handleFormSubmit = (formData) => {
    console.log('Founder signup:', formData)
    setShowForm(false)
    setSubmittedData(formData)
    setShowThankYou(true)
  }

  // If showing thank you, render full page
  if (showThankYou && submittedData) {
    return (
      <ThankYouPage
        founderName={submittedData.founderName || 'Founder'}
        niche={submittedData.niche || 'AI / ML'}
      />
    )
  }

  return (
    <>
      {/* Logo-only header */}
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

      <main className="relative bg-gradient-to-b from-white via-white to-[#FAFAFD]">
        <HeroSection onOpenForm={() => setShowForm(true)} />
        <FeaturesSection onOpenForm={() => setShowForm(true)} />
        <CampusLeaderboard onOpenForm={() => setShowForm(true)} />
        <BuildInPublicWall />
        <FooterCTA onOpenForm={() => setShowForm(true)} />
      </main>
      <Footer />

      {/* Floating Form Modal */}
      <FloatingFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
      />

      {/* Gradient shift animation CSS */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
      `}</style>
    </>
  )
}

export default StudentFounderEarlyAccessPage
