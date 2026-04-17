import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, TrendingUp, Layers3, Target, Zap, BarChart3, ArrowRight, ChevronRight, Sparkles, ShieldCheck, Lightbulb, Users } from 'lucide-react'
import Navbar from '../../components/Layout/Navbar'
import Footer from '../../components/Layout/Footer'
import { computeFounderIntelligence } from '../../lib/founderIntelligenceEngine'
import startupData from '../../startups/foundrhub_startups_seed.json'

/* ═══════════════════════════════════════════════════════════════════════════════
   FOUNDER INTELLIGENCE PAGE — Redesigned to match FoundrHUB homepage language
   ═══════════════════════════════════════════════════════════════════════════════ */

/* ── Reveal Observer (same as homepage) ── */
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

/* ── Fade variants (same as homepage) ── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }),
}

/* ── Mini horizontal bar chart ── */
const MiniBar = ({ value, max, color = '#5B65DC', label, count, pct }) => {
  const pctWidth = max > 0 ? (value / max) * 100 : 0
  return (
    <div className="group flex items-center gap-3 py-2 hover:bg-[#FAFAFD] rounded-xl px-2 -mx-2 transition-colors duration-300">
      <span className="text-[12px] font-semibold text-[#122056]/60 w-[110px] truncate group-hover:text-[#122056] transition-colors">{label}</span>
      <div className="flex-1 h-[7px] rounded-full bg-[#EEF0FD] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pctWidth}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
      <span className="text-[11px] font-bold text-[#122056]/70 w-10 text-right">{count}</span>
      <span className="text-[10px] text-[#5B65DC]/60 w-10 text-right font-medium">{pct}%</span>
    </div>
  )
}

/* ── Donut Ring Chart (pure SVG, homepage aesthetic) ── */
const DonutChart = ({ data, size = 190 }) => {
  const total = data.reduce((s, d) => s + d.value, 0)
  const cx = size / 2, cy = size / 2, r = size / 2 - 18
  const circumference = 2 * Math.PI * r
  let offset = 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="drop-shadow-sm">
      {/* Background ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#EEF0FD" strokeWidth="16" />
      {data.map((d, i) => {
        const pct = d.value / total
        const dash = pct * circumference
        const currentOffset = offset
        offset += dash
        return (
          <motion.circle
            key={d.label}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={d.color}
            strokeWidth="16"
            strokeDasharray={`${dash} ${circumference - dash}`}
            strokeDashoffset={-currentOffset}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
            style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          />
        )
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" className="fill-[#122056] text-[28px] font-bold">{total}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" className="fill-[#122056]/30 text-[9px] font-bold tracking-[0.2em]">STARTUPS</text>
    </svg>
  )
}

/* ── Priority badge ── */
const PriorityBadge = ({ priority }) => {
  const map = {
    Critical: 'bg-rose-50 text-rose-600 border-rose-200/60',
    High: 'bg-amber-50 text-amber-700 border-amber-200/60',
    Medium: 'bg-[#EEF0FD] text-[#5B65DC] border-[#5B65DC]/15',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] rounded-full border ${map[priority] || map.Medium}`}>
      {priority}
    </span>
  )
}

/* ── Cluster Bubble Visualization ── */
const ClusterBubbles = ({ clusters }) => {
  const top = clusters.slice(0, 8)
  const maxCount = Math.max(...top.map(c => c.count), 1)
  const colors = ['#5B65DC', '#7C6EE6', '#9B8BFA', '#B4A5FF', '#6366f1', '#4f46e5', '#818cf8', '#a78bfa']

  return (
    <div className="flex flex-wrap gap-4 items-center justify-center py-6">
      {top.map((cluster, i) => {
        const sz = 56 + (cluster.count / maxCount) * 80
        return (
          <motion.div
            key={`${cluster.city}-${cluster.incubator}`}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.08, y: -4 }}
            className="relative flex items-center justify-center rounded-full cursor-default transition-shadow duration-500 hover:shadow-[0_12px_40px_rgba(91,101,220,0.15)]"
            style={{
              width: sz, height: sz,
              background: `radial-gradient(circle at 35% 35%, ${colors[i % colors.length]}18, ${colors[i % colors.length]}06)`,
              border: `1.5px solid ${colors[i % colors.length]}25`,
            }}
          >
            <div className="text-center">
              <p className="text-[15px] font-bold text-[#122056]">{cluster.count}</p>
              <p className="text-[8px] text-[#122056]/35 font-semibold leading-tight max-w-[65px] truncate">{cluster.city}</p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */

const FounderIntelligencePage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  useReveal()

  const intel = useMemo(() => computeFounderIntelligence(startupData), [])

  const sectorColors = ['#5B65DC', '#7C6EE6', '#34d399', '#f472b6', '#fbbf24', '#38bdf8', '#f87171', '#fb923c', '#4ade80', '#e879f9', '#818cf8']

  const donutData = intel.sectorDistribution.slice(0, 7).map((s, i) => ({
    label: s.sector,
    value: s.count,
    color: sectorColors[i % sectorColors.length],
  }))

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'sectors', label: 'Sectors', icon: Layers3 },
    { id: 'connect', label: 'Connect', icon: Users },
    { id: 'weekly', label: 'AI Weekly', icon: Sparkles },
  ]

  /* ── KPI data for the strategic cards ── */
  const kpiCards = [
    {
      label: 'Top Sector',
      value: intel.kpis.topSector,
      sub: `${intel.kpis.topSectorCount} startups · ${intel.kpis.topSectorPct}%`,
      icon: TrendingUp,
      color: '#5B65DC',
    },
    {
      label: 'Sector Diversity',
      value: intel.kpis.sectorDiversity,
      sub: `${intel.kpis.uniqueSectors} active verticals`,
      icon: Layers3,
      color: '#7C6EE6',
    },
    {
      label: 'Whitespace Sectors',
      value: intel.kpis.whitespaceCount,
      sub: 'Zero-competition opportunities',
      icon: Target,
      color: '#34d399',
    },
    {
      label: 'Strongest Cluster',
      value: intel.kpis.strongestClusterCity,
      sub: `${intel.kpis.strongestClusterCount} startups concentrated`,
      icon: MapPin,
      color: '#f472b6',
    },
    {
      label: 'Expansion Signal',
      value: intel.kpis.expansionSignal,
      sub: 'Lowest saturation city',
      icon: Zap,
      color: '#fbbf24',
    },
    {
      label: 'Incubator Concentration',
      value: intel.kpis.incConcentration,
      sub: intel.kpis.topIncubatorShort || '—',
      icon: ShieldCheck,
      color: '#38bdf8',
    },
  ]

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-32 pb-0 bg-[radial-gradient(circle_at_8%_8%,rgba(91,101,220,0.10),transparent_35%),radial-gradient(circle_at_88%_20%,rgba(18,32,86,0.06),transparent_40%),#FAFAFD] relative overflow-hidden">

        {/* ── Subtle Grid (same as homepage) ── */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 [background:linear-gradient(rgba(18,32,86,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(18,32,86,0.03)_1px,transparent_1px)] [background-size:60px_60px]" />
        </div>

        {/* ── Background Glows ── */}
        <div className="absolute top-40 right-0 w-[600px] h-[600px] bg-[#5B65DC]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[60%] left-0 w-[500px] h-[500px] bg-emerald-400/3 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">

          {/* ═══ HERO ═══ */}
          <motion.section
            initial="hidden" animate="visible"
            className="mb-16"
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#EEF0FD] bg-white text-[11px] font-bold uppercase tracking-[0.2em] text-[#5B65DC] mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Founder Intelligence Engine
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="font-bold text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.08] tracking-tight text-[#122056] mb-5 max-w-3xl">
              Your Startup Ecosystem,{' '}
              <span className="text-[#5B65DC] italic">Decoded by AI</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-[17px] text-neutral-500 max-w-2xl leading-relaxed mb-2">
              Real-time analytics across {intel.kpis.totalStartups} startups, {intel.kpis.totalCities} cities, and {intel.kpis.totalIncubators} incubator{intel.kpis.totalIncubators > 1 ? 's' : ''}.
              Every insight leads to an action you can take today.
            </motion.p>
          </motion.section>

          {/* ═══ STRATEGIC KPI CARDS ═══ */}
          <section className="reveal grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
            {kpiCards.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group glass-card glass-card-hover p-5 relative overflow-hidden"
              >
                {/* Glow accent on hover */}
                <div
                  className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none"
                  style={{ background: kpi.color }}
                />
                <div className="relative z-10">
                  <div className="w-8 h-8 rounded-xl border border-[#EEF0FD] bg-[#FAFAFD] flex items-center justify-center mb-3 group-hover:border-[#5B65DC]/20 transition-colors">
                    <kpi.icon size={15} style={{ color: kpi.color }} strokeWidth={2} />
                  </div>
                  <p className="text-[20px] font-bold text-[#122056] leading-tight mb-0.5 tracking-tight">{kpi.value}</p>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.12em] mb-1">{kpi.label}</p>
                  <p className="text-[10px] text-neutral-400/70 leading-snug font-medium">{kpi.sub}</p>
                </div>
              </motion.div>
            ))}
          </section>

          {/* ═══ TAB NAVIGATION ═══ */}
          <div className="reveal flex items-center gap-1 mb-10 p-1.5 rounded-full bg-white/70 backdrop-blur-xl border border-[#EEF0FD] w-fit shadow-[0_10px_30px_rgba(18,32,86,0.04)]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold tracking-wide transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#122056] text-white shadow-lg shadow-[#122056]/10'
                    : 'text-neutral-400 hover:text-[#122056]'
                }`}
              >
                <tab.icon size={13} strokeWidth={2.2} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* ═══ TAB CONTENT ═══ */}
          <AnimatePresence mode="wait">

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 mb-20"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* City Distribution */}
                  <div className="lg:col-span-5 glass-card p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-xl border border-[#EEF0FD] bg-[#FAFAFD] flex items-center justify-center text-[#5B65DC]">
                        <MapPin size={16} strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-bold text-[#122056]">City Distribution</h3>
                        <p className="text-[10px] text-neutral-400 font-medium">Startup density by city</p>
                      </div>
                    </div>
                    <div className="space-y-0.5">
                      {intel.cityDistribution.slice(0, 8).map((c, i) => (
                        <MiniBar
                          key={c.city}
                          label={c.city}
                          value={c.count}
                          max={intel.cityDistribution[0]?.count || 1}
                          count={c.count}
                          pct={c.pct}
                          color={sectorColors[i % sectorColors.length]}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Sector Donut */}
                  <div className="lg:col-span-4 glass-card p-6 flex flex-col items-center">
                    <div className="flex items-center gap-3 mb-5 self-start">
                      <div className="w-9 h-9 rounded-xl border border-[#EEF0FD] bg-[#FAFAFD] flex items-center justify-center text-[#5B65DC]">
                        <BarChart3 size={16} strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-bold text-[#122056]">Sector Breakdown</h3>
                        <p className="text-[10px] text-neutral-400 font-medium">Distribution across verticals</p>
                      </div>
                    </div>
                    <DonutChart data={donutData} />
                    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 justify-center">
                      {donutData.map((d) => (
                        <span key={d.label} className="inline-flex items-center gap-1.5 text-[10px] text-neutral-500 font-medium">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                          {d.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Top Incubators */}
                  <div className="lg:col-span-3 glass-card p-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-xl border border-[#EEF0FD] bg-[#FAFAFD] flex items-center justify-center text-[#5B65DC]">
                        <ShieldCheck size={16} strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-bold text-[#122056]">Top Incubators</h3>
                        <p className="text-[10px] text-neutral-400 font-medium">Ranked by startup density</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {intel.incubatorRanking.slice(0, 5).map((inc, i) => (
                        <div key={inc.name} className="group flex items-start gap-3">
                          <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-[#5B65DC]/10 to-[#5B65DC]/5 border border-[#5B65DC]/15 flex items-center justify-center text-[10px] font-bold text-[#5B65DC]">
                            {i + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-semibold text-[#122056]/70 truncate group-hover:text-[#122056] transition-colors">
                              {inc.shortName || inc.name}
                            </p>
                            <p className="text-[9px] text-neutral-400 mt-0.5 font-medium">
                              {inc.startups} startups · {inc.cities.length} {inc.cities.length > 1 ? 'cities' : 'city'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 2: Clusters + Whitespace */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Ecosystem Clusters */}
                  <div className="lg:col-span-7 glass-card p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl border border-[#EEF0FD] bg-[#FAFAFD] flex items-center justify-center text-[#5B65DC]">
                          <Layers3 size={16} strokeWidth={2} />
                        </div>
                        <div>
                          <h3 className="text-[14px] font-bold text-[#122056]">Ecosystem Clusters</h3>
                          <p className="text-[10px] text-neutral-400 font-medium">Geography × Incubator mapping</p>
                        </div>
                      </div>
                    </div>
                    <ClusterBubbles clusters={intel.ecosystemClusters} />
                    <p className="text-center text-[10px] text-neutral-400/60 mt-2 font-medium">Bubble size represents startup density in cluster</p>
                  </div>

                  {/* Whitespace Opportunities */}
                  <div className="lg:col-span-5 glass-card p-6 bg-gradient-to-br from-white/70 via-white/70 to-[#5B65DC]/[0.03]">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-xl border border-[#EEF0FD] bg-[#FAFAFD] flex items-center justify-center text-[#5B65DC]">
                        <Target size={16} strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="text-[14px] font-bold text-[#122056]">Whitespace Opportunities</h3>
                        <p className="text-[10px] text-neutral-400 font-medium">Zero-competition sectors</p>
                      </div>
                    </div>
                    <div className="space-y-2.5 max-h-[320px] overflow-y-auto scrollbar-hide">
                      {intel.whitespaceOpportunities.slice(0, 6).map((w) => (
                        <motion.div
                          key={w.sector}
                          whileHover={{ x: 3 }}
                          className="group rounded-2xl border border-[#EEF0FD] bg-white/80 p-4 hover:shadow-[0_8px_24px_rgba(18,32,86,0.06)] cursor-default transition-all duration-300"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <p className="text-[12px] font-bold text-[#122056]">{w.sector}</p>
                            <PriorityBadge priority="High" />
                          </div>
                          <p className="text-[10px] text-neutral-400 leading-relaxed">{w.reason}</p>
                          <p className="text-[10px] text-[#5B65DC] mt-1.5 font-semibold flex items-center gap-1">
                            <ArrowRight size={10} /> {w.action}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── SECTORS TAB ── */}
            {activeTab === 'sectors' && (
              <motion.div
                key="sectors"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 mb-20"
              >
                {/* Full Sector Breakdown */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-xl border border-[#EEF0FD] bg-[#FAFAFD] flex items-center justify-center text-[#5B65DC]">
                      <BarChart3 size={16} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-[14px] font-bold text-[#122056]">Sector Distribution — Full Breakdown</h3>
                      <p className="text-[10px] text-neutral-400 font-medium">All sectors ranked by startup count</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {intel.sectorDistribution.map((s, i) => (
                      <div key={s.sector} className="group">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[13px] font-semibold text-[#122056]/70 group-hover:text-[#122056] transition-colors">{s.sector}</span>
                          <span className="text-[12px] text-neutral-400 font-medium">{s.count} <span className="text-neutral-300">({s.pct}%)</span></span>
                        </div>
                        <div className="h-[8px] rounded-full bg-[#EEF0FD] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: `linear-gradient(90deg, ${sectorColors[i % sectorColors.length]}, ${sectorColors[i % sectorColors.length]}77)` }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${s.pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: i * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Underserved + Whitespace */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="glass-card p-6 border-l-4 border-l-amber-400/40">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-xl border border-amber-200/60 bg-amber-50 flex items-center justify-center">
                        <Zap size={16} className="text-amber-600" strokeWidth={2} />
                      </div>
                      <h3 className="text-[14px] font-bold text-[#122056]">Underserved Sectors</h3>
                    </div>
                    {intel.underservedSectors.length === 0 ? (
                      <p className="text-[12px] text-neutral-400">No underserved sectors detected in the current dataset.</p>
                    ) : (
                      <div className="space-y-3">
                        {intel.underservedSectors.map((u) => (
                          <div key={u.sector} className="rounded-2xl bg-[#FAFAFD] border border-[#EEF0FD] p-4">
                            <div className="flex items-center justify-between mb-1.5">
                              <p className="text-[12px] font-bold text-[#122056]">{u.sector}</p>
                              <PriorityBadge priority={u.opportunity === 'Very High' ? 'Critical' : 'High'} />
                            </div>
                            <p className="text-[10px] text-neutral-400">{u.reason}</p>
                            <p className="text-[10px] text-amber-600 mt-1.5 font-semibold flex items-center gap-1">
                              <ArrowRight size={10} /> {u.action}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="glass-card p-6 border-l-4 border-l-[#5B65DC]/30">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-9 h-9 rounded-xl border border-[#5B65DC]/15 bg-[#EEF0FD] flex items-center justify-center">
                        <Target size={16} className="text-[#5B65DC]" strokeWidth={2} />
                      </div>
                      <h3 className="text-[14px] font-bold text-[#122056]">Zero-Competition Sectors</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {intel.whitespaceOpportunities.map((w) => (
                        <motion.div
                          key={w.sector}
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="rounded-2xl bg-[#FAFAFD] border border-[#EEF0FD] p-3.5 text-center hover:border-[#5B65DC]/20 hover:shadow-[0_8px_24px_rgba(91,101,220,0.08)] transition-all cursor-default"
                        >
                          <p className="text-[12px] font-bold text-[#122056]">{w.sector}</p>
                          <p className="text-[8px] text-emerald-500 mt-1 font-bold uppercase tracking-[0.18em]">First Mover</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── CONNECT TAB ── */}
            {activeTab === 'connect' && (
              <motion.div
                key="connect"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-10 mb-20"
              >
                {/* Suggested Startups to Connect With */}
                <div>
                  <div className="reveal mb-6">
                    <span className="section-label">Network</span>
                    <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-[#122056] tracking-tight">Suggested Startups to Connect With</h2>
                    <p className="text-[14px] text-neutral-500 mt-2">Verified founders across Punjab's incubator ecosystem — diverse cities, strong collaboration potential.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {intel.suggestedConnections.map((s, i) => (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="group glass-card glass-card-hover p-5 relative overflow-hidden"
                      >
                        {/* Accent line */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#5B65DC] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5B65DC]/10 to-[#5B65DC]/5 border border-[#5B65DC]/15 flex items-center justify-center text-[13px] font-bold text-[#5B65DC]">
                              {s.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="text-[14px] font-bold text-[#122056]">{s.name}</h4>
                              <p className="text-[10px] text-neutral-400 font-medium mt-0.5">{s.city} · {s.shortIncubator || s.sector}</p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[8px] font-bold text-emerald-600 uppercase tracking-wider">
                            <span className="w-1 h-1 rounded-full bg-emerald-500" />
                            Verified
                          </span>
                        </div>

                        {/* Incubator + City tags */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          <span className="px-2 py-0.5 rounded-md bg-[#FAFAFD] border border-[#EEF0FD] text-[9px] font-medium text-neutral-400">
                            📍 {s.city}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-[#FAFAFD] border border-[#EEF0FD] text-[9px] font-medium text-neutral-400">
                            🏛️ {s.shortIncubator || 'Incubated'}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-[#FAFAFD] border border-[#EEF0FD] text-[9px] font-medium text-neutral-400">
                            Punjab
                          </span>
                        </div>

                        {/* Reason + Action */}
                        <p className="text-[11px] text-neutral-500 leading-relaxed mb-3">{s.reason}</p>
                        <p className="text-[11px] text-[#5B65DC] font-semibold flex items-center gap-1.5">
                          <ArrowRight size={11} strokeWidth={2.5} />
                          {s.action}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Strategic Collaboration Pairs */}
                <div>
                  <div className="reveal mb-6">
                    <span className="section-label">Intelligence</span>
                    <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-[#122056] tracking-tight">Strategic Collaboration Pairs</h2>
                    <p className="text-[14px] text-neutral-500 mt-2">AI-matched cross-city startup pairs — geographic reach × incubator network expansion.</p>
                  </div>
                  <div className="space-y-4">
                    {intel.collabRecommendations.map((rec, i) => (
                      <motion.div
                        key={`${rec.startupA.id}-${rec.startupB.id}`}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="glass-card glass-card-hover p-5"
                      >
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          {/* Startup A */}
                          <div className="flex-1 flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#5B65DC]/10 to-[#EEF0FD] border border-[#EEF0FD] flex items-center justify-center text-[13px] font-bold text-[#5B65DC]">
                              {rec.startupA.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-[13px] font-bold text-[#122056]">{rec.startupA.name}</p>
                              <p className="text-[10px] text-neutral-400 font-medium">{rec.startupA.sector} · {rec.startupA.city}</p>
                            </div>
                          </div>

                          {/* Connector */}
                          <div className="hidden md:flex items-center gap-2 px-4">
                            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#5B65DC]/30" />
                            <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                              rec.strength === 'Strong'
                                ? 'bg-emerald-50 border-emerald-200/60 text-emerald-600'
                                : 'bg-amber-50 border-amber-200/60 text-amber-600'
                            }`}>
                              {rec.strength}
                            </span>
                            <div className="h-px w-8 bg-gradient-to-r from-[#5B65DC]/30 to-transparent" />
                          </div>

                          {/* Startup B */}
                          <div className="flex-1 flex items-center gap-3">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#7C6EE6]/10 to-[#EEF0FD] border border-[#EEF0FD] flex items-center justify-center text-[13px] font-bold text-[#7C6EE6]">
                              {rec.startupB.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-[13px] font-bold text-[#122056]">{rec.startupB.name}</p>
                              <p className="text-[10px] text-neutral-400 font-medium">{rec.startupB.sector} · {rec.startupB.city}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#EEF0FD]">
                          <p className="text-[11px] text-neutral-500 leading-relaxed">{rec.reason}</p>
                          <p className="text-[11px] text-[#5B65DC] mt-1.5 font-semibold flex items-center gap-1">
                            <ArrowRight size={11} strokeWidth={2.5} /> {rec.action}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── AI WEEKLY TAB ── */}
            {activeTab === 'weekly' && (
              <motion.div
                key="weekly"
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 mb-20"
              >
                <div className="reveal mb-6">
                  <span className="section-label">AI Intelligence</span>
                  <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-[#122056] tracking-tight">AI Recommendations This Week</h2>
                  <p className="text-[14px] text-neutral-500 mt-2 max-w-lg">
                    Curated intelligence signals from your ecosystem data. Each recommendation includes a concrete action.
                  </p>
                </div>

                <div className="space-y-4">
                  {intel.weeklyRecommendations.map((rec, i) => (
                    <motion.div
                      key={`${rec.type}-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="group glass-card glass-card-hover p-6 relative overflow-hidden"
                    >
                      {/* Accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5B65DC]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl border border-[#EEF0FD] bg-[#FAFAFD] flex items-center justify-center text-xl group-hover:border-[#5B65DC]/20 transition-colors">
                          {rec.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h4 className="text-[14px] font-bold text-[#122056] leading-snug">
                              {rec.title}
                            </h4>
                            <PriorityBadge priority={rec.priority} />
                          </div>

                          <p className="text-[12px] text-neutral-500 leading-relaxed mb-3 max-w-2xl">
                            {rec.description}
                          </p>

                          {/* Action */}
                          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAFAFD] border border-[#EEF0FD] group-hover:border-[#5B65DC]/20 transition-colors">
                            <ArrowRight size={12} className="text-[#5B65DC]" strokeWidth={2.5} />
                            <span className="text-[11px] font-semibold text-[#122056]">{rec.action}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Confidence note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="glass-card p-5 flex items-start gap-3 border-l-4 border-l-[#5B65DC]/20"
                >
                  <div className="w-9 h-9 rounded-xl border border-[#EEF0FD] bg-[#FAFAFD] flex items-center justify-center text-[#5B65DC] flex-shrink-0">
                    <ShieldCheck size={15} strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#122056] mb-1">Intelligence Confidence</p>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      These recommendations are generated from {intel.kpis.totalStartups} verified data points across {intel.kpis.totalCities} cities.
                      Signals refresh as new startups join the ecosystem. All insights are directional — validate with primary research before executing.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </>
  )
}

export default FounderIntelligencePage
