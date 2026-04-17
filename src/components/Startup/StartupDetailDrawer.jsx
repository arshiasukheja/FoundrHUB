import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, Bookmark, ArrowUpRight, MapPin, Briefcase, Globe, MessageCircle, TrendingUp, Users, Flame } from 'lucide-react'

const StartupDetailDrawer = ({ startup, isOpen, onClose }) => {
  if (!startup) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#122056]/40 backdrop-blur-md z-[100] cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-[101] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 left-6 p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-[#EEF0FD] text-[#122056]/60 hover:text-[#5B65DC] transition-all z-10"
            >
              <X size={20} />
            </button>

            {/* Header / Hero Section */}
            <div className="relative h-64 bg-[#FAFAFD] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#5B65DC]/10 to-[#122056]/10" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40">
                <div className="w-full h-full rounded-[2.5rem] bg-white shadow-xl flex items-center justify-center p-8 border border-[#EEF0FD]">
                  <div className="w-full h-full rounded-[1.8rem] bg-gradient-to-br from-[#122056] to-[#5B65DC] flex items-center justify-center text-white font-serif text-4xl font-bold">
                    {startup.logo}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-10 pt-16 pb-20">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="px-3 py-1 rounded-full bg-[#5B65DC]/10 text-[#5B65DC] text-[10px] font-bold uppercase tracking-widest">
                    {startup.category}
                  </span>
                  {startup.verified && (
                    <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
                      Verified
                    </span>
                  )}
                </div>
                <h2 className="text-4xl font-serif font-bold text-[#122056] mb-2">{startup.name}</h2>
                <p className="text-[#122056]/60 font-medium">{startup.tagline}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-12">
                <button className="flex-1 btn-primary py-4 justify-center">
                  Learn More
                </button>
                <button className="flex-1 btn-glass py-4 justify-center gap-2">
                  <Bookmark size={18} />
                  Save for Later
                </button>
              </div>

              {/* Grid Info */}
              <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="p-6 rounded-3xl bg-[#FAFAFD] border border-[#EEF0FD]">
                  <div className="flex items-center gap-3 text-[#122056]/40 mb-3">
                    <MapPin size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">Location</span>
                  </div>
                  <p className="text-lg font-bold text-[#122056]">{startup.location}</p>
                </div>
                <div className="p-6 rounded-3xl bg-[#FAFAFD] border border-[#EEF0FD]">
                  <div className="flex items-center gap-3 text-[#122056]/40 mb-3">
                    <Briefcase size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">Stage</span>
                  </div>
                  <p className="text-lg font-bold text-[#122056]">{startup.stage}</p>
                </div>
              </div>

              {/* About Section */}
              <div className="mb-12">
                <h3 className="text-lg font-serif font-bold text-[#122056] mb-4">About the Company</h3>
                <p className="text-[#122056]/70 leading-relaxed">
                  {startup.name} is revolutionizing the {startup.category} sector with cutting-edge technology and a user-centric approach. 
                  Currently in the {startup.stage} stage, they are rapidly expanding their presence in {startup.location} and beyond.
                  The team is focused on delivering exceptional value to enterprise clients and scaling their operations globally.
                </p>
              </div>

              {/* Stats Section */}
              <div className="mb-12">
                <h3 className="text-lg font-serif font-bold text-[#122056] mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-[#EEF0FD]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600"><Eye size={18} /></div>
                      <span className="text-sm font-semibold text-[#122056]/60">Platform Interest</span>
                    </div>
                    <span className="font-bold text-[#122056]">{startup.views.toLocaleString()} visits</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl border border-[#EEF0FD]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600"><TrendingUp size={18} /></div>
                      <span className="text-sm font-semibold text-[#122056]/60">Quarterly Growth</span>
                    </div>
                    <span className="font-bold text-emerald-600">+{startup.growth}% Vector</span>
                  </div>
                </div>
              </div>

              {/* Share/Connect */}
              <div className="pt-8 border-t border-[#EEF0FD]">
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 group text-[#5B65DC] font-bold">
                    <span>Contact Team</span>
                    <MessageCircle size={18} className="ml-2 group-hover:scale-110 transition-transform" />
                  </button>
                  <div className="flex gap-2">
                    {[Globe, MessageCircle].map((Icon, i) => (
                      <button key={i} className="p-4 rounded-2xl bg-white border border-[#EEF0FD] text-[#122056]/60 hover:text-[#5B65DC] hover:border-[#5B65DC]/30 transition-all">
                        <Icon size={20} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default StartupDetailDrawer
