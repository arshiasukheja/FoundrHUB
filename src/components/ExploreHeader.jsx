import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, ChevronDown, Flame } from 'lucide-react'

const ExploreHeader = ({ onSearch, onFilterClick, sortOrder, onSort }) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value)
    onSearch(e.target.value)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mb-2"
    >
      {/* Title Section */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Flame size={14} className="text-[#5B65DC]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5B65DC]">Discovery Engine</span>
        </div>
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-serif font-bold text-[#122056] tracking-tight leading-[1.1]">
          Explore the next <br />
          <span className="text-[#5B65DC]">generation of startups.</span>
        </h1>
      </div>

      {/* Search & Controls */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Bar - Cinematic Glass Style */}
        <div className="flex-1 relative group">
          <Search
            size={20}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#122056]/30 group-focus-within:text-[#5B65DC] transition-colors"
          />
          <input
            type="text"
            placeholder="Search by name, category, or founder..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full pl-14 pr-6 py-4.5 rounded-2xl border border-[#EEF0FD] bg-white shadow-[0_4px_20px_rgba(18,32,86,0.02)] group-hover:shadow-[0_8px_30px_rgba(18,32,86,0.04)] placeholder:text-[#122056]/30 text-[#122056] font-medium focus:outline-none focus:border-[#5B65DC] focus:ring-4 focus:ring-[#5B65DC]/5 transition-all text-sm"
          />
        </div>

        <div className="flex gap-3">
          {/* Quick Sort Toggle */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSort()}
            className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-[#EEF0FD] text-[#122056] font-bold text-sm shadow-sm hover:shadow-md transition-all whitespace-nowrap min-w-[140px] justify-center"
          >
            <span className="text-[15px]">
              {sortOrder === 'trending' ? '🔥' : sortOrder === 'new' ? '✨' : '👁️'}
            </span>
            <span>
              {sortOrder === 'trending'
                ? 'Trending'
                : sortOrder === 'new'
                ? 'Recently Added'
                : 'Most Viewed'}
            </span>
            <ChevronDown size={14} className="opacity-40" />
          </motion.button>

          {/* Filter Trigger for Mobile/Tablet */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={onFilterClick}
            className="lg:hidden flex items-center gap-2 px-6 py-4 rounded-2xl bg-[#122056] text-white font-bold text-sm shadow-lg shadow-[#122056]/10"
          >
            <Filter size={18} />
            <span>Filters</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ExploreHeader
