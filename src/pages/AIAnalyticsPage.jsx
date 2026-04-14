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
    const valuation = Math.max(0, toNumber(allocationInput.valuation))
    const equity = Math.min(100, Math.max(0, toNumber(allocationInput.equity)))
    const budget = Math.max(0, toNumber(allocationInput.budget))
    const goal = allocationInput.goal

    const base = {
      marketing: 0.28,
      product: 0.24,
      sales: 0.18,
      hiring: 0.16,
      ops: 0.08,
      reserve: 0.06
    }

    if (goal === 'User growth') {
      base.marketing += 0.08
      base.product += 0.03
      base.reserve -= 0.05
      base.ops -= 0.06
    } else if (goal === 'Revenue growth') {
      base.sales += 0.08
      base.product += 0.04
      base.reserve -= 0.06
      base.ops -= 0.06
    } else if (goal === 'Retention') {
      base.product += 0.1
      base.ops += 0.02
      base.marketing -= 0.06
      base.reserve -= 0.06
    }

    const total = Object.values(base).reduce((sum, v) => sum + v, 0)
    const normalized = Object.fromEntries(
      Object.entries(base).map(([k, v]) => [k, v / total])
    )

    const roundSize = budget * 10000000
    const valuationMoney = valuation * 10000000
    const implied = valuationMoney > 0 ? (roundSize / valuationMoney) * 100 : 0

    const formatPct = (v) => `${Math.round(v * 100)}%`
    const formatAmt = (v) => formatMoney(v)

    return {
      equity,
      implied,
      roundSize,
      allocation: {
        marketing: { pct: formatPct(normalized.marketing), amt: formatAmt(roundSize * normalized.marketing) },
        product: { pct: formatPct(normalized.product), amt: formatAmt(roundSize * normalized.product) },
        sales: { pct: formatPct(normalized.sales), amt: formatAmt(roundSize * normalized.sales) },
        hiring: { pct: formatPct(normalized.hiring), amt: formatAmt(roundSize * normalized.hiring) },
        ops: { pct: formatPct(normalized.ops), amt: formatAmt(roundSize * normalized.ops) },
        reserve: { pct: formatPct(normalized.reserve), amt: formatAmt(roundSize * normalized.reserve) }
      },
      narrative: [
        `At a Rs${valuation.toFixed(1)}Cr valuation, a Rs${budget.toFixed(1)}Cr raise implies ~${implied.toFixed(1)}% new dilution.`,
        `${goal} focus shifts budget toward the highest-leverage channels first.`,
        'Keep 1-2 months of runway in reserve for unexpected CAC spikes.'
      ]
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

          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((item) => {
              const done = implementedFixIds.includes(item.id)
              return (
                <Card key={item.id} className="p-5">
                  <p className="text-[11px] uppercase tracking-widest font-bold text-[#9ca3af]">AI recommendation</p>
                  <p className="text-lg font-bold text-[#1f2937] mt-2">{item.title}</p>
                  <p className="text-xs text-[#6b7280] mt-2"><span className="font-semibold">Why:</span> {item.reason}</p>
                  <p className="text-xs text-[#6b7280] mt-1"><span className="font-semibold">What to do:</span> {item.fix}</p>
                  <p className="text-xs font-bold text-emerald-700 mt-2">Expected impact: {item.impact}</p>
                  <button
                    onClick={() => markImplemented(item.id)}
                    className={`mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold ${done ? 'bg-emerald-100 text-emerald-700' : 'bg-[#1f2937] text-white hover:bg-[#111827]'}`}
                  >
                    {done ? <CheckCircle2 size={14} /> : <ArrowRight size={14} />}
                    {done ? 'Implemented' : 'Implement'}
                  </button>
                </Card>
              )
            })}
          </section>


          <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <Card className="xl:col-span-5 p-6 lg:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6366f1]">Brand Growth AI</p>
              <h2 className="font-serif text-2xl text-[#1f2937] mt-1">Suggestions to grow your brand</h2>
              <div className="mt-4 space-y-3">
                {brandSuggestions.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-[#eef0f5] bg-[#fbfcff] p-4">
                    <p className="text-sm font-bold text-[#1f2937]">{item.title}</p>
                    <p className="text-xs text-[#6b7280] mt-2">{item.detail}</p>
                    <p className="text-xs font-semibold text-emerald-700 mt-2">Impact: {item.impact}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="xl:col-span-7 p-6 lg:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6366f1]">AI Capital Allocation</p>
              <h2 className="font-serif text-2xl text-[#1f2937] mt-1">Input valuation and equity to plan spend</h2>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="text-xs font-semibold text-[#6b7280]">
                  Valuation (Rs Cr)
                  <input
                    value={allocationInput.valuation}
                    onChange={(event) => updateAllocationField('valuation', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#eef0f5] bg-white px-3 py-2 text-sm text-[#1f2937]"
                    type="number"
                    min="0"
                    step="0.1"
                  />
                </label>
                <label className="text-xs font-semibold text-[#6b7280]">
                  Investor equity (%)
                  <input
                    value={allocationInput.equity}
                    onChange={(event) => updateAllocationField('equity', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#eef0f5] bg-white px-3 py-2 text-sm text-[#1f2937]"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </label>
                <label className="text-xs font-semibold text-[#6b7280]">
                  Round size (Rs Cr)
                  <input
                    value={allocationInput.budget}
                    onChange={(event) => updateAllocationField('budget', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#eef0f5] bg-white px-3 py-2 text-sm text-[#1f2937]"
                    type="number"
                    min="0"
                    step="0.1"
                  />
                </label>
                <label className="text-xs font-semibold text-[#6b7280]">
                  Goal focus
                  <select
                    value={allocationInput.goal}
                    onChange={(event) => updateAllocationField('goal', event.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#eef0f5] bg-white px-3 py-2 text-sm text-[#1f2937]"
                  >
                    {['User growth', 'Revenue growth', 'Retention'].map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Marketing', key: 'marketing' },
                  { label: 'Product', key: 'product' },
                  { label: 'Sales', key: 'sales' },
                  { label: 'Hiring', key: 'hiring' },
                  { label: 'Operations', key: 'ops' },
                  { label: 'Reserve', key: 'reserve' }
                ].map((item) => (
                  <div key={item.key} className="rounded-2xl border border-[#eef0f5] bg-[#fbfcff] p-4">
                    <p className="text-xs font-semibold text-[#6b7280]">{item.label}</p>
                    <p className="text-lg font-bold text-[#1f2937] mt-1">{allocationPlan.allocation[item.key].pct}</p>
                    <p className="text-xs text-[#6b7280] mt-1">{allocationPlan.allocation[item.key].amt}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-2xl border border-[#eef0f5] bg-white p-4 text-sm text-[#6b7280]">
                <p className="font-semibold text-[#1f2937] mb-2">AI summary</p>
                <ul className="space-y-1">
                  {allocationPlan.narrative.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </section>

          <section className="rounded-2xl bg-white border border-[#eef0f5] p-4 text-sm text-[#6b7280] inline-flex items-center gap-2">
            <Wallet size={16} className="text-[#6366f1]" />
            <span>
              Implemented recommendations: <span className="font-bold text-[#1f2937]">{implementedFixIds.length}</span> |
              Estimated uplift: <span className="font-bold text-emerald-700">{formatMoney(implementedFixIds.length * 22000)}</span>
            </span>
          </section>
        </main>
      </div>
    </div>
  )
}

export default AIAnalyticsPage
