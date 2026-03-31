import React, { useEffect, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { animate } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Activity, Users, ShieldCheck, TrendingUp, Zap, Hexagon } from 'lucide-react'

/* ── Components ── */

const Counter = ({ value, duration = 2, delay = 0 }) => {
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

const StatCard = ({ label, value, icon: Icon, delay, color = "#5B65DC" }) => (
  <motion.div
    variants={{
      initial: { opacity: 0, scale: 0.9, y: 20 },
      entry: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
      }
    }}
    className="bg-white/80 backdrop-blur-md border border-[#EEF0FD] p-5 rounded-3xl shadow-[0_4px_24px_rgba(18,32,86,0.04)] flex flex-col gap-3 min-w-[170px]"
  >
    <div className="flex items-center justify-between">
      <div className="w-9 h-9 rounded-2xl bg-[#FAFAFD] flex items-center justify-center border border-[#EEF0FD]">
        <Icon size={16} style={{ color }} />
      </div>
      <div className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color, backgroundColor: `${color}10` }}>+12%</div>
    </div>
    <div>
      <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#122056] tabular-nums">
        <Counter value={value} delay={delay + 0.5} />
      </p>
    </div>
  </motion.div>
)

const BarChart = ({ delay }) => {
  const bars = [40, 65, 45, 90, 55, 80, 60, 100, 75, 85, 95, 70]
  
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, scale: 0.9, y: 20 },
        entry: { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
      }}
      className="bg-white/80 backdrop-blur-md border border-[#EEF0FD] p-6 rounded-[2rem] shadow-[0_4px_24px_rgba(18,32,86,0.04)] w-full h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#5B65DC] animate-pulse" />
          <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.15em]">Live Performance</p>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#EEF0FD]" />)}
        </div>
      </div>
      
      <div className="flex items-end gap-2 h-32 mt-auto">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ 
              delay: delay + 0.8 + (i * 0.05), 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="flex-1 rounded-full bg-[#FAFAFD] hover:bg-[#EEF0FD] transition-colors relative group"
          >
            <div 
              className="absolute inset-0 rounded-full bg-[#5B65DC] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-bottom"
              style={{ height: '100%', opacity: i >= bars.length - 3 ? 1 : 0.2 }}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const CinematicDashboard = ({ controls }) => {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, scale: 0.8, x: "-50%", y: "-50%", left: "50%", top: "52%" },
        entry: { 
          opacity: 1, 
          scale: 1,
          transition: { 
            duration: 1, 
            ease: [0.16, 1, 0.3, 1],
            staggerChildren: 0.1 
          }
        },
        final: {
          left: "78%",
          top: "50%",
          scale: 0.78,
          transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
        }
      }}
      initial="initial"
      animate={controls}
      className="absolute w-[580px] pointer-events-auto"
    >
      <div className="relative flex flex-col gap-5">
        <div className="flex gap-5">
          <StatCard label="Growth" value={1420} icon={TrendingUp} delay={0} />
          <StatCard label="Users" value={850} icon={Users} delay={0.05} />
        </div>

        <div className="flex gap-5">
          <StatCard label="Reach" value={12400} icon={Hexagon} delay={0.1} color="#C084FC" />
          <StatCard label="Yield" value={92} icon={Zap} delay={0.15} color="#FB923C" />
        </div>

        <div className="flex gap-5">
          <div className="flex-[1.8]">
            <BarChart delay={0.2} />
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <StatCard label="Uptime" value={99} icon={Activity} delay={0.25} />
            
            <motion.div
              variants={{
                initial: { opacity: 0, scale: 0.9, y: 10 },
                entry: { opacity: 1, scale: 1, y: 0 }
              }}
              className="bg-[#122056] p-6 rounded-[2.5rem] shadow-2xl flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#5B65DC]/30 to-transparent" />
              <ShieldCheck className="text-[#5B65DC] relative z-10" size={28} />
              <p className="text-white font-bold text-sm tracking-tight relative z-10 uppercase tracking-[0.2em] text-[10px]">Vault</p>
              <div className="w-full bg-white/10 h-1.2 rounded-full overflow-hidden mt-1 relative z-10">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  transition={{ delay: 2.2, duration: 1.5, ease: "easeOut" }}
                  className="bg-[#5B65DC] h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main Hero Section ── */

const CinematicHero = () => {
  const dashboardControls = useAnimation()
  const contentControls = useAnimation()
  
  useEffect(() => {
    const sequence = async () => {
      // 1. Entry Animation (Center Stage)
      await dashboardControls.start('entry')
      
      // 2. Wait for a moment
      await new Promise(resolve => setTimeout(resolve, 1400))
      
      // 3. Transition to Final Layout (Dashboard moves right, Content appears left)
      dashboardControls.start('final')
      contentControls.start('visible')
    }
    
    sequence()
  }, [dashboardControls, contentControls])

  return (
    <section className="relative w-full min-h-[90vh] lg:h-screen flex items-center overflow-hidden bg-[#FAFAFD]">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5B65DC]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-[#122056]/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 h-full flex items-center relative z-10">
        
        {/* Left Side Content */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.15,
                delayChildren: 0.6
              } 
            }
          }}
          initial="hidden"
          animate={contentControls}
          className="max-w-2xl text-left pointer-events-auto"
        >
          <motion.div 
            variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-white border border-[#EEF0FD] shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#5B65DC]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#5B65DC]/60">v2.0 is now live</span>
          </motion.div>
          
          <motion.h1 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="font-serif text-[clamp(2.6rem,5.5vw,4.4rem)] tracking-tight leading-[1.06] text-[#122056] mb-7"
          >
            Scale your product <br />
            <span className="text-[#5B65DC]">with cinematic speed.</span>
          </motion.h1>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-[17px] lg:text-[18px] leading-relaxed text-[#122056]/60 max-w-lg mb-10"
          >
            FoundrHUB provides the infrastructure you need to discover, verify, and launch your next big idea with confidence.
          </motion.p>
          
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex flex-wrap gap-4"
          >
            <Link 
              to="/signup?role=discoverer" 
              className="px-8 py-4 rounded-2xl bg-[#122056] text-white text-[15px] font-bold shadow-xl shadow-[#122056]/10 hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              Explore Startups
              <ArrowRight size={18} />
            </Link>
            <Link 
              to="/verify" 
              className="px-8 py-4 rounded-2xl bg-white border border-[#EEF0FD] text-[#122056] text-[15px] font-bold hover:bg-[#FAFAFD] transition-all"
            >
              List Your Startup
            </Link>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            className="mt-12 flex items-center gap-6 pt-10 border-t border-[#EEF0FD]"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-[#FAFAFD] flex items-center justify-center overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-4 border-white bg-[#122056] flex items-center justify-center text-[10px] font-bold text-white leading-none shadow-sm">
                +42
              </div>
            </div>
            <p className="text-[13px] font-medium text-[#122056]/50">
              Trusted by <span className="text-[#122056] font-bold">1,200+</span> teams worldwide
            </p>
          </motion.div>
        </motion.div>

        {/* Dynamic Dashboard Wrapper */}
        <CinematicDashboard controls={dashboardControls} />

      </div>
    </section>
  )
}

export default CinematicHero
