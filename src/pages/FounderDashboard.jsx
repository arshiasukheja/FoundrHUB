import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import SidebarMenu from '../components/SidebarMenu'
import DashboardHeader from '../components/DashboardHeader'
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useRealtimeValue } from '../lib/realtime'
import { buildDefaultUserData } from '../lib/seedData'

/* ── helper: generate calendar days ── */
const generateCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let d = 1; d <= daysInMonth; d++) days.push(d)
  return days
}

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

/* ── animation presets ── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
}
const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

/* ─────────────────────────────────────────────
   CARD WRAPPER — shared rounded white card
   ───────────────────────────────────────────── */
const Card = ({ children, className = '' }) => (
  <motion.div
    variants={itemVariants}
    className={`rounded-2xl bg-white border border-[#eef0f5] shadow-[0_4px_24px_rgba(0,0,0,0.04)] p-5 ${className}`}
  >
    {children}
  </motion.div>
)

/* ══════════════════════════════════════════════
   1. CALENDAR WIDGET
   ══════════════════════════════════════════════ */
const CalendarWidget = ({ timeline }) => {
  const fallbackTimeline = {
    year: 2025,
    month: 6,
    today: 12,
    days: {
      4: { visits: 12, ai: 3, investor: 5, spike: false },
      7: { visits: 18, ai: 5, investor: 2, spike: true },
      12: { visits: 22, ai: 7, investor: 6, spike: true },
      18: { visits: 9, ai: 2, investor: 3, spike: false },
      23: { visits: 16, ai: 4, investor: 1, spike: false },
      28: { visits: 26, ai: 8, investor: 9, spike: true },
    }
  }
  const data = timeline || fallbackTimeline
  const [date, setDate] = useState(new Date(data.year, data.month))
  const year = date.getFullYear()
  const month = date.getMonth()
  const days = generateCalendarDays(year, month)
  const today = data.today
  const activityDays = data.days || {}

  useEffect(() => {
    if (!timeline) return
    setDate(new Date(data.year, data.month))
  }, [timeline, data.year, data.month])

  const prev = () => setDate(new Date(year, month - 1))
  const next = () => setDate(new Date(year, month + 1))

  return (
    <Card className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] font-semibold text-[#6366f1] tracking-wide">Activity Timeline</p>
          <h3 className="text-[14px] font-semibold text-[#1f2937]">
            {MONTHS[month]} {year}
          </h3>
        </div>
        <div className="flex gap-1">
          <button onClick={prev} className="h-7 w-7 rounded-lg flex items-center justify-center text-[#6b7280] hover:bg-[#f0f2f7] transition">
            <ChevronLeft size={16} />
          </button>
          <button onClick={next} className="h-7 w-7 rounded-lg flex items-center justify-center text-[#6366f1] hover:bg-[#eef0fd] transition">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d) => (
          <span key={d} className="text-[10px] font-semibold text-[#9ca3af] text-center py-1">{d}</span>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {days.map((d, i) => {
          const activity = d ? activityDays[d] : null
          const tooltip = activity
            ? `${activity.visits} visits, ${activity.ai} AI actions, ${activity.investor} investor views`
            : ''

          return (
            <span
              key={i}
              title={tooltip}
              className={`text-[12px] h-9 flex flex-col items-center justify-center rounded-full transition cursor-default select-none
                ${d === null ? '' : ''}
                ${d === today
                  ? 'bg-[#6366f1] text-white font-bold shadow-lg shadow-[#6366f1]/30'
                  : d !== null
                    ? 'text-[#374151] hover:bg-[#f0f2f7]'
                    : ''
                }`}
            >
              <span className="leading-none">{d}</span>
              {activity && (
                <span className="flex items-center gap-1 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]" />
                  {activity.spike && <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />}
                </span>
              )}
            </span>
          )
        })}
      </div>
    </Card>
  )
}

/* ══════════════════════════════════════════════
   2. SMALL STAT CARD (Patient / Report / etc.)
   ══════════════════════════════════════════════ */
const SmallStatCard = ({ icon, iconBg, label, value, period, delta, deltaUp }) => (
  <Card className="flex flex-col gap-3 relative overflow-hidden">
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg}`}>
      {icon}
    </div>
    <div>
      <p className="text-[11px] font-semibold text-[#6b7280] tracking-wide">{label}</p>
      <p className="text-[26px] font-bold text-[#1f2937] leading-tight mt-0.5">{value}</p>
    </div>
    <div className="flex items-center gap-2 text-[10px] text-[#9ca3af]">
      <span>{period}</span>
      <span className={`flex items-center gap-0.5 font-semibold ${deltaUp ? 'text-emerald-500' : 'text-rose-400'}`}>
        {deltaUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
        {delta}
      </span>
    </div>
  </Card>
)

/* ══════════════════════════════════════════════
   3. LIVE STARTUP ACTIVITY
   ══════════════════════════════════════════════ */
const LiveActivityCard = ({ items }) => {
  const activity = items || [
    '12 people viewed your startup',
    'Idea generated in AI layer',
    '3 new messages from investors',
    '1 collaboration request',
    'High traffic from Bangalore'
  ]

  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[15px] font-semibold text-[#1f2937]">Live Startup Activity</h3>
        <span className="text-[11px] font-semibold text-[#ef4444] bg-[#fee2e2] px-3 py-1 rounded-full">Live</span>
      </div>
      <div className="space-y-3">
        {activity.map((item) => (
          <div key={item} className="flex items-start gap-3">
            <span className="mt-1.5 w-2 h-2 rounded-full bg-[#ef4444]" />
            <p className="text-[13px] font-semibold text-[#1f2937]">{item}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ══════════════════════════════════════════════
   4. LINE CHART — Average Patient Visit
   ══════════════════════════════════════════════ */
const LineChartCard = ({ trend }) => {
  const fallbackTrend = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10'],
    points: [120, 114, 108, 100, 92, 84, 76, 68, 60, 52],
    highlightValue: 1420,
    quickStats: {
      month: { label: 'This Month', value: 120, delta: 3.1, up: true, icon: '✨' },
      week: { label: 'This Week', value: 420, delta: 2.4, up: true, icon: '🤖' }
    }
  }
  const data = trend || fallbackTrend
  const months = data.labels
  const points = data.points
  const w = 360, h = 140, px = w / (points.length - 1)
  const pathD = points.map((y, i) => `${i === 0 ? 'M' : 'L'}${i * px},${y}`).join(' ')
  const areaD = pathD + ` L${(points.length - 1) * px},${h} L0,${h} Z`

  return (
    <Card>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[15px] font-semibold text-[#1f2937]">Startup Growth Trend</h3>
        <span className="text-[11px] font-semibold text-[#6366f1] bg-[#eef0fd] px-3 py-1 rounded-full">Daily Active Users</span>
      </div>
      <div className="flex gap-6 mt-4">
        {/* Chart */}
        <div className="flex-1 relative">
          <svg viewBox={`0 0 ${w} ${h + 10}`} className="w-full h-[170px]" preserveAspectRatio="none">
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={areaD} fill="url(#areaFill)" />
            <path d={pathD} fill="none" stroke="#818cf8" strokeWidth="3" strokeLinecap="round" />
            {/* Highlighted dot */}
            <circle cx={5 * px} cy={30} r="6" fill="#818cf8" stroke="white" strokeWidth="3" />
          </svg>
          {/* X‑axis labels */}
          <div className="flex justify-between px-1 mt-1">
            {months.map((m) => (
              <span key={m} className="text-[10px] text-[#9ca3af]">{m}</span>
            ))}
          </div>
          {/* Tooltip bubble */}
          <div className="absolute top-[12px] left-[53%] -translate-x-1/2 bg-[#6366f1] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-[#6366f1]/30">
            {data.highlightValue.toLocaleString()}
          </div>
        </div>

        {/* Stat pills */}
        <div className="flex flex-col gap-3 min-w-[130px]">
          {['month', 'week'].map((key) => {
            const stat = data.quickStats[key]
            return (
              <div key={key} className="rounded-2xl bg-[#f5f7fb] border border-[#eef0f5] p-4 text-center">
                <div className="w-10 h-10 mx-auto mb-2 rounded-xl bg-[#eef0fd] flex items-center justify-center">
                  <span className="text-[#6366f1] text-lg">{stat.icon}</span>
                </div>
                <p className="text-[10px] text-[#9ca3af]">{stat.label}</p>
                <p className="text-[20px] font-bold text-[#1f2937]">{stat.value}</p>
                <span className={`text-[10px] font-semibold flex items-center justify-center gap-0.5 mt-0.5 ${stat.up ? 'text-emerald-500' : 'text-rose-400'}`}>
                  {stat.up ? <TrendingUp size={10} /> : <TrendingDown size={10} />} {stat.delta}%
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

/* ══════════════════════════════════════════════
   5. REPORTED CASES — line chart
   ══════════════════════════════════════════════ */
const ReportedCasesCard = ({ split }) => {
  const fallbackSplit = {
    highValue: 54500,
    lowValue: 25500,
    seriesHigh: [100, 90, 85, 80, 60, 55, 50, 35, 25, 20],
    seriesLow: [110, 100, 95, 90, 85, 80, 72, 68, 60, 55]
  }
  const data = split || fallbackSplit
  const w = 280, h = 120
  const line1 = data.seriesHigh
  const line2 = data.seriesLow
  const px = w / (line1.length - 1)
  const toPath = (pts) => pts.map((y, i) => `${i === 0 ? 'M' : 'L'}${i * px},${y}`).join(' ')

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-semibold text-[#1f2937]">Startup Performance Split</h3>
        <span className="text-[11px] font-semibold text-[#6366f1] bg-[#eef0fd] px-3 py-1 rounded-full">High vs Low Growth</span>
      </div>
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#818cf8]" />
          <span className="text-[12px] text-[#6b7280]">{(data.highValue / 1000).toFixed(1)}k</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#c4b5fd]" />
          <span className="text-[12px] text-[#6b7280]">{(data.lowValue / 1000).toFixed(1)}k</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[130px]" preserveAspectRatio="none">
        <path d={toPath(line2)} fill="none" stroke="#c4b5fd" strokeWidth="2.5" strokeLinecap="round" />
        <path d={toPath(line1)} fill="none" stroke="#818cf8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={(line1.length - 1) * px} cy={20} r="5" fill="#818cf8" stroke="white" strokeWidth="2.5" />
      </svg>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#818cf8]" /><span className="text-[10px] text-[#6b7280]">High Growth</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#c4b5fd]" /><span className="text-[10px] text-[#6b7280]">Low Growth</span></div>
        </div>
        <span className="text-[10px] text-[#9ca3af]">Updated Last Week</span>
      </div>
    </Card>
  )
}

/* ══════════════════════════════════════════════
   6. BAR CHART — Patient Visit By Gender
   ══════════════════════════════════════════════ */
const BarChartCard = ({ distribution }) => {
  const fallback = {
    labels: ['Founders', 'Investors'],
    values: [60, 40]
  }
  const data = distribution || fallback
  const labels = data.labels
  const values = data.values
  const max = 100

  return (
    <Card className="col-span-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[15px] font-semibold text-[#1f2937]">User Type Distribution</h3>
        <span className="text-[11px] font-semibold text-[#6366f1] bg-[#eef0fd] px-3 py-1 rounded-full">Current Mix</span>
      </div>
      <div className="flex items-end gap-3 h-[140px] mt-2">
        {values.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            {/* Value label on tallest bar */}
            {v === Math.max(...values) && (
              <span className="text-[10px] font-bold text-[#6366f1]">{v}%</span>
            )}
            <div
              className="w-full rounded-t-lg transition-all duration-500"
              style={{
                height: `${(v / max) * 120}px`,
                background: v === Math.max(...values)
                  ? 'linear-gradient(180deg, #818cf8, #6366f1)'
                  : 'linear-gradient(180deg, #e0e7ff, #c7d2fe)',
              }}
            />
            <span className="text-[10px] text-[#9ca3af]">{labels[i]}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

/* ══════════════════════════════════════════════
   7. PERCENTAGE STAT CARDS — Total Male / Female
   ══════════════════════════════════════════════ */
const PercentStatCard = ({ label, pct, delta, deltaUp }) => (
  <Card>
    <div className="flex items-center justify-between mb-2">
      <span className={`text-[10px] font-semibold flex items-center gap-1 ${deltaUp ? 'text-emerald-500' : 'text-rose-400'}`}>
        {deltaUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
        {delta}
      </span>
    </div>
    <p className="text-[13px] font-semibold text-[#6b7280]">{label}</p>
    <p className="text-[28px] font-bold text-[#1f2937] leading-tight">{pct}</p>
  </Card>
)

/* ══════════════════════════════════════════════
   8. EQUITY + VALUATION SNAPSHOT
   ══════════════════════════════════════════════ */
const EquityValuationCard = ({ snapshot }) => {
  const fallback = {
    valuationCr: 12.5,
    investorEquity: 18.2,
    impliedPrice: 1.25,
    committedCr: 2.1,
    softCircledCr: 0.75,
    runwayMonths: 8.5
  }
  const data = snapshot || fallback

  return (
  <Card>
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-[11px] font-semibold text-[#6366f1] tracking-wide">Equity Snapshot</p>
        <h3 className="text-[15px] font-semibold text-[#1f2937]">Investor Equity & Valuation</h3>
      </div>
      <span className="text-[11px] font-semibold text-[#6366f1] bg-[#eef0fd] px-3 py-1 rounded-full">Current Round</span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="rounded-2xl border border-[#eef0f5] bg-[#f5f7fb] p-4">
        <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#9ca3af]">Post-money valuation</p>
        <p className="text-[22px] font-bold text-[#1f2937] mt-2">Rs{data.valuationCr.toFixed(1)}Cr</p>
        <p className="text-[11px] text-[#9ca3af] mt-1">Current post-money</p>
      </div>
      <div className="rounded-2xl border border-[#eef0f5] bg-[#f5f7fb] p-4">
        <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#9ca3af]">Investor equity</p>
        <p className="text-[22px] font-bold text-[#1f2937] mt-2">{data.investorEquity}%</p>
        <p className="text-[11px] text-[#9ca3af] mt-1">Across 5 active investors</p>
      </div>
      <div className="rounded-2xl border border-[#eef0f5] bg-[#f5f7fb] p-4">
        <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#9ca3af]">Implied price</p>
        <p className="text-[22px] font-bold text-[#1f2937] mt-2">Rs{data.impliedPrice.toFixed(2)} / share</p>
        <p className="text-[11px] text-[#9ca3af] mt-1">Implied pricing today</p>
      </div>
    </div>
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="rounded-2xl border border-[#eef0f5] bg-white p-4">
        <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#9ca3af]">Committed</p>
        <p className="text-[20px] font-bold text-[#1f2937] mt-1">Rs{data.committedCr.toFixed(2)}Cr</p>
      </div>
      <div className="rounded-2xl border border-[#eef0f5] bg-white p-4">
        <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#9ca3af]">Soft-circled</p>
        <p className="text-[20px] font-bold text-[#1f2937] mt-1">Rs{data.softCircledCr.toFixed(2)}Cr</p>
      </div>
      <div className="rounded-2xl border border-[#eef0f5] bg-white p-4">
        <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#9ca3af]">Runway impact</p>
        <p className="text-[20px] font-bold text-[#1f2937] mt-1">+{data.runwayMonths} months</p>
      </div>
    </div>
  </Card>
  )
}


/* ══════════════════════════════════════════════
   MAIN DASHBOARD PAGE
   ══════════════════════════════════════════════ */
const FounderDashboard = () => {
  const { user } = useAuth()
  const fallback = useMemo(() => buildDefaultUserData({}).dashboard, [])
  const { value: dashboardData } = useRealtimeValue(
    user?.uid ? `users/${user.uid}/dashboard` : null,
    fallback
  )
  const stats = dashboardData?.stats || fallback.stats
  const distribution = dashboardData?.userDistribution || fallback.userDistribution
  const equitySnapshot = dashboardData?.equitySnapshot || fallback.equitySnapshot

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#1f2937] relative overflow-hidden">
      {/* Ambient blurs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[420px] bg-[#818cf8]/8 blur-[180px]" />
        <div className="absolute bottom-[-12%] right-[-12%] w-[520px] h-[520px] bg-[#94a3b8]/10 blur-[200px]" />
      </div>

      <SidebarMenu activeItem="dashboard" />

      <div className="ml-0 lg:ml-64 relative z-10">
        {/* Sticky header */}
        <div className="sticky top-0 z-40 bg-[#f5f7fb]/80 backdrop-blur-xl border-b border-[#e5e7eb]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
            <DashboardHeader />
            <div />
          </div>
        </div>

        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[1280px] mx-auto px-6 lg:px-8 py-6"
        >
          {/* ── ROW 1 ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-5 mb-5">
            {/* Calendar */}
            <CalendarWidget timeline={dashboardData?.activityTimeline} />

            {/* 4 stat cards in 2×2 */}
            <div className="grid grid-cols-2 gap-4">
              <SmallStatCard
                icon={<span className="text-base">🟦</span>}
                iconBg="bg-[#dbeafe]"
                label="Active Users"
                value={stats.activeUsers.value.toLocaleString()}
                period="Last 7 days"
                delta={`+${stats.activeUsers.delta}%`}
                deltaUp={stats.activeUsers.delta >= 0}
              />
              <SmallStatCard
                icon={<span className="text-base">🟪</span>}
                iconBg="bg-[#ede9fe]"
                label="Startup Profile Views"
                value={stats.profileViews.value.toLocaleString()}
                period="Last 7 days"
                delta={`+${stats.profileViews.delta}%`}
                deltaUp={stats.profileViews.delta >= 0}
              />
              <SmallStatCard
                icon={<span className="text-base">🟩</span>}
                iconBg="bg-[#dcfce7]"
                label="AI Actions"
                value={stats.aiActions.value.toLocaleString()}
                period="Last 7 days"
                delta={`+${stats.aiActions.delta}%`}
                deltaUp={stats.aiActions.delta >= 0}
              />
              <SmallStatCard
                icon={<span className="text-base">🟨</span>}
                iconBg="bg-[#fef3c7]"
                label="Investor Interactions"
                value={stats.investorInteractions.value.toLocaleString()}
                period="Last 7 days"
                delta={`+${stats.investorInteractions.delta}%`}
                deltaUp={stats.investorInteractions.delta >= 0}
              />
            </div>

            {/* Donut chart */}
            <LiveActivityCard items={dashboardData?.liveActivity} />
          </div>

          {/* ── ROW 2 ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <LineChartCard trend={dashboardData?.growthTrend} />
            <ReportedCasesCard split={dashboardData?.performanceSplit} />
          </div>

          {/* ── ROW 2B ── */}
          <div className="mb-5">
            <EquityValuationCard snapshot={equitySnapshot} />
          </div>

          {/* ── ROW 3 ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px_380px] gap-5">
            <BarChartCard distribution={distribution} />
            <div className="flex flex-col gap-4">
              <PercentStatCard
                label="Founders"
                pct={`${distribution.values[0]}%`}
                delta={`${distribution.deltas?.Founders ?? 0}%`}
                deltaUp={(distribution.deltas?.Founders ?? 0) >= 0}
              />
              <PercentStatCard
                label="Investors"
                pct={`${distribution.values[1]}%`}
                delta={`${distribution.deltas?.Investors ?? 0}%`}
                deltaUp={(distribution.deltas?.Investors ?? 0) >= 0}
              />
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  )
}

export default FounderDashboard
