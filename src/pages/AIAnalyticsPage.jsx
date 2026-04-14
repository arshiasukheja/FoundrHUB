import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Users,
  Wallet
} from 'lucide-react'
import SidebarMenu from '../components/SidebarMenu'
import DashboardHeader from '../components/DashboardHeader'
import { useAuth } from '../context/AuthContext'
import { loadInvestorRecords } from '../lib/founderVerification'

const toNumber = (v) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

const formatMoney = (v) => `Rs${Math.round(v).toLocaleString()}`

const AIAnalyticsPage = () => {
  const { user } = useAuth()
  const [implementedFixIds, setImplementedFixIds] = useState([])

  const founderRecord = useMemo(() => {
    const records = loadInvestorRecords()
    if (!records.length) return null

    const userName = (user?.name || '').toLowerCase()
    const filtered = records.filter((record) => {
      const founderName = (record.founderName || '').toLowerCase()
      return userName && founderName && (founderName.includes(userName) || userName.includes(founderName))
    })

    return filtered[0] || records[0]
  }, [user])

  const startupName = founderRecord?.startupName || 'Foundr startup'

  const metrics = useMemo(() => {
    const traction = founderRecord?.traction || {}
    const totalSales = Math.max(toNumber(traction.monthlyRevenue), 180000)
    const activeUsers = Math.max(toNumber(traction.monthlyActiveUsers), 540)
    const growthPercent = Math.max(toNumber(traction.growthRateMonthly), 8)

    return {
      totalSales,
      activeUsers,
      growthPercent
    }
  }, [founderRecord])

  const growthSeries = useMemo(() => {
    const current = [100, 108, 114, 120, 125, 130, 136]
    const predicted = current.map((point, index) =>
      Math.round(point * (1 + (index >= 3 ? 0.045 : 0.01) + metrics.growthPercent / 260))
    )
    return { current, predicted }
  }, [metrics.growthPercent])

  const recommendations = useMemo(() => {
    return [
      {
        id: 'rec-onboarding',
        title: 'Fix onboarding drop in first session',
        reason: 'Most users bounce before completing setup step 2.',
        fix: 'Replace long setup with 2-step onboarding + sample data autofill.',
        impact: '+18% activation, +9% revenue lift'
      },
      {
        id: 'rec-pricing',
        title: 'Improve pricing page conversion',
        reason: 'Annual value proposition is not visible above the fold.',
        fix: 'Move annual plan card to first position and add savings badge near CTA.',
        impact: '+11% paid conversion'
      },
      {
        id: 'rec-segment',
        title: 'Target high-converting segment',
        reason: 'Teams with 5-10 members convert much higher than solo users.',
        fix: 'Launch a dedicated landing page and outreach flow for 5-10 team segment.',
        impact: '+14% qualified pipeline'
      }
    ]
  }, [])

  const linePoints = (arr, h) => {
    const max = Math.max(...arr)
    const min = Math.min(...arr)
    const range = Math.max(1, max - min)

    return arr
      .map((value, i) => {
        const x = (i / (arr.length - 1)) * 100
        const y = h - ((value - min) / range) * h
        return `${x},${y}`
      })
      .join(' ')
  }

  const currentLine = linePoints(growthSeries.current, 100)
  const predictedLine = linePoints(growthSeries.predicted, 100)

  return (
    <div className="min-h-screen bg-[#F7F8FC] relative overflow-x-hidden">
      <SidebarMenu activeItem="analytics" />

      <div className="relative z-10 lg:ml-64">
        <div className="sticky top-0 z-40 bg-[#F7F8FC]/90 backdrop-blur-xl border-b border-[#E9ECFA]">
          <div className="w-full px-6 lg:px-10 xl:px-12 py-5 flex items-center justify-between gap-4">
            <DashboardHeader />
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E9ECFA] text-[11px] font-bold text-[#4F5B92]">
              <Sparkles size={14} className="text-[#5B65DC]" />
              AI Analytics Dashboard
            </div>
          </div>
        </div>

        <main className="min-w-0 px-6 lg:px-10 xl:px-12 py-8 space-y-6">
          <section className="rounded-3xl bg-white border border-[#E9ECFA] p-6 lg:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B65DC]">Founder AI Analytics</p>
            <h1 className="font-serif text-4xl text-[#11205A] mt-2">Clean AI Analytics for {startupName}</h1>
            <p className="text-sm text-[#506090] mt-3">Focus: sales, growth velocity, active user momentum, and exact fixes.</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white border border-[#E9ECFA] p-5">
              <p className="text-[11px] uppercase tracking-widest font-bold text-[#7A88B8]">Total Sales</p>
              <p className="text-3xl font-black text-[#11205A] mt-1">{formatMoney(metrics.totalSales)}</p>
              <p className="text-xs text-[#55669B] mt-1">Current monthly revenue run-rate</p>
            </div>

            <div className="rounded-2xl bg-white border border-[#E9ECFA] p-5">
              <p className="text-[11px] uppercase tracking-widest font-bold text-[#7A88B8]">Growth Percentage</p>
              <p className="text-3xl font-black text-emerald-600 mt-1">{metrics.growthPercent}%</p>
              <p className="text-xs text-[#55669B] mt-1">Month-over-month growth signal</p>
            </div>

            <div className="rounded-2xl bg-white border border-[#E9ECFA] p-5">
              <p className="text-[11px] uppercase tracking-widest font-bold text-[#7A88B8]">Active Users</p>
              <p className="text-3xl font-black text-[#11205A] mt-1">{metrics.activeUsers.toLocaleString()}</p>
              <p className="text-xs text-[#55669B] mt-1">Users active in last 30 days</p>
            </div>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="xl:col-span-8 rounded-3xl bg-white border border-[#E9ECFA] p-6 lg:p-7"
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B65DC]">AI Growth Predictor</p>
                  <h2 className="font-serif text-2xl text-[#11205A] mt-1">Current vs predicted growth curve</h2>
                </div>
                <div className="text-xs font-semibold text-[#55669B]">Prediction horizon: next 7 cycles</div>
              </div>

              <div className="mt-4 rounded-2xl border border-[#E9ECFA] bg-[#FBFCFF] p-4">
                <svg viewBox="0 0 100 110" className="w-full h-64">
                  <polyline points={currentLine} fill="none" stroke="#8B95C7" strokeWidth="2.5" strokeLinecap="round" />
                  <polyline points={predictedLine} fill="none" stroke="#16A34A" strokeWidth="2.8" strokeLinecap="round" />
                </svg>
              </div>

              <div className="mt-3 flex items-center gap-3 text-xs font-semibold">
                <span className="inline-flex items-center gap-1 text-[#6B77A8]"><span className="w-2.5 h-2.5 rounded-full bg-[#8B95C7]" /> Current</span>
                <span className="inline-flex items-center gap-1 text-emerald-700"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Predicted</span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700">
                  <TrendingUp size={13} />
                  Onboarding fix can unlock +18% growth
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="xl:col-span-4 rounded-3xl bg-white border border-[#E9ECFA] p-6 lg:p-7"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#5B65DC]">AI Recommendations</p>
              <h2 className="font-serif text-2xl text-[#11205A] mt-1">Detailed and actionable</h2>

              <div className="mt-4 space-y-3">
                {recommendations.map((item) => {
                  const done = implementedFixIds.includes(item.id)
                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl border p-4 ${done ? 'border-emerald-200 bg-emerald-50/60' : 'border-[#E9ECFA] bg-[#F8FAFF]'}`}
                    >
                      <p className="text-sm font-bold text-[#11205A]">{item.title}</p>
                      <p className="text-xs text-[#55669B] mt-2"><span className="font-semibold">Why:</span> {item.reason}</p>
                      <p className="text-xs text-[#55669B] mt-1"><span className="font-semibold">What to do:</span> {item.fix}</p>
                      <p className="text-xs font-bold text-emerald-700 mt-2">Expected impact: {item.impact}</p>

                      <button
                        onClick={() => setImplementedFixIds((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]))}
                        className={`mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${done ? 'bg-emerald-100 text-emerald-700' : 'bg-[#11205A] text-white hover:bg-[#0d1845]'}`}
                      >
                        {done ? <CheckCircle2 size={14} /> : <ArrowRight size={14} />}
                        {done ? 'Implemented' : 'Implement'}
                      </button>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </section>

          <section className="rounded-2xl bg-white border border-[#E9ECFA] p-4 text-sm text-[#55669B] inline-flex items-center gap-2">
            <Wallet size={16} className="text-[#5B65DC]" />
            <span>
              Implemented recommendations: <span className="font-bold text-[#11205A]">{implementedFixIds.length}</span> | 
              Estimated uplift: <span className="font-bold text-emerald-700">{formatMoney(implementedFixIds.length * 22000)}</span>
            </span>
          </section>
        </main>
      </div>
    </div>
  )
}

export default AIAnalyticsPage
