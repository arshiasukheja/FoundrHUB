import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, MessageSquare, ThumbsUp, SlidersHorizontal, LayoutGrid, List, ArrowUpRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SidebarMenu from '../components/SidebarMenu'
import DashboardHeader from '../components/DashboardHeader'
import StartupDetailModal from '../components/StartupDetailModal'
import { useAuth } from '../context/AuthContext'
import { useRealtimeValue } from '../lib/realtime'
import { buildDefaultUserData } from '../lib/seedData'

const ExplorePage = ({ embedded = false }) => {
  const { user } = useAuth()
  const [selectedStartup, setSelectedStartup] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [viewType, setViewType] = useState('grid')
  const [selectedNiche, setSelectedNiche] = useState('All')
  const [selectedStage, setSelectedStage] = useState('All')
  const [selectedGeo, setSelectedGeo] = useState('All')
  const fallback = useMemo(() => buildDefaultUserData({}).discovery, [])
  const { value: discoveryData } = useRealtimeValue(
    user?.uid ? `users/${user.uid}/discovery` : null,
    fallback
  )
  const startups = discoveryData?.startups || []
  const userStartup = discoveryData?.userStartup || {
    name: 'Your Startup',
    tagline: 'Founder-led growth platform',
    stage: 'Growth',
    category: 'SaaS',
    location: 'Bangalore',
    growth: 28,
    users: 4200,
    retention: 42,
    conversion: 3.2
  }
  const topCompetitor = startups[0] || {
    name: 'Top Competitor',
    stage: 'Growth',
    category: 'SaaS',
    location: 'Bangalore',
    growth: 24,
    users: 3800,
    retention: 38,
    conversion: 2.9
  }

  const filteredStartups = useMemo(() => {
    const q = searchValue.trim().toLowerCase()
    return startups.filter((startup) => {
      const matchesQuery = !q || [startup.name, startup.tagline, startup.category, startup.location, startup.stage]
        .some((field) => field.toLowerCase().includes(q))
      const matchesNiche = selectedNiche === 'All' || startup.category === selectedNiche
      const matchesStage = selectedStage === 'All' || startup.stage === selectedStage
      const matchesGeo = selectedGeo === 'All' || startup.location === selectedGeo
      return matchesQuery && matchesNiche && matchesStage && matchesGeo
    })
  }, [searchValue, startups, selectedNiche, selectedStage, selectedGeo])

  const marketRank = useMemo(() => {
    if (!startups.length) return { rank: 1, total: 1 }
    const sorted = [...startups].sort((a, b) => (b.growth || 0) - (a.growth || 0))
    const rank = Math.max(1, sorted.findIndex((item) => item.name === userStartup.name) + 1 || 3)
    return { rank, total: sorted.length + 1 }
  }, [startups, userStartup.name])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  }

  const mainContent = (
    <main className={`max-w-7xl mx-auto px-6 lg:px-10 ${embedded ? 'py-6' : 'py-12'} relative z-10`}>
        <section className="rounded-[28px] bg-white/70 border border-[#eef0f5] p-6 lg:p-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#6366f1]">Your Position in the Market</p>
              <h1 className="text-2xl font-semibold text-[#0f172a] mt-2">Compare yourself with the top competitor</h1>
            </div>
            <div className="rounded-full bg-[#eef2ff] px-4 py-1 text-xs font-semibold text-[#4f46e5]">Market Rank: #{marketRank.rank} of {marketRank.total}</div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#eef0f5] bg-white">
            <table className="w-full text-sm">
              <thead className="bg-[#f8fafc] text-[#64748b]">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Metric</th>
                  <th className="px-4 py-3 text-left font-semibold">You</th>
                  <th className="px-4 py-3 text-left font-semibold">Top Competitor</th>
                </tr>
              </thead>
              <tbody className="text-[#0f172a]">
                {[
                  { label: 'Growth rate', you: `${userStartup.growth}%`, them: `${topCompetitor.growth || 22}%` },
                  { label: 'Users', you: `${userStartup.users}`, them: `${topCompetitor.users || 3600}` },
                  { label: 'Retention', you: `${userStartup.retention}%`, them: `${topCompetitor.retention || 38}%` },
                  { label: 'Conversion', you: `${userStartup.conversion}%`, them: `${topCompetitor.conversion || 3.0}%` }
                ].map((row) => (
                  <tr key={row.label} className="border-t border-[#eef0f5]">
                    <td className="px-4 py-3 font-semibold">{row.label}</td>
                    <td className="px-4 py-3">{row.you}</td>
                    <td className="px-4 py-3">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-4">
            <div className="rounded-2xl border border-[#eef0f5] bg-[#fbfcff] p-4 text-sm text-[#475569]">
              <p className="font-semibold text-[#0f172a]">AI insight</p>
              <p className="mt-2">You win on growth velocity and user volume, but retention is below the top competitor. Tighten onboarding and core activation to close the gap.</p>
            </div>
            <div className="rounded-2xl border border-[#eef0f5] bg-white p-4">
              <p className="text-xs font-semibold text-[#0f172a] uppercase tracking-[0.18em]">Actionable fixes</p>
              <ul className="mt-3 space-y-2 text-xs text-[#475569] list-disc pl-5">
                <li>Ship a 7-day activation checklist to improve retention.</li>
                <li>Re-segment paid channels to reduce CAC by 10-15%.</li>
                <li>Improve conversion by tightening landing copy and proof.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="rounded-[24px] bg-white border border-[#eef0f5] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#6366f1]">Filters</p>
              <div className="flex items-center gap-2">
                <button onClick={() => setViewType('grid')} className={`p-2 rounded-xl ${viewType === 'grid' ? 'bg-[#eef2ff] text-[#4f46e5]' : 'text-[#94a3b8]'}`}>
                  <LayoutGrid size={16} />
                </button>
                <button onClick={() => setViewType('list')} className={`p-2 rounded-xl ${viewType === 'list' ? 'bg-[#eef2ff] text-[#4f46e5]' : 'text-[#94a3b8]'}`}>
                  <List size={16} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="text-xs font-semibold text-[#64748b]">
                Niche
                <select value={selectedNiche} onChange={(e) => setSelectedNiche(e.target.value)} className="mt-2 w-full rounded-xl border border-[#eef0f5] bg-white px-3 py-2 text-sm">
                  {['All', 'SaaS', 'FinTech', 'AI', 'Climate', 'Marketplace', 'EdTech'].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
              <label className="text-xs font-semibold text-[#64748b]">
                Stage
                <select value={selectedStage} onChange={(e) => setSelectedStage(e.target.value)} className="mt-2 w-full rounded-xl border border-[#eef0f5] bg-white px-3 py-2 text-sm">
                  {['All', 'Early', 'Seed', 'Growth', 'Scale'].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
              <label className="text-xs font-semibold text-[#64748b]">
                Geography
                <select value={selectedGeo} onChange={(e) => setSelectedGeo(e.target.value)} className="mt-2 w-full rounded-xl border border-[#eef0f5] bg-white px-3 py-2 text-sm">
                  {['All', 'Bangalore', 'Delhi', 'Mumbai', 'Hyderabad'].map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4">
              <input
                type="text"
                placeholder="Search by name, niche, location"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full rounded-xl border border-[#eef0f5] bg-[#fbfcff] px-4 py-3 text-sm"
              />
            </div>
          </div>

          <div className="rounded-[24px] bg-white border border-[#eef0f5] p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#6366f1]">Market Rank</p>
            <p className="text-3xl font-semibold text-[#0f172a] mt-3">#{marketRank.rank}</p>
            <p className="text-sm text-[#64748b]">Among {marketRank.total} similar startups</p>
            <p className="text-xs text-[#475569] mt-4">Improve retention by 4-6% to move up a tier.</p>
          </div>
        </section>

        <section className="mt-8">
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className={`grid gap-4 ${viewType === 'list' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
            {filteredStartups.map((startup) => (
              <motion.div key={startup.id} variants={itemVariants} className="rounded-2xl bg-white border border-[#eef0f5] p-4 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)] transition" onClick={() => setSelectedStartup(startup)}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#0f172a]">{startup.name}</p>
                    <p className="text-xs text-[#64748b]">{startup.tagline}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-[#4f46e5] bg-[#eef2ff] px-2 py-1 rounded-full">{startup.stage}</span>
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-[#475569]">
                  <span>Users: {startup.views}</span>
                  <span>Growth: {startup.growth}%</span>
                </div>
                <div className="mt-3 rounded-xl border border-[#eef0f5] bg-[#fbfcff] px-3 py-2 text-xs text-[#475569]">
                  You vs Them: {userStartup.growth}% vs {startup.growth}% growth
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
    </main>
  )

  return (
    <div className={`min-h-screen ${embedded ? 'bg-[#f5f7fb]' : 'bg-[#FAFAFD]'} relative overflow-hidden`}>
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-[#5B65DC]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[30%] h-[40%] bg-[#122056]/30 rounded-full blur-[100px] opacity-10" />
      </div>

      {embedded ? <SidebarMenu activeItem="discovery" /> : <Navbar />}

      {embedded ? (
        <div className="ml-0 lg:ml-64 relative z-10">
          <div className="sticky top-0 z-40 bg-[#f5f7fb]/90 backdrop-blur-xl border-b border-[#e5e7eb]">
            <div className="w-full px-6 lg:px-10 py-4 flex items-center justify-between gap-4">
              <DashboardHeader />
              <div />
            </div>
          </div>
          {mainContent}
        </div>
      ) : (
        mainContent
      )}

      {!embedded && <Footer />}

      {selectedStartup && (
        <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center px-4" onClick={() => setSelectedStartup(null)}>
          <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.2)]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#6366f1] font-semibold">Detailed Comparison</p>
                <h2 className="text-xl font-semibold text-[#0f172a] mt-2">{selectedStartup.name} vs {userStartup.name}</h2>
              </div>
              <button className="text-sm font-semibold text-[#0f172a]" onClick={() => setSelectedStartup(null)}>Close</button>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="rounded-2xl border border-[#eef0f5] p-4">
                <p className="text-xs text-[#64748b]">Why competitor is better</p>
                <ul className="mt-2 space-y-1 text-sm text-[#0f172a] list-disc pl-5">
                  <li>Higher retention and stronger activation loop.</li>
                  <li>More focused ICP leading to better conversion.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-[#eef0f5] p-4">
                <p className="text-xs text-[#64748b]">What you should improve</p>
                <ul className="mt-2 space-y-1 text-sm text-[#0f172a] list-disc pl-5">
                  <li>Increase retention by 4-6% through onboarding fixes.</li>
                  <li>Sharpen messaging for top 2 segments.</li>
                </ul>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              {[
                { label: 'Growth', you: `${userStartup.growth}%`, them: `${selectedStartup.growth}%` },
                { label: 'Users', you: `${userStartup.users}`, them: `${selectedStartup.views}` },
                { label: 'Retention', you: `${userStartup.retention}%`, them: `${selectedStartup.retention || 38}%` },
                { label: 'Conversion', you: `${userStartup.conversion}%`, them: `${selectedStartup.conversion || 3.1}%` }
              ].map((row) => (
                <div key={row.label} className="rounded-xl border border-[#eef0f5] bg-[#fbfcff] p-3">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#6366f1] font-semibold">{row.label}</p>
                  <p className="text-sm text-[#0f172a] mt-1">You: {row.you}</p>
                  <p className="text-xs text-[#64748b]">Them: {row.them}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExplorePage
