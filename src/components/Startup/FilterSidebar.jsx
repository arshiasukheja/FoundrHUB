import React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

const FilterSidebar = ({ isOpen, onClose, filters, onFilterChange }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -400, opacity: 0 }}
        animate={{ x: isOpen ? 0 : -400, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed md:relative left-0 top-0 h-screen md:h-auto w-80 bg-white border-r border-[#EEF0FD] p-6 overflow-y-auto z-40 md:z-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-lg font-bold text-[#122056]">Filters</h2>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-[#FAFAFD] rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter Sections */}
        <div className="space-y-6">
          {/* Location Filter */}
          <div>
            <p className="text-sm font-bold text-[#122056] mb-3 uppercase tracking-wide">
              Location
            </p>
            <div className="space-y-2">
              {['All India', 'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Pune'].map(
                (location) => (
                  <label
                    key={location}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#FAFAFD] cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded accent-[#5B65DC]"
                      defaultChecked={location === 'All India'}
                      onChange={(e) =>
                        onFilterChange('location', location, e.target.checked)
                      }
                    />
                    <span className="text-sm text-[#122056]">{location}</span>
                  </label>
                )
              )}
            </div>
          </div>

          {/* Stage Filter */}
          <div className="pt-4 border-t border-[#EEF0FD]">
            <p className="text-sm font-bold text-[#122056] mb-3 uppercase tracking-wide">
              Stage
            </p>
            <div className="space-y-2">
              {['Idea', 'MVP', 'Growth', 'Scale'].map((stage) => (
                <label
                  key={stage}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#FAFAFD] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded accent-[#5B65DC]"
                    onChange={(e) => onFilterChange('stage', stage, e.target.checked)}
                  />
                  <span className="text-sm text-[#122056]">{stage}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="pt-4 border-t border-[#EEF0FD]">
            <p className="text-sm font-bold text-[#122056] mb-3 uppercase tracking-wide">
              Category
            </p>
            <div className="space-y-2">
              {['AI/ML', 'SaaS', 'D2C', 'FinTech', 'Web3', 'Health'].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#FAFAFD] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded accent-[#5B65DC]"
                    onChange={(e) => onFilterChange('category', cat, e.target.checked)}
                  />
                  <span className="text-sm text-[#122056]">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Toggle Filters */}
          <div className="pt-4 border-t border-[#EEF0FD] space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg bg-[#FAFAFD] cursor-pointer">
              <span className="text-sm font-semibold text-[#122056]">Verified Only</span>
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-[#5B65DC]"
                onChange={(e) => onFilterChange('verified', true, e.target.checked)}
              />
            </label>
            <label className="flex items-center justify-between p-3 rounded-lg bg-[#FAFAFD] cursor-pointer">
              <span className="text-sm font-semibold text-[#122056]">Trending Only</span>
              <input
                type="checkbox"
                className="w-4 h-4 rounded accent-[#5B65DC]"
                onChange={(e) => onFilterChange('trending', true, e.target.checked)}
              />
            </label>
          </div>

          {/* Reset Button */}
          <button className="w-full py-2.5 rounded-lg border border-[#EEF0FD] text-[#122056] font-semibold text-sm hover:bg-[#FAFAFD] transition-all">
            Reset Filters
          </button>
        </div>
      </motion.div>
    </>
  )
}

export default FilterSidebar
