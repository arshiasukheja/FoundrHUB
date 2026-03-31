import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Zap } from 'lucide-react'

const StatisticsGrid = () => {
  const stats = [
    {
      id: 1,
      label: 'Weekly Growth',
      value: '+18.4%',
      comparison: '+2.1% from last week',
      icon: TrendingUp,
      color: 'from-emerald-400 to-teal-500',
    },
    {
      id: 2,
      label: 'Total Reach',
      value: '8,924',
      comparison: '+340 new people',
      icon: Users,
      color: 'from-blue-400 to-indigo-500',
    },
    {
      id: 3,
      label: 'Engagement Rate',
      value: '6.2%',
      comparison: 'Above industry avg',
      icon: Zap,
      color: 'from-amber-400 to-orange-500',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl border border-[#EEF0FD] p-5 shadow-[0_2px_12px_rgba(18,32,86,0.04)] hover:shadow-[0_8px_24px_rgba(18,32,86,0.08)] transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="text-xs font-bold text-[#122056]/60 uppercase tracking-wide mb-2">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-[#122056] tracking-tight mb-2">
                  {stat.value}
                </p>
                <p className="text-xs text-[#122056]/50 font-medium">
                  {stat.comparison}
                </p>
              </div>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon size={18} />
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default StatisticsGrid
