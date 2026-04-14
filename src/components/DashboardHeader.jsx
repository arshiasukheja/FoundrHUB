import React from 'react'
import { motion } from 'framer-motion'
import { Search, Bell, Mail, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const DashboardHeader = () => {
  const { user } = useAuth()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="w-full flex items-center gap-6"
    >
      <div className="flex-1">
        <div className="flex items-center gap-3 rounded-2xl bg-white border border-[#e5e7eb] px-4 py-3 shadow-[0_10px_30px_rgba(31,41,55,0.06)]">
          <Search size={16} className="text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Search for tasks, projects..."
            className="w-full text-sm text-[#1f2937] placeholder:text-[#9ca3af] outline-none bg-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="h-10 w-10 rounded-xl bg-white border border-[#e5e7eb] flex items-center justify-center text-[#6b7280] shadow-[0_10px_24px_rgba(31,41,55,0.05)]"
        >
          <Mail size={16} />
        </button>
        <button
          type="button"
          className="h-10 w-10 rounded-xl bg-white border border-[#e5e7eb] flex items-center justify-center text-[#6b7280] shadow-[0_10px_24px_rgba(31,41,55,0.05)]"
        >
          <Bell size={16} />
        </button>
        <button
          type="button"
          className="flex items-center gap-3 rounded-2xl bg-white border border-[#e5e7eb] px-3 py-2 shadow-[0_10px_24px_rgba(31,41,55,0.05)]"
        >
          <div className="h-9 w-9 rounded-xl bg-[#6b7cff]/15 flex items-center justify-center text-[#1f2937] text-sm font-semibold">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'F'}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-[#1f2937] leading-tight">{user?.name || 'Founder'}</p>
            <p className="text-xs text-[#9ca3af]">{user?.role === 'founder' ? 'Product Manager' : 'Member'}</p>
          </div>
          <ChevronDown size={16} className="text-[#9ca3af]" />
        </button>
      </div>
    </motion.div>
  )
}

export default DashboardHeader
