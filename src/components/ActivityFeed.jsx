import React from 'react'
import { motion } from 'framer-motion'
import { Eye, UserPlus, Bookmark, MessageCircle, Heart, Share2, Star } from 'lucide-react'

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'view',
      text: '12 people viewed your startup',
      time: '2 hours ago',
      icon: Eye,
      bg: 'bg-[#EEF2FF]', // Soft Ice Blue
      iconColor: 'text-[#5B65DC]', // Accent Blue
      count: '+12',
    },
    {
      id: 2,
      type: 'save',
      text: '3 saves today',
      time: '4 hours ago',
      icon: Bookmark,
      bg: 'bg-[#FFF1F2]', // Soft Blush
      iconColor: 'text-[#E11D48]', // Deep Rose
      count: '+3',
    },
    {
      id: 3,
      type: 'follow',
      text: '1 new collaboration request',
      time: '6 hours ago',
      icon: UserPlus,
      bg: 'bg-[#F0FDF4]', // Soft Mint
      iconColor: 'text-[#166534]', // Forest Green
      count: '+1',
    },
    {
      id: 4,
      type: 'message',
      text: '5 new messages from investors',
      time: '8 hours ago',
      icon: MessageCircle,
      bg: 'bg-[#F5F3FF]', // Soft Lavender
      iconColor: 'text-[#7C3AED]', // Deep Purple
      count: '+5',
    },
    {
      id: 5,
      type: 'engagement',
      text: 'Your demo got featured in weekly digest',
      time: '1 day ago',
      icon: Star,
      bg: 'bg-[#FFFBEB]', // Soft Amber
      iconColor: 'text-[#D97706]', // Gold
      count: '🔥',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-white rounded-[2.5rem] border border-[#EEF0FD] shadow-[0_4px_24px_rgba(18,32,86,0.04)] overflow-hidden"
    >
      {/* Header */}
      <div className="px-8 py-7 border-b border-[#EEF0FD]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-serif font-bold text-[#122056]">Live Feedback</h2>
            <p className="text-[11px] font-bold text-[#122056]/30 uppercase tracking-[0.2em] mt-1">Real-time Pulse</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#FAFAFD] border border-[#EEF0FD] flex items-center justify-center">
            <Share2 size={18} className="text-[#122056]/40" />
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-[#EEF0FD]/50">
        {activities.map((activity, i) => {
          const Icon = activity.icon
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
              className="px-8 py-5 hover:bg-[#FAFAFD] transition-all group cursor-pointer relative"
            >
              <div className="flex items-center gap-5">
                {/* Icon Container with Soft Tint */}
                <div
                  className={`w-12 h-12 rounded-2xl ${activity.bg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-500`}
                >
                  <Icon size={20} className={`${activity.iconColor}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-bold text-[#122056] group-hover:text-[#5B65DC] transition-colors leading-tight">
                    {activity.text}
                  </p>
                  <p className="text-[11px] font-semibold text-[#122056]/30 mt-1 uppercase tracking-wider">
                    {activity.time}
                  </p>
                </div>

                {/* Status Indicator */}
                <div className={`px-3 py-1 rounded-full ${activity.bg} ${activity.iconColor} text-[10px] font-black uppercase tracking-widest`}>
                  {activity.count}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Footer CTA */}
      <div className="px-8 py-6 bg-[#FAFAFD]/50 border-t border-[#EEF0FD]">
        <button className="w-full text-xs font-bold text-[#5B65DC] hover:text-[#122056] transition-colors text-center uppercase tracking-[0.2em]">
          Access Extended History →
        </button>
      </div>
    </motion.div>
  )
}

export default ActivityFeed
