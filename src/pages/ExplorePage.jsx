import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Search, MapPin } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const categories = ['All', 'AI / Deep Tech', 'Sustainable Fashion', 'Climate Tech', 'Fintech', 'D2C Beauty', 'EdTech', 'SaaS', 'Food & Beverage']
const cities = ['All Cities', 'Chandigarh', 'Mumbai', 'Bengaluru', 'Delhi', 'Pune', 'Hyderabad']
const stages = ['All Stages', 'Idea', 'MVP', 'Launched', 'Scaling']

const allStartups = [
  { name: 'Bloomcraft Studio', founder: 'Ananya Sharma', desc: 'Handcrafted sustainable fashion blending traditional textiles with modern minimalism.', category: 'Sustainable Fashion', city: 'Chandigarh', badge: 'Verified', color: '#e8d5c0', initials: 'BC', stage: 'Launched', traction: '10K+ orders' },
  { name: 'NeuralBrew AI', founder: 'Rahul Kapoor', desc: 'AI-powered creative tools helping D2C brands generate compelling narratives at scale.', category: 'AI / Deep Tech', city: 'Chandigarh', badge: 'Rising', color: '#c9d5e0', initials: 'NB', stage: 'Scaling', traction: '5K users' },
  { name: 'GreenRoute', founder: 'Meera Patel', desc: 'Last-mile delivery optimization reducing carbon footprint for hyperlocal brands.', category: 'Climate Tech', city: 'Chandigarh', badge: 'Funded', color: '#d5e0c9', initials: 'GR', stage: 'Scaling', traction: 'Series A' },
  { name: 'KiraSkin', founder: 'Priya Nair', desc: 'Clean-label skincare powered by lab-tested Ayurvedic formulations.', category: 'D2C Beauty', city: 'Mumbai', badge: 'Verified', color: '#e0c9d5', initials: 'KS', stage: 'Launched', traction: '8K customers' },
  { name: 'StackFin', founder: 'Arjun Desai', desc: 'Embedded finance infrastructure for SaaS founders to add payments in minutes.', category: 'Fintech', city: 'Pune', badge: 'Rising', color: '#d5d0e8', initials: 'SF', stage: 'MVP', traction: '120 waitlist' },
  { name: 'CraftBox', founder: 'Sneha Joshi', desc: 'Subscription craft kits for curated DIY experiences delivered nationwide.', category: 'EdTech', city: 'Chandigarh', badge: 'Funded', color: '#e0dac9', initials: 'CB', stage: 'Launched', traction: '3K subs' },
  { name: 'FreshPress', founder: 'Vikram Singh', desc: 'Cold-pressed juice subscriptions with hyperlocal farm-to-glass delivery in 60 minutes.', category: 'Food & Beverage', city: 'Chandigarh', badge: 'Verified', color: '#c9e0d5', initials: 'FP', stage: 'Launched', traction: '2K daily' },
  { name: 'CodeCraft Academy', founder: 'Nisha Gupta', desc: 'Project-based coding bootcamp for tier-2 city students with placement guarantees.', category: 'EdTech', city: 'Bengaluru', badge: 'Rising', color: '#d5c9e0', initials: 'CA', stage: 'Scaling', traction: '4K students' },
  { name: 'SolarLeaf', founder: 'Rajan Mehta', desc: 'Affordable rooftop solar solutions for Indian homes with AI-powered energy management.', category: 'Climate Tech', city: 'Delhi', badge: 'Funded', color: '#e0e0c9', initials: 'SL', stage: 'Scaling', traction: '1.2K installs' },
  { name: 'PureThread', founder: 'Aarti Khanna', desc: 'Zero-waste fashion brand using recycled ocean plastics to create premium athleisure.', category: 'Sustainable Fashion', city: 'Mumbai', badge: 'Verified', color: '#c9d5d5', initials: 'PT', stage: 'Launched', traction: '6K orders' },
  { name: 'MindPal', founder: 'Saurabh Roy', desc: 'AI mental wellness companion offering CBT-based therapy sessions at ₹99/month.', category: 'AI / Deep Tech', city: 'Hyderabad', badge: 'Rising', color: '#d5e8c9', initials: 'MP', stage: 'MVP', traction: '800 users' },
  { name: 'QuickKart', founder: 'Lakshmi Iyer', desc: 'WhatsApp-first hyperlocal grocery delivery for tier-3 towns with 30-min delivery.', category: 'Food & Beverage', city: 'Pune', badge: 'Funded', color: '#e8c9d5', initials: 'QK', stage: 'Scaling', traction: '15K orders/mo' },
]

const badgeMap = {
  Verified: 'bg-emerald-500/10 text-emerald-700 border-emerald-200/60',
  Rising: 'bg-amber-500/10 text-amber-700 border-amber-200/60',
  Funded: 'bg-blue-500/10 text-blue-700 border-blue-200/60',
}

const ExplorePage = () => {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [activeCity, setActiveCity] = useState('All Cities')
  const [activeStage, setActiveStage] = useState('All Stages')
  const [viewMode, setViewMode] = useState('grid')

  const filtered = allStartups.filter(s => {
    if (activeCategory !== 'All' && s.category !== activeCategory) return false
    if (activeCity !== 'All Cities' && s.city !== activeCity) return false
    if (activeStage !== 'All Stages' && s.stage !== activeStage) return false
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.founder.toLowerCase().includes(search.toLowerCase()) && !s.category.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-gradient-to-b from-beige-50 to-white">
        {/* Header */}
        <section className="py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-amber-100/30 to-transparent rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-400 mb-4 block">Explore</span>
              <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-neutral-950 mb-4">Discover India's rising startups</h1>
              <p className="text-[16px] text-neutral-500 max-w-lg mb-10">Browse verified founders, trending brands, and early-stage startups across categories and cities.</p>
            </motion.div>

            {/* Search */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}>
              <div className="relative max-w-xl mb-8">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search startups, founders, or categories..."
                  id="explore-search"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/60 shadow-sm text-[14px] text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-300 focus:ring-2 focus:ring-neutral-100 transition-all duration-300"
                />
              </div>
            </motion.div>

            {/* Filters */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="flex flex-wrap gap-6 mb-10">
              <div>
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">Category</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map(c => (
                    <button key={c} onClick={() => setActiveCategory(c)} className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-300 ${activeCategory === c ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-white/60 backdrop-blur-sm text-neutral-500 border-white/40 hover:border-neutral-300'}`}>{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">City</p>
                <div className="flex flex-wrap gap-2">
                  {cities.map(c => (
                    <button key={c} onClick={() => setActiveCity(c)} className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-300 ${activeCity === c ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-white/60 backdrop-blur-sm text-neutral-500 border-white/40 hover:border-neutral-300'}`}>{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">Stage</p>
                <div className="flex flex-wrap gap-2">
                  {stages.map(c => (
                    <button key={c} onClick={() => setActiveStage(c)} className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-300 ${activeStage === c ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-white/60 backdrop-blur-sm text-neutral-500 border-white/40 hover:border-neutral-300'}`}>{c}</button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Results count */}
            <p className="text-[13px] text-neutral-400 mb-6">
              <span className="font-semibold text-neutral-600">{filtered.length}</span> startup{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </section>

        {/* Results grid */}
        <section className="pb-24 lg:pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {filtered.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <div className="flex justify-center mb-4"><Search size={48} strokeWidth={1} className="text-neutral-200" /></div>
                <p className="text-[18px] font-serif text-neutral-900 mb-2">No startups found</p>
                <p className="text-[14px] text-neutral-400">Try adjusting your filters or search query</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                    className="group bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 p-7 hover:bg-white/60 hover:shadow-[0_12px_48px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-[14px] font-bold text-neutral-700 shadow-md" style={{ background: s.color }}>{s.initials}</div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border backdrop-blur-sm ${badgeMap[s.badge]}`}>{s.badge}</span>
                    </div>
                    <h3 className="text-[16px] font-semibold text-neutral-900 mb-1">{s.name}</h3>
                    <p className="text-[12px] text-neutral-400 mb-3">by {s.founder}</p>
                    <p className="text-[13px] text-neutral-500 leading-relaxed mb-5">{s.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="px-2.5 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-white/40 text-[10px] font-medium text-neutral-600">{s.category}</span>
                      <span className="px-2.5 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-white/40 text-[10px] font-medium text-neutral-500 flex items-center gap-1"><MapPin size={10} strokeWidth={1.5} /> {s.city}</span>
                      <span className="px-2.5 py-1 rounded-full bg-white/50 backdrop-blur-sm border border-white/40 text-[10px] font-medium text-neutral-500">{s.stage}</span>
                    </div>
                    <p className="text-[11px] font-semibold text-emerald-600">{s.traction}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default ExplorePage
