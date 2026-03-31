import React, { useEffect, useState } from 'react'
import { motion, animate } from 'framer-motion'

const Counter = ({ value, duration = 1.2, delay = 0.2 }) => {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      delay,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.floor(latest)),
    })
    return () => controls.stop()
  }, [value, duration, delay])

  return <span>{display.toLocaleString()}</span>
}

const StatItem = ({ label, value, change, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    className="flex-1"
  >
    <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.15em] mb-3">{label}</p>
    <div className="flex items-baseline gap-2">
      <p className="text-[32px] font-bold text-neutral-900 leading-none tracking-tight tabular-nums">
        <Counter value={value} delay={delay + 0.3} />
      </p>
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.8, duration: 0.5 }}
        className="text-[14px] font-bold text-neutral-500"
      >
        {change}
      </motion.span>
    </div>
  </motion.div>
)

const DashboardPreview = () => {
  const barData = [35, 48, 42, 65, 58, 82, 70, 90, 78, 100, 88, 95]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      whileHover={{ scale: 1.01 }}
      className="w-full max-w-5xl mx-0 py-8 select-none"
    >
      {/* Header Row */}
      <div className="flex items-start justify-between mb-16">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-neutral-950 flex items-center justify-center shadow-lg">
            <span className="text-white text-[13px] font-bold">FH</span>
          </div>
          <div>
            <h3 className="text-[18px] font-bold text-neutral-900 tracking-tight">FoundrHUB Dashboard</h3>
            <p className="text-[13px] text-neutral-400 font-medium tracking-wide">Startup Discovery OS</p>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          {['bg-emerald-500', 'bg-amber-400', 'bg-rose-500'].map(c => (
            <div key={c} className={`w-2.5 h-2.5 rounded-full ${c} opacity-90`} />
          ))}
        </div>
      </div>

      {/* Stats Horizontal Row */}
      <div className="flex gap-12 mb-20 items-end">
        <StatItem label="Active Startups" value={1247} change="+12%" delay={0.2} />
        <StatItem label="Cities" value={86} change="+5" delay={0.3} />
        <StatItem label="Verified" value={493} change="+28" delay={0.4} />
      </div>

      {/* Chart Section */}
      <div className="pt-8 border-t border-neutral-100">
        <p className="text-[11px] font-semibold text-neutral-400 mb-8 uppercase tracking-[0.15em]">Discovery Trend — 6 months</p>
        
        <div className="flex items-end gap-3.5 h-44">
          {barData.map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: `${h}%`, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                delay: 0.6 + i * 0.05, 
                duration: 0.7, 
                ease: 'easeOut'
              }}
              className="flex-1 rounded-[4px] bg-neutral-950/5 hover:bg-neutral-950/10 transition-colors"
              style={{ 
                backgroundColor: i >= 9 ? '#0a0a0a' : i >= 7 ? '#404040' : i >= 4 ? '#737373' : '#e5e5e5' 
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default DashboardPreview
