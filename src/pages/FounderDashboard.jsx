import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import SidebarMenu from '../components/SidebarMenu'
import DashboardHeader from '../components/DashboardHeader'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useAuth } from '../context/AuthContext'
import { useRealtimeValue } from '../lib/realtime'
import { buildDefaultUserData } from '../lib/seedData'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

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
const CalendarWidget = ({ timeline, selectedDate, onSelectDate }) => {
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
  const todayDate = new Date(data.year, data.month, data.today)
  const [value, setValue] = useState(selectedDate || todayDate)

  useEffect(() => {
    if (selectedDate) setValue(selectedDate)
  }, [selectedDate])

  return (
    <Card className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[11px] font-semibold text-[#6366f1] tracking-wide">Activity Timeline</p>
          <h3 className="text-[14px] font-semibold text-[#1f2937]">Select a day</h3>
        </div>
        <span className="text-[11px] font-semibold text-[#6366f1] bg-[#eef0fd] px-3 py-1 rounded-full">Daily</span>
      </div>

      <Calendar
        value={value}
        onChange={(nextValue) => {
          setValue(nextValue)
          onSelectDate?.(nextValue)
        }}
        calendarType="gregory"
        className="border-none w-full text-sm"
        tileClassName={({ date: tileDate, view }) => {
          if (view !== 'month') return ''
          const isSelected = value && tileDate.toDateString() === value.toDateString()
          const isToday = tileDate.toDateString() === todayDate.toDateString()
          if (isSelected) return 'fh-calendar-selected'
          if (isToday) return 'fh-calendar-today'
          return 'fh-calendar-tile'
        }}
      />
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
const LineChartCard = ({ trend, series }) => {
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
  const chartData = (series && series.length > 0)
    ? series
    : data.labels.map((label, idx) => ({
      date: label,
      activeUsers: data.points[idx] || 0
    }))

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[15px] font-semibold text-[#1f2937]">Startup Growth Trend</h3>
        <span className="text-[11px] font-semibold text-[#6366f1] bg-[#eef0fd] px-3 py-1 rounded-full">Daily Active Users</span>
      </div>
      <div className="flex gap-4 mt-3">
        <div className="flex-1 h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip contentStyle={{ borderRadius: 12, borderColor: '#e5e7eb', fontSize: 12 }} />
              <Line type="monotone" dataKey="activeUsers" stroke="#818cf8" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stat pills */}
        <div className="flex flex-col gap-2 min-w-[96px]">
          {['month', 'week'].map((key) => {
            const stat = data.quickStats[key]
            return (
              <div key={key} className="rounded-xl bg-[#f5f7fb] border border-[#eef0f5] px-3 py-2 text-center">
                <p className="text-[10px] text-[#9ca3af]">{stat.label}</p>
                <p className="text-[18px] font-bold text-[#1f2937]">{stat.value}</p>
                <span className={`text-[10px] font-semibold flex items-center justify-center gap-0.5 ${stat.up ? 'text-emerald-500' : 'text-rose-400'}`}>
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
const ReportedCasesCard = ({ split, series }) => {
  const fallbackSplit = {
    highValue: 54500,
    lowValue: 25500,
    seriesHigh: [100, 90, 85, 80, 60, 55, 50, 35, 25, 20],
    seriesLow: [110, 100, 95, 90, 85, 80, 72, 68, 60, 55]
  }
  const data = split || fallbackSplit
  const chartData = (series && series.length > 0)
    ? series
    : data.seriesHigh.map((value, idx) => ({
      date: `W${idx + 1}`,
      high: value,
      low: data.seriesLow[idx]
    }))

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[15px] font-semibold text-[#1f2937]">Startup Performance Split</h3>
        <span className="text-[11px] font-semibold text-[#6366f1] bg-[#eef0fd] px-3 py-1 rounded-full">High vs Low Growth</span>
      </div>
      <div className="flex items-center gap-4 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#818cf8]" />
          <span className="text-[12px] text-[#6b7280]">{(data.highValue / 1000).toFixed(1)}k</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#c4b5fd]" />
          <span className="text-[12px] text-[#6b7280]">{(data.lowValue / 1000).toFixed(1)}k</span>
        </div>
      </div>
      <div className="h-[115px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip contentStyle={{ borderRadius: 12, borderColor: '#e5e7eb', fontSize: 12 }} />
            <Line type="monotone" dataKey={chartData[0]?.high !== undefined ? 'high' : 'activeUsers'} stroke="#818cf8" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey={chartData[0]?.low !== undefined ? 'low' : 'profileViews'} stroke="#c4b5fd" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between mt-2">
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
  const [showDetails, setShowDetails] = React.useState(false)
  const fallback = {
    valuationCr: 12.5,
    investorEquity: 18.2,
    impliedPrice: 1.25,
    committedCr: 2.1,
    softCircledCr: 0.75,
    runwayMonths: 8.5,
    investors: [
      { name: 'Sequoia India', equityPct: 6.2, amountCr: 1.1, stage: 'Lead' },
      { name: 'Accel Partners', equityPct: 4.5, amountCr: 0.6, stage: 'Co-Lead' },
      { name: 'Lightspeed', equityPct: 3.1, amountCr: 0.3, stage: 'Strategic' },
      { name: 'Angels Syndicate', equityPct: 2.4, amountCr: 0.1, stage: 'Angel' },
      { name: 'Operator Pool', equityPct: 2.0, amountCr: 0.0, stage: 'Advisory' }
    ]
  }
  const data = snapshot || fallback
  const investors = data.investors || fallback.investors

  return (
  <Card>
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className="text-[11px] font-semibold text-[#6366f1] tracking-wide">Equity Snapshot</p>
        <h3 className="text-[15px] font-semibold text-[#1f2937]">Investor Equity & Valuation</h3>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setShowDetails(true)}
          className="text-[11px] font-semibold text-[#111827] bg-white border border-[#e5e7eb] px-3 py-1 rounded-full hover:bg-[#f5f7fb]"
        >
          Give more details
        </button>
        <span className="text-[11px] font-semibold text-[#6366f1] bg-[#eef0fd] px-3 py-1 rounded-full">Current Round</span>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
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

    {showDetails && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/30 px-4">
        <div className="w-full max-w-2xl rounded-3xl bg-white border border-[#e5e7eb] shadow-[0_24px_80px_rgba(15,23,42,0.35)] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#6366f1]">Investor Equity Details</p>
              <p className="text-[16px] font-semibold text-[#111827] mt-1">Current round allocations</p>
            </div>
            <button
              type="button"
              onClick={() => setShowDetails(false)}
              className="text-sm font-semibold text-[#111827] border border-[#e5e7eb] px-3 py-1 rounded-full hover:bg-[#f5f7fb]"
            >
              Close
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {investors.map((inv) => (
              <div key={inv.name} className="flex items-center justify-between rounded-2xl border border-[#eef0f5] bg-[#f8fafc] px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-[#111827]">{inv.name}</p>
                  <p className="text-xs text-[#64748b]">{inv.stage}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#111827]">{inv.equityPct}% equity</p>
                  <p className="text-xs text-[#64748b]">Rs{inv.amountCr.toFixed(2)}Cr invested</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
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
  const apiBase = import.meta.env.VITE_API_URL || ''
  const [apiData, setApiData] = useState([])
  const [dayData, setDayData] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const stats = dashboardData?.stats || fallback.stats
  const distribution = dashboardData?.userDistribution || fallback.userDistribution
  const equitySnapshot = dashboardData?.equitySnapshot || fallback.equitySnapshot
  const timeline = dashboardData?.activityTimeline || fallback.activityTimeline

  useEffect(() => {
    if (!timeline) return
    setSelectedDate(new Date(timeline.year, timeline.month, timeline.today))
  }, [timeline?.year, timeline?.month, timeline?.today])

  useEffect(() => {
    if (!apiBase) return
    fetch(`${apiBase}/data`)
      .then((res) => res.json())
      .then((data) => setApiData(Array.isArray(data) ? data : []))
      .catch(() => setApiData([]))
  }, [apiBase])

  useEffect(() => {
    if (!apiBase || !selectedDate) return
    const formatted = selectedDate.toISOString().split('T')[0]
    fetch(`${apiBase}/data/${formatted}`)
      .then((res) => res.json())
      .then((data) => setDayData(data?.date ? data : null))
      .catch(() => setDayData(null))
  }, [apiBase, selectedDate])

  const derivedDashboard = useMemo(() => {
    if (!timeline || !selectedDate) return dashboardData || fallback
    const selectedDay = selectedDate.getDate()
    const activity = timeline.days?.[selectedDay] || { visits: 0, ai: 0, investor: 0 }
    const baseline = timeline.days?.[timeline.today] || { visits: 1, ai: 1, investor: 1 }
    const scale = Math.max(0.6, Math.min(1.4, (activity.visits || 0) / Math.max(baseline.visits || 1, 1)))

    const apiSource = dayData || null
    const apiStats = apiSource ? {
      activeUsers: apiSource.activeUsers,
      profileViews: apiSource.profileViews,
      aiActions: apiSource.aiActions,
      investorInteractions: apiSource.investorInteractions
    } : null

    const scaledStats = {
      activeUsers: { ...stats.activeUsers, value: apiStats?.activeUsers ?? Math.round(stats.activeUsers.value * scale) },
      profileViews: { ...stats.profileViews, value: apiStats?.profileViews ?? Math.round(stats.profileViews.value * scale) },
      aiActions: { ...stats.aiActions, value: apiStats?.aiActions ?? Math.round(stats.aiActions.value * (0.8 + activity.ai / 20)) },
      investorInteractions: { ...stats.investorInteractions, value: apiStats?.investorInteractions ?? Math.round(stats.investorInteractions.value * (0.8 + activity.investor / 20)) }
    }

    const selectedLabel = `${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`
    const liveActivity = [
      `Selected day: ${selectedLabel}`,
      `${apiStats?.profileViews ?? activity.visits ?? 0} people viewed your startup`,
      `${apiStats?.aiActions ?? activity.ai ?? 0} AI actions logged`,
      `${apiStats?.investorInteractions ?? activity.investor ?? 0} investor interactions`,
      activity.spike ? 'Spike detected in investor interest' : 'No spike detected'
    ]

    const growthTrend = {
      ...fallback.growthTrend,
      highlightValue: Math.max(420, (apiStats?.activeUsers ?? activity.visits ?? 0) * 60),
      quickStats: {
        month: { ...fallback.growthTrend.quickStats.month, value: Math.max(40, (apiStats?.activeUsers ?? activity.visits ?? 0) * 4) },
        week: { ...fallback.growthTrend.quickStats.week, value: Math.max(20, (apiStats?.aiActions ?? activity.ai ?? 0) * 5) }
      }
    }

    const performanceSplit = {
      ...fallback.performanceSplit,
      highValue: 40000 + (apiStats?.activeUsers ?? activity.visits ?? 0) * 200,
      lowValue: 22000 + (apiStats?.aiActions ?? activity.ai ?? 0) * 150
    }

    return {
      ...dashboardData,
      stats: scaledStats,
      liveActivity,
      growthTrend,
      performanceSplit,
      activityTimeline: timeline
    }
  }, [dashboardData, fallback, stats, timeline, selectedDate, dayData])
  const chartSeries = useMemo(() => {
    if (apiData.length > 0) {
      return apiData.map((item) => ({
        date: item.date,
        activeUsers: item.activeUsers,
        profileViews: item.profileViews,
        aiActions: item.aiActions,
        investorInteractions: item.investorInteractions
      }))
    }

    return (fallback.growthTrend.labels || []).map((label, idx) => ({
      date: label,
      activeUsers: fallback.growthTrend.points[idx] || 0,
      profileViews: Math.max(0, (fallback.growthTrend.points[idx] || 0) - 20),
      aiActions: Math.max(0, (fallback.growthTrend.points[idx] || 0) - 40),
      investorInteractions: Math.max(0, (fallback.growthTrend.points[idx] || 0) - 60)
    }))
  }, [apiData, fallback.growthTrend.labels, fallback.growthTrend.points])
  const [showSplitDetails, setShowSplitDetails] = React.useState(false)
  const investorRatio = (distribution.values[1] / Math.max(distribution.values[0], 1))
  const marketSignal = investorRatio >= 0.75 ? 'Investor-heavy market → good time to raise.' : 'Founder-heavy market → sharpen positioning.'
  const founderSplit = [
    { name: 'Vansh Bansal', role: 'CEO', equity: 52 },
    { name: 'Aarav Mehta', role: 'CTO', equity: 28 },
    { name: 'Riya Kapoor', role: 'COO', equity: 20 }
  ]

  const investorSplit = [
    { name: 'Sequoia India', round: 'Seed', equity: 6.2 },
    { name: 'Accel Partners', round: 'Seed', equity: 4.5 },
    { name: 'Lightspeed', round: 'Angel', equity: 3.1 }
  ]

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
            <CalendarWidget
              timeline={derivedDashboard?.activityTimeline}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />

            {/* 4 stat cards in 2×2 */}
            <div className="grid grid-cols-2 gap-4">
              <SmallStatCard
                icon={<span className="text-base">🟦</span>}
                iconBg="bg-[#dbeafe]"
                label="Active Users"
                value={derivedDashboard.stats.activeUsers.value.toLocaleString()}
                period="Last 7 days"
                delta={`+${derivedDashboard.stats.activeUsers.delta}%`}
                deltaUp={derivedDashboard.stats.activeUsers.delta >= 0}
              />
              <SmallStatCard
                icon={<span className="text-base">🟪</span>}
                iconBg="bg-[#ede9fe]"
                label="Startup Profile Views"
                value={derivedDashboard.stats.profileViews.value.toLocaleString()}
                period="Last 7 days"
                delta={`+${derivedDashboard.stats.profileViews.delta}%`}
                deltaUp={derivedDashboard.stats.profileViews.delta >= 0}
              />
              <SmallStatCard
                icon={<span className="text-base">🟩</span>}
                iconBg="bg-[#dcfce7]"
                label="AI Actions"
                value={derivedDashboard.stats.aiActions.value.toLocaleString()}
                period="Last 7 days"
                delta={`+${derivedDashboard.stats.aiActions.delta}%`}
                deltaUp={derivedDashboard.stats.aiActions.delta >= 0}
              />
              <SmallStatCard
                icon={<span className="text-base">🟨</span>}
                iconBg="bg-[#fef3c7]"
                label="Investor Interactions"
                value={derivedDashboard.stats.investorInteractions.value.toLocaleString()}
                period="Last 7 days"
                delta={`+${derivedDashboard.stats.investorInteractions.delta}%`}
                deltaUp={derivedDashboard.stats.investorInteractions.delta >= 0}
              />
            </div>

            {/* Donut chart */}
            <LiveActivityCard items={derivedDashboard?.liveActivity} />
          </div>

          {/* ── ROW 2 ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <LineChartCard trend={derivedDashboard?.growthTrend} series={chartSeries} />
            <ReportedCasesCard split={derivedDashboard?.performanceSplit} series={chartSeries} />
          </div>

          {/* ── MINIMAL FOUNDERS DASHBOARD ── */}
          <div className="mb-6">
            <div className="rounded-[26px] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_20px_70px_rgba(79,70,229,0.12)] p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#6366f1]">Founder Decision Hub</p>
                  <h3 className="text-[20px] font-semibold text-[#0f172a] mt-2">Founder vs Investor Split · Cap Table</h3>
                </div>
                <span className="text-[11px] font-semibold text-white bg-gradient-to-r from-[#6366f1] to-[#3b82f6] px-3 py-1 rounded-full">Minimal Mode</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="rounded-2xl border border-white/60 bg-white/85 p-5 transition hover:shadow-[0_12px_32px_rgba(79,70,229,0.16)]">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#6366f1]">Founder vs Investor Split</p>
                    <button
                      type="button"
                      onClick={() => setShowSplitDetails((prev) => !prev)}
                      className="text-[11px] font-semibold text-[#111827] border border-[#e5e7eb] px-3 py-1 rounded-full hover:bg-[#f5f7fb]"
                    >
                      View Details
                    </button>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4 items-end">
                    {[
                      { label: 'Founders', value: distribution.values[0], color: 'from-[#6366f1] to-[#3b82f6]' },
                      { label: 'Investors', value: distribution.values[1], color: 'from-[#8b5cf6] to-[#6366f1]' }
                    ].map((bar) => (
                      <div key={bar.label} className="flex flex-col items-center">
                        <div className="w-full h-32 flex items-end">
                          <div
                            className={`w-full rounded-2xl bg-gradient-to-t ${bar.color} transition-all`}
                            style={{ height: `${Math.max(10, bar.value)}%` }}
                          />
                        </div>
                        <p className="text-xs text-[#64748b] mt-2">{bar.label}</p>
                        <p className="text-[13px] font-semibold text-[#0f172a]">{bar.value}%</p>
                      </div>
                    ))}
                  </div>

                  {showSplitDetails && (
                    <div className="mt-4 rounded-xl border border-[#eef2ff] bg-[#f8fafc] p-3 text-xs text-[#475569]">
                      Ratio: {(distribution.values[0] / Math.max(distribution.values[1], 1)).toFixed(1)}x · {marketSignal}
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-white/60 bg-white/85 p-5 transition hover:shadow-[0_12px_32px_rgba(79,70,229,0.16)]">
                  <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#6366f1]">Founders & Investors</p>
                  <div className="mt-4 grid grid-cols-1 gap-4">
                    <div className="rounded-xl border border-[#eef2ff] bg-[#fbfcff] p-3">
                      <p className="text-xs font-semibold text-[#6b7280]">Founders</p>
                      <div className="mt-2 space-y-2">
                        {founderSplit.map((member) => (
                          <div key={member.name} className="flex items-center justify-between text-xs text-[#1f2937]">
                            <span className="font-semibold">{member.name}</span>
                            <span className="text-[#64748b]">{member.role} · {member.equity}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#eef2ff] bg-[#fbfcff] p-3">
                      <p className="text-xs font-semibold text-[#6b7280]">Investors</p>
                      <div className="mt-2 space-y-2">
                        {investorSplit.map((member) => (
                          <div key={member.name} className="flex items-center justify-between text-xs text-[#1f2937]">
                            <span className="font-semibold">{member.name}</span>
                            <span className="text-[#64748b]">{member.round} · {member.equity}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.main>
      </div>
    </div>
  )
}

export default FounderDashboard
