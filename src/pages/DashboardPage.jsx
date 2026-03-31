import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GlassCard from '../components/GlassCard'
import { useAuth } from '../context/AuthContext'
import { Sparkles, Eye, Bookmark, MessageSquare, Users, PenLine, FileText, FileSignature, BarChart, Link as LinkIcon } from 'lucide-react'

const DashboardPage = () => {
  const { user } = useAuth()
  const firstName = user?.name?.split(' ')[0] || 'Founder'
  const ico = (d) => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>

  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-gradient-to-b from-beige-50/30 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h1 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.1] text-neutral-950 mb-2">Welcome back, {firstName}</h1>
              <p className="text-[14px] text-neutral-400">Here's how your startup is performing on FoundrHUB.</p>
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-950 text-white text-[13px] font-semibold hover:bg-neutral-800 transition-all duration-300 self-start sm:self-auto">
              <Sparkles size={14} className="text-amber-400" /> Upgrade to Featured
            </button>
          </motion.div>

          {/* Profile Completion + Verification + Ranking */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="grid lg:grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-3xl border border-neutral-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[13px] font-semibold text-neutral-700">Profile Completion</p>
                <span className="text-[20px] font-bold text-neutral-950">72%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '72%' }} transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-neutral-400 to-neutral-950" />
              </div>
              <p className="text-[11px] text-neutral-400 mt-2">Add a pitch deck & founder story to reach 100%</p>
            </div>
            <div className="bg-white rounded-3xl border border-neutral-100 p-6">
              <p className="text-[13px] font-semibold text-neutral-700 mb-3">Verification Status</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[12px] font-semibold text-amber-700">Under Review</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-3">Expected verification: 24–48 hours</p>
            </div>
            <div className="bg-white rounded-3xl border border-neutral-100 p-6">
              <p className="text-[13px] font-semibold text-neutral-700 mb-2">City Discovery Ranking</p>
              <p className="text-[32px] font-bold text-neutral-950 leading-tight">#14</p>
              <p className="text-[12px] text-emerald-600 font-semibold">in Mumbai · Fashion</p>
            </div>
          </motion.div>

          {/* Metrics */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { label: 'Profile Views', value: '2,847', change: '+24%', icon: ico('M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z') },
              { label: 'Saves', value: '342', change: '+18%', icon: ico('M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z') },
              { label: 'Story Engagement', value: '89%', change: '+5%', icon: ico('M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z') },
              { label: 'Inbound Leads', value: '27', change: '+9 this week', icon: ico('M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z') },
            ].map(m => (
              <div key={m.label} className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 hover:bg-white/15 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/80 border border-neutral-100 flex items-center justify-center text-neutral-500">{m.icon}</div>
                  <span className="text-[12px] font-semibold text-emerald-600">{m.change}</span>
                </div>
                <p className="text-[24px] font-semibold text-neutral-900 leading-tight mb-1">{m.value}</p>
                <p className="text-[12px] text-neutral-400 font-medium">{m.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Bottom panels */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="grid lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3 bg-white rounded-3xl border border-neutral-100 p-7">
              <p className="text-[15px] font-semibold text-neutral-900 mb-1">Views Over Time</p>
              <p className="text-[13px] text-neutral-400 mb-6">Last 30 days</p>
              <div className="flex items-end gap-2 h-32">
                {[20, 35, 28, 45, 52, 38, 60, 55, 72, 65, 78, 82, 70, 88, 92, 75, 95, 88, 80, 90, 85, 92, 78, 95, 100, 88, 92, 85, 98, 92].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t transition-all duration-500 hover:opacity-70" style={{ height: `${h}%`, background: i >= 27 ? '#0a0a0a' : i >= 20 ? '#525252' : '#d4d4d4' }} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 bg-white rounded-3xl border border-neutral-100 p-7">
              <p className="text-[15px] font-semibold text-neutral-900 mb-1">Quick Actions</p>
              <p className="text-[13px] text-neutral-400 mb-5">Keep your profile updated</p>
              <div className="space-y-3">
                {[['Edit Brand Profile', PenLine], ['Upload Pitch Deck', FileText], ['Write Founder Story', FileSignature], ['View Analytics', BarChart], ['Share Profile Link', LinkIcon]].map(([label, Icon]) => (
                  <button key={label} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-neutral-100 text-[13px] font-medium text-neutral-600 hover:border-neutral-300 hover:text-neutral-900 hover:bg-beige-50/40 transition-all duration-300 text-left">
                    <Icon size={16} strokeWidth={1.5} className="text-neutral-400" />{label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default DashboardPage
