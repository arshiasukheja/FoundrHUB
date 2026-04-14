import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, MessageSquare, ThumbsUp, SlidersHorizontal, LayoutGrid, List, ArrowUpRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SidebarMenu from '../components/SidebarMenu'
import DashboardHeader from '../components/DashboardHeader'
import StartupDetailModal from '../components/StartupDetailModal'
import { useAuth } from '../context/AuthContext'
import { useRealtimeValue } from '../lib/realtime'
import { buildDefaultUserData } from '../lib/seedData'

const ExplorePage = ({ embedded = false }) => {
  const { user } = useAuth()
  const [selectedStartup, setSelectedStartup] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [viewType, setViewType] = useState('grid')
  const fallback = useMemo(() => buildDefaultUserData({}).discovery, [])
  const { value: discoveryData } = useRealtimeValue(
    user?.uid ? `users/${user.uid}/discovery` : null,
    fallback
  )
  const startups = discoveryData?.startups || []

  const filteredStartups = useMemo(() => {
    const q = searchValue.trim().toLowerCase()
    if (!q) return startups
    return startups.filter((startup) =>
      [startup.name, startup.tagline, startup.category, startup.location, startup.stage]
        .some((field) => field.toLowerCase().includes(q))
    )
  }, [searchValue, startups])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  }

  const mainContent = (
    <main className={`max-w-7xl mx-auto px-6 lg:px-10 ${embedded ? 'py-6' : 'py-12'} relative z-10`}>
        
        {/* Compact Search Bar */}
        <div className="max-w-5xl mx-auto mb-10 relative">
          <div className="flex flex-col md:flex-row items-stretch gap-3 p-2 rounded-[2rem] bg-white border border-[#EEF0FD] shadow-[0_6px_28px_rgba(18,32,86,0.04)] focus-within:shadow-[0_10px_40px_rgba(91,101,220,0.1)] focus-within:border-[#5B65DC]/20 transition-all duration-500">
             
            {/* Search Input Part */}
            <div className="flex-1 relative flex items-center group">
              <input 
                type="text" 
                placeholder="Search ideas, founders, or keywords..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-6 pr-6 bg-transparent h-14 text-base text-[#122056] placeholder:text-[#122056]/20 focus:outline-none"
              />
            </div>

            {/* View & Filter Toggles */}
            <div className="flex items-center gap-2 px-3">
              <div className="hidden sm:flex items-center p-1.5 rounded-2xl bg-[#FAFAFD] border border-[#EEF0FD]">
                <button 
                  onClick={() => setViewType('grid')}
                  className={`p-2.5 rounded-xl transition-all ${viewType === 'grid' ? 'bg-white text-[#5B65DC] shadow-sm' : 'text-[#122056]/30 hover:text-[#122056]/60'}`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewType('list')}
                  className={`p-2.5 rounded-xl transition-all ${viewType === 'list' ? 'bg-white text-[#5B65DC] shadow-sm' : 'text-[#122056]/30 hover:text-[#122056]/60'}`}
                >
                  <List size={18} />
                </button>
              </div>
              
              <button className="flex items-center gap-2 px-5 h-11 rounded-2xl bg-[#122056] text-white font-bold text-sm shadow-xl shadow-[#122056]/20 hover:scale-[1.02] transition-all">
                 <SlidersHorizontal size={18} />
                 <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="flex items-center justify-center gap-5 mt-4 overflow-x-auto no-scrollbar pb-2">
            {['All Ideas', 'Sustainability', 'FinTech', 'Artificial Intelligence', 'Future of Work', 'Social Impact'].map((cat, i) => (
              <button key={i} className="text-[11px] font-bold uppercase tracking-widest text-[#122056]/30 hover:text-[#5B65DC] transition-colors whitespace-nowrap">
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Full Width Masonry-Style Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredStartups.map((startup) => (
            <motion.div 
              key={startup.id}
              variants={itemVariants}
              onClick={() => setSelectedStartup(startup)}
              className="glass-card group cursor-pointer h-full flex flex-col"
            >
              <div className="p-6 flex flex-col h-full">
                {/* Header Context */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#FAFAFD] border border-[#EEF0FD] group-hover:bg-[#5B65DC]/5 transition-all duration-500 flex items-center justify-center text-3xl">
                    {startup.logo}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#5B65DC] bg-[#5B65DC]/5 px-2.5 py-1 rounded-full mb-2">
                      {startup.category}
                    </span>
                    <p className="text-[10px] font-bold text-[#122056]/20 group-hover:text-[#122056]/40 transition-colors uppercase tracking-widest">
                      {startup.stage}
                    </p>
                    <span className="mt-2 text-[11px] font-bold text-[#1f2937] bg-[#eef2ff] px-2.5 py-1 rounded-full">
                      Readiness {startup.readiness}
                    </span>
                  </div>
                </div>

                {/* Cover Image (if any) */}
                 {startup.image && (
                   <div className="aspect-[16/10] mb-6 rounded-[1.5rem] overflow-hidden border border-[#EEF0FD] relative">
                     <div className="absolute inset-0 bg-[#122056]/5 group-hover:bg-transparent transition-colors z-10" />
                     <img src={startup.image} alt={startup.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                   </div>
                )}

                {/* Identity */}
                <div className="flex-1">
                  <h3 className="text-xl font-serif font-black text-[#122056] leading-tight mb-3 group-hover:text-[#5B65DC] transition-colors">
                    {startup.name}
                  </h3>
                  <p className="text-[15px] font-medium text-[#122056]/50 group-hover:text-[#122056]/70 leading-relaxed transition-colors">
                    {startup.tagline}. {startup.description}
                  </p>
                </div>

                {/* Social Proof */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#EEF0FD]">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-[11px] font-bold text-[#122056]/30">
                      <ThumbsUp size={14} className="text-[#5B65DC]/40" />
                      <span>{(startup.views / 15).toFixed(0)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-[#122056]/30 text-nowrap">
                      <MessageSquare size={14} className="text-[#5B65DC]/40" />
                      <span>{Math.floor(Math.random() * 40)} Comments</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-[#5B65DC] group-hover:translate-x-1 transition-transform">
                    <span className="text-[10px] uppercase tracking-widest">Profile</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Trigger */}
        <div className="mt-20 flex justify-center">
          <button className="flex items-center gap-3 px-10 py-5 rounded-3xl bg-white border border-[#EEF0FD] text-[#122056] font-bold text-sm tracking-widest uppercase hover:bg-[#122056] hover:text-white hover:border-[#122056] transition-all duration-500 shadow-sm">
             Load More Ideas
             <ChevronDown size={14} className="opacity-40" />
          </button>
        </div>
    </main>
  )

  return (
    <div className={`min-h-screen ${embedded ? 'bg-[#f5f7fb]' : 'bg-[#FAFAFD]'} relative overflow-hidden`}>
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-[#5B65DC]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[30%] h-[40%] bg-[#122056]/30 rounded-full blur-[100px] opacity-10" />
      </div>

      {embedded ? <SidebarMenu activeItem="discovery" /> : <Navbar />}

      {embedded ? (
        <div className="ml-0 lg:ml-64 relative z-10">
          <div className="sticky top-0 z-40 bg-[#f5f7fb]/90 backdrop-blur-xl border-b border-[#e5e7eb]">
            <div className="w-full px-6 lg:px-10 py-4 flex items-center justify-between gap-4">
              <DashboardHeader />
              <div />
            </div>
          </div>
          {mainContent}
        </div>
      ) : (
        mainContent
      )}

      {!embedded && <Footer />}

      {/* Modern Center Modal */}
      <StartupDetailModal
        startup={selectedStartup}
        isOpen={!!selectedStartup}
        onClose={() => setSelectedStartup(null)}
      />
    </div>
  )
}

export default ExplorePage
