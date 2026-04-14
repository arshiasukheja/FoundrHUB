import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard,
  BarChart3,
  Compass,
  MessageCircle,
  Settings,
  LogOut,
  ChevronDown,
  HelpCircle
} from 'lucide-react'

const SidebarMenu = ({ activeItem = 'dashboard' }) => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [isExpanded, setIsExpanded] = useState(true)

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, route: '/dashboard/founder' },
    { id: 'analytics', label: 'AI Analytics', icon: BarChart3, route: '/dashboard/ai-analytics' },
    { id: 'discovery', label: 'Discovery', icon: Compass, route: '/explore' },
    { id: 'messages', label: 'Messages', icon: MessageCircle, route: '/' },
  ]

  const generalItems = [
    { id: 'settings', label: 'Settings', icon: Settings, route: '/settings' },
    { id: 'help', label: 'Help', icon: HelpCircle, route: '/help' },
  ]

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#e5e7eb] flex flex-col px-6 py-7 backdrop-blur-2xl z-50 shadow-[4px_0_24px_rgba(31,41,55,0.04)]"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-10"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#6b7cff]/15 flex items-center justify-center text-[#1f2937] font-serif text-lg border border-white/80 shadow-lg shadow-[#6b7cff]/20">
            F
          </div>
          <div>
            <p className="font-serif font-bold text-[#1f2937] text-[15px] tracking-tight">FoundrHUB</p>
            <p className="text-[10px] text-[#9ca3af] font-bold uppercase tracking-widest">Founder Suite</p>
          </div>
        </div>
      </motion.div>

      {/* Menu Items */}
      <nav className="flex-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9ca3af] mb-3">Menu</p>
        <div className="space-y-2">
        {menuItems.map((item, i) => {
          const Icon = item.icon
          const isActive = activeItem === item.id

          return (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.route)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.5 }}
              className={`w-full group flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 relative ${
                isActive
                    ? 'bg-[#6b7cff]/18 text-[#1f2937] shadow-[0_10px_24px_rgba(31,41,55,0.08)]'
                    : 'text-[#6b7280] hover:text-[#1f2937] hover:bg-[#f5f7fb]'
              }`}
            >
              <Icon 
                size={18} 
                className={`flex-shrink-0 transition-transform duration-300 ${!isActive && 'group-hover:scale-110'}`} 
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <span className={`text-[13.5px] font-bold flex-1 text-left tracking-tight ${isActive ? 'text-[#1f2937]' : 'text-[#6b7280] group-hover:text-[#1f2937]'}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="w-1 h-3 rounded-full bg-[#6b7cff]"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
        </div>

        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#9ca3af] mt-8 mb-3">General</p>
        <div className="space-y-2">
          {generalItems.map((item, i) => {
            const Icon = item.icon
            const isActive = activeItem === item.id

            return (
              <motion.button
                key={item.id}
                onClick={() => navigate(item.route)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.05, duration: 0.5 }}
                className={`w-full group flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-300 relative ${
                  isActive
                    ? 'bg-[#6b7cff]/18 text-[#1f2937] shadow-[0_10px_24px_rgba(31,41,55,0.08)]'
                    : 'text-[#6b7280] hover:text-[#1f2937] hover:bg-[#f5f7fb]'
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className={`text-[13.5px] font-semibold flex-1 text-left tracking-tight ${isActive ? 'text-[#1f2937]' : 'text-[#6b7280] group-hover:text-[#1f2937]'}`}>
                  {item.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="pt-8 border-t border-[#e5e7eb] space-y-4"
      >
        {/* User Profile Preview */}
        <div className="px-4 py-3 rounded-2xl bg-[#f5f7fb] border border-[#e5e7eb] group cursor-pointer hover:bg-[#eef2f7] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border-2 border-white shadow-sm overflow-hidden">
              <img src="https://i.pravatar.cc/100?img=20" alt="avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-[#1f2937] truncate">{user?.name || "Founder"}</p>
              <p className="text-[10px] text-[#6b7280] font-bold truncate">{user?.role === 'founder' ? 'Verified Founder' : 'Premium Member'}</p>
            </div>
            <ChevronDown size={14} className="text-[#9ca3af]" />
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            logout()
            navigate('/', { replace: true })
          }}
          className="w-full flex items-center gap-3.5 px-5 py-3 rounded-2xl text-[#6b7280] hover:text-red-500 hover:bg-red-50 transition-all duration-300 text-[13px] font-bold"
        >
          <LogOut size={16} strokeWidth={2} />
          Logout
        </button>
      </motion.div>
    </motion.div>
  )
}

export default SidebarMenu
