import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ref, set, update } from 'firebase/database'
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Wallet
} from 'lucide-react'
import SidebarMenu from '../components/SidebarMenu'
import DashboardHeader from '../components/DashboardHeader'
import { useAuth } from '../context/AuthContext'
import { useRealtimeValue } from '../lib/realtime'
import { buildDefaultUserData } from '../lib/seedData'
import { db } from '../lib/firebase'

const toNumber = (v) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

const formatMoney = (v) => `Rs${Math.round(v).toLocaleString()}`

const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl bg-white border border-[#eef0f5] shadow-[0_4px_24px_rgba(0,0,0,0.04)] ${className}`}>
    {children}
  </div>
)

const AIAnalyticsPage = () => {
  const { user } = useAuth()
  const [implementedFixIds, setImplementedFixIds] = useState([])
  const [allocationInput, setAllocationInput] = useState({
    valuation: '12.5',
    equity: '18',
    budget: '2.8',
    stage: 'Seed',
    goal: 'User growth'
  })

  const fallback = useMemo(() => buildDefaultUserData({}).aiAnalytics, [])
  const { value: analyticsData } = useRealtimeValue(
    user?.uid ? `users/${user.uid}/aiAnalytics` : null,
    fallback
  )
  const startupName = analyticsData?.startupName || 'Foundr startup'
  const recommendations = analyticsData?.recommendations || []
  const brandSuggestions = analyticsData?.brandSuggestions || []

  useEffect(() => {
    if (!analyticsData?.allocationDefaults) return
    setAllocationInput((prev) => ({ ...prev, ...analyticsData.allocationDefaults }))
  }, [analyticsData?.allocationDefaults])

  useEffect(() => {
    if (!analyticsData?.implementedFixIds) return
    setImplementedFixIds(analyticsData.implementedFixIds)
  }, [analyticsData?.implementedFixIds])

  const allocationPlan = useMemo(() => {
    const goal = allocationInput.goal

    const base = {
      marketing: 0.26,
      product: 0.24,
      hiring: 0.22,
      ops: 0.16,
      reserve: 0.12
    }

    if (goal === 'User growth') {
      base.marketing += 0.08
      base.product += 0.04
      base.reserve -= 0.04
      base.ops -= 0.08
    } else if (goal === 'Revenue growth') {
      base.product += 0.05
      base.hiring += 0.03
      base.ops += 0.02
      base.reserve -= 0.1
    } else if (goal === 'Retention') {
      base.product += 0.08
      base.hiring += 0.04
      base.marketing -= 0.06
      base.reserve -= 0.06
    }

    const total = Object.values(base).reduce((sum, v) => sum + v, 0)
    const normalized = Object.fromEntries(
      Object.entries(base).map(([k, v]) => [k, v / total])
    )

    const formatPct = (v) => `${Math.round(v * 100)}%`
    return {
      allocation: {
        marketing: { pct: formatPct(normalized.marketing) },
        product: { pct: formatPct(normalized.product) },
        hiring: { pct: formatPct(normalized.hiring) },
        ops: { pct: formatPct(normalized.ops) },
        reserve: { pct: formatPct(normalized.reserve) }
      },
      narrative: `Allocation leans into ${goal.toLowerCase()} while preserving a safety reserve for volatility.`
    }
  }, [allocationInput])

  const updateAllocationField = (key, value) => {
    setAllocationInput((prev) => ({ ...prev, [key]: value }))
    if (!user?.uid) return
    update(ref(db, `users/${user.uid}/aiAnalytics/allocationDefaults`), { [key]: value })
  }

  const markImplemented = (id) => {
    setImplementedFixIds((prev) => {
      const next = prev.includes(id) ? prev : [...prev, id]
      if (user?.uid) {
        set(ref(db, `users/${user.uid}/aiAnalytics/implementedFixIds`), next)
      }
      return next
    })
  }


  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#1f2937] relative overflow-x-hidden">
      <SidebarMenu activeItem="analytics" />

      <div className="relative z-10 lg:ml-64">
        <div className="sticky top-0 z-40 bg-[#f5f7fb]/90 backdrop-blur-xl border-b border-[#e5e7eb]">
          <div className="w-full px-6 lg:px-10 xl:px-12 py-5 flex items-center justify-between gap-4">
            <DashboardHeader />
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#eef0f5] text-[11px] font-bold text-[#1f2937]">
              <Sparkles size={14} className="text-[#6366f1]" />
              AI Analytics Dashboard
            </div>
          </div>
        </div>

        <main className="min-w-0 px-6 lg:px-10 xl:px-12 py-8 space-y-6">
          <section className="rounded-3xl bg-white border border-[#eef0f5] p-6 lg:p-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6366f1]">Founder AI Analytics</p>
            <h1 className="font-serif text-4xl text-[#1f2937] mt-2">AI Analytics for {startupName}</h1>
            <p className="text-sm text-[#6b7280] mt-3">Focus: sales, growth velocity, active user momentum, and precise fixes.</p>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <Card className="xl:col-span-5 p-6 lg:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6366f1]">What You Should Do Next</p>
              <h2 className="font-serif text-2xl text-[#1f2937] mt-1">Top 3 actions</h2>
              <div className="mt-4 space-y-4">
                {(recommendations.length ? recommendations : [
                  { id: 'a1', title: 'Fix investor follow-up lag', reason: 'Warm leads are aging past their response window.', fix: 'Send a 2-line traction memo within 48 hours and propose a 20-min call.', impact: 'Increase close rate by ~12%' },
                  { id: 'a2', title: 'Improve activation conversion', reason: 'Trial users are not hitting the aha moment quickly.', fix: 'Add a guided onboarding checklist with the first success action.', impact: 'Lift activation by 8-10%' },
                  { id: 'a3', title: 'Tighten positioning', reason: 'Messaging is broad and founders look similar.', fix: 'Refine ICP to top 2 segments and update deck narrative.', impact: 'Reduce investor objections by 15%' }
                ]).slice(0, 3).map((item) => (
                  <div key={item.id} className="rounded-2xl border border-[#eef0f5] bg-[#fbfcff] p-4">
                    <p className="text-sm font-bold text-[#1f2937]">{item.title}</p>
                    <p className="text-xs text-[#6b7280] mt-2"><span className="font-semibold">Problem:</span> {item.reason}</p>
                    <p className="text-xs text-[#6b7280] mt-1"><span className="font-semibold">Action:</span> {item.fix}</p>
                    <p className="text-xs font-semibold text-emerald-700 mt-2">Impact: {item.impact}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="xl:col-span-4 p-6 lg:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6366f1]">How You Compare</p>
              <h2 className="font-serif text-2xl text-[#1f2937] mt-1">Benchmark vs similar startups</h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-[#eef0f5]">
                <table className="w-full text-xs">
                  <thead className="bg-[#f8fafc] text-[#6b7280]">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Metric</th>
                      <th className="px-4 py-3 text-left font-semibold">You</th>
                      <th className="px-4 py-3 text-left font-semibold">Benchmark</th>
                      <th className="px-4 py-3 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#1f2937]">
                    {[
                      { label: 'Growth rate', you: '18%', avg: '14%', good: true },
                      { label: 'Conversion', you: '3.2%', avg: '4.1%', good: false },
                      { label: 'Retention', you: '41%', avg: '38%', good: true }
                    ].map((row) => (
                      <tr key={row.label} className="border-t border-[#eef0f5]">
                        <td className="px-4 py-3 font-semibold">{row.label}</td>
                        <td className="px-4 py-3">{row.you}</td>
                        <td className="px-4 py-3">{row.avg}</td>
                        <td className={`px-4 py-3 font-semibold ${row.good ? 'text-emerald-600' : 'text-rose-500'}`}>
                          {row.good ? 'Above avg' : 'Below avg'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="xl:col-span-3 p-6 lg:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6366f1]">Fundraising Intelligence</p>
              <h2 className="font-serif text-2xl text-[#1f2937] mt-1">Readiness & next move</h2>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between rounded-xl bg-[#f8fafc] border border-[#eef0f5] px-3 py-2">
                  <span className="text-[#6b7280]">Readiness score</span>
                  <span className="font-semibold text-[#1f2937]">78 / 100</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#f8fafc] border border-[#eef0f5] px-3 py-2">
                  <span className="text-[#6b7280]">AI verdict</span>
                  <span className="font-semibold text-emerald-600">Ready to raise</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#f8fafc] border border-[#eef0f5] px-3 py-2">
                  <span className="text-[#6b7280]">Suggested raise</span>
                  <span className="font-semibold text-[#1f2937]">Rs4.5Cr</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-[#f8fafc] border border-[#eef0f5] px-3 py-2">
                  <span className="text-[#6b7280]">Suggested timing</span>
                  <span className="font-semibold text-[#1f2937]">Next 6-8 weeks</span>
                </div>
                <div className="rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-rose-600 text-xs font-semibold">
                  Top objection: "Retention needs to stabilize before scale."
                </div>
              </div>
            </Card>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <Card className="xl:col-span-7 p-6 lg:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6366f1]">Capital Allocation</p>
              <h2 className="font-serif text-2xl text-[#1f2937] mt-1">Fund allocation advisor</h2>
              <div className="mt-4 h-3 rounded-full bg-[#eef0f5] overflow-hidden flex">
                {[
                  { key: 'marketing', color: '#6366f1' },
                  { key: 'product', color: '#8b5cf6' },
                  { key: 'hiring', color: '#0ea5e9' },
                  { key: 'ops', color: '#f59e0b' },
                  { key: 'reserve', color: '#94a3b8' }
                ].map((item) => (
                  <div
                    key={item.key}
                    className="h-full"
                    style={{ width: allocationPlan.allocation[item.key].pct, background: item.color }}
                  />
                ))}
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 text-xs text-[#6b7280]">
                {[
                  { label: 'Marketing', key: 'marketing', color: 'bg-[#6366f1]' },
                  { label: 'Product', key: 'product', color: 'bg-[#8b5cf6]' },
                  { label: 'Hiring', key: 'hiring', color: 'bg-[#0ea5e9]' },
                  { label: 'Operations', key: 'ops', color: 'bg-[#f59e0b]' },
                  { label: 'Reserve', key: 'reserve', color: 'bg-[#94a3b8]' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${item.color}`} />
                    <span>{item.label} · {allocationPlan.allocation[item.key].pct}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#6b7280] mt-4">AI: {allocationPlan.narrative}</p>
            </Card>

            <Card className="xl:col-span-5 p-6 lg:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6366f1]">Growth Levers</p>
              <h2 className="font-serif text-2xl text-[#1f2937] mt-1">Where to focus now</h2>
              <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                {['Acquisition', 'Retention', 'Monetization'].map((lever, idx) => (
                  <div key={lever} className={`rounded-xl border ${idx === 1 ? 'border-[#6366f1] bg-[#eef0fd]' : 'border-[#eef0f5] bg-white'} p-3 text-center font-semibold text-[#1f2937]`}>
                    {lever}
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#6b7280] mt-4">Primary focus: Retention (highest drag on LTV today).</p>

              <div className="mt-6 rounded-2xl border border-[#eef0f5] bg-[#fbfcff] p-4 text-sm text-[#6b7280]">
                <p className="font-semibold text-[#1f2937] mb-2">AI Strategy Summary</p>
                <p>Prioritize retention upgrades and a sharper ICP before expanding acquisition. Keep fundraising cadence steady and convert warm investor interest in the next sprint.</p>
              </div>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}

export default AIAnalyticsPage
