import React from 'react'
import { motion } from 'framer-motion'
import { Search, PenLine } from 'lucide-react'
import StartupCard from './StartupCard'

const StartupGrid = ({ startups, onStartupClick, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-[#EEF0FD] p-5 animate-pulse"
          >
            <div className="w-14 h-14 bg-[#EEF0FD] rounded-xl mb-4" />
            <div className="h-4 bg-[#EEF0FD] rounded mb-2" />
            <div className="h-3 bg-[#EEF0FD] rounded w-2/3 mb-4" />
            <div className="h-8 bg-[#EEF0FD] rounded-lg" />
          </div>
        ))}
      </div>
    )
  }

  if (!startups || startups.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <div className="w-16 h-16 mb-4 rounded-2xl border border-[#EEF0FD] bg-white flex items-center justify-center text-[#5B65DC]">
          <Search size={24} />
        </div>
        <h3 className="text-xl font-bold text-[#122056] mb-2">No startups found</h3>
        <p className="text-[#122056]/60 text-center max-w-md">
          Try adjusting your filters or search terms to discover more startups
        </p>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {startups.map((startup, index) => (
        <StartupCard
          key={startup.id}
          startup={startup}
          index={index}
          onClick={() => onStartupClick(startup.id)}
        />
      ))}
    </div>
  )
}

export default StartupGrid
