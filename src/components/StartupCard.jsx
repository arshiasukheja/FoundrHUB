import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Bookmark, ArrowUpRight, Flame, MapPin, PenLine } from 'lucide-react'

const StartupCard = ({ startup, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -8, boxShadow: '0 16px 32px rgba(18,32,86,0.12)' }}
      onClick={onClick}
      className="bg-white rounded-2xl border border-[#EEF0FD] p-5 cursor-pointer transition-all duration-300 group overflow-hidden relative"
    >
      {/* Trending Badge */}
      {startup.isTrending && (
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold">
          <Flame size={12} />
          Trending
        </div>
      )}

      {/* Logo & Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5B65DC] to-[#122056] flex-shrink-0 flex items-center justify-center text-white font-bold text-lg">
          {startup.logo || <PenLine size={20} />}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[#122056] truncate group-hover:text-[#5B65DC] transition-colors">
            {startup.name}
          </h3>
          <p className="text-xs text-[#122056]/60 mt-0.5">{startup.tagline}</p>
        </div>
      </div>

      {/* Category & Location */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EEF0FD] text-[#5B65DC]">
          {startup.category}
        </span>
        <span className="text-xs font-semibold text-[#122056]/60 inline-flex items-center gap-1.5">
          <MapPin size={12} />
          {startup.location}
        </span>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#EEF0FD]">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1 text-[#122056]/60">
            <Eye size={14} />
            <span>{startup.views}</span>
          </div>
          <div className="flex items-center gap-1 text-[#122056]/60">
            <Bookmark size={14} />
            <span>{startup.saves}</span>
          </div>
          <div className="flex items-center gap-1 font-bold text-emerald-600">
            <ArrowUpRight size={14} />
            <span>{startup.growth}%</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#5B65DC] to-[#5B65DC]/80 text-white font-semibold text-sm hover:shadow-lg transition-all"
      >
        View Startup
      </motion.button>
    </motion.div>
  )
}

export default StartupCard
