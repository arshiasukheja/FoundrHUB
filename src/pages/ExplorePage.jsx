import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ChevronDown, MessageSquare, ThumbsUp, Zap, SlidersHorizontal, LayoutGrid, List, ArrowUpRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import StartupDetailModal from '../components/StartupDetailModal'

const ExplorePage = () => {
  const [selectedStartup, setSelectedStartup] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [viewType, setViewType] = useState('grid')

  const startups = [
    {
      id: 1,
      name: 'Arcadia',
      tagline: 'High-quality Gaming Everywhere',
      logo: '🎮',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
      description: 'Arcadia adalah platform game berbasis cloud yang memungkinkan pengguna untuk melakukan streaming game berlisensi resmi berkualitas tinggi...',
      views: 28430,
      growth: 45,
      category: 'Gaming',
      location: '📍 Bangalore',
      stage: 'Growth',
      verified: true
    },
    {
      id: 2,
      name: 'SkillSprint',
      tagline: 'Akademi Upskilling Internal',
      logo: '🚀',
      description: 'Platform internal berbasis gamifikasi yang memungkinkan karyawan mengikuti pelatihan keterampilan baru yang sesuai dengan kebutuhan...',
      views: 19240,
      growth: 32,
      category: 'EdTech',
      location: '📍 Delhi',
      stage: 'Seed',
      verified: true
    },
    {
      id: 3,
      name: 'GreenOps',
      tagline: 'Startup Pengelolalaan Limbah Kantor',
      logo: '🌿',
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80',
      description: 'Solusi berbasis IoT yang melacak penggunaan sumber daya di kantor (kertas, plastik, listrik) dan memberikan rekomendasi untuk mengurangi lim...',
      views: 15620,
      growth: 58,
      category: 'Sustainability',
      location: '📍 Mumbai',
      stage: 'Scale',
      verified: true
    },
    {
       id: 4,
       name: 'CulturePulse',
       tagline: 'Analitik Budaya Perusahaan',
       logo: '💓',
       image: 'https://images.unsplash.com/photo-1522071823991-b5ae72643156?auto=format&fit=crop&q=80',
       description: 'Platform yang menggunakan survei anonim dan analisis sentimen untuk mengukur kebahagiaan karyawan, mendeteksi potensi burnout, serta m...',
       views: 31560,
       growth: 72,
       category: 'Well-being',
       location: '📍 Bangalore',
       stage: 'Growth',
       verified: true
    },
    {
      id: 5,
      name: 'TalentX',
      tagline: 'Karyawan sebagai Jasa Eksternal',
      logo: '👔',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80',
      description: 'Platform yang memungkinkan karyawan dengan keahlian tertentu (misalnya data science, UX design, atau strategi bisnis) untuk menawarkan...',
      views: 42310,
      growth: 24,
      category: 'Future of Work',
      location: '📍 Delhi',
      stage: 'Growth',
      verified: true
    },
    {
       id: 6,
       name: 'Insightly',
       tagline: 'AI untuk Analisis Pelanggan',
       logo: '💡',
       description: 'Sebuah startup internal yang menggunakan AI untuk menganalisis feedback pelanggan dari berbagai kanal (email, chat, media sosial) dan m...',
       views: 8420,
       growth: 15,
       category: 'AI',
       location: '📍 Mumbai',
       stage: 'Seed',
       verified: false
    }
  ]

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

  return (
    <div className="min-h-screen bg-[#FAFAFD] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-[#5B65DC]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[30%] h-[40%] bg-[#122056]/30 rounded-full blur-[100px] opacity-10" />
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-10 py-16 relative z-10">
        
        {/* Cinematic Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white border border-[#EEF0FD] shadow-sm">
            <Zap size={14} className="text-[#5B65DC]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5B65DC]">Discovery Platform</span>
          </div>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-serif font-black text-[#122056] tracking-tighter leading-none mb-6">
            The <span className="text-[#5B65DC]">Founder</span> Ecosystem.
          </h1>
          <p className="text-[#122056]/50 text-xl max-w-2xl mx-auto font-medium">
            Discover South Asia's most promising startups. Find your next partner, investment, or inspiration.
          </p>
        </motion.div>

        {/* Multi-Component Search Bar UI */}
        <div className="max-w-4xl mx-auto mb-20 relative">
          <div className="flex flex-col md:flex-row items-stretch gap-4 p-2.5 rounded-[2.5rem] bg-white border border-[#EEF0FD] shadow-[0_8px_40px_rgba(18,32,86,0.04)] focus-within:shadow-[0_12px_60px_rgba(91,101,220,0.1)] focus-within:border-[#5B65DC]/20 transition-all duration-500">
             
            {/* Search Input Part */}
            <div className="flex-1 relative flex items-center group">
              <Search size={22} className="absolute left-6 text-[#122056]/20 group-focus-within:text-[#5B65DC] transition-colors" />
              <input 
                type="text" 
                placeholder="Search ideas, founders, or keywords..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-16 pr-6 bg-transparent h-16 text-lg text-[#122056] placeholder:text-[#122056]/20 focus:outline-none"
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
              
              <button className="flex items-center gap-2 px-6 h-12 rounded-2xl bg-[#122056] text-white font-bold text-sm shadow-xl shadow-[#122056]/20 hover:scale-[1.02] transition-all">
                 <SlidersHorizontal size={18} />
                 <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="flex items-center justify-center gap-6 mt-6 overflow-x-auto no-scrollbar pb-2">
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
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10`}
        >
          {startups.map((startup) => (
            <motion.div 
              key={startup.id}
              variants={itemVariants}
              onClick={() => setSelectedStartup(startup)}
              className="glass-card group cursor-pointer h-full flex flex-col"
            >
              <div className="p-8 flex flex-col h-full">
                {/* Header Context */}
                <div className="flex items-start justify-between mb-8">
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
                  </div>
                </div>

                {/* Cover Image (if any) */}
                {startup.image && (
                   <div className="aspect-[16/10] mb-8 rounded-[1.8rem] overflow-hidden border border-[#EEF0FD] relative">
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
                <div className="flex items-center justify-between mt-10 pt-8 border-t border-[#EEF0FD]">
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

      <Footer />

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
