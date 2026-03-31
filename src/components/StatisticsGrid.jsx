import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Zap, MoreHorizontal } from 'lucide-react'

const StatisticsGrid = () => {
  const stats = [
    {
      id: 1,
      label: 'Weekly Growth',
      value: '+18.4%',
      comparison: '+2.1% from last week',
      icon: TrendingUp,
      bg: 'bg-[#F0FDF4]', // Soft Mint
      iconColor: 'text-[#166534]', // Forest Green
    },
    {
      id: 2,
      label: 'Total Reach',
      value: '8,924',
      comparison: '+340 new people',
      icon: Users,
      bg: 'bg-[#EEF2FF]', // Soft Ice Blue
      iconColor: 'text-[#5B65DC]', // Accent Blue
    },
    {
      id: 3,
      label: 'Engagement Rate',
      value: '6.2%',
      comparison: 'Above industry avg',
      icon: Zap,
      bg: 'bg-[#FFF7ED]', // Soft Peach
      iconColor: 'text-[#C2410C]', // Dark Orange
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-5"
    >
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.id}
            variants={itemVariants}
            className="bg-white rounded-[2rem] border border-[#EEF0FD] p-7 shadow-[0_4px_24px_rgba(18,32,86,0.02)] hover:shadow-[0_12px_44px_rgba(18,32,86,0.06)] hover:-translate-y-1 transition-all duration-500 cursor-pointer group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <p className="text-[10px] font-black text-[#122056]/30 uppercase tracking-[0.2em]">
                    {stat.label}
                  </p>
                  <div className="w-1 h-1 rounded-full bg-[#EEF0FD]" />
                </div>
                
                <p className="text-3xl font-serif font-bold text-[#122056] tracking-tight leading-none mb-3">
                  {stat.value}
                </p>
                
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${stat.bg.replace('bg-', 'bg-opacity-80 bg-')}`} />
                  <p className="text-[11px] font-bold text-[#122056]/50">
                    {stat.comparison}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.iconColor} flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                  <Icon size={20} />
                </div>
                <MoreHorizontal size={16} className="text-[#EEF0FD] group-hover:text-[#5B65DC]/30 transition-colors" />
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default StatisticsGrid
