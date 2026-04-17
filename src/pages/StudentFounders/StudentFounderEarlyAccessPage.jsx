import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Layout/Footer'
import { 
  Rocket, Users, Globe, Target, TrendingUp, Megaphone, 
  CheckCircle2, X, Sparkles, ArrowRight, ChevronRight, ChevronDown, 
  FileText, CircleDollarSign, Crown, MousePointer2, 
  ChevronLeft, Shield, HandshakeIcon, Trophy, BookOpen
} from 'lucide-react'
import { TestimonialCarousel } from '@/components/ui/profile-card-testimonial-carousel'
import { db } from '../../lib/firebase'
import { ref, set, onValue, limitToLast, query, push } from 'firebase/database'

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
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* High-Fidelity Floating Cards (Reference-based) */}
      
      {/* Top Left: Maria-style glass card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] left-[5%] lg:left-[12%] z-20 hidden lg:block"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] w-60">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden shrink-0">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" alt="Arshia" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-black text-[#0A194E]">Arshia Sukheja</p>
              <p className="text-[11px] text-[#0A194E]/60 font-medium whitespace-nowrap">Full-Stack Engineer</p>
            </div>
            <div className="text-neutral-300 text-[10px] tracking-tight">...</div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
             <span className="text-[9px] text-neutral-400 font-bold">START APR 16, 2026</span>
             <div className="flex -space-x-1">
                <div className="w-5 h-5 rounded-full bg-[#0A194E]/10 border border-white flex items-center justify-center text-[8px]">M</div>
                <div className="w-5 h-5 rounded-full bg-[#7DA0D9]/20 border border-white flex items-center justify-center text-[8px]">in</div>
                <div className="w-5 h-5 rounded-full bg-pink-100 border border-white flex items-center justify-center text-[8px]">📷</div>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Top Right: Marcus-style glass card */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute top-[18%] right-[5%] lg:right-[12%] z-20 hidden lg:block"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.05)] w-60">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden shrink-0">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" alt="Vansh" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-black text-[#0A194E]">Vansh Sukheja</p>
              <p className="text-[11px] text-[#0A194E]/60 font-medium whitespace-nowrap">Product Architect</p>
            </div>
            <div className="text-neutral-300 text-[10px] tracking-tight">...</div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
             <span className="text-[9px] text-neutral-400 font-bold">START MAY 12, 2026</span>
             <div className="flex -space-x-1">
                <div className="w-5 h-5 rounded-full bg-emerald-100 border border-white flex items-center justify-center text-[8px]">M</div>
                <div className="w-5 h-5 rounded-full bg-[#0A194E]/10 border border-white flex items-center justify-center text-[8px]">in</div>
                <div className="w-5 h-5 rounded-full bg-orange-100 border border-white flex items-center justify-center text-[8px]">🔥</div>
             </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Left: Vinco-style dark chat card */}
      <motion.div
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[20%] left-[8%] lg:left-[15%] z-20 hidden lg:block"
      >
        <div className="relative group">
          <div className="bg-[#0A194E] text-white p-3 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[180px]">
            <div className="w-8 h-8 rounded-full bg-neutral-700 overflow-hidden shrink-0 border border-white/20">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Vinco" alt="Arjun" />
            </div>
            <div>
              <p className="text-[12px] font-bold">Arjun Mehra</p>
              <p className="text-[10px] text-white/50 font-medium">SaaS Founder</p>
            </div>
          </div>
          {/* Hand Cursor Decor like the reference */}
          <div className="absolute -top-4 -right-2 rotate-[25deg] text-[#0A194E]">
            <MousePointer2 size={16} className="fill-current" />
          </div>
        </div>
      </motion.div>

      {/* Bottom Right: Robert-style colored chat card */}
      <motion.div
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[22%] right-[8%] lg:right-[18%] z-20 hidden lg:block"
      >
        <div className="relative group">
          <div className="bg-[#7DA0D9] text-white p-3 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[180px]">
            <div className="w-8 h-8 rounded-full bg-neutral-300 overflow-hidden shrink-0 border border-white/20">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Robert" alt="Priya" />
            </div>
            <div>
              <p className="text-[12px] font-bold">Priya Sharma</p>
              <p className="text-[10px] text-white/80 font-medium">AI Engineering</p>
            </div>
          </div>
          {/* Hand Cursor Decor like the reference */}
          <div className="absolute -top-4 -left-2 rotate-[-25deg] text-[#7DA0D9]">
            <MousePointer2 size={16} className="fill-current" />
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-bold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1] tracking-tight text-[#0A194E] mb-6"
          >
            Simply The Best <br />
            Network For <br />
            Founders
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[15px] lg:text-[17px] text-[#0A194E]/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Start your journey inspired. Join India's curated startup discovery network built for college founders, hackathon winners, and early-stage builders.
          </motion.p>

          <motion.button
            onClick={onOpenForm}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            className="px-10 py-4 mt-4 rounded-full bg-[#0A194E] text-white text-[16px] font-bold shadow-xl shadow-[#0A194E]/20 hover:bg-[#7DA0D9] transition-all"
          >
            Get Started
          </motion.button>
        </div>
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
    <div className="rounded-xl bg-white/70 backdrop-blur-xl border border-[#EEF0FD] px-4 py-2.5 shadow-[0_4px_20px_rgba(18,32,86,0.04)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3"
        >
          <span className="text-base">{activities[current].emoji}</span>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-[13px] text-[#122056] leading-tight">
              <span className="font-bold">{activities[current].name}</span>{' '}
              <span className="text-neutral-500">{activities[current].action}</span>
            </p>
          </div>
          <span className="text-[10px] text-neutral-300 font-medium shrink-0">{activities[current].time}</span>
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
    size: '',
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
    size: '',
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
            { label: 'Grants', count: '12', icon: CircleDollarSign },
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

const FeaturesSection = ({ onOpenForm }) => (
  <section id="features" className="py-20 lg:py-28 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Side: Text */}
        <div className="lg:w-1/3">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="font-bold text-[42px] leading-[1.1] text-[#0A194E] mb-6"
          >
            How To Build <br /> Your Network In <br /> FoundrHUB
          </motion.h2>
          <p className="text-[16px] text-[#0A194E]/40 mb-8 leading-relaxed">
            Say goodbye to lonely building. Find co-founders, collaborators, and mentors with tools designed specifically for college founders.
          </p>
          <button className="px-8 py-3.5 rounded-full bg-[#0A194E] text-white text-[14px] font-bold hover:bg-[#7DA0D9] transition-all shadow-xl shadow-[#0A194E]/10">
            Learn More
          </button>
        </div>

        {/* Right Side: Grid */}
        <div className="lg:w-2/3 relative">
          {/* Background Blob Decor */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-5 hover:opacity-10 transition-opacity">
            <svg viewBox="0 0 400 400" className="w-full h-full text-[#7DA0D9] fill-current">
               <path d="M100,200 Q150,100 250,150 T300,250 T200,350 T100,250 Z" />
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            {interactiveFeatures.slice(0, 4).map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/20 backdrop-blur-xl border border-white/30 p-7 rounded-[2.5rem] shadow-[0_10px_40px_rgba(10,25,78,0.02)] group hover:bg-white/30 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#0A194E]/10 flex items-center justify-center mb-6 text-[#0A194E] group-hover:scale-110 transition-transform">
                  <feat.icon size={22} />
                </div>
                <h3 className="text-[17px] font-black text-[#0A194E] mb-3">{feat.title}</h3>
                <p className="text-[14px] text-[#0A194E]/60 leading-relaxed font-medium">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
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
  <section className="py-16 lg:py-24 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D9E8FF] bg-white/60 text-[11px] font-black uppercase tracking-[0.2em] text-[#0A194E] mb-6">
          Community Rankings
        </span>
        <h2 className="font-bold text-[clamp(1.4rem,2.8vw,2.2rem)] leading-tight tracking-tight text-[#0A194E] mb-3">
          Top Startup Campuses <span className="text-[#7DA0D9] italic">This Week</span>
        </h2>
        <p className="text-[14px] text-[#0A194E]/40 max-w-xl mx-auto leading-relaxed">
          See which colleges are producing the most student founders. Represent your campus.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {campuses
          .sort((a, b) => b.founders - a.founders)
          .map((campus, i) => (
            <motion.div
              key={campus.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group relative rounded-3xl bg-white/40 backdrop-blur-md border border-white/20 p-5 flex items-center gap-4 hover:bg-white/60 transition-all cursor-default shadow-sm"
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-[16px] font-black shrink-0 ${
                i === 0 ? 'bg-[#0A194E] text-white' : 'bg-[#EEF2F9] text-[#0A194E]/40'
              }`}>
                {i + 1}
              </div>
              <div className="flex-1 text-left">
                <p className="text-[15px] font-black text-[#0A194E] group-hover:text-[#7DA0D9] transition-colors">{campus.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-1.5 rounded-full bg-[#EEF2F9] overflow-hidden max-w-[100px]">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(campus.founders / 60) * 100}%` }}
                      className="h-full bg-[#7DA0D9]" 
                    />
                  </div>
                  <span className="text-[12px] font-bold text-neutral-400">{campus.founders} founders</span>
                </div>
              </div>
              <div className="text-[14px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg shrink-0">
                {campus.trend}
              </div>
            </motion.div>
          ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="text-center text-[14px] text-[#0A194E]/40 mt-8"
      >
        <Sparkles size={13} className="inline mr-1 text-[#7DA0D9]" />
        Your campus not here?{' '}
        <button onClick={onOpenForm} className="text-[#7DA0D9] font-semibold hover:underline">
          Join and represent →
        </button>
      </motion.p>
    </div>
  </section>
)

/* ═══════════════════════════════════════
   SECTION 4 — BUILD IN PUBLIC WALL (Redesigned)
   ═══════════════════════════════════════ */
const BuildInPublicWall = () => {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="font-bold text-[38px] leading-[1.1] text-[#0A194E] mb-4">
            Bring The Power Of All To <br /> Your Startup Process
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-stretch">
          <div className="lg:w-1/2 flex gap-4">
             <div className="w-2/3 rounded-[2.5rem] bg-white/20 backdrop-blur-md overflow-hidden relative group border border-white/30">
                <div className="absolute inset-0 bg-neutral-300/5 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A194E]/10 to-transparent" />
                <div className="absolute bottom-6 left-6 text-[#0A194E] z-10">
                   <p className="text-[12px] font-bold uppercase tracking-widest opacity-40 mb-1">Founder Focus</p>
                   <h4 className="text-[18px] font-black leading-tight mb-2 italic">"Execution is everything."</h4>
                </div>
             </div>
             
             <div className="w-1/3 flex flex-col gap-4">
                <div className="flex-1 rounded-[2.5rem] bg-[#0A194E]/80 backdrop-blur-md p-6 text-white flex flex-col border border-white/10">
                   <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center mb-auto">
                      <Megaphone size={16} />
                   </div>
                   <p className="text-[13px] font-bold leading-tight mt-4">Broadcast Needs</p>
                </div>
                <div className="flex-1 rounded-[2.5rem] bg-[#7DA0D9]/80 backdrop-blur-md p-6 text-white flex flex-col border border-white/10">
                   <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center mb-auto">
                      <Rocket size={16} />
                   </div>
                   <p className="text-[13px] font-bold leading-tight mt-4">Launch Live</p>
                </div>
             </div>
          </div>

          <div className="lg:w-1/2 flex flex-col justify-center space-y-8">
             {[
               { id: 1, t: 'Analyze campus trends', d: 'Connect with verified student founders from IITs, BITS, NITs and top tier colleges across India.', i: Globe },
               { id: 2, t: 'Smart matching engine', d: 'Our AI engine suggests collaborators based on your startup niche, tech stack and shared goals.', i: Target },
               { id: 3, t: 'Data-driven insights', d: 'Stay ahead of the curve with real-time data on campus trends and investor interests.', i: TrendingUp },
             ].map((step, si) => (
                <div key={si} className="flex gap-6 items-start group">
                   <div className="w-10 h-10 rounded-xl bg-white border border-[#EEF2F9] shadow-sm flex items-center justify-center text-[15px] font-black text-[#0A194E] shrink-0 group-hover:bg-[#0A194E] group-hover:text-white transition-all">
                      {step.id}
                   </div>
                   <div>
                      <h4 className="text-[16px] font-black text-[#0A194E] mb-1">{step.t}</h4>
                      <p className="text-[14px] text-[#0A194E]/40 font-medium leading-relaxed max-w-md">
                        {step.d}
                      </p>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  )
}

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

  const inputClass = "w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EEF2F9] text-[14px] text-[#0A194E] font-medium placeholder:text-neutral-300 focus:outline-none focus:border-[#7DA0D9] focus:ring-4 focus:ring-[#7DA0D9]/10 transition-all"
  const labelClass = "block text-[11px] font-black uppercase tracking-[0.1em] text-[#0A194E]/40 mb-1.5"
  const selectClass = "w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#EEF2F9] text-[14px] text-[#0A194E] font-medium focus:outline-none focus:border-[#7DA0D9] focus:ring-4 focus:ring-[#7DA0D9]/10 transition-all appearance-none cursor-pointer"

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0A194E]/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="fixed inset-0 flex items-center justify-center z-[101] p-4"
          >
            <div className="w-full max-w-xl bg-white rounded-[2.5rem] border border-[#EEF2F9] shadow-[0_30px_80px_rgba(10,25,78,0.15)] overflow-hidden flex flex-col h-[90vh]">
              <form onSubmit={handleSubmit} className="px-10 py-10 overflow-y-auto flex-1 custom-scrollbar">
                <div className="space-y-12">
                  
                  {/* Phase 1: Identity */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#7DA0D9]">01. Identity</p>
                      <h3 className="text-[20px] font-semibold text-[#0A194E] leading-tight">First, tell us a bit about yourself. Are you currently a student founder?</h3>
                      <div className="flex flex-wrap gap-2">
                        {['Yes, active student', 'Recent Graduate', 'No, but building'].map(opt => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, isStudentFounder: opt }))}
                            className={`px-5 py-2.5 rounded-full text-[13px] font-semibold border transition-all ${
                              formData.isStudentFounder === opt
                                ? 'bg-[#0A194E] text-white border-[#0A194E] shadow-lg shadow-[#0A194E]/10'
                                : 'bg-white text-[#0A194E]/60 border-[#EEF2F9] hover:border-[#7DA0D9]/40 hover:bg-neutral-50'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mt-16">
                      <div className="relative group">
                        <label className="absolute -top-6 left-0 text-[10px] font-semibold uppercase tracking-widest text-[#0A194E]/30 transition-all group-focus-within:text-[#7DA0D9]">What is your full name?</label>
                        <input 
                          type="text" name="founderName" required 
                          className="w-full px-5 py-3.5 bg-white border border-[#EEF2F9] rounded-2xl focus:border-[#7DA0D9] focus:ring-4 focus:ring-[#7DA0D9]/5 outline-none text-[15px] text-[#0A194E] font-medium transition-all placeholder:text-neutral-200 shadow-sm"
                          placeholder="Arshia Sukheja"
                          value={formData.founderName} onChange={handleChange} 
                        />
                      </div>
                      <div className="relative group">
                        <label className="absolute -top-6 left-0 text-[10px] font-semibold uppercase tracking-widest text-[#0A194E]/30 transition-all group-focus-within:text-[#7DA0D9]">Where do you study?</label>
                        <input 
                          type="text" name="college" required 
                          className="w-full px-5 py-3.5 bg-white border border-[#EEF2F9] rounded-2xl focus:border-[#7DA0D9] focus:ring-4 focus:ring-[#7DA0D9]/5 outline-none text-[15px] text-[#0A194E] font-medium transition-all placeholder:text-neutral-200 shadow-sm"
                          placeholder="IIT Delhi / BIT Mesra"
                          value={formData.college} onChange={handleChange} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Phase 2: The Venture */}
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#7DA0D9]">02. The Startup</p>
                      <h3 className="text-[20px] font-semibold text-[#0A194E] leading-tight">What are you working on? Give us the high-level vision.</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mt-10">
                      <div className="relative group">
                        <label className="absolute -top-6 left-0 text-[10px] font-semibold uppercase tracking-widest text-[#0A194E]/30 transition-all group-focus-within:text-[#7DA0D9]">Startup Name</label>
                        <input 
                          type="text" name="startupName" required 
                          className="w-full px-5 py-3.5 bg-white border border-[#EEF2F9] rounded-2xl focus:border-[#7DA0D9] focus:ring-4 focus:ring-[#7DA0D9]/5 outline-none text-[15px] text-[#0A194E] font-medium transition-all placeholder:text-neutral-200 shadow-sm"
                          placeholder="FoundrHUB"
                          value={formData.startupName} onChange={handleChange} 
                        />
                      </div>
                      <div className="relative group">
                        <label className="absolute -top-6 left-0 text-[10px] font-semibold uppercase tracking-widest text-[#0A194E]/30 transition-all group-focus-within:text-[#7DA0D9]">Niche / Industry</label>
                        <div className="relative">
                          <select 
                            name="niche" required 
                            className="w-full px-5 py-3.5 bg-white border border-[#EEF2F9] rounded-2xl focus:border-[#7DA0D9] focus:ring-4 focus:ring-[#7DA0D9]/5 outline-none text-[15px] text-[#0A194E] font-medium transition-all appearance-none cursor-pointer shadow-sm pr-10"
                            value={formData.niche} onChange={handleChange}
                          >
                            <option value="">Select industry</option>
                            {[
                              'AI / Machine Learning', 'SaaS', 'EdTech', 'FinTech', 'Direct-to-Consumer (D2C)', 
                              'Deep Tech', 'Crypto / Web3', 'HealthTech', 'AgriTech', 'Creator Economy', 
                              'CleanTech', 'Gaming', 'Logistics', 'Robotics', 'Other'
                            ].map(n => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#0A194E]/30">
                            <ChevronDown size={18} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative group mt-10">
                      <label className="absolute -top-6 left-0 text-[10px] font-semibold uppercase tracking-widest text-[#0A194E]/30 transition-all group-focus-within:text-[#7DA0D9]">Describe your vision in one line</label>
                      <input 
                        type="text" name="startupOneLiner" required 
                        className="w-full px-5 py-3.5 bg-white border border-[#EEF2F9] rounded-2xl focus:border-[#7DA0D9] focus:ring-4 focus:ring-[#7DA0D9]/5 outline-none text-[15px] text-[#0A194E] font-medium transition-all placeholder:text-neutral-200 shadow-sm"
                        placeholder="The networking OS for modern student builders"
                        value={formData.startupOneLiner} onChange={handleChange} 
                      />
                    </div>
                  </div>

                  {/* Phase 3: Details & Contact */}
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#7DA0D9]">03. Logistics</p>
                      <h3 className="text-[20px] font-semibold text-[#0A194E] leading-tight">Almost there. How do we stay in touch?</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mt-10">
                      <div className="relative group">
                        <label className="absolute -top-6 left-0 text-[10px] font-semibold uppercase tracking-widest text-[#0A194E]/30 transition-all group-focus-within:text-[#7DA0D9]">Institutional Email</label>
                        <input 
                          type="email" name="email" required 
                          className="w-full px-5 py-3.5 bg-white border border-[#EEF2F9] rounded-2xl focus:border-[#7DA0D9] focus:ring-4 focus:ring-[#7DA0D9]/5 outline-none text-[15px] text-[#0A194E] font-medium transition-all placeholder:text-neutral-200 shadow-sm"
                          placeholder="arshia@college.edu"
                          value={formData.email} onChange={handleChange} 
                        />
                      </div>
                      <div className="relative group">
                        <label className="absolute -top-6 left-0 text-[10px] font-semibold uppercase tracking-widest text-[#0A194E]/30 transition-all group-focus-within:text-[#7DA0D9]">WhatsApp Number</label>
                        <input 
                          type="tel" name="whatsapp" required 
                          className="w-full px-5 py-3.5 bg-white border border-[#EEF2F9] rounded-2xl focus:border-[#7DA0D9] focus:ring-4 focus:ring-[#7DA0D9]/5 outline-none text-[15px] text-[#0A194E] font-medium transition-all placeholder:text-neutral-200 shadow-sm"
                          placeholder="+91 XXXXX XXXXX"
                          value={formData.whatsapp} onChange={handleChange} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-12 pb-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 rounded-2xl bg-[#0A194E] text-white text-[16px] font-semibold shadow-2xl shadow-[#0A194E]/15 hover:bg-[#7DA0D9] transition-all flex items-center justify-center gap-3 group"
                  >
                    <span>Complete My Registration</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </motion.button>
                  <p className="text-center text-[11px] text-[#0A194E]/40 mt-6 font-medium uppercase tracking-widest">Join 1,200+ other founders today</p>
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
    <div className="fixed inset-0 z-[200] bg-[#F5F1EE] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7DA0D9]/10 rounded-full blur-[180px] animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-lg mx-auto px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="w-20 h-20 mx-auto rounded-[2rem] bg-[#0A194E] flex items-center justify-center mb-10 shadow-[0_20px_50px_rgba(10,25,78,0.2)]"
        >
          <CheckCircle2 size={32} className="text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[36px] font-black text-[#0A194E] tracking-tight mb-4"
        >
          Welcome, {founderName}!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[15px] text-[#0A194E]/60 leading-relaxed mb-8"
        >
          Your registration is complete. You are now a verified member of the <span className="text-[#0A194E] font-bold">FoundrHUB</span> early ecosystem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#EEF2F9] mb-10 shadow-sm"
        >
          <Target size={14} className="text-[#7DA0D9]" />
          <span className="text-[13px] font-black text-[#0A194E] uppercase tracking-wider">{niche} FOUNDER</span>
        </motion.div>

        <div className="max-w-xs mx-auto">
          <div className="h-1 rounded-full bg-[#EEF2F9] overflow-hidden mb-4">
            <motion.div
              className="h-full rounded-full bg-[#7DA0D9]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5, ease: 'linear' }}
            />
          </div>
          <p className="text-[14px] text-neutral-400">
            Redirecting to opportunities in <span className="font-bold text-[#0A194E]">{countdown}s</span>...
          </p>
        </div>
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════
   FOOTER CTA
   ═══════════════════════════════════════ */
const FooterCTA = ({ onOpenForm }) => (
  <section className="py-24 lg:py-32 bg-[#0A194E] relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7DA0D9]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D9E8FF]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

    <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <span className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7DA0D9] animate-pulse" />
          <span className="text-[11px] font-black tracking-[0.15em] uppercase text-white/60 text-left">Limited Access Available</span>
        </span>

        <h2 className="font-bold text-[clamp(2rem,4vw,3.8rem)] leading-[1] tracking-tight text-white mb-10">
          Join India's curated <br className="hidden sm:block" /> network for student founders.
        </h2>

        <motion.button
          onClick={onOpenForm}
          whileHover={{ scale: 1.05 }}
          className="px-12 py-4 rounded-full bg-white text-[#0A194E] text-[16px] font-black shadow-2xl shadow-blue-400/10 hover:bg-[#D9E8FF] transition-all"
        >
          Join Early Access
        </motion.button>
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

  const handleFormSubmit = async (formData) => {
    console.log('Founder signup:', formData)
    
    try {
      const timestamp = Date.now()
      const rawName = formData.founderName || 'Founder'
      const safeName = rawName.replace(/[\.\#\$\/\[\]]/g, "") + "_" + timestamp
      
      const newFounderRef = ref(db, `early founders/names/${safeName}/details`)
      await set(newFounderRef, {
        ...formData,
        submittedAt: new Date().toISOString()
      })

      const wallRef = ref(db, 'founderUpdates')
      await push(wallRef, {
        name: formData.founderName,
        college: formData.college,
        timestamp: 'Just now',
        content: `Joined the network! Building ${formData.startupName} in ${formData.niche}.`,
        tag: formData.mvpStatus || 'New Founder',
        color: '#0A194E',
        reactions: { '🚀': 1 }
      })
    } catch (err) {
      console.error("Error saving to Firebase:", err)
    }

    setShowForm(false)
    setSubmittedData(formData)
    setShowThankYou(true)
  }

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
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-8 left-8 lg:left-10 z-50 px-4 py-2 bg-white/50 backdrop-blur-md rounded-2xl border border-[#EEF2F9]"
      >
        <Link
          to="/"
          className="text-[18px] font-black tracking-tighter text-[#0A194E] hover:opacity-70 transition-opacity"
        >
          Foundr<span className="text-[#7DA0D9]">HUB</span>
        </Link>
      </motion.div>

      <main className="relative bg-white min-h-screen overflow-hidden">
        {/* Faded Grid Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
             style={{ 
               backgroundImage: 'linear-gradient(#0A194E 1px, transparent 1px), linear-gradient(90deg, #0A194E 1px, transparent 1px)',
               backgroundSize: '40px 40px' 
             }} 
        />
        {/* Scattered Animated Mesh Gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Hero Glows */}
          <div className="absolute top-[-5%] left-[-10%] w-[45%] h-[40%] bg-[#7DA0D9]/15 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[15%] right-[-5%] w-[40%] h-[35%] bg-[#0A194E]/5 rounded-full blur-[100px]" />
          
          {/* Middle Section Glows */}
          <div className="absolute top-[35%] left-[20%] w-[35%] h-[30%] bg-[#D9E8FF]/20 rounded-full blur-[110px] animate-bounce-slow" />
          <div className="absolute top-[50%] right-[10%] w-[40%] h-[40%] bg-[#5B65DC]/10 rounded-full blur-[130px] animate-pulse-slow" />
          
          {/* Lower Section Glows */}
          <div className="absolute bottom-[20%] left-[-5%] w-[45%] h-[40%] bg-[#0A194E]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[5%] right-[15%] w-[40%] h-[35%] bg-[#7DA0D9]/10 rounded-full blur-[110px] animate-bounce-slow" />
        </div>
        <HeroSection onOpenForm={() => setShowForm(true)} />

        {/* Compact Meet The Founders Card */}
        <section className="py-12 lg:py-16 relative overflow-hidden flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl w-full mx-6 px-4 py-12 rounded-[3rem] bg-white/30 backdrop-blur-xl border border-white/40 shadow-[0_20px_50px_rgba(10,25,78,0.03)] text-center relative z-10"
          >
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-[#D9E8FF] bg-white/60 text-[10px] font-black uppercase tracking-[0.2em] text-[#0A194E] mb-4">
                Meet The Founders
              </span>
              <h2 className="font-bold text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.1] text-[#0A194E]">
                Built by founders, <br className="sm:hidden" /> for founders.
              </h2>
            </div>
            
            <div className="scale-[0.92] origin-center">
              <TestimonialCarousel />
            </div>
          </motion.div>
        </section>

        <FeaturesSection onOpenForm={() => setShowForm(true)} />
        <CampusLeaderboard onOpenForm={() => setShowForm(true)} />
        <BuildInPublicWall />
        <FooterCTA onOpenForm={() => setShowForm(true)} />
      </main>
      <Footer />

      <FloatingFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        html {
          scroll-behavior: smooth;
          -webkit-font-smoothing: antialiased;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", sans-serif;
          background-color: white;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #EEF2F9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D9E8FF;
        }

        .glass-hover:hover {
          background-color: rgba(255, 255, 255, 0.6);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(10, 25, 78, 0.05);
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        .animate-pulse-slow {
          animation: pulse-slow 12s infinite ease-in-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 8s infinite ease-in-out;
        }
      `}</style>
    </>
  )
}

export default StudentFounderEarlyAccessPage
