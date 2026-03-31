import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import SidebarMenu from '../components/SidebarMenu'
import DashboardHeader from '../components/DashboardHeader'
import StatCardsGrid from '../components/StatCardsGrid'
import TasksSection from '../components/TasksSection'
import ActivityFeed from '../components/ActivityFeed'
import StatisticsGrid from '../components/StatisticsGrid'
import EventsPanel from '../components/EventsPanel'
import { TrendingUp, ArrowUpRight, Zap, Bell, Search } from 'lucide-react'

const FounderDashboard = () => {
  const navigate = useNavigate()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
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
        <div className="absolute bottom-[20%] left-[-10%] w-[30%] h-[40%] bg-[#122056]/5 rounded-full blur-[100px]" />
      </div>

      {/* Sidebar */}
      <SidebarMenu activeItem="dashboard" />

      {/* Main Content */}
      <div className="ml-0 lg:ml-64 relative z-10">
        
        {/* Cinematic Sticky Header */}
        <div className="sticky top-0 z-40 bg-[#FAFAFD]/80 backdrop-blur-xl border-b border-[#EEF0FD]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
            <DashboardHeader userName="Sarah Chen" />
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-[#EEF0FD] shadow-sm text-[#122056]/40">
                <Search size={16} />
                <span className="text-xs font-medium">Search anything...</span>
                <span className="text-[10px] bg-[#EEF0FD] px-1.5 py-0.5 rounded-md font-bold text-[#122056]/60">⌘K</span>
              </div>
              <button className="p-2.5 rounded-xl bg-white border border-[#EEF0FD] text-[#122056]/60 hover:text-[#5B65DC] transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <motion.main 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-6 lg:px-10 py-10"
        >
          {/* Welcome Teaser */}
          <motion.div variants={itemVariants} className="mb-10">
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white border border-[#EEF0FD] shadow-sm">
              <Zap size={12} className="text-[#5B65DC] fill-[#5B65DC]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#5B65DC]">Your morning briefing is ready</span>
            </div>
            <h1 className="font-serif text-[2.4rem] text-[#122056] leading-tight">
              Good morning, <span className="text-[#5B65DC]">Sarah.</span>
            </h1>
            <p className="text-[#122056]/50 text-sm mt-2 max-w-xl">
              You've had <span className="text-[#122056] font-bold">124 new views</span> on your profile since yesterday. 
              Three investors are waiting for your pitch deck response.
            </p>
          </motion.div>

          {/* Stat Cards Grid - Phase In */}
          <motion.div variants={itemVariants} className="mb-10">
            <StatCardsGrid />
          </motion.div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Left Column (Main Feed) */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* Activity Feed */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-6 px-2">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#122056]/40">Real-time Activity</h3>
                  <button className="text-[11px] font-bold text-[#5B65DC] hover:underline">View History</button>
                </div>
                <ActivityFeed />
              </motion.div>
            </div>

            {/* Right Column (Sidebar Widgets) */}
            <div className="space-y-10">
              
              {/* Metrics Widget */}
              <motion.div variants={itemVariants}>
                <div className="flex items-start justify-between mb-6 px-1">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#122056]">Growth Analytics</h3>
                    <p className="text-[10px] font-bold text-[#122056]/40 uppercase tracking-widest mt-1">Tier 1 Performance</p>
                  </div>
                  <div className="p-2 rounded-xl bg-[#EEF0FD]/50 text-[#5B65DC]">
                    <TrendingUp size={18} />
                  </div>
                </div>
                <div className="glass-card p-6 border border-[#EEF0FD]">
                  <StatisticsGrid />
                </div>
              </motion.div>

              {/* Events/Calendar Widget */}
              <motion.div variants={itemVariants}>
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#122056]/40 mb-6 px-1">Upcoming Events</h3>
                <EventsPanel />
              </motion.div>
            </div>
          </div>

          {/* Cinematic Growth Insight Chart */}
          <motion.div
            variants={itemVariants}
            className="mt-12 glass-card-dark p-8 relative overflow-hidden group shadow-2xl shadow-[#122056]/20"
          >
            {/* Abstract Background for Chart */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#5B65DC]/10 rounded-full blur-[100px] -mr-48 -mt-48 transition-transform duration-1000 group-hover:scale-110" />
            
            <div className="relative z-10">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#5B65DC]">Platform Performance</span>
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-white">Monthly Growth Vector</h2>
                  <p className="text-white/40 text-sm mt-1">Average daily engagement rate is up <span className="text-emerald-400 font-bold">+24%</span></p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60">Mar 2024</span>
                </div>
              </div>

              {/* Enhanced Bar Chart */}
              <div className="flex items-end justify-between gap-1.5 h-48 py-4">
                {Array.from({ length: 30 }, (_, i) => ({
                  day: i + 1,
                  value: Math.floor(Math.random() * 80) + 20,
                })).map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: `${point.value}%`, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.02, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 rounded-full bg-white/5 relative group/bar cursor-crosshair"
                  >
                    <div className={`absolute inset-0 rounded-full transition-all duration-500 origin-bottom ${i >= 25 ? 'bg-[#5B65DC]' : 'bg-white/10 group-hover/bar:bg-white/30'}`} />
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white text-[#122056] text-[10px] font-bold px-2 py-1 rounded shadow-xl opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none text-nowrap">
                      Day {point.day}: {point.value * 12} views
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-10">
                  <div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Total Reach</p>
                    <p className="text-xl font-bold text-white">1.4M</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Conversion</p>
                    <p className="text-xl font-bold text-white">4.8%</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold text-[#5B65DC] hover:text-white transition-colors">
                  Detailed Insights <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Final Call-to-Action Card */}
          <motion.div
            variants={itemVariants}
            className="mt-10 glass-card p-10 border border-[#EEF0FD] relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-serif font-bold text-[#122056] mb-3">Unlock Venture-Scale Visibility</h2>
                <p className="text-[#122056]/60 text-[15px] max-w-lg">
                  Premium founders get featured on the "Trending" feed for 24 hours. 
                  Start building your brand authority today with our advanced analytics suite.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => navigate('/profile')}
                  className="btn-primary"
                >
                  Boost Profile
                </button>
                <button className="btn-glass">
                  View Roadmap
                </button>
              </div>
            </div>
          </motion.div>
        </motion.main>

        {/* Minimal Footer */}
        <footer className="border-t border-[#EEF0FD] py-10 mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-bold text-[#122056]/30 uppercase tracking-widest">
            <span>© 2024 FoundrHUB Platform System</span>
            <div className="flex gap-8">
              <a href="#" className="hover:text-[#5B65DC] transition-colors">Status</a>
              <a href="#" className="hover:text-[#5B65DC] transition-colors">API Docs</a>
              <a href="#" className="hover:text-[#5B65DC] transition-colors">Privacy</a>
            </div>
          </div>
        </footer>
      </div>
      <TasksSection />
    </div>
  )
}

export default FounderDashboard
