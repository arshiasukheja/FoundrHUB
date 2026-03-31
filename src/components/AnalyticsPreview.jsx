import React, { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'
import { Eye, Bookmark, MessageSquare, Users } from 'lucide-react'

const Counter = ({ value, duration = 1.2, delay = 0.2 }) => {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const numericValue = typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : value
    const controls = animate(0, numericValue, {
      duration,
      delay,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.floor(latest)),
    })
    return () => controls.stop()
  }, [value, duration, delay])

  const suffix = typeof value === 'string' && value.includes('%') ? '%' : ''
  const isFloat = typeof value === 'string' && value.includes('.')
  
  return (
    <span className="tabular-nums">
      {display.toLocaleString()}{suffix}
    </span>
  )
}

const AnalyticsStat = ({ label, value, change, Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    className="flex-1 min-w-[200px]"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-xl bg-neutral-50 flex items-center justify-center text-neutral-400 group-hover:text-neutral-900 transition-colors">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.6, duration: 0.4 }}
        className="text-[14px] font-bold text-emerald-500"
      >
        {change}
      </motion.span>
    </div>
    <p className="text-[36px] font-bold text-neutral-900 leading-tight tracking-tight">
      <Counter value={value} delay={delay + 0.2} />
    </p>
    <p className="text-[13px] font-bold text-neutral-400 uppercase tracking-wider mt-1">{label}</p>
  </motion.div>
)

const AnalyticsPreview = () => {
  return (
    <section id="analytics" className="py-24 lg:py-32 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="reveal text-center mb-16">
          <span className="section-label">Analytics Dashboard</span>
          <h2 className="section-title">Your startup performance at a glance</h2>
          <p className="text-[16px] text-neutral-500 max-w-lg mx-auto">Premium OS-style analytics panels tailored for founders who want real-time insight.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-neutral-100">
            <div className="flex items-center gap-4">
              <div className="flex gap-1.5">
                {['bg-red-400', 'bg-amber-400', 'bg-emerald-400'].map(c => (
                  <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                ))}
              </div>
              <span className="text-[12px] font-medium text-neutral-400 ml-2">FoundrHUB Analytics — Bloomcraft Studio</span>
            </div>
            <div className="flex gap-2">
              {['7D', '30D', '90D'].map((p, i) => (
                <button key={p} className={`px-4 py-1.5 rounded-lg text-[11px] font-semibold tracking-wide transition-all ${i === 1 ? 'bg-neutral-950 text-white shadow-lg' : 'bg-white/50 border border-neutral-100 text-neutral-500 hover:text-neutral-900'}`}>{p}</button>
              ))}
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-12 lg:gap-20 mb-24">
            <AnalyticsStat label="Profile Views" value="2847" change="+24%" Icon={Eye} delay={0.1} />
            <AnalyticsStat label="Saves" value="342" change="+18%" Icon={Bookmark} delay={0.2} />
            <AnalyticsStat label="Story Engagement" value="89%" change="+5%" Icon={MessageSquare} delay={0.3} />
            <AnalyticsStat label="Inbound Leads" value="27" change="+9" Icon={Users} delay={0.4} />
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-5 gap-20 pt-16 border-t border-neutral-100">
            <div className="lg:col-span-3">
              <p className="text-[14px] font-bold text-neutral-400 uppercase tracking-widest mb-10">Views Over Time</p>
              <div className="flex items-end gap-2.5 h-48">
                {[20, 35, 28, 45, 52, 38, 60, 55, 72, 65, 78, 82, 70, 88, 92, 75, 95, 88, 80, 90, 85, 92, 78, 95, 100, 88, 92, 85, 98, 92].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.02, duration: 0.6, ease: 'easeOut' }}
                    className="flex-1 rounded-t-[2px] transition-colors"
                    style={{ background: i >= 24 ? '#0a0a0a' : i >= 18 ? '#404040' : i >= 10 ? '#737373' : '#e5e5e5' }}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <p className="text-[14px] font-bold text-neutral-400 uppercase tracking-widest mb-10">Discovery Sources</p>
              <div className="space-y-8">
                {[
                  { label: 'FoundrHUB Feed', value: 45 },
                  { label: 'Direct Search', value: 28 },
                  { label: 'Shared Links', value: 18 },
                  { label: 'Social Media', value: 9 },
                ].map((s, i) => (
                  <div key={s.label}>
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="text-[14px] font-bold text-neutral-800">{s.label}</span>
                      <span className="text-[13px] font-bold text-neutral-400 tabular-nums">{s.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-50 rounded-full overflow-hidden border border-neutral-100">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.value}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 + i * 0.1, duration: 1, ease: 'easeOut' }}
                        className="h-full bg-neutral-900 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AnalyticsPreview
