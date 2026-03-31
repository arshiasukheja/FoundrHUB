import React from 'react'
import { motion } from 'framer-motion'
import { Search, Plus, Bell } from 'lucide-react'

const DashboardHeader = ({ userName = "Sarah Chen" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
    >
      {/* Left: Greeting */}
      <div>
        <h1 className="text-3xl font-bold text-[#122056] tracking-tight">
          Hello, {userName}
        </h1>
        <p className="text-[#122056]/60 font-medium text-sm mt-1">
          Here's your startup performance
        </p>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Search Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-xl bg-white border border-[#EEF0FD] text-[#122056]/60 hover:text-[#122056] transition-colors shadow-[0_2px_8px_rgba(18,32,86,0.04)]"
        >
          <Search size={18} />
        </motion.button>

        {/* Notification Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-3 rounded-xl bg-white border border-[#EEF0FD] text-[#122056]/60 hover:text-[#122056] transition-colors shadow-[0_2px_8px_rgba(18,32,86,0.04)]"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-400" />
        </motion.button>

        {/* Add Update Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#5B65DC] to-[#122056] text-white font-semibold text-sm shadow-[0_4px_16px_rgba(91,101,220,0.3)] hover:shadow-[0_6px_24px_rgba(91,101,220,0.4)] transition-all"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add Update</span>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default DashboardHeader
