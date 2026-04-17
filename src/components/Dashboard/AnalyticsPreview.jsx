import React from 'react'
import { motion } from 'framer-motion'
import { BarChart3, Eye, Sparkles } from 'lucide-react'

const FloatingMetricCard = ({ title, value, note, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute z-20 rounded-[1.25rem] border border-[#EEF0FD] bg-white/90 backdrop-blur-xl shadow-[0_12px_28px_rgba(18,32,86,0.08)] px-4 py-3 min-w-[165px] ${className}`}
  >
    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8c93a6]">{title}</p>
    <p className="mt-1 text-[20px] font-bold text-[#122056] leading-none">{value}</p>
    <p className="mt-1 text-[11px] text-neutral-500">{note}</p>
  </motion.div>
)

const AnalyticsPreview = () => {
  return (
    <section id="analytics" className="py-14 lg:py-20 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        <div className="absolute top-8 right-0 h-[16rem] w-[16rem] rounded-full bg-[#5B65DC]/10 blur-[110px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="reveal"
          >
            <span className="section-label !text-white/60 !border-white/20">Analytics Dashboard</span>
            <h3 className="font-serif text-[clamp(2rem,4vw,3.4rem)] leading-[1.05] tracking-tight text-white mb-5">
              Comprehensive analytics in one clean view.
            </h3>
            <p className="text-[16px] lg:text-[18px] text-white/70 leading-relaxed mb-8 max-w-xl">
              See growth signals, user behavior, and execution metrics without opening heavy dashboards.
            </p>

            <div className="space-y-6 max-w-lg">
              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-sm flex items-center justify-center text-[#5B65DC]">
                  <Eye size={18} />
                </div>
                <div>
                  <p className="text-[18px] font-semibold text-white">Live tracking</p>
                  <p className="text-[14px] text-white/50 leading-relaxed mt-1">Monitor profile views, engagement trends, and lead quality in real time.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-sm flex items-center justify-center text-[#5B65DC]">
                  <BarChart3 size={18} />
                </div>
                <div>
                  <p className="text-[18px] font-semibold text-white">Actionable insight cards</p>
                  <p className="text-[14px] text-white/50 leading-relaxed mt-1">Get instant prompts and next actions from your most important analytics shifts.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[400px] lg:min-h-[440px]"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(91,101,220,0.14),transparent_55%)]" />

            <div className="absolute left-2 right-2 top-16 sm:left-8 sm:right-6 sm:top-12 rounded-[1.8rem] border border-[#EEF0FD] bg-white shadow-[0_24px_60px_rgba(18,32,86,0.1)] p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl border border-[#EEF0FD] bg-[#FAFAFD] flex items-center justify-center text-[#5B65DC]"><BarChart3 size={17} /></div>
                  <div>
                    <p className="text-[17px] font-semibold text-[#122056] leading-tight">FoundrHUB Analytics</p>
                    <p className="text-[12px] text-neutral-500">Startup performance overview</p>
                  </div>
                </div>
                <span className="rounded-full bg-[#5B65DC] text-white text-[11px] font-semibold px-4 py-2">30D</span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                {[
                  { label: 'Views', value: '2.8K' },
                  { label: 'Leads', value: '27' },
                  { label: 'Saves', value: '342' },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-[#EEF0FD] bg-[#FAFAFD] p-3 text-center">
                    <p className="text-[18px] font-semibold text-[#122056]">{item.value}</p>
                    <p className="text-[11px] text-neutral-500 mt-1 uppercase tracking-[0.14em]">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-[#EEF0FD] bg-[#FAFAFD] p-4">
                <div className="flex items-end gap-2 h-24">
                  {[28, 34, 26, 40, 44, 36, 50, 46, 58, 54, 62, 57].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-[8px]" style={{ height: `${h}%`, background: i > 7 ? '#122056' : i > 4 ? '#5B65DC' : '#C7D2FE' }} />
                  ))}
                </div>
              </div>
            </div>

            <FloatingMetricCard title="Page views" value="2.8K" note="This week" className="top-8 left-4 sm:left-8" delay={0.12} />
            <FloatingMetricCard title="Leads" value="27" note="Inbound today" className="top-10 right-5 sm:right-8" delay={0.2} />
            <FloatingMetricCard title="Suggestion" value="+18%" note="Boost referral loop" className="bottom-10 left-2 sm:left-10" delay={0.28} />
            <FloatingMetricCard title="Engagement" value="89%" note="Rolling average" className="bottom-6 right-2 sm:right-10" delay={0.34} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AnalyticsPreview
