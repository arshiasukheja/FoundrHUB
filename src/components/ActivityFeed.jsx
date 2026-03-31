import React from 'react'
import { motion } from 'framer-motion'
import { Eye, UserPlus, Bookmark, MessageCircle, Heart } from 'lucide-react'

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'view',
      text: '12 people viewed your startup',
      time: '2 hours ago',
      icon: Eye,
      color: 'from-blue-400 to-indigo-500',
      count: '+12',
    },
    {
      id: 2,
      type: 'save',
      text: '3 saves today',
      time: '4 hours ago',
      icon: Bookmark,
      color: 'from-pink-400 to-rose-500',
      count: '+3',
    },
    {
      id: 3,
      type: 'follow',
      text: '1 new collaboration request',
      time: '6 hours ago',
      icon: UserPlus,
      color: 'from-emerald-400 to-teal-500',
      count: '+1',
    },
    {
      id: 4,
      type: 'message',
      text: '5 new messages from investors',
      time: '8 hours ago',
      icon: MessageCircle,
      color: 'from-purple-400 to-pink-500',
      count: '+5',
    },
    {
      id: 5,
      type: 'engagement',
      text: 'Your demo got featured in weekly digest',
      time: '1 day ago',
      icon: Heart,
      color: 'from-red-400 to-pink-500',
      count: '⭐',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="bg-white rounded-2xl border border-[#EEF0FD] shadow-[0_4px_24px_rgba(18,32,86,0.04)] overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#EEF0FD]">
        <h2 className="text-lg font-bold text-[#122056]">Startup Activity</h2>
        <p className="text-xs text-[#122056]/50 mt-1">Recent actions and engagement</p>
      </div>

      {/* Activity List */}
      <div className="divide-y divide-[#EEF0FD]">
        {activities.map((activity, i) => {
          const Icon = activity.icon
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
              className="px-6 py-4 hover:bg-[#FAFAFD] transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center text-white flex-shrink-0 shadow-md`}
                >
                  <Icon size={18} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#122056] group-hover:text-[#5B65DC] transition-colors">
                    {activity.text}
                  </p>
                  <p className="text-xs text-[#122056]/50 mt-0.5">
                    {activity.time}
                  </p>
                </div>

                {/* Count Badge */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${activity.color} flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                  {activity.count}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Footer CTA */}
      <div className="px-6 py-4 bg-[#FAFAFD] border-t border-[#EEF0FD]">
        <button className="w-full text-sm font-semibold text-[#5B65DC] hover:text-[#122056] transition-colors text-center">
          View All Activity →
        </button>
      </div>
    </motion.div>
  )
}

export default ActivityFeed
