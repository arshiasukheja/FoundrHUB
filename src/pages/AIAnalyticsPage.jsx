import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SidebarMenu from '../components/SidebarMenu'
import DashboardHeader from '../components/DashboardHeader'
import { 
  Zap, 
  Search, 
  TrendingUp, 
  Target, 
  Globe, 
  Users, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Activity,
  Cpu
} from 'lucide-react'

const InsightCard = ({ title, desc, tag, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="bg-white rounded-[2.5rem] border border-[#EEF0FD] p-8 shadow-[0_4px_24px_rgba(18,32,86,0.02)] group hover:shadow-[0_12px_44px_rgba(18,32,86,0.06)] hover:-translate-y-1 transition-all duration-500 overflow-hidden relative"
  >
    <div className="absolute top-0 right-0 p-8 transform translate-x-4 -translate-y-4 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-125 transition-all duration-700">
      <Icon size={120} />
    </div>
    
    <div className="flex items-center gap-3 mb-6">
      <div className="px-3 py-1 rounded-full bg-[#5B65DC]/5 border border-[#5B65DC]/10 text-[10px] font-black text-[#5B65DC] uppercase tracking-widest">
        {tag}
      </div>
    </div>
    
    <div className="w-12 h-12 rounded-2xl bg-[#FAFAFD] flex items-center justify-center border border-[#EEF0FD] mb-6 group-hover:bg-[#122056] group-hover:text-white transition-colors">
      <Icon size={20} />
    </div>
    
    <h3 className="text-xl font-serif font-bold text-[#122056] mb-3">{title}</h3>
    <p className="text-[13px] leading-relaxed text-[#122056]/50 mb-8 max-w-[90%]">{desc}</p>
    
    <button className="flex items-center gap-2 text-xs font-bold text-[#5B65DC] hover:text-[#122056] transition-colors leading-none">
      Implement Guide <ArrowRight size={14} />
    </button>
  </motion.div>
)

const AIScanSimulation = ({ onFinish }) => {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState('Initializing AI Core...')

  useEffect(() => {
    const stages = [
      'Scanning Infrastructure...',
      'Analyzing Competitor Vector...',
      'Optimizing Engagement Data...',
      'Deep Learning Scan Complete.'
    ]
    
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(onFinish, 800)
          return 100
        }
        const next = p + Math.random() * 8
        const stageIdx = Math.floor((next / 100) * stages.length)
        setStage(stages[Math.min(stageIdx, stages.length - 1)])
        return next
      })
    }, 150)
    
    return () => clearInterval(interval)
  }, [onFinish])

  return (
    <div className="h-[70vh] flex flex-col items-center justify-center text-center max-w-lg mx-auto">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="w-24 h-24 rounded-[2rem] bg-gradient-to-tr from-[#122056] to-[#5B65DC] flex items-center justify-center text-white shadow-2xl shadow-[#5B65DC]/20 mb-10"
      >
        <Cpu size={40} className="animate-pulse" />
      </motion.div>
      
      <h2 className="text-2xl font-serif font-bold text-[#122056] mb-3">{stage}</h2>
      <p className="text-sm text-[#122056]/40 mb-10">AI is scanning 420.4k data points across your startup ecosystem</p>
      
      <div className="w-full h-2 bg-[#EEF0FD] rounded-full overflow-hidden mb-4">
        <motion.div 
          className="h-full bg-[#122056]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-[10px] font-black text-[#5B65DC] uppercase tracking-[0.2em]">{Math.round(progress)}% Optimized</p>
    </div>
  )
}

const AIAnalyticsPage = () => {
  const [isScanning, setIsScanning] = useState(true)

  if (isScanning) {
    return (
      <div className="min-h-screen bg-[#FAFAFD] flex items-center justify-center">
        <AIScanSimulation onFinish={() => setIsScanning(false)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFD] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[40%] h-[40%] bg-[#5B65DC]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[35%] h-[35%] bg-[#122056]/5 rounded-full blur-[120px]" />
      </div>

      <SidebarMenu activeItem="analytics" />

      <div className="ml-0 lg:ml-64 relative z-10 animate-fade-in">
        <div className="sticky top-0 z-40 bg-[#FAFAFD]/80 backdrop-blur-xl border-b border-[#EEF0FD]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
            <DashboardHeader userName="Sarah Chen" />
            
            <div className="flex items-center gap-2 text-[10px] font-black text-[#122056]/30 uppercase tracking-[0.2em]">
              <Sparkles size={14} className="text-[#5B65DC]" />
              AI Insight Engine Active
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          {/* Main Hero Header */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#F5F3FF] border border-[#5B65DC]/10 text-[10px] font-black uppercase tracking-widest text-[#5B65DC]">
              <Cpu size={12} /> Analytical Vector: Alpha
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-[#122056] leading-tight max-w-3xl">
              Measures to <span className="text-[#5B65DC]">Grow & Scale</span> your reach.
            </h1>
            <p className="text-[#122056]/50 text-lg mt-5 max-w-2xl">
              AI has analyzed your startup profile and identified three critical vectors for growth. 
              Implement these measures to improve reach by <span className="text-[#122056] font-bold">+24%</span> this month.
            </p>
          </div>

          {/* Growth Insights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <InsightCard 
              tag="Reach Vector"
              title="Optimize SEO Strategy"
              desc="Based on user search intent, AI identifies 12 keywords that could double your visibility in the homegrown market."
              icon={Globe}
              delay={0.1}
            />
            <InsightCard 
              tag="Engagement Vector"
              title="Enhance Pitch Deck"
              desc="Analysis suggest that your second slide has the highest drop-off rate. Simplified data visualization is recommended."
              icon={Target}
              delay={0.2}
            />
            <InsightCard 
              tag="Conversion Vector"
              title="Investor Response"
              desc="Real-time feedback loop indicates a 42% higher interest when you respond within 4 hours. Automated follow-ups suggested."
              icon={Zap}
              delay={0.3}
            />
          </div>

          {/* Reach/Volume Data Visualization */}
          <div className="bg-[#122056] rounded-[3.5rem] p-10 lg:p-14 relative overflow-hidden group shadow-2xl shadow-[#122056]/20">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5B65DC]/20 to-transparent" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#5B65DC]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <TrendingUp size={20} className="text-white" />
                  </div>
                  <p className="text-[11px] font-black text-white/50 uppercase tracking-[0.3em]">Projected Volume</p>
                </div>
                <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">Predicted Growth Vector for April 2024.</h2>
                <p className="text-white/40 text-[15px] leading-relaxed mb-10">
                  By implementing the AI-suggested measures, your exposure to Top-Tier investors will increase by <span className="text-white font-bold">14.2x</span> in the next 30 days.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-3.5 rounded-2xl bg-white text-[#122056] text-sm font-bold shadow-xl shadow-[#122056]/10 hover:scale-[1.02] transition-all">
                    Generate Full Report
                  </button>
                </div>
              </div>
              
              <div className="flex items-end gap-3 h-64 lg:h-80 pt-10">
                {Array.from({ length: 12 }, (_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${20 + i * 7}%` }}
                    transition={{ delay: 0.8 + i * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex-1 rounded-full relative group/bar ${i === 11 ? 'bg-gradient-to-t from-[#5B65DC] to-white/20' : 'bg-white/5'}`}
                  >
                    <div className="absolute bottom-0 inset-x-0 h-1 rounded-full bg-white/20" />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white text-[#122056] text-[10px] font-black px-2 py-1 rounded shadow-xl opacity-0 group-hover/bar:opacity-100 transition-opacity">
                      +{10 + i*4}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t border-[#EEF0FD] py-10 mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between text-[11px] font-bold text-[#122056]/30 uppercase tracking-[0.2em]">
            <span>AI Analytical System v4.2.0</span>
            <div className="flex gap-8">
              <span>Security Hub</span>
              <span>Vector Logic</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default AIAnalyticsPage
