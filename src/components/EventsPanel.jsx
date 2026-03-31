import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Video } from 'lucide-react'

const EventsPanel = () => {
  const events = [
    {
      id: 1,
      title: 'Product Demo Call',
      date: 'Today',
      time: '2:30 PM',
      type: 'video',
      icon: Video,
      color: 'from-blue-400 to-indigo-500',
      description: 'With Sequoia Capital partner',
    },
    {
      id: 2,
      title: 'Investor Meeting',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'in-person',
      icon: MapPin,
      color: 'from-purple-400 to-pink-500',
      description: 'Sand Hill Road, Palo Alto',
    },
    {
      id: 3,
      title: 'Product Launch Event',
      date: 'Mar 28',
      time: '6:00 PM',
      type: 'event',
      icon: Calendar,
      color: 'from-emerald-400 to-teal-500',
      description: 'Product Hunt launch day',
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-white rounded-2xl border border-[#EEF0FD] shadow-[0_4px_24px_rgba(18,32,86,0.04)] overflow-hidden"
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-[#EEF0FD]">
        <h2 className="text-lg font-bold text-[#122056]">Upcoming Events</h2>
        <p className="text-xs text-[#122056]/50 mt-1">Next 3 important dates</p>
      </div>

      {/* Events List */}
      <div className="divide-y divide-[#EEF0FD]">
        {events.map((event, i) => {
          const Icon = event.icon
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
              whileHover={{ backgroundColor: '#FAFAFD' }}
              className="px-6 py-5 cursor-pointer transition-colors group"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${event.color} flex items-center justify-center text-white flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}
                >
                  <Icon size={18} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-[#122056] group-hover:text-[#5B65DC] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-[#122056]/50 mt-1">
                    {event.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs font-semibold text-[#122056]/70 flex items-center gap-1">
                      <Calendar size={12} />
                      {event.date}
                    </span>
                    <span className="text-xs font-semibold text-[#122056]/70 flex items-center gap-1">
                      <Clock size={12} />
                      {event.time}
                    </span>
                  </div>
                </div>

                {/* Badge */}
                <div className="flex-shrink-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block ${
                    event.type === 'video'
                      ? 'bg-blue-50 text-blue-600'
                      : event.type === 'in-person'
                      ? 'bg-purple-50 text-purple-600'
                      : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {event.type === 'video' ? 'Video' : event.type === 'in-person' ? 'In-Person' : 'Event'}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Footer CTA */}
      <div className="px-6 py-4 bg-[#FAFAFD] border-t border-[#EEF0FD]">
        <button className="w-full text-sm font-semibold text-[#5B65DC] hover:text-[#122056] transition-colors text-center">
          View Calendar →
        </button>
      </div>
    </motion.div>
  )
}

export default EventsPanel
