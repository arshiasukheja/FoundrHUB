import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SidebarMenu from '../components/SidebarMenu'
import DashboardHeader from '../components/DashboardHeader'
import { Copy, Code, Sparkles } from 'lucide-react'

const FounderDashboard = () => {
  const [copied, setCopied] = useState(false)
  const [showGuide, setShowGuide] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasData, setHasData] = useState(false)
  const scriptTag = '<script src="https://yourapp.com/tracker.js" data-id="USER_ID"></script>'

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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(scriptTag)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch (error) {
      setCopied(false)
    }
  }

  const handleConfirmSetup = () => {
    setShowConfirm(true)
  }

  const handleLoadAnalytics = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setHasData(true)
    }, 900)
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#1f2937] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[420px] bg-[#6b7cff]/12 blur-[180px]" />
        <div className="absolute bottom-[-12%] right-[-12%] w-[520px] h-[520px] bg-[#94a3b8]/16 blur-[200px]" />
      </div>

      <SidebarMenu activeItem="dashboard" />

      <div className="ml-0 lg:ml-64 relative z-10">
        <div className="sticky top-0 z-40 bg-[#f5f7fb]/80 backdrop-blur-xl border-b border-[#e5e7eb]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
            <DashboardHeader />
            <div />
          </div>
        </div>

        <motion.main
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto px-6 lg:px-8 py-8"
        >
          {!hasData ? (
            <motion.section
              variants={itemVariants}
              className="min-h-[70vh] flex items-center justify-center"
            >
              <div className="w-full max-w-lg rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-[0_18px_50px_rgba(31,41,55,0.08)]">
                <p className="text-sm text-[#6b7280]">No data yet</p>
                <p className="text-lg font-semibold text-[#1f2937] mt-2">Start tracking your startup</p>
                <div className="mt-4 rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] p-4">
                  <div className="flex items-center justify-between text-xs text-[#6b7280]">
                    <div className="flex items-center gap-2">
                      <Code size={12} /> Script
                    </div>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 font-semibold text-[#1f2937]/70 hover:text-[#1f2937]"
                    >
                      <Copy size={12} /> {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="text-[11px] text-[#1f2937]/70 font-mono mt-2 whitespace-pre-wrap">
                    {scriptTag}
                  </pre>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowGuide((prev) => !prev)
                    setShowConfirm(false)
                  }}
                  className="mt-4 w-full rounded-2xl border border-[#e5e7eb] py-2.5 text-sm font-medium text-[#1f2937]/70 hover:text-[#1f2937] hover:border-[#93c5fd]/60 transition"
                >
                  View Setup Guide
                </button>
                {showGuide && (
                  <div className="mt-4 rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-[0_16px_40px_rgba(31,41,55,0.08)]">
                    <p className="text-xs uppercase tracking-[0.28em] text-[#6b7280] font-semibold">Setup Guide</p>
                    <ol className="mt-3 space-y-2 text-sm text-[#6b7280] list-decimal list-inside">
                      <li>Copy the script tag.</li>
                      <li>Paste it before the closing &lt;/head&gt; tag.</li>
                      <li>Deploy your site and refresh once.</li>
                      <li>Return to view live analytics.</li>
                    </ol>
                    <button
                      type="button"
                      onClick={handleConfirmSetup}
                      className="mt-4 w-full rounded-xl bg-[#93c5fd]/40 py-2 text-sm font-semibold text-[#1f2937] hover:bg-[#93c5fd]/60 transition"
                    >
                      I’ve added the script
                    </button>
                  </div>
                )}
                {showConfirm && (
                  <div className="mt-4 rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] px-4 py-3">
                    <p className="text-sm text-[#1f2937]">All set. Ready to load your analytics?</p>
                    <button
                      type="button"
                      onClick={handleLoadAnalytics}
                      disabled={isLoading}
                      className="mt-3 w-full rounded-xl bg-[#1f2937] py-2 text-sm font-semibold text-white hover:bg-[#111827] disabled:opacity-70 transition"
                    >
                      {isLoading ? 'Loading dashboard…' : 'Load Analytics'}
                    </button>
                  </div>
                )}
              </div>
            </motion.section>
          ) : (
            <>
              <motion.section variants={itemVariants} className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-[#1f2937]">Dashboard</h1>
                  <p className="text-sm text-[#6b7280] mt-1">A quick view of your startup performance.</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="rounded-2xl bg-[#6b7cff] px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(107,124,255,0.3)]"
                  >
                    + Add Insight
                  </button>
                  <button
                    type="button"
                    className="rounded-2xl border border-[#e5e7eb] px-4 py-2 text-sm font-semibold text-[#1f2937] bg-white"
                  >
                    View Reports
                  </button>
                </div>
              </motion.section>

              <motion.section variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Active Users', value: '1,284', accent: 'bg-[#6b7cff]' },
                  { label: 'Growth', value: '18%', accent: 'bg-[#8ea2c2]' },
                  { label: 'Engagement', value: '64%', accent: 'bg-[#a5b4c7]' },
                  { label: 'Activity', value: '142', accent: 'bg-[#c7d2e1]' }
                ].map((metric) => (
                  <motion.div
                    key={metric.label}
                    variants={itemVariants}
                    className="rounded-2xl border border-[#e5e7eb] bg-white px-5 py-4 shadow-[0_10px_30px_rgba(31,41,55,0.06)] transition hover:shadow-[0_14px_36px_rgba(31,41,55,0.08)] hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[#6b7280]">{metric.label}</p>
                      <span className={`h-8 w-2 rounded-full ${metric.accent}`} />
                    </div>
                    <p className="text-2xl font-semibold text-[#1f2937] mt-2">{metric.value}</p>
                  </motion.div>
                ))}
              </motion.section>

              <motion.section variants={itemVariants} className="mt-8 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
                <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_30px_rgba(31,41,55,0.06)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#6b7280]">Growth over time</p>
                      <h2 className="text-lg font-semibold text-[#1f2937] mt-1">Startup Momentum</h2>
                    </div>
                    <span className="text-xs text-[#6b7280]">Last 30 days</span>
                  </div>
                  <div className="mt-6 h-[200px] relative">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-[#6b7cff]/10 via-transparent to-transparent" />
                    <svg viewBox="0 0 400 160" className="w-full h-full">
                      <path
                        d="M0,120 C60,110 90,80 140,90 C200,105 230,50 280,60 C330,70 360,40 400,30"
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#6b7cff" />
                          <stop offset="100%" stopColor="#9fb3d9" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 grid grid-rows-4 opacity-40">
                      <div className="border-t border-dashed border-[#e5e7eb]" />
                      <div className="border-t border-dashed border-[#e5e7eb]" />
                      <div className="border-t border-dashed border-[#e5e7eb]" />
                      <div className="border-t border-dashed border-[#e5e7eb]" />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_12px_30px_rgba(31,41,55,0.06)]">
                  <p className="text-sm text-[#6b7280]">Activity feed</p>
                  <div className="mt-5 space-y-4">
                    {[
                      { text: 'New visitor from Chandigarh', time: '2m ago', color: 'bg-[#6b7cff]' },
                      { text: 'Signup completed', time: '1h ago', color: 'bg-[#94a3b8]' },
                      { text: 'Investor view', time: 'Today', color: 'bg-[#c7d2e1]' }
                    ].map((item) => (
                      <div key={item.text} className="flex items-start gap-3">
                        <span className={`mt-1 h-2.5 w-2.5 rounded-full ${item.color}`} />
                        <div>
                          <p className="text-sm text-[#1f2937]">{item.text}</p>
                          <p className="text-xs text-[#9ca3af] mt-1">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>

              <motion.section variants={itemVariants} className="mt-6">
                <div className="rounded-2xl border border-[#e5e7eb] bg-gradient-to-r from-[#6b7cff]/12 to-[#94a3b8]/16 p-6 shadow-[0_12px_30px_rgba(31,41,55,0.05)]">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Sparkles size={16} className="text-[#6b7cff]" />
                    </span>
                    <div>
                      <p className="text-sm text-[#6b7280]">AI insight</p>
                      <p className="text-base font-medium text-[#1f2937]">
                        Your startup is gaining traction in Chandigarh
                      </p>
                    </div>
                  </div>
                </div>
              </motion.section>
            </>
          )}
        </motion.main>
      </div>
    </div>
  )
}

export default FounderDashboard
