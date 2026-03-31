import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GlassCard from '../components/GlassCard'
import DashboardPreview from '../components/DashboardPreview'
import { HighlighterDemo } from '../components/Highlighter'
import { HeroParallax } from '../components/ui/hero-parallax'
import { MapPin, Eye, Bookmark, MessageSquare, Users, PenLine, ClipboardList, CheckCircle, Rocket } from 'lucide-react'

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
  { name: 'Bloomcraft Studio', founder: 'Ananya Sharma', desc: 'Handcrafted sustainable fashion blending traditional textiles with modern minimalism.', category: 'Sustainable Fashion', city: 'Chandigarh', badge: 'Verified', color: '#e8d5c0', initials: 'BC' },
  { name: 'NeuralBrew AI', founder: 'Rahul Kapoor', desc: 'AI-powered creative tools helping D2C brands generate compelling narratives at scale.', category: 'AI / Deep Tech', city: 'Chandigarh', badge: 'Rising', color: '#c9d5e0', initials: 'NB' },
  { name: 'GreenRoute', founder: 'Meera Patel', desc: 'Last-mile delivery optimization reducing carbon footprint for hyperlocal brands.', category: 'Climate Tech', city: 'Chandigarh', badge: 'Funded', color: '#d5e0c9', initials: 'GR' },
  { name: 'KiraSkin', founder: 'Priya Nair', desc: 'Clean-label skincare powered by lab-tested Ayurvedic formulations.', category: 'D2C Beauty', city: 'Mohali', badge: 'Verified', color: '#e0c9d5', initials: 'KS' },
  { name: 'StackFin', founder: 'Arjun Desai', desc: 'Embedded finance infrastructure for SaaS founders to add payments in minutes.', category: 'Fintech', city: 'Panchkula', badge: 'Rising', color: '#d5d0e8', initials: 'SF' },
  { name: 'CraftBox', founder: 'Sneha Joshi', desc: 'Subscription craft kits for curated DIY experiences delivered nationwide.', category: 'EdTech', city: 'Chandigarh', badge: 'Funded', color: '#e0dac9', initials: 'CB' },
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
   1. HERO
   ═══════════════════════════════════════ */
const HeroSection = () => {
  const { isAuthenticated } = useAuth()
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-neutral-50 to-amber-50/30" />
      <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-gradient-to-bl from-amber-100/40 via-transparent to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-gradient-to-tr from-emerald-50/30 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 pt-32 pb-20 lg:pt-40 lg:pb-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-xl border border-white/60 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-500">Now in early access</span>
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif text-[clamp(2.6rem,5.5vw,4.4rem)] leading-[1.06] tracking-tight text-neutral-950 mb-7"
            >
              Discover the next big homegrown brands
            </motion.h1>
            <p className="text-[17px] lg:text-[18px] leading-relaxed text-neutral-500 max-w-lg mb-8">
              A curated startup discovery OS for visionary founders, rising D2C brands, and verified local innovators across India.
            </p>
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mb-12 pt-4 border-t border-neutral-100/50"
            >
              <HighlighterDemo />
            </motion.div>
            <div className="flex flex-wrap gap-4">
              <Link to="/explore" className="btn-primary group">
                Explore Startups
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              {!isAuthenticated && (
                <Link to="/verify" className="btn-glass">Get Verified</Link>
              )}
              {isAuthenticated && (
                <Link to="/dashboard" className="btn-glass">Go to Dashboard</Link>
              )}
            </div>
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {['#e8d5c0', '#c9d5e0', '#d5e0c9', '#e0c9d5'].map((bg, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-neutral-600 shadow-sm" style={{ background: bg }}>
                    {['AS', 'RK', 'MP', 'JD'][i]}
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-neutral-400"><span className="font-semibold text-neutral-600">240+</span> founders building in public</p>
            </div>
          </motion.div>

          {/* Dashboard Preview Card */}
          <div className="hidden lg:block relative">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   2. FOUNDER SPOTLIGHT
   ═══════════════════════════════════════ */
const FounderSpotlight = () => (
  <section className="py-24 lg:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/80 to-white" />
    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <div className="reveal max-w-2xl mb-16">
        <span className="section-label">Verified Founders</span>
        <h2 className="section-title">Meet the founders building India's next wave</h2>
        <p className="text-[16px] text-neutral-500 leading-relaxed">Verified builders on FoundrHUB — from student founders to serial entrepreneurs.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {founders.map((f, i) => (
          <div key={f.name} className="reveal group glass-card glass-card-hover p-6" style={{ transitionDelay: `${i * 0.07}s` }}>
            <div className="relative mb-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-[18px] font-bold text-neutral-700 shadow-lg" style={{ background: f.color }}>{f.initials}</div>
              {f.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-200 animate-pulse">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </div>
              )}
            </div>
            <h3 className="text-[15px] font-semibold text-neutral-900 mb-0.5">{f.name}</h3>
            <p className="text-[12px] text-neutral-400 mb-3">{f.title}</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 text-[10px] font-medium text-neutral-500">{f.category}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 text-[10px] font-medium text-neutral-500 flex items-center gap-1"><MapPin size={10} strokeWidth={1.5} /> {f.city}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

/* ═══════════════════════════════════════
   3. CITY MAP
   ═══════════════════════════════════════ */


/* ═══════════════════════════════════════
   4. TRENDING BRANDS
   ═══════════════════════════════════════ */
const TrendingSection = () => (
  <section id="discover" className="py-24 lg:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50/50" />
    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <div className="reveal max-w-2xl mb-16">
        <span className="section-label">Trending Brands</span>
        <h2 className="section-title">Early-stage brands making waves</h2>
        <p className="text-[16px] text-neutral-500 leading-relaxed">Curated picks from the FoundrHUB community — from deep tech to sustainable fashion.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {trendingBrands.map((s, i) => (
          <div key={s.name} className="reveal group glass-card glass-card-hover p-7" style={{ transitionDelay: `${i * 0.06}s` }}>
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-[14px] font-bold text-neutral-700 shadow-md" style={{ background: s.color }}>{s.initials}</div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border backdrop-blur-sm ${badgeMap[s.badge]}`}>{s.badge}</span>
            </div>
            <h3 className="text-[16px] font-semibold text-neutral-900 mb-1">{s.name}</h3>
            <p className="text-[12px] text-neutral-400 mb-3">by {s.founder}</p>
            <p className="text-[13px] text-neutral-500 leading-relaxed mb-5">{s.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-white/40 text-[10px] font-medium text-neutral-600">{s.category}</span>
              <span className="px-2.5 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-white/40 text-[10px] font-medium text-neutral-500 flex items-center gap-1"><MapPin size={10} strokeWidth={1.5} /> {s.city}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

/* ═══════════════════════════════════════
   5. ANALYTICS PREVIEW
   ═══════════════════════════════════════ */
const AnalyticsPreview = () => (
  <section id="analytics" className="py-24 lg:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/50 via-amber-50/10 to-white" />
    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <div className="reveal text-center mb-16">
        <span className="section-label">Analytics Dashboard</span>
        <h2 className="section-title">Your startup performance at a glance</h2>
        <p className="text-[16px] text-neutral-500 max-w-lg mx-auto">Premium OS-style analytics panels tailored for founders who want real-time insight.</p>
      </div>
      <div className="reveal">
        <GlassCard className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-amber-400" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-400" /></div>
              <span className="text-[12px] font-medium text-neutral-400 ml-2">FoundrHUB Analytics — Bloomcraft Studio</span>
            </div>
            <div className="flex gap-2">
              {['7D', '30D', '90D'].map((p, i) => (
                <button key={p} className={`px-3 py-1 rounded-lg text-[10px] font-semibold ${i === 1 ? 'bg-neutral-950 text-white' : 'bg-white/50 backdrop-blur-sm text-neutral-500 border border-white/40'}`}>{p}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[{ l: 'Profile Views', v: '2,847', c: '+24%', icon: Eye }, { l: 'Saves', v: '342', c: '+18%', icon: Bookmark }, { l: 'Story Engagement', v: '89%', c: '+5%', icon: MessageSquare }, { l: 'Inbound Leads', v: '27', c: '+9', icon: Users }].map(m => (
              <div key={m.l} className="bg-white/40 backdrop-blur-xl rounded-2xl border border-white/50 p-5 hover:bg-white/55 transition-all duration-300">
                <div className="flex items-center justify-between mb-2"><span className="text-neutral-700"><m.icon size={20} strokeWidth={1.5} /></span><span className="text-[11px] font-semibold text-emerald-600">{m.c}</span></div>
                <p className="text-[22px] font-semibold text-neutral-900 leading-tight">{m.v}</p>
                <p className="text-[11px] text-neutral-400 font-medium mt-0.5">{m.l}</p>
              </div>
            ))}
          </div>
          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/50 p-5">
              <p className="text-[13px] font-semibold text-neutral-800 mb-1">Views Over Time</p>
              <p className="text-[11px] text-neutral-400 mb-4">Last 30 days</p>
              <div className="flex items-end gap-1.5 h-28">
                {[20, 35, 28, 45, 52, 38, 60, 55, 72, 65, 78, 82, 70, 88, 92, 75, 95, 88, 80, 90, 85, 92, 78, 95, 100, 88, 92, 85, 98, 92].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t hover:opacity-70 transition-opacity" style={{ height: `${h}%`, background: i >= 27 ? '#0a0a0a' : i >= 20 ? '#525252' : '#d4d4d4' }} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/50 p-5">
              <p className="text-[13px] font-semibold text-neutral-800 mb-1">Discovery Sources</p>
              <p className="text-[11px] text-neutral-400 mb-4">Where your visitors come from</p>
              <div className="space-y-3">
                {[{ l: 'FoundrHUB Feed', pct: 45 }, { l: 'Direct Search', pct: 28 }, { l: 'Shared Links', pct: 18 }, { l: 'Social Media', pct: 9 }].map(s => (
                  <div key={s.l}>
                    <div className="flex justify-between mb-1"><span className="text-[11px] font-medium text-neutral-600">{s.l}</span><span className="text-[11px] font-semibold text-neutral-500">{s.pct}%</span></div>
                    <div className="w-full h-1.5 rounded-full bg-white/50"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${s.pct}%`, background: s.pct > 30 ? '#0a0a0a' : '#a3a3a3' }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  </section>
)

/* ═══════════════════════════════════════
   6. VERIFICATION STEPS
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
      <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/5 to-neutral-50/80" />
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
   7. FINAL CTA
   ═══════════════════════════════════════ */
const FinalCTA = () => (
  <section className="py-24 lg:py-32 bg-neutral-950 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-neutral-800/20 to-transparent rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tl from-emerald-900/10 to-transparent rounded-full blur-3xl" />
    <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
      <div className="reveal">
        <span className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-neutral-700 bg-white/5 backdrop-blur-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-400">Open for founders</span>
        </span>
        <h2 className="font-serif text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] tracking-tight text-white mb-6">Built for founders shaping what's next.</h2>
        <p className="text-[17px] text-neutral-400 leading-relaxed max-w-xl mx-auto mb-10">Whether you're launching your first product or scaling your hundredth, FoundrHUB is where India's most ambitious founders get discovered.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/verify" className="inline-flex items-center px-8 py-4 rounded-full bg-white text-neutral-950 text-[15px] font-semibold tracking-wide hover:bg-neutral-100 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)] group">
            Launch on FoundrHUB
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <Link to="/explore" className="inline-flex items-center px-8 py-4 rounded-full border border-neutral-700 text-neutral-300 text-[15px] font-medium hover:border-neutral-500 hover:text-white hover:bg-white/5 backdrop-blur-sm transition-all duration-300">Explore Startups</Link>
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

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FounderSpotlight />
        <TrendingSection />
        <AnalyticsPreview />
        <VerificationSection />
        <FinalCTA />
      </main>
      {/* Hero Parallax Section */}
      <HeroParallax products={products} />

      <Footer />
    </>
  )
}

const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/rogue.png",
  },
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail: "https://www.aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

export default HomePage
