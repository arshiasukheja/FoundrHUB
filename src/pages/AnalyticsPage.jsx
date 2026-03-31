import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
})

const MetricCard = ({ label, value, change, delay = 0 }) => (
  <motion.div {...fadeUp(delay)} className="bg-white rounded-3xl border border-neutral-100 p-6 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] transition-all duration-500">
    <p className="text-[12px] text-neutral-400 font-medium mb-1">{label}</p>
    <p className="text-[28px] font-semibold text-neutral-900 leading-tight">{value}</p>
    {change && <p className="text-[12px] font-semibold text-emerald-600 mt-1">{change}</p>}
  </motion.div>
)

const ChartCard = ({ title, subtitle, children, delay = 0, className = '' }) => (
  <motion.div {...fadeUp(delay)} className={`bg-white rounded-3xl border border-neutral-100 p-7 ${className}`}>
    <p className="text-[15px] font-semibold text-neutral-900 mb-1">{title}</p>
    {subtitle && <p className="text-[13px] text-neutral-400 mb-6">{subtitle}</p>}
    {children}
  </motion.div>
)

/* Simple bar chart rows */
const HorizontalBar = ({ label, value, maxValue, color = 'bg-neutral-900' }) => {
  const pct = Math.round((value / maxValue) * 100)
  return (
    <div className="flex items-center gap-3 mb-3 last:mb-0">
      <span className="text-[12px] text-neutral-500 w-24 flex-shrink-0 truncate">{label}</span>
      <div className="flex-1 h-2 rounded-full bg-neutral-50 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <span className="text-[12px] font-semibold text-neutral-600 w-10 text-right">{value}</span>
    </div>
  )
}

const AnalyticsPage = () => {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] || 'Founder'

  // Mock data
  const viewsData = [120, 145, 132, 178, 210, 195, 240, 225, 260, 250, 278, 310, 295, 340, 360, 320, 375, 355, 340, 370, 360, 385, 365, 395, 410, 380, 400, 395, 420, 415]
  const maxView = Math.max(...viewsData)

  const savesData = [15, 22, 18, 30, 28, 35, 32, 40, 38, 45, 42, 50, 48, 56, 52, 58, 55, 62, 60, 65, 58, 70, 68, 72, 75, 70, 78, 74, 80, 82]
  const maxSave = Math.max(...savesData)

  const cityData = [
    { label: 'Mumbai', value: 842 },
    { label: 'Bangalore', value: 634 },
    { label: 'Delhi NCR', value: 521 },
    { label: 'Pune', value: 387 },
    { label: 'Hyderabad', value: 298 },
    { label: 'Chennai', value: 215 },
  ]

  const categoryData = [
    { label: 'Fashion', value: 45 },
    { label: 'Tech', value: 38 },
    { label: 'D2C', value: 32 },
    { label: 'SaaS', value: 28 },
    { label: 'Food', value: 22 },
  ]

  const trafficSources = [
    { name: 'Direct', value: '38%', icon: '🔗', desc: 'Direct URL visits' },
    { name: 'Explore Page', value: '28%', icon: '🔍', desc: 'FoundrHUB discover' },
    { name: 'Social Media', value: '22%', icon: '📱', desc: 'LinkedIn, Instagram' },
    { name: 'External Links', value: '12%', icon: '🌐', desc: 'Blogs, press mentions' },
  ]

  const investorSignals = [
    { metric: 'Deck Downloads', value: '14', trend: '+6 this week' },
    { metric: 'Profile Shortlisted', value: '8', trend: '+3 new' },
    { metric: 'Contact Requests', value: '5', trend: '+2 pending' },
    { metric: 'Saved by Investors', value: '27', trend: '+9 this month' },
  ]

  const interestHeatmap = [
    ['Mon', [3, 5, 8, 12, 10, 8, 4, 2]],
    ['Tue', [2, 4, 9, 14, 11, 9, 5, 3]],
    ['Wed', [4, 6, 11, 15, 13, 10, 6, 3]],
    ['Thu', [3, 7, 10, 16, 14, 11, 7, 4]],
    ['Fri', [5, 8, 12, 18, 15, 12, 8, 5]],
    ['Sat', [2, 3, 6, 8, 7, 5, 3, 1]],
    ['Sun', [1, 2, 4, 6, 5, 4, 2, 1]],
  ]
  const heatmapMax = 18
  const timeSlots = ['6am', '9am', '12pm', '3pm', '6pm', '9pm', '12am', '3am']

  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-gradient-to-b from-beige-50/30 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">

          {/* Header */}
          <motion.div {...fadeUp()} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <Link to="/dashboard" className="inline-flex items-center gap-2 text-[13px] text-neutral-400 hover:text-neutral-700 transition-colors mb-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to Dashboard
              </Link>
              <h1 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.1] text-neutral-950 mb-2">Analytics</h1>
              <p className="text-[14px] text-neutral-400">Track your startup's visibility and engagement on FoundrHUB.</p>
            </div>
            <div className="flex items-center gap-2 p-1 rounded-xl bg-neutral-50 border border-neutral-100 self-start">
              <button className="px-4 py-2 rounded-lg text-[12px] font-semibold bg-white text-neutral-900 shadow-sm">30 Days</button>
              <button className="px-4 py-2 rounded-lg text-[12px] font-semibold text-neutral-400 hover:text-neutral-600 transition-colors">90 Days</button>
              <button className="px-4 py-2 rounded-lg text-[12px] font-semibold text-neutral-400 hover:text-neutral-600 transition-colors">All Time</button>
            </div>
          </motion.div>

          {/* Top Metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <MetricCard label="Total Profile Views" value="12,847" change="+24% vs last month" delay={0.05} />
            <MetricCard label="Total Saves" value="1,342" change="+18% vs last month" delay={0.1} />
            <MetricCard label="Story Engagement" value="89%" change="+5% improvement" delay={0.15} />
            <MetricCard label="Inbound Leads" value="127" change="+32 this month" delay={0.2} />
          </div>

          {/* Profile Views + Saves Trend */}
          <div className="grid lg:grid-cols-5 gap-5 mb-8">
            <ChartCard title="Profile Views" subtitle="Last 30 days" delay={0.25} className="lg:col-span-3">
              <div className="flex items-end gap-[3px] h-40">
                {viewsData.map((h, i) => {
                  const pct = (h / maxView) * 100
                  return (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${pct}%` }}
                      transition={{ delay: 0.4 + i * 0.02, duration: 0.5, ease: 'easeOut' }}
                      className="flex-1 rounded-t cursor-pointer transition-all duration-300 hover:opacity-70 group relative"
                      style={{ background: i >= 27 ? '#0a0a0a' : i >= 20 ? '#525252' : '#d4d4d4' }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-neutral-900 text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {h}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-[10px] text-neutral-300">Mar 1</span>
                <span className="text-[10px] text-neutral-300">Mar 15</span>
                <span className="text-[10px] text-neutral-300">Mar 30</span>
              </div>
            </ChartCard>

            <ChartCard title="Saves Trend" subtitle="Last 30 days" delay={0.3} className="lg:col-span-2">
              <div className="flex items-end gap-[3px] h-40">
                {savesData.map((h, i) => {
                  const pct = (h / maxSave) * 100
                  return (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${pct}%` }}
                      transition={{ delay: 0.5 + i * 0.02, duration: 0.5, ease: 'easeOut' }}
                      className="flex-1 rounded-t cursor-pointer transition-all duration-300 hover:opacity-70"
                      style={{ background: i >= 25 ? '#0a0a0a' : i >= 15 ? '#737373' : '#e5e5e5' }}
                    />
                  )
                })}
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-[10px] text-neutral-300">Mar 1</span>
                <span className="text-[10px] text-neutral-300">Mar 30</span>
              </div>
            </ChartCard>
          </div>

          {/* User Interest Heatmap */}
          <ChartCard title="User Interest Heatmap" subtitle="When people visit your profile" delay={0.35} className="mb-8">
            <div className="overflow-x-auto">
              <div className="min-w-[500px]">
                {/* Time labels */}
                <div className="flex items-center gap-1 mb-1 ml-12">
                  {timeSlots.map(t => (
                    <span key={t} className="flex-1 text-center text-[10px] text-neutral-300">{t}</span>
                  ))}
                </div>
                {/* Heatmap grid */}
                {interestHeatmap.map(([day, values]) => (
                  <div key={day} className="flex items-center gap-1 mb-1">
                    <span className="w-10 text-[11px] text-neutral-400 text-right pr-2">{day}</span>
                    {values.map((val, i) => {
                      const intensity = val / heatmapMax
                      return (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 + i * 0.03 }}
                          className="flex-1 h-8 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 group relative"
                          style={{
                            backgroundColor: intensity > 0.7
                              ? '#0a0a0a'
                              : intensity > 0.5
                                ? '#525252'
                                : intensity > 0.3
                                  ? '#a3a3a3'
                                  : intensity > 0.15
                                    ? '#d4d4d4'
                                    : '#f5f5f5',
                          }}
                        >
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-neutral-900 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            {val} visits
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                ))}
                {/* Legend */}
                <div className="flex items-center justify-end gap-1 mt-3">
                  <span className="text-[10px] text-neutral-400 mr-2">Less</span>
                  {['#f5f5f5', '#d4d4d4', '#a3a3a3', '#525252', '#0a0a0a'].map((c, i) => (
                    <div key={i} className="w-5 h-5 rounded" style={{ backgroundColor: c }} />
                  ))}
                  <span className="text-[10px] text-neutral-400 ml-2">More</span>
                </div>
              </div>
            </div>
          </ChartCard>

          {/* City Discovery + Category Engagement */}
          <div className="grid lg:grid-cols-2 gap-5 mb-8">
            <ChartCard title="City Discovery" subtitle="Where your visitors come from" delay={0.4}>
              {cityData.map((c, i) => (
                <HorizontalBar key={c.label} label={c.label} value={c.value} maxValue={cityData[0].value} color={i === 0 ? 'bg-neutral-900' : 'bg-neutral-300'} />
              ))}
            </ChartCard>
            <ChartCard title="Category Engagement" subtitle="Interest by category" delay={0.45}>
              <div className="flex items-end justify-around gap-4 h-40 mb-3">
                {categoryData.map((c, i) => (
                  <div key={c.label} className="flex flex-col items-center gap-2 flex-1">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(c.value / 50) * 100}%` }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: 'easeOut' }}
                      className={`w-full max-w-[48px] rounded-t-lg ${i === 0 ? 'bg-neutral-900' : 'bg-neutral-200'}`}
                    />
                    <span className="text-[10px] text-neutral-400 text-center">{c.label}</span>
                    <span className="text-[11px] font-semibold text-neutral-600">{c.value}%</span>
                  </div>
                ))}
              </div>
            </ChartCard>
          </div>

          {/* Founder Story Performance */}
          <ChartCard title="Founder Story Performance" subtitle="How your story is engaging visitors" delay={0.5} className="mb-8">
            <div className="grid sm:grid-cols-4 gap-5">
              {[
                { label: 'Story Views', value: '3,240', icon: '👁' },
                { label: 'Read-through Rate', value: '72%', icon: '📖' },
                { label: 'Avg. Time Spent', value: '2m 35s', icon: '⏱' },
                { label: 'Shares', value: '89', icon: '🔄' },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="text-center p-5 rounded-2xl bg-beige-50/50 border border-beige-200/30"
                >
                  <span className="text-[22px] block mb-2">{s.icon}</span>
                  <p className="text-[20px] font-semibold text-neutral-900">{s.value}</p>
                  <p className="text-[11px] text-neutral-400 mt-1">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </ChartCard>

          {/* Traffic Sources + Top Performing Week */}
          <div className="grid lg:grid-cols-5 gap-5 mb-8">
            <ChartCard title="Traffic Sources" subtitle="Where visitors find you" delay={0.55} className="lg:col-span-3">
              <div className="space-y-3">
                {trafficSources.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-neutral-100 hover:bg-beige-50/30 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center text-[18px]">
                      {s.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold text-neutral-800">{s.name}</p>
                      <p className="text-[11px] text-neutral-400">{s.desc}</p>
                    </div>
                    <span className="text-[18px] font-semibold text-neutral-900">{s.value}</span>
                  </motion.div>
                ))}
              </div>
            </ChartCard>

            <div className="lg:col-span-2 space-y-5">
              <ChartCard title="Top Performing Week" subtitle="Your best week yet" delay={0.6}>
                <div className="text-center py-4">
                  <p className="text-[11px] text-neutral-400 uppercase tracking-wider mb-2">Week of</p>
                  <p className="text-[28px] font-semibold text-neutral-900 leading-tight">Mar 17–23</p>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <div className="text-center">
                      <p className="text-[18px] font-semibold text-neutral-800">520</p>
                      <p className="text-[10px] text-neutral-400">Views</p>
                    </div>
                    <div className="w-px h-8 bg-neutral-100" />
                    <div className="text-center">
                      <p className="text-[18px] font-semibold text-neutral-800">84</p>
                      <p className="text-[10px] text-neutral-400">Saves</p>
                    </div>
                    <div className="w-px h-8 bg-neutral-100" />
                    <div className="text-center">
                      <p className="text-[18px] font-semibold text-neutral-800">12</p>
                      <p className="text-[10px] text-neutral-400">Leads</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold mt-4">
                    ↑ 34% above average
                  </span>
                </div>
              </ChartCard>

              {/* Investor Interest Signals */}
              <ChartCard title="Investor Interest" subtitle="Signals from the investor community" delay={0.65}>
                <div className="space-y-3">
                  {investorSignals.map((s, i) => (
                    <motion.div
                      key={s.metric}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + i * 0.08 }}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-[13px] text-neutral-600">{s.metric}</span>
                      <div className="text-right">
                        <span className="text-[15px] font-semibold text-neutral-900 mr-3">{s.value}</span>
                        <span className="text-[11px] font-medium text-emerald-600">{s.trend}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ChartCard>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}

export default AnalyticsPage
