import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import GlassCard from './GlassCard'

const Counter = ({ value, duration = 2, delay = 0 }) => {
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

const DashboardPreview = () => {
  const stats = [
    { label: 'Active Startups', value: 1247, change: '+12%', color: 'text-emerald-500' },
    { label: 'Cities', value: 86, change: '+5', color: 'text-amber-500' },
    { label: 'Verified', value: 493, change: '+28', color: 'text-blue-500' },
  ]

  const barData = [35, 48, 42, 65, 58, 82, 70, 90, 78, 95, 88, 100]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: 1, 
        y: [0, -10, 0],
      }}
      transition={{ 
        opacity: { duration: 0.8 },
        y: { 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }
      }}
      whileHover={{ scale: 1.02, shadow: "0 20px 40px rgba(0,0,0,0.1)" }}
      className="relative z-10"
    >
      <GlassCard className="relative p-8 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-12 h-12 rounded-xl bg-neutral-950 flex items-center justify-center shadow-lg"
            >
              <span className="text-white text-[13px] font-bold">FH</span>
            </motion.div>
            <div>
              <p className="text-[16px] font-bold text-neutral-900">FoundrHUB Dashboard</p>
              <p className="text-[12px] text-neutral-400 font-medium tracking-wide">Startup Discovery OS</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm" />
            <div className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-sm" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/60 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.1em] mb-2">{s.label}</p>
              <p className="text-[24px] font-bold text-neutral-900 leading-tight mb-1">
                <Counter value={s.value} delay={0.5 + i * 0.1} />
              </p>
              <span className={`text-[12px] font-bold ${s.color}`}>{s.change}</span>
            </motion.div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="relative bg-white/40 backdrop-blur-xl rounded-2xl border border-white/50 p-6 overflow-hidden">
          {/* Subtle Glow behind the chart */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-50/20 via-transparent to-transparent pointer-events-none" />
          
          <p className="text-[11px] font-bold text-neutral-400 mb-6 uppercase tracking-wider">Discovery Trend — 6 months</p>
          
          <div className="flex items-end gap-2 h-24 relative z-10">
            {barData.map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: `${h}%`, opacity: 1 }}
                transition={{ 
                  delay: 0.8 + i * 0.05, 
                  duration: 0.8, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ opacity: 0.8 }}
                className="flex-1 rounded-t-lg transition-colors cursor-pointer"
                style={{ 
                  backgroundColor: i >= 10 ? '#0a0a0a' : i >= 8 ? '#404040' : i >= 5 ? '#a3a3a3' : '#e5e5e5' 
                }}
              />
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Decorative Glow background */}
      <div className="absolute -inset-10 bg-gradient-to-br from-amber-100/20 via-transparent to-emerald-50/20 rounded-[3rem] blur-3xl opacity-50 -z-10" />
    </motion.div>
  )
}

export default DashboardPreview
