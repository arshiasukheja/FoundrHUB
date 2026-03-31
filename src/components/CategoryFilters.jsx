import React from 'react'
import { motion } from 'framer-motion'

const CategoryFilters = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="mb-8 -mx-6 px-6 overflow-x-auto scrollbar-hide"
    >
      <div className="flex gap-3 min-w-min pb-2">
        {categories.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onClick={() => onCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-[#5B65DC] text-white shadow-[0_4px_16px_rgba(91,101,220,0.3)]'
                : 'bg-[#EEF0FD] text-[#122056] hover:bg-[#EEF0FD]/80'
            }`}
          >
            {category.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default CategoryFilters
