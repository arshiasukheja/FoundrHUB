import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Bookmark, ArrowUpRight, Flame, MapPin, Briefcase } from 'lucide-react'

const StartupListRow = ({ startup, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ x: 10, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
      onClick={onClick}
      className="group bg-white/70 backdrop-blur-md border border-[#EEF0FD] p-5 rounded-3xl cursor-pointer transition-all duration-300 flex flex-col md:flex-row items-center gap-6 shadow-[0_4px_24px_rgba(18,32,86,0.02)] hover:shadow-[0_12px_40px_rgba(18,32,86,0.06)] mb-4"
    >
      {/* Logo Section */}
      <div className="relative flex-shrink-0">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#122056] to-[#5B65DC] flex items-center justify-center text-white font-serif text-2xl shadow-lg border border-white/10 group-hover:scale-105 transition-transform duration-500">
          {startup.logo}
        </div>
        {startup.isTrending && (
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white animate-pulse">
            <Flame size={14} fill="currentColor" />
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex-1 min-w-0 text-center md:text-left">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
          <h3 className="text-xl font-serif font-bold text-[#122056] group-hover:text-[#5B65DC] transition-colors line-clamp-1">
            {startup.name}
          </h3>
          <span className="px-3 py-1 rounded-full bg-[#EEF0FD] text-[#5B65DC] text-[10px] font-bold uppercase tracking-wider">
            {startup.category}
          </span>
          {startup.verified && (
            <span className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
          )}
        </div>
        <p className="text-[#122056]/60 text-sm leading-relaxed mb-4 md:mb-0 line-clamp-1 md:line-clamp-2 max-w-2xl">
          {startup.tagline}
        </p>
      </div>

      {/* Metadata Section */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 border-t md:border-t-0 md:border-l border-[#EEF0FD] pt-4 md:pt-0 md:pl-10">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-1.5 text-[#122056]/40">
            <MapPin size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Location</span>
          </div>
          <span className="text-sm font-semibold text-[#122056]">{startup.location}</span>
        </div>
        
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-1.5 text-[#122056]/40">
            <Briefcase size={14} />
            <span className="text-[10px] font-bold uppercase tracking-wider">Stage</span>
          </div>
          <span className="text-sm font-semibold text-[#122056]">{startup.stage}</span>
        </div>

        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-1.5 text-[#122056]/40">
            <ArrowUpRight size={14} className="text-emerald-500" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Growth</span>
          </div>
          <span className="text-sm font-bold text-emerald-600">+{startup.growth}%</span>
        </div>
      </div>

      {/* Action Section */}
      <div className="flex-shrink-0">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#122056', color: '#fff' }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-2xl border border-[#EEF0FD] text-[#122056] font-bold text-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#122056]/10"
        >
          Details
        </motion.button>
      </div>
    </motion.div>
  )
}

export default StartupListRow
