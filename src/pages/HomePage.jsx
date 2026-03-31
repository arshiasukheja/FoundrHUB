import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CinematicHero from '../components/CinematicHero'
import GlassCard from '../components/GlassCard'
import DashboardPreview from '../components/DashboardPreview'
import AnalyticsPreview from '../components/AnalyticsPreview'
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


/* ═══════════════════════════════════════
   2. FOUNDER SPOTLIGHT
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
    src: "https://images.unsplash.com/photo-1542744173-b33e14629f77?q=80&w=1200"
  },
  {
    name: 'Meera Patel',
    designation: 'Founder, GreenRoute',
    quote: "Reliability is key for climate tech startups. Being a verified brand on FoundrHUB instantly established trust with our enterprise partners and logistics networks.",
    src: "https://images.unsplash.com/photo-1556761175-4b413da4baf72?q=80&w=1200"
  }
]

const FounderSpotlight = () => (
  <section id="founders" className="py-24 lg:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-50/40 via-white to-transparent" />
    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <div className="reveal max-w-2xl mb-16">
        <span className="section-label">Verified Founders</span>
        <h2 className="section-title">Meet the founders building India's next wave</h2>
        <p className="text-[16px] text-neutral-500 leading-relaxed">Verified builders on FoundrHUB — from student founders to serial entrepreneurs.</p>
      </div>
      
      <div className="reveal">
        <CircularTestimonials 
          testimonials={founderTestimonials} 
          colors={{
            name: "#0a0a0a",
            designation: "#737373",
            testimony: "#404040",
            arrowBackground: "#0a0a0a",
            arrowHoverBackground: "#737373",
            arrowForeground: "#ffffff"
          }}
          fontSizes={{
            name: "clamp(1.5rem, 4vw, 2.2rem)",
            designation: "12px",
            quote: "clamp(1rem, 2.5vw, 1.25rem)"
          }}
        />
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
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-50/40 via-white to-white" />
    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
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
   7. FINAL CTA
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
        <h2 className="font-serif text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] tracking-tight text-white mb-6">Built for founders shaping what's next.</h2>
        <p className="text-[17px] text-neutral-400 leading-relaxed max-w-xl mx-auto mb-10">Whether you're launching your first product or scaling your hundredth, FoundrHUB is where India's most ambitious founders get discovered.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/signup?role=founder" className="inline-flex items-center px-8 py-4 rounded-full bg-white text-neutral-950 text-[15px] font-semibold tracking-wide hover:bg-neutral-100 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)] group">
            Launch on FoundrHUB
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <Link to="/signup?role=discoverer" className="inline-flex items-center px-8 py-4 rounded-full border border-neutral-700 text-neutral-300 text-[15px] font-medium hover:border-neutral-500 hover:text-white hover:bg-white/5 backdrop-blur-sm transition-all duration-300">Explore Startups</Link>
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
        <CinematicHero />
        <FounderSpotlight />
        <TrendingSection />
        <AnalyticsPreview />
        <VerificationSection />
        <HeroParallax products={products} />
        <FinalCTA />
      </main>

      <Footer />
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
