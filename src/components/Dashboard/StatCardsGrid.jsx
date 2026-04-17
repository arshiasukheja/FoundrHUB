import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Users, Bookmark, TrendingUp, Flame } from 'lucide-react'

const StatCardsGrid = () => {
  const cards = [
    {
      id: 1,
      label: 'Growth Vector',
      value: 1420,
      change: '+12%',
      icon: TrendingUp,
      delay: 0,
    },
    {
      id: 2,
      label: 'Active Users',
      value: 850,
      change: '+8%',
      icon: Users,
      delay: 0.1,
    },
    {
      id: 3,
      label: 'Engagement Rate',
      value: 94,
      change: 'Stable',
      icon: Eye,
      delay: 0.2,
    },
    {
      id: 4,
      label: 'Market Momentum',
      value: 42,
      change: 'Viral',
      icon: Flame,
      delay: 0.3,
    },
  ]

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: card.delay }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white/80 backdrop-blur-md border border-[#EEF0FD] p-6 rounded-[2rem] shadow-[0_4px_24px_rgba(18,32,86,0.04)] flex flex-col gap-4 group transition-all duration-500 hover:shadow-[0_12px_48px_rgba(18,32,86,0.08)]"
        >
          <div className="flex items-center justify-between">
            <div className="w-11 h-11 rounded-2xl bg-[#FAFAFD] flex items-center justify-center border border-[#EEF0FD] group-hover:bg-[#5B65DC]/5 transition-colors">
              <card.icon size={20} className="text-[#5B65DC]" />
            </div>
            <div className="text-[10px] font-bold text-[#5B65DC] bg-[#EEF0FD] px-2.5 py-1 rounded-full">{card.change}</div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-1">{card.label}</p>
            <p className="text-3xl font-serif font-bold text-[#122056] tabular-nums">
              {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
              {card.id === 3 ? '%' : ''}
            </p>
          </div>
          <div className="w-full bg-[#EEF0FD]/50 h-1.5 rounded-full overflow-hidden mt-1">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
              transition={{ delay: 0.5 + card.delay, duration: 2, ease: "easeOut" }}
              className="bg-[#5B65DC] h-full rounded-full"
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default StatCardsGrid
