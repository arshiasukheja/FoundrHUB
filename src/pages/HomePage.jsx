import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import React from 'react'
import OnboardingFlow from '../components/OnboardingFlow'
import Footer from '../components/Footer'
import CinematicHero from '../components/CinematicHero'
import GlassCard from '../components/GlassCard'
import DashboardPreview from '../components/DashboardPreview'
import AnalyticsPreview from '../components/AnalyticsPreview'
import { HighlighterDemo } from '../components/Highlighter'
import { HeroParallax } from '../components/ui/hero-parallax'
import StartupNetwork from '../components/StartupNetwork'
import { MapPin, Eye, Bookmark, MessageSquare, Users, PenLine, ClipboardList, CheckCircle, Rocket, Sparkles, ArrowUpRight, BarChart3, Layers3, Target, ShieldCheck, Wand2, MessageCircle, CalendarDays, NotebookPen, Star, Video, Shirt, Palette, Wheat, UtensilsCrossed, Lightbulb, ArrowRight, ChevronRight, TrendingUp, Zap } from 'lucide-react'

/* ── Global Mouse Tracker ── */
const useMousePosition = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);
  return mousePos;
};

const GlobalGridBackground = () => {
  const { x, y } = useMousePosition();
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        "--x": `${x}px`,
        "--y": `${y}px`,
      }}
    >
      {/* 
         Subtle Darkening Glow: 
         Instead of a white light, we use a very soft navy radial shift 
         that makes the area feel slightly more 'dense' or 'darkened'.
      */}
      <div className="absolute inset-0 [background:radial-gradient(circle_at_var(--x)_var(--y),rgba(18,32,86,0.06)_0%,transparent_500px)]" />
      
      {/* The Constant Grid Lines */}
      <div className="absolute inset-0 [background:linear-gradient(rgba(18,32,86,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(18,32,86,0.03)_1px,transparent_1px)] [background-size:60px_60px]" />
    </div>
  );
};

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

/* ── Data ── */
const founders = [
  { name: 'Ananya Sharma', title: 'Bloomcraft Studio', category: 'Sustainable Fashion', city: 'Chandigarh', initials: 'AS', color: '#e8d5c0', verified: true },
  { name: 'Rahul Kapoor', title: 'NeuralBrew AI', category: 'AI / Deep Tech', city: 'Chandigarh', initials: 'RK', color: '#c9d5e0', verified: true },
  { name: 'Meera Patel', title: 'GreenRoute', category: 'Climate Tech', city: 'Chandigarh', initials: 'MP', color: '#d5e0c9', verified: true },
  { name: 'Arjun Desai', title: 'StackFin', category: 'Fintech', city: 'Mohali', initials: 'AD', color: '#d5d0e8', verified: true },
]

const trendingBrands = [
  { name: 'Bloomcraft Studio', founder: 'Ananya Sharma', desc: 'Handcrafted sustainable fashion blending traditional textiles with modern minimalism.', category: 'Sustainable Fashion', city: 'Chandigarh', badge: 'Verified', color: '#e8d5c0', initials: 'BC', image: 'https://images.unsplash.com/photo-1595777707802-41d4a4dbf726?q=80&w=600&h=400&fit=crop' },
  { name: 'NeuralBrew AI', founder: 'Rahul Kapoor', desc: 'AI-powered creative tools helping D2C brands generate compelling narratives at scale.', category: 'AI / Deep Tech', city: 'Chandigarh', badge: 'Rising', color: '#c9d5e0', initials: 'NB', image: 'https://images.unsplash.com/photo-1677442d019cecf8d69ee1523df467335941246337?q=80&w=600&h=400&fit=crop' },
  { name: 'GreenRoute', founder: 'Meera Patel', desc: 'Last-mile delivery optimization reducing carbon footprint for hyperlocal brands.', category: 'Climate Tech', city: 'Chandigarh', badge: 'Funded', color: '#d5e0c9', initials: 'GR', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&h=400&fit=crop' },
  { name: 'KiraSkin', founder: 'Priya Nair', desc: 'Clean-label skincare powered by lab-tested Ayurvedic formulations.', category: 'D2C Beauty', city: 'Mohali', badge: 'Verified', color: '#e0c9d5', initials: 'KS', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=600&h=400&fit=crop' },
  { name: 'StackFin', founder: 'Arjun Desai', desc: 'Embedded finance infrastructure for SaaS founders to add payments in minutes.', category: 'Fintech', city: 'Panchkula', badge: 'Rising', color: '#d5d0e8', initials: 'SF', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&h=400&fit=crop' },
  { name: 'CraftBox', founder: 'Sneha Joshi', desc: 'Subscription craft kits for curated DIY experiences delivered nationwide.', category: 'EdTech', city: 'Chandigarh', badge: 'Funded', color: '#e0dac9', initials: 'CB', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&h=400&fit=crop' },
]
const badgeMap = {
  Verified: 'bg-emerald-500/10 text-emerald-700 border-emerald-200/60',
  Rising: 'bg-amber-500/10 text-amber-700 border-amber-200/60',
  Funded: 'bg-blue-500/10 text-blue-700 border-blue-200/60',
}

/* ── Fade Variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }),
}

/* ═══════════════════════════════════════
   2.5 PROBLEM CLUSTER
   ═══════════════════════════════════════ */
const ProblemCluster = () => {
  const founderProblems = [
    { 
      title: "Idea Validation Gap", 
      desc: "Spending 6+ months building products that nobody actually wants or needs.",
      top: "20%", left: "10%", delay: 0 
    },
    { 
      title: "Scattered Intelligence", 
      desc: "Switching between 10+ tools just to manage basic market research and feedback.",
      top: "75%", left: "10%", delay: 1 
    },
    { 
      title: "Growth Stagnation", 
      desc: "No clear roadmap to move from MVP to a scalable, revenue-generating venture.",
      top: "45%", left: "5%", delay: 0.5 
    },
  ];

  const investorProblems = [
    { 
      title: "Discovery Friction", 
      desc: "Missing out on unicorn founders because they are buried under high-volume noise.",
      top: "20%", right: "10%", delay: 0.2 
    },
    { 
      title: "Data Blindspots", 
      desc: "Relying on quarterly decks instead of real-time growth and engagement metrics.",
      top: "75%", right: "10%", delay: 1.2 
    },
    { 
      title: "Unstructured Sourcing", 
      desc: "Inconsistent deal flow leading to suboptimal investment timing and FOMO.",
      top: "45%", right: "5%", delay: 0.7 
    },
  ];

  return (
    <section 
      className="relative bg-transparent text-[#122056] py-32 lg:py-52 flex justify-center items-center overflow-hidden"
    >
      {/* Background Glows kept for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#5B65DC]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center gap-10">
        <div className="text-center reveal mb-4">
           <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#5B65DC] mb-3 block">The Growth Barrier</span>
           <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#122056]">A Systemically <span className="italic text-neutral-400">Inefficient</span> Ecosystem</h2>
        </div>

        {/* CORE CARDS (Horizontal Layout) */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 relative">
          {/* Founder Core Card */}
          <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="group relative bg-[#FAFAFD] border border-[#EEF0FD] p-10 rounded-[2.5rem] w-80 lg:w-[420px] shadow-[0_20px_50px_rgba(18,32,86,0.06)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
               <h3 className="text-2xl font-bold mb-4 text-[#122056]">Founders Build Blind</h3>
               <p className="text-neutral-500 text-[15px] leading-relaxed font-medium">
                 Founders spend months developing features based on guesswork rather than validated market intelligence.
               </p>
            </div>
            <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5B65DC] to-transparent" />
          </motion.div>

          {/* Investor Core Card */}
          <motion.div 
            whileHover={{ y: 5, scale: 1.02 }}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="group relative bg-[#FAFAFD] border border-[#EEF0FD] p-10 rounded-[2.5rem] w-80 lg:w-[420px] shadow-[0_20px_50px_rgba(18,32,86,0.06)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
               <h3 className="text-2xl font-bold mb-4 text-[#5B65DC]">Investors Invest Blind</h3>
               <p className="text-neutral-500 text-[15px] leading-relaxed font-medium">
                 Investors rely heavily on outdated pitch decks instead of having a direct pulse on a startup's real-time trajectory.
               </p>
            </div>
            <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#122056]/20 to-transparent" />
          </motion.div>
        </div>
      </div>

      {/* SURROUNDING PROBLEM NODES (Bigger + More Info) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left Side (Founder) */}
        {founderProblems.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -12, 0] }}
            transition={{ y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" }, opacity: { delay: p.delay } }}
            style={{ top: p.top, left: p.left }}
            className="absolute max-w-[200px] bg-white border border-[#EEF0FD] p-5 rounded-2xl shadow-[0_15px_40px_rgba(18,32,86,0.08)] pointer-events-auto cursor-default hover:border-[#5B65DC]/30 transition-all hover:scale-[1.03]"
          >
            <h4 className="text-[12px] font-black uppercase tracking-wider text-[#122056] mb-1.5">{p.title}</h4>
            <p className="text-[11px] font-medium text-neutral-400 leading-normal">{p.desc}</p>
          </motion.div>
        ))}

        {/* Right Side (Investor) */}
        {investorProblems.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { duration: 4.5 + i, repeat: Infinity, ease: "easeInOut" }, opacity: { delay: p.delay } }}
            style={{ top: p.top, right: p.right }}
            className="absolute max-w-[200px] bg-white border border-[#EEF0FD] p-5 rounded-2xl shadow-[0_15px_40px_rgba(91,101,220,0.08)] pointer-events-auto cursor-default hover:border-[#5B65DC] transition-all hover:scale-[1.03]"
          >
            <h4 className="text-[12px] font-black uppercase tracking-wider text-[#5B65DC] mb-1.5">{p.title}</h4>
            <p className="text-[11px] font-medium text-neutral-400 leading-normal">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════
   3. AI LAYERS
   ═══════════════════════════════════════ */
const LayerLabel = ({ num, light = false }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="h-px w-6 bg-[#5B65DC]/30" />
    <span className={`text-[11px] font-black uppercase tracking-[0.3em] ${light ? 'text-[#5B65DC]' : 'text-white/40'}`}>Tool Intelligence</span>
  </div>
)



const AILayersSection = () => {
  useReveal()

  return (
    <section id="ai-layers" className="relative bg-transparent text-[#122056] py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="reveal mb-20 lg:mb-24 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#EEF0FD] bg-[#FAFAFD] text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B65DC] mb-6">
            The Intelligence Stack
          </span>
          <h2 className="font-bold text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.1] tracking-tight text-[#122056] mb-6">
            Five layers of <span className="text-[#5B65DC] italic">Unmatched</span> AI
          </h2>
          <p className="text-[17px] text-neutral-500 max-w-xl leading-relaxed">
            Specialized tools designed to move your startup from concept to growth.
          </p>
        </div>

        <div className="space-y-32 lg:space-y-40">
          {/* LAYER 01 */}
          <div className="grid lg:grid-cols-[140px_1fr] gap-8 lg:gap-16 items-center">
            <div className="hidden lg:flex items-center justify-center h-full border-r border-[#EEF0FD]">
              <span className="text-8xl font-black text-neutral-700">01</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <LayerLabel num="01" light />
                <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#122056] mb-4">New Business Launch Optimizer</h3>
                <p className="text-[16px] text-neutral-500 leading-relaxed mb-6">AI helps users choose the best business idea based on market demand, competition, and profile.</p>
              </div>
              {/* Tool 1 UI */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Business', val: 'AI Resume Builder' },
                  { label: 'Demand', val: '8.9/10', color: '#5B65DC' },
                  { label: 'Competition', val: 'Medium' },
                  { label: 'Target', val: 'Job Seekers' }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-[#FAFAFD] rounded-xl border border-[#EEF0FD] shadow-sm">
                    <p className="text-[9px] text-neutral-400 uppercase tracking-widest font-bold mb-1">{item.label}</p>
                    <p className="text-[14px] font-bold text-[#122056]" style={{ color: item.color }}>{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LAYER 02 */}
          <div className="grid lg:grid-cols-[1fr_140px] gap-8 lg:gap-16 items-center">
            <div className="grid lg:grid-cols-2 gap-10 items-center order-2 lg:order-1">
              {/* Tool 2 UI */}
              <div className="bg-[#FAFAFD] rounded-2xl p-6 border border-[#EEF0FD] relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 p-3">
                  <div className="px-2 py-1 rounded bg-emerald-50 text-emerald-600 text-[9px] font-bold uppercase tracking-widest border border-emerald-100">Live Match</div>
                </div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#EEF0FD] flex items-center justify-center text-[#5B65DC]"><Target size={18} /></div>
                  <h4 className="text-lg font-bold text-[#122056]">Sequoia Scout</h4>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-[#EEF0FD]">
                  <div>
                    <p className="text-[9px] text-neutral-400 uppercase font-bold mb-1">Avg Ticket</p>
                    <p className="text-base font-bold text-[#122056]">₹50L–₹2Cr</p>
                  </div>
                  <p className="text-emerald-600 font-bold text-[13px]">Active</p>
                </div>
              </div>
              <div>
                <LayerLabel num="02" light />
                <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#122056] mb-4">Investor Intelligence Layer</h3>
                <p className="text-[16px] text-neutral-500 leading-relaxed">Track investors, startups, and funding activities in real-time with curated match-making.</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center h-full border-l border-[#EEF0FD] order-1 lg:order-2">
              <span className="text-8xl font-black text-neutral-700">02</span>
            </div>
          </div>

          {/* LAYER 03 */}
          <div className="grid lg:grid-cols-[140px_1fr] gap-8 lg:gap-16 items-center">
            <div className="hidden lg:flex items-center justify-center h-full border-r border-[#EEF0FD]">
              <span className="text-8xl font-black text-neutral-700">03</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <LayerLabel num="03" light />
                <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#122056] mb-4">AI Startup Growth Analyst</h3>
                <p className="text-[16px] text-neutral-500 leading-relaxed">Analyze growth metrics and provide insights using real-time funnel data visualization.</p>
              </div>
              {/* Tool 3 UI */}
              <div className="bg-[#FAFAFD] rounded-2xl p-6 border border-[#EEF0FD] shadow-sm">
                <div className="h-20 w-full flex items-end gap-1 mb-4">
                  {[35, 60, 45, 80, 55, 95, 75, 100].map((h, i) => (
                    <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${h}%` }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex-1 rounded-t-sm bg-gradient-to-t from-[#5B65DC]/10 to-[#5B65DC]" />
                  ))}
                </div>
                <div className="flex justify-between items-center text-[13px] font-bold text-[#122056]">
                  <span>Growth Trend</span>
                  <span className="text-emerald-600 font-black">+32% MoM</span>
                </div>
              </div>
            </div>
          </div>

          {/* LAYER 04 */}
          <div className="grid lg:grid-cols-[1fr_140px] gap-8 lg:gap-16 items-center">
            <div className="grid lg:grid-cols-2 gap-10 items-center order-2 lg:order-1">
              {/* Tool 4 UI */}
              <div className="bg-[#FAFAFD] rounded-2xl p-5 border border-[#EEF0FD] flex flex-col gap-3 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-[#5B65DC]" />
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Social Feed AI</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-[#EEF0FD] text-[13px] text-[#122056] font-medium leading-relaxed italic">
                  “How I validated my startup idea in exactly 7 days without spending money 🚀”
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold">
                  <span className="text-neutral-400">Viral Potential</span>
                  <span className="text-[#5B65DC]">9.1/10</span>
                </div>
              </div>
              <div>
                <LayerLabel num="04" light />
                <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#122056] mb-4">AI Personal Branding Agent</h3>
                <p className="text-[16px] text-neutral-500 leading-relaxed">Build and optimize founder’s brand across platforms with viral content hooks.</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center h-full border-l border-[#EEF0FD] order-1 lg:order-2">
              <span className="text-8xl font-black text-neutral-700">04</span>
            </div>
          </div>

          {/* LAYER 05 */}
          <div className="grid lg:grid-cols-[140px_1fr] gap-8 lg:gap-16 items-center">
            <div className="hidden lg:flex items-center justify-center h-full border-r border-[#EEF0FD]">
              <span className="text-8xl font-black text-neutral-700">05</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <LayerLabel num="05" light />
                <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-[#122056] mb-4">City-wise Opportunity Map</h3>
                <p className="text-[16px] text-neutral-500 leading-relaxed">Discover startup opportunities based on real-time city-wise demand and industry trends.</p>
              </div>
              {/* Tool 5 UI */}
              <div className="bg-white rounded-2xl border border-[#EEF0FD] h-48 relative overflow-hidden shadow-sm">
                {/* Generated Map Illustration */}
                <img
                  src="/brain/8c9e6055-a531-4876-8d04-b062e9ec1534/startup_opportunity_map_1776156462769.png"
                  alt="Opportunity Map"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-[radial-gradient(#EEF0FD_1px,transparent_1px)] bg-[size:16px_16px] opacity-20" />

                <div className="absolute top-1/2 left-1/3 group/pin">
                  <div className="w-2.5 h-2.5 bg-[#5B65DC] rounded-full shadow-[0_0_10px_#5B65DC]" />
                  <div className="absolute inset-0 bg-[#5B65DC] rounded-full animate-ping opacity-30" />
                </div>
                <div className="absolute top-1/3 right-1/4 group/pin">
                  <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22D3EE]" />
                  <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-30" />
                </div>
                <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-white/90 backdrop-blur border border-[#EEF0FD] rounded-lg shadow-sm">
                  <p className="text-[11px] font-bold text-[#122056] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    High SaaS demand in Bangalore
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   4. MENTOR SESSION
   ═══════════════════════════════════════ */
const mentorCards = [
  {
    title: 'Create Task',
    value: 'Prototyping',
    note: 'Tomorrow, 10:30 AM',
    pos: 'top-8 right-6 lg:right-10',
    delay: 0.12,
  },
  {
    title: 'Project Overview',
    value: 'Need a cleaner mentor flow',
    note: 'Mentor review for product direction and GTM',
    pos: 'top-32 right-16 lg:right-24',
    delay: 0.2,
  },
  {
    title: 'Next meeting',
    value: 'Fri, 4:30 PM',
    note: 'with Product mentor',
    pos: 'bottom-11 right-10 lg:right-16',
    delay: 0.28,
  },
]

const MentorSessionSection = () => (
  <section id="mentor-session" className="relative overflow-hidden bg-transparent py-16 lg:py-22">
    <div className="absolute inset-0 pointer-events-none" />

    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="reveal"
        >
          <span className="section-label !text-white/60 !border-white/20">1 on 1 Mentor Session</span>
          <h3 className="font-bold text-[clamp(2rem,4vw,3.4rem)] leading-[1.05] tracking-tight text-white mb-5">
            Comprehensive feature set for private mentoring.
          </h3>
          <p className="text-[16px] lg:text-[18px] text-white/70 leading-relaxed mb-8 max-w-xl">
            Meet expert mentors, get live product feedback, and walk away with clear next steps in one focused session.
          </p>

          <div className="space-y-6 max-w-lg">
            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-sm flex items-center justify-center text-[#5B65DC]">
                <MessageCircle size={18} />
              </div>
              <div>
                <p className="text-[18px] font-semibold text-white">Data sync and sharing</p>
                <p className="text-[14px] text-white/50 leading-relaxed mt-1">Action notes and mentor insights stay organized and shared with your team in real time.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-sm flex items-center justify-center text-[#5B65DC]">
                <CalendarDays size={18} />
              </div>
              <div>
                <p className="text-[18px] font-semibold text-white">Smart scheduling</p>
                <p className="text-[14px] text-white/50 leading-relaxed mt-1">Book follow-ups instantly with suggested slots, context carryover, and focused agendas.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[420px] lg:min-h-[460px]"
        >
          <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(91,101,220,0.14),transparent_55%)]" />

          <div className="absolute left-2 right-2 top-16 sm:left-8 sm:right-6 sm:top-12 rounded-[1.8rem] border border-[#EEF0FD] bg-white shadow-[0_24px_60px_rgba(18,32,86,0.1)] p-4 sm:p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl border border-[#EEF0FD] bg-[#FAFAFD] flex items-center justify-center text-[#5B65DC]"><Video size={17} /></div>
                <div>
                  <p className="text-[17px] font-semibold text-[#122056] leading-tight">Product Team Meeting</p>
                  <p className="text-[12px] text-neutral-500">Record of meeting and mentor notes</p>
                </div>
              </div>
              <button className="rounded-full bg-[#ff5a5a] text-white text-[11px] font-semibold px-4 py-2">Live now</button>
            </div>

            <div className="grid grid-cols-[1.25fr_0.75fr] gap-3">
              <div className="rounded-2xl border border-[#EEF0FD] bg-[#FAFAFD] min-h-[190px] p-4 flex items-end">
                <div className="rounded-xl bg-white border border-[#EEF0FD] px-3 py-2 text-[12px] text-[#122056] font-medium">Mentor: "Focus on one ICP and test demand this week."</div>
              </div>
              <div className="grid grid-rows-2 gap-3">
                <div className="rounded-2xl border border-[#EEF0FD] bg-[#FAFAFD] p-3 flex items-center justify-center text-[12px] text-[#122056]/70 font-medium">Founder cam</div>
                <div className="rounded-2xl border border-[#EEF0FD] bg-[#FAFAFD] p-3 flex items-center justify-center text-[12px] text-[#122056]/70 font-medium">Mentor cam</div>
              </div>
            </div>
          </div>

          {mentorCards.map((card) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: card.delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute z-10 ${card.pos}`}
            >
              <div className="glass-card rounded-[1.25rem] border border-[#EEF0FD] bg-white/85 backdrop-blur-xl px-4 py-3 max-w-[220px] shadow-[0_12px_30px_rgba(18,32,86,0.09)]">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8c93a6]">{card.title}</p>
                <p className="text-[15px] font-semibold text-[#122056] mt-1 leading-tight">{card.value}</p>
                <p className="text-[11px] text-neutral-500 mt-1">{card.note}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
)

/* ═══════════════════════════════════════
   1. HERO
   ═══════════════════════════════════════ */


import CircularTestimonials from '../components/CircularTestimonials'

/* ── Testimonials Data ── */
const founderTestimonials = [
  {
    name: 'Ananya Sharma',
    designation: 'Founder, Bloomcraft Studio',
    quote: "FoundrHUB has been instrumental in our journey. The platform's focus on homegrown brands helped us find initial traction and connect with a community of supportive builders.",
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200"
  },
  {
    name: 'Rahul Kapoor',
    designation: 'Founder, NeuralBrew AI',
    quote: "Navigating the deep tech space in India was challenging until we joined FoundrHUB. The insights and visibility we gained here made our recent funding round a massive success.",
    src: "/founder-rahul.png"
  },
  {
    name: 'Arjun Desai',
    designation: 'Founder, StackFin',
    quote: "Being listed on FoundrHUB gave StackFin the credibility it needed to onboard our first 50 enterprise clients. The verified badge is worth more than any ad campaign we've run.",
    src: "/founder-arjun.jpg"
  }
]

/* ═══════════════════════════════════════
   2. TRENDING BRANDS CAROUSEL
   ═══════════════════════════════════════ */
const TrendingSection = () => {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [loopWidth, setLoopWidth] = React.useState(0);
  const scrollContainerRef = React.useRef(null);

  // Auto-scroll effect
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    setLoopWidth(scrollWidth / 2);

    const interval = setInterval(() => {
      setScrollPosition((prevPos) => {
        let newPos = prevPos + 2;
        if (newPos >= scrollWidth - clientWidth) {
          newPos = 0;
        }
        container.scrollLeft = newPos;
        return newPos;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Handle manual scroll
  const handleScroll = (e) => {
    setScrollPosition(e.target.scrollLeft);
  };

  const normalizedPosition = loopWidth ? scrollPosition % loopWidth : scrollPosition;
  const dotSegments = loopWidth ? loopWidth / 3 : 1;
  const activeDot = loopWidth ? Math.floor(normalizedPosition / dotSegments) : 0;

  return (
    <section id="discover" className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-white via-white to-[#FAFAFD]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#5B65DC]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 left-0 w-96 h-96 bg-emerald-400/3 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          className="reveal max-w-2xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-label">Trending Brands</span>
          <h2 className="section-title">Early-stage brands making waves</h2>
          <p className="text-[16px] text-neutral-500 leading-relaxed">Discover innovative founders building the future across fashion, beauty, food, and deep tech.</p>
        </motion.div>

        {/* Auto-Scrolling Carousel Container */}
        <div className="relative group">
          {/* Left Fade Overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-40 bg-gradient-to-r from-white via-white/40 to-transparent z-20 pointer-events-none opacity-100 group-hover:opacity-50 transition-opacity" />

          {/* Right Fade Overlay */}
          <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-40 bg-gradient-to-l from-white via-white/40 to-transparent z-20 pointer-events-none opacity-100 group-hover:opacity-50 transition-opacity" />

          {/* Carousel Scroll Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
          >
            <div className="flex gap-6 pb-4 pt-2">
              {/* Loop brands twice for seamless scroll */}
              {[...trendingBrands, ...trendingBrands].map((s, i) => (
                <motion.div
                  key={`${s.name}-${i}`}
                  className="flex-shrink-0 w-full sm:w-[380px] lg:w-[420px]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <motion.div
                    className="group relative h-full rounded-3xl overflow-hidden glass-card glass-card-hover backdrop-blur-xl border border-white/60 transition-all duration-300"
                    animate={{ y: hoveredIndex === i ? -12 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Image Section */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#5B65DC]/10 to-neutral-200/10">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      {/* Badge Overlay */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold border backdrop-blur-md ${badgeMap[s.badge]}`}>
                          {s.badge}
                        </span>
                      </div>

                      {/* Logo/Initial Overlay */}
                      <div className="absolute bottom-4 left-4 w-14 h-14 rounded-2xl flex items-center justify-center text-[16px] font-bold text-white" style={{ background: s.color, opacity: 0.95 }}>
                        {s.initials}
                      </div>
                    </div>

                    {/* Content Section - Center Aligned */}
                    <div className="p-7 lg:p-8 text-center flex flex-col justify-between h-48">
                      <div>
                        <h3 className="text-[18px] lg:text-[20px] font-bold text-[#122056] mb-2 leading-tight">
                          {s.name}
                        </h3>
                        <p className="text-[13px] text-[#5B65DC] font-semibold mb-3">{s.founder}</p>
                        <p className="text-[14px] text-neutral-600 leading-relaxed line-clamp-3 mb-4">
                          {s.desc}
                        </p>
                      </div>

                      {/* Category & Location Tags */}
                      <div className="flex flex-wrap gap-2 justify-center pt-4 border-t border-white/30">
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#5B65DC]/10 to-emerald-400/10 border border-[#5B65DC]/20 text-[11px] font-semibold text-[#122056] whitespace-nowrap">
                          {s.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#5B65DC]/10 to-emerald-400/10 border border-[#5B65DC]/20 text-[11px] font-semibold text-[#122056] flex items-center gap-1 whitespace-nowrap">
                          <MapPin size={11} strokeWidth={2} /> {s.city}
                        </span>
                      </div>
                    </div>

                    {/* Hover Accent Line */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#5B65DC] via-emerald-400 to-[#5B65DC]"
                      animate={{ scaleX: hoveredIndex === i ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Auto-scroll indicator */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex gap-1">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                className="h-2 rounded-full bg-[#5B65DC]/30"
                animate={{
                  width: activeDot === dot ? 24 : 8,
                  backgroundColor: activeDot === dot ? '#5B65DC' : '#E5E7EB'
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          <p className="text-[12px] text-neutral-400 ml-2">Auto-scrolling carousel</p>
        </motion.div>
      </div>
    </section>
  )
}


/* ═══════════════════════════════════════
  3. VERIFICATION STEPS
  ═══════════════════════════════════════ */
const VerificationSection = () => {
  const steps = [
    { num: '01', title: 'Create your profile', desc: 'Sign up and tell us about your startup — name, category, stage, and your founding story.', icon: PenLine },
    { num: '02', title: 'Submit for review', desc: 'Upload documents and verification details. Our team reviews every application personally.', icon: ClipboardList },
    { num: '03', title: 'Get verified badge', desc: 'Once approved, your startup receives a verified badge — trusted by the community.', icon: CheckCircle },
    { num: '04', title: 'Go live on FoundrHUB', desc: 'Your brand is now discoverable. Get featured, attract users, and grow organically.', icon: Rocket },
  ]
  return (
    <section id="get-verified" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-50/50 via-white to-white" />
      <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-emerald-100/20 rounded-full blur-[120px]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="reveal text-center mb-16">
          <span className="section-label">How it works</span>
          <h2 className="section-title">From idea to verified in 4 steps</h2>
          <p className="text-[16px] text-neutral-500 max-w-lg mx-auto">Our founder-first verification process is designed to be fast, transparent, and trust-building.</p>
        </div>
        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={s.num} className="group glass-card glass-card-hover p-7" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="text-neutral-700 mb-5"><s.icon size={28} strokeWidth={1.5} /></div>
              <div className="text-[11px] font-bold text-neutral-300 tracking-widest mb-2">{s.num}</div>
              <h3 className="text-[16px] font-semibold text-neutral-900 mb-2">{s.title}</h3>
              <p className="text-[13px] text-neutral-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
  4. FINAL CTA
  ═══════════════════════════════════════ */
const FinalCTA = () => (
  <section className="py-32 lg:py-48 bg-neutral-950 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-800/40 via-neutral-950 to-neutral-950" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-900/20 rounded-full blur-[140px]" />
    <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-[100px]" />
    <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
      <div className="reveal">
        <span className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-neutral-700 bg-white/5 backdrop-blur-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-400">Open for founders</span>
        </span>
        <h2 className="font-bold text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] tracking-tight text-white mb-6">Built for founders shaping what's next.</h2>
        <p className="text-[17px] text-neutral-400 leading-relaxed max-w-xl mx-auto mb-10">Whether you're launching your first product or scaling your hundredth, FoundrHUB is where India's most ambitious founders get discovered.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/signup?role=founder" className="inline-flex items-center px-8 py-4 rounded-full bg-white text-neutral-950 text-[15px] font-semibold tracking-wide hover:bg-neutral-100 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)] group">
            Launch on FoundrHUB
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <Link to="/signup?role=investor" className="inline-flex items-center px-8 py-4 rounded-full border border-neutral-700 text-neutral-300 text-[15px] font-medium hover:border-neutral-500 hover:text-white hover:bg-white/5 backdrop-blur-sm transition-all duration-300">Explore Startups</Link>
        </div>
      </div>
    </div>
  </section>
)

/* ═══════════════════════════════════════
   PAGE WRAPPER
   ═══════════════════════════════════════ */

const HomePage = () => {
  useReveal()
  const [showOnboarding, setShowOnboarding] = useState(false)

  return (
    <>
      <main className="relative bg-white">
        <header className="absolute top-6 left-0 right-0 z-40">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 flex items-center justify-between">
            <Link
              to="/"
              className="text-[22px] font-extrabold tracking-tight text-[#122056]"
            >
              Foundr<span className="text-[#5B65DC]">HUB</span>
            </Link>

            <div className="flex items-center gap-4 relative">
              <Link
                to="/signin"
                className="text-[13px] font-bold text-neutral-400 hover:text-[#122056] transition-colors"
              >
                Sign In
              </Link>
              <div className="relative">
                <Link
                  to="/signup"
                  className="px-5 py-2.5 rounded-full bg-[#122056] text-white text-[13px] font-bold hover:bg-[#5B65DC] transition-all shadow-lg shadow-[#122056]/15"
                >
                  Sign Up
                </Link>
                <div className="absolute top-full right-0 mt-3 rounded-2xl border border-[#EEF0FD] bg-white/90 backdrop-blur-xl px-4 py-3 shadow-[0_18px_40px_rgba(18,32,86,0.12)]">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B65DC]">Mentor or Investor</p>
                  <p className="text-[12px] text-[#122056]/70 mt-1">Get early access</p>
                  <Link
                    to="/signup?role=investor"
                    className="mt-2 inline-flex items-center text-[11px] font-bold text-[#122056] hover:text-[#5B65DC]"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        <GlobalGridBackground />
        <CinematicHero onGetStarted={() => setShowOnboarding(true)} />

        <ProblemCluster />

        <div className="flex justify-center py-8 lg:py-12">
          <span className="text-[13px] font-black uppercase tracking-[0.8em] text-[#5B65DC]/30">Welcome to FoundrHUB</span>
        </div>

        <div className="mx-4 lg:mx-10 my-12 lg:my-16 p-2 lg:p-4 rounded-[3.5rem] bg-gradient-to-br from-[#122056] via-[#122056] to-[#0A1128] border border-[#1e2d63] shadow-[0_40px_100px_rgba(10,17,40,0.4)] relative overflow-hidden">
          {/* Inner Subtle Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(91,101,220,0.15),transparent_70%)] pointer-events-none" />
          <AnalyticsPreview />
        </div>

        <AILayersSection />

        <div className="mx-4 lg:mx-10 my-12 lg:my-16 p-2 lg:p-4 rounded-[3.5rem] bg-gradient-to-br from-[#122056] via-[#122056] to-[#0A1128] border border-[#1e2d63] shadow-[0_40px_100px_rgba(10,17,40,0.4)] relative overflow-hidden">
          {/* Inner Subtle Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(91,101,220,0.15),transparent_70%)] pointer-events-none" />
          <MentorSessionSection />
        </div>

        <StartupNetwork />
      </main>

      <Footer />

      <AnimatePresence>
        {showOnboarding && (
          <OnboardingFlow onClose={() => setShowOnboarding(false)} />
        )}
      </AnimatePresence>
    </>
  )
}

const products = [
  {
    title: "Innovators Peak",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200",
  },
  {
    title: "EcoBrand Collective",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
  },
  {
    title: "TechFlow Solutions",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200",
  },
  {
    title: "Pulse Digital",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200",
  },
  {
    title: "Lumina Studio",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1556761175-4b413da4baf72?q=80&w=1200",
  },
  {
    title: "Nexus Hub",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1542744173-b33e14629f77?q=80&w=1200",
  },
  {
    title: "Vantage Point",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1581291417084-6d8e200277781c?q=80&w=1200",
  },
  {
    title: "Bloomcraft Studio",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200",
  },
  {
    title: "Core Innovations",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200",
  },
  {
    title: "Streamline Labs",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200",
  },
  {
    title: "Zenwork Space",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
  },
  {
    title: "Apex Ventures",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200",
  },
  {
    title: "Creative Pulse",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1522071823991-b5ae95bb9724?q=80&w=1200",
  },
  {
    title: "Startup Forge",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1200",
  },
  {
    title: "Momentum Tech",
    link: "#",
    thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200",
  },
];

export default HomePage
