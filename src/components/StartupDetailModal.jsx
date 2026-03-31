import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, Bookmark, ArrowUpRight, MapPin, Briefcase, Globe, MessageCircle, TrendingUp, Users, Flame, ShieldCheck, Mail, ExternalLink } from 'lucide-react'

const StartupDetailModal = ({ startup, isOpen, onClose }) => {
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
            className="fixed inset-0 bg-[#122056]/60 backdrop-blur-md z-[100] cursor-pointer"
          />

          {/* Centered Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 lg:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col pointer-events-auto relative"
            >
              {/* Close Button Header (Desktop only) */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/80 backdrop-blur-md border border-[#EEF0FD] text-[#122056]/60 hover:text-[#5B65DC] transition-all z-20 shadow-sm"
              >
                <X size={20} />
              </button>

              {/* Scrollable Content Area */}
              <div className="overflow-y-auto overflow-x-hidden pt-0">
                
                {/* Hero / Header Section */}
                <div className="relative h-64 bg-gradient-to-br from-[#122056] to-[#5B65DC] overflow-hidden">
                  <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                  <div className="absolute bottom-[-1px] left-0 w-full h-24 bg-gradient-to-t from-white to-transparent" />
                  
                  {/* Floating Logo */}
                  <div className="absolute bottom-8 left-10">
                    <div className="w-24 h-24 rounded-[1.8rem] bg-white shadow-2xl border-4 border-white flex items-center justify-center text-4xl">
                      {startup.logo || startup.name.slice(0, 2).toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Main Identity Row */}
                <div className="px-10 pt-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                  
                  {/* Left: Info Section (2/3) */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-[#5B65DC]/10 text-[#5B65DC] text-[10px] font-bold uppercase tracking-widest">
                        {startup.category}
                      </span>
                      {startup.verified && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
                          <ShieldCheck size={12} />
                          Verified
                        </div>
                      )}
                    </div>
                    <h2 className="text-4xl font-serif font-black text-[#122056] mb-3">{startup.name}</h2>
                    <p className="text-lg text-[#122056]/60 font-medium mb-8 leading-relaxed">
                      {startup.tagline}. {startup.description}
                    </p>

                    {/* Compact Specs Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
                      <div className="p-5 rounded-2xl bg-[#FAFAFD] border border-[#EEF0FD]">
                        <div className="flex items-center gap-2 text-[#122056]/40 mb-2">
                          <MapPin size={16} />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Base</span>
                        </div>
                        <p className="text-sm font-bold text-[#122056]">{startup.location}</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-[#FAFAFD] border border-[#EEF0FD]">
                        <div className="flex items-center gap-2 text-[#122056]/40 mb-2">
                          <Briefcase size={16} />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Stage</span>
                        </div>
                        <p className="text-sm font-bold text-[#122056]">{startup.stage}</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-[#FAFAFD] border border-[#EEF0FD]">
                        <div className="flex items-center gap-2 text-[#122056]/40 mb-2">
                          <TrendingUp size={16} />
                          <span className="text-[10px] font-bold uppercase tracking-wider">Growth</span>
                        </div>
                        <p className="text-sm font-bold text-emerald-600">+{startup.growth}% Vector</p>
                      </div>
                    </div>

                    {/* Full Description / Mission */}
                    <div className="mb-10 p-8 rounded-3xl bg-[#EEF0FD]/30 border border-[#EEF0FD]/50">
                      <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#122056]/40 mb-4">Core Mission & Strategy</h3>
                      <p className="text-[15px] text-[#122056]/80 leading-relaxed">
                        We are fundamentally reimagining the {startup.category.toLowerCase()} experience through localized automation and deep ecosystem integration. 
                        In the current {startup.stage.toLowerCase()} phase, our roadmap focuses on precision scaling across tier-1 markets, ensuring 
                        that {startup.name}'s technology remains the benchmark for {startup.tagline.toLowerCase()}.
                      </p>
                    </div>
                  </div>

                  {/* Right: Actions / Sidebar (1/3) */}
                  <div className="space-y-8">
                    
                    {/* Primary Actions Card */}
                    <div className="p-8 rounded-3xl bg-[#122056] text-white overflow-hidden relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#5B65DC]/30 to-transparent opacity-50" />
                      <div className="relative z-10 flex flex-col gap-4">
                        <button className="w-full py-4 rounded-2xl bg-white text-[#122056] font-bold text-sm shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                           Connect to Founder
                           <ArrowUpRight size={16} />
                        </button>
                        <button className="w-full py-4 rounded-2xl bg-[#5B65DC] text-white font-bold text-sm hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                           Request One-Pager
                        </button>
                        <button className="w-full py-4 rounded-2xl bg-white/10 text-white font-bold text-sm border border-white/20 hover:bg-white/20 transition-all">
                           Bookmark
                        </button>
                      </div>
                    </div>

                    {/* Founders / Metrics */}
                    <div className="space-y-6">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#122056]/40 px-1">Startup Vitals</h3>
                      <div className="space-y-4">
                        {[
                          { icon: Users, label: 'Founder Count', value: '2 Founders' },
                          { icon: Globe, label: 'Public Interest', value: `${(startup.views / 100).toFixed(1)}k Views` },
                          { icon: Mail, label: 'Official Status', value: 'Open for Seed' },
                        ].map((stat, i) => (
                          <div key={i} className="flex items-center gap-4 group">
                            <div className="w-10 h-10 rounded-xl bg-[#FAFAFD] border border-[#EEF0FD] flex items-center justify-center text-[#122056]/40 transition-colors group-hover:text-[#5B65DC]">
                              <stat.icon size={18} />
                            </div>
                            <div>
                               <p className="text-[10px] font-bold text-[#122056]/30 uppercase tracking-widest">{stat.label}</p>
                               <p className="text-sm font-bold text-[#122056]">{stat.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* External Links */}
                    <div className="pt-8 border-t border-[#EEF0FD] flex items-center justify-between">
                      <div className="flex gap-4">
                         <button className="p-3 rounded-xl bg-white border border-[#EEF0FD] text-[#122056]/40 hover:text-[#5B65DC] transition-all">
                            <Globe size={20} />
                         </button>
                         <button className="p-3 rounded-xl bg-white border border-[#EEF0FD] text-[#122056]/40 hover:text-[#5B65DC] transition-all">
                            <ExternalLink size={20} />
                         </button>
                      </div>
                      <span className="text-[10px] font-bold text-[#122056]/20 uppercase tracking-widest">ID: ST-{startup.id}042</span>
                    </div>
                  </div>
                </div>

                <div className="h-20" /> {/* Spacer */}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default StartupDetailModal
