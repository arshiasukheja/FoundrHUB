import React, { useEffect, useState } from 'react'
import { motion, animate, useInView } from 'framer-motion'
import { Eye, Bookmark, MessageSquare, Users2 } from 'lucide-react'

const Counter = ({ value, duration = 1.2, delay = 0.2 }) => {
  const [display, setDisplay] = useState(0)
  const nodeRef = React.useRef(null)
  const isInView = useInView(nodeRef, { once: true })

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setDisplay(Math.floor(latest)),
      })
      return () => controls.stop()
    }
  }, [value, duration, delay, isInView])

  return <span ref={nodeRef}>{display.toLocaleString()}</span>
}

const AnalyticsStat = ({ icon: Icon, label, value, change, delay, suffix = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="flex-1"
  >
    <div className="flex items-center gap-2 mb-4">
      <div className="p-1 rounded-md text-neutral-400">
        <Icon size={14} strokeWidth={1.5} />
      </div>
      <span className="text-[10px] font-bold text-emerald-500">+{change}</span>
    </div>
    <p className="text-3xl font-bold text-[#122056] leading-none mb-1.5 tabular-nums tracking-tight">
      <Counter value={value} delay={delay + 0.2} />{suffix}
    </p>
    <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-[0.14em]">{label}</p>
  </motion.div>
)

const DiscoverySource = ({ label, value, percentage, delay }) => (
  <div className="mb-6">
    <div className="flex justify-between items-end mb-2">
      <p className="text-[11px] font-bold text-[#122056]">{label}</p>
      <p className="text-[10px] font-medium text-neutral-400">{percentage}%</p>
    </div>
    <div className="w-full h-1 bg-[#EEF0FD] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="h-full bg-[#122056] rounded-full"
      />
    </div>
  </div>
)

const DashboardPreview = () => {
  const [activeRange, setActiveRange] = useState('30D')
  const barData = [20, 30, 25, 40, 35, 45, 55, 40, 65, 60, 75, 85, 80, 95, 90, 100, 85, 90, 80, 95]
  
  return (
    <div className="w-full bg-[#FAFAFD] py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto p-1 bg-white border border-[#EEF0FD] rounded-[2.5rem] shadow-[0_32px_120px_rgba(18,32,86,0.03)]"
      >
        {/* Header Bar */}
        <div className="px-8 py-6 flex items-center justify-between border-b border-[#EEF0FD]">
          <div className="flex items-center gap-4">
             <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
               <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
               <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
             </div>
             <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest pl-2 border-l border-[#EEF0FD]">
               FoundrHUB Analytics — <span className="text-neutral-500">Bloomcraft Studio</span>
             </span>
          </div>
          
          <div className="flex items-center bg-[#FAFAFD] rounded-xl p-1 border border-[#EEF0FD]">
            {['7D', '30D', '90D'].map(range => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-300 ${
                  activeRange === range 
                  ? 'bg-[#122056] text-white shadow-md' 
                  : 'text-neutral-400 hover:text-neutral-900'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="px-10 py-12">
          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-12 mb-20">
            <AnalyticsStat icon={Eye} label="Profile Views" value={2847} change="24%" delay={0.1} />
            <AnalyticsStat icon={Bookmark} label="Saves" value={342} change="18%" delay={0.2} />
            <AnalyticsStat icon={MessageSquare} label="Story Engagement" value={89} change="5" suffix="%" delay={0.3} />
            <AnalyticsStat icon={Users2} label="Inbound Leads" value={27} change="9" delay={0.4} />
          </div>

          <div className="grid grid-cols-12 gap-20">
            {/* Chart View */}
            <div className="col-span-12 lg:col-span-7">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.16em] mb-12">Views over time</p>
              <div className="flex items-end gap-2 h-44">
                {barData.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.3 + i * 0.03, 
                      duration: 0.8, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className="flex-1 rounded-sm transition-colors duration-500"
                    style={{ 
                      backgroundColor: i > barData.length - 5 ? '#122056' : i > barData.length - 12 ? '#5B65DC' : '#EEF0FD' 
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Sources View */}
            <div className="col-span-12 lg:col-span-5">
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.16em] mb-12">Discovery Sources</p>
              <div className="flex flex-col">
                <DiscoverySource label="FoundrHUB Feed" percentage={45} delay={0.1} />
                <DiscoverySource label="Direct Search" percentage={28} delay={0.2} />
                <DiscoverySource label="Shared Links" percentage={18} delay={0.3} />
                <DiscoverySource label="Social Media" percentage={9} delay={0.4} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DashboardPreview
