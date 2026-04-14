import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Activity, Users, TrendingUp, Zap, Hexagon, Play } from 'lucide-react'

/* ── Main Hero Section ── */

const FloatingStatCard = ({ label, value, icon: Icon, color = '#5B65DC', trend = '+12%' }) => (
  <div className="bg-white/90 backdrop-blur-md border border-[#EEF0FD] p-4 rounded-3xl shadow-[0_4px_24px_rgba(18,32,86,0.06)] flex flex-col gap-2 min-w-[170px]">
    <div className="flex items-center justify-between">
      <div className="w-9 h-9 rounded-2xl bg-[#FAFAFD] flex items-center justify-center border border-[#EEF0FD]">
        <Icon size={16} style={{ color }} />
      </div>
      <div className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color, backgroundColor: `${color}10` }}>{trend}</div>
    </div>
    <div>
      <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#122056] tabular-nums">{value}</p>
    </div>
  </div>
)

const CinematicHero = () => {
  const floatingCards = [
    {
      label: 'Growth',
      value: '1,420',
      icon: TrendingUp,
      color: '#5B65DC',
      trend: '+12%',
      pos: 'top-[8%] left-[4%] lg:top-[20%] lg:left-[8%]',
      delay: 0,
      rotate: -3,
    },
    {
      label: 'Users',
      value: '850',
      icon: Users,
      color: '#122056',
      trend: '+9%',
      pos: 'top-[7%] right-[3%] lg:top-[12%] lg:right-[9%]',
      delay: 0.12,
      rotate: 2,
    },
    {
      label: 'Reach',
      value: '12,400',
      icon: Hexagon,
      color: '#C084FC',
      trend: '+15%',
      pos: 'top-[46%] right-[2%] lg:top-[43%] lg:right-[6%]',
      delay: 0.24,
      rotate: -2,
    },
    {
      label: 'Yield',
      value: '92',
      icon: Zap,
      color: '#FB923C',
      trend: '+6%',
      pos: 'top-[35%] left-[2%] lg:top-[61%] lg:left-[13%]',
      delay: 0.36,
      rotate: 1,
    },
    {
      label: 'Uptime',
      value: '99',
      icon: Activity,
      color: '#0EA5E9',
      trend: '+4%',
      pos: 'bottom-[8%] right-[8%] lg:bottom-[12%] lg:right-[10%]',
      delay: 0.48,
      rotate: -1,
    },
  ]

  return (
    <section className="relative w-full min-h-[90vh] lg:h-screen flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,32,86,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(18,32,86,0.06)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none hidden sm:block">
        {floatingCards.map((card) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 0.7, delay: card.delay },
              y: { duration: 5.1, repeat: Infinity, ease: 'easeInOut', delay: card.delay },
            }}
            className={`absolute ${card.pos}`}
          >
            <FloatingStatCard
              label={card.label}
              value={card.value}
              icon={card.icon}
              color={card.color}
              trend={card.trend}
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto w-full px-6 lg:px-10 h-full flex items-center justify-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl text-center pointer-events-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-white border border-[#EEF0FD] shadow-sm"
          >
              
             
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="font-semibold text-[clamp(2.5rem,6vw,5.2rem)] tracking-[-0.04em] leading-[1.02] text-[#14171b] mb-6"
          >
            Find Your Strategic Workforce
            <br />
            <span className="text-[#5B65DC]">Planning Partners From Today</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4 }}
            className="text-[16px] lg:text-[20px] leading-relaxed text-[#4d535c] max-w-2xl mx-auto mb-10"
          >
            Empower your hiring team with data-driven tools to attract,
            assess, and retain top talent efficiently.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/signup?role=investor"
              className="px-8 py-3 rounded-xl bg-[#122056] text-white text-[16px] font-semibold shadow-lg shadow-[#122056]/15 hover:bg-[#5B65DC] transition-all"
            >
              Get Started
            </Link>
            <Link
              to="/verify"
              className="px-6 py-3 rounded-xl bg-white border border-[#EEF0FD] text-[#122056] text-[16px] font-medium hover:bg-[#FAFAFD] transition-all inline-flex items-center gap-2"
            >
              <Play size={16} className="text-[#5B65DC]" />
              Watch Demo
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CinematicHero
