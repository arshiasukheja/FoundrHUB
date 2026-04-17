import React, { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ref, set, update } from 'firebase/database'
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Wallet
} from 'lucide-react'
import SidebarMenu from '../../components/Navigation/SidebarMenu'
import DashboardHeader from '../../components/Layout/DashboardHeader'
import { useAuth } from '../../context/AuthContext'
import { useRealtimeValue } from '../../lib/realtime'
import { buildDefaultUserData } from '../../lib/seedData'
import { db } from '../../lib/firebase'

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
  const [expandedRecommendationId, setExpandedRecommendationId] = useState(null)
  const [fundraisingInput, setFundraisingInput] = useState({
    raiseAmount: '4.5',
    runwayMonths: '8',
    growthRate: '18',
    retentionRate: '41'
  })
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

  const fundraisingAssessment = useMemo(() => {
    const raiseAmount = toNumber(fundraisingInput.raiseAmount)
    const runwayMonths = toNumber(fundraisingInput.runwayMonths)
    const growthRate = toNumber(fundraisingInput.growthRate)
    const retentionRate = toNumber(fundraisingInput.retentionRate)

    const score =
      (growthRate >= 15 ? 1 : 0) +
      (retentionRate >= 40 ? 1 : 0) +
      (runwayMonths >= 6 ? 1 : 0)

    const verdict = score >= 2 ? 'Effective' : 'Needs work'
    const tone = score >= 2 ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-rose-600 bg-rose-50 border-rose-100'

    const guidance = score >= 2
      ? `Your inputs look investor-ready for a Rs${raiseAmount.toFixed(1)}Cr raise. Keep retention stable and maintain a 6+ month runway.`
      : 'Tighten retention or growth before raising. Aim for 15%+ growth and 40%+ retention to improve your odds.'

    return { verdict, tone, guidance }
  }, [fundraisingInput])

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
            <Card className="xl:col-span-8 p-6 lg:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6366f1]">What You Should Do Next</p>
              <h2 className="font-serif text-3xl text-[#1f2937] mt-1">Top 3 actions</h2>
              <div className="mt-5 space-y-4">
                {(recommendations.length ? recommendations : [
                  { id: 'r1', title: 'Fix onboarding drop in first session', reason: 'Most users bounce before completing setup step 2.', fix: 'Replace long setup with 2-step onboarding + sample data autofill.', impact: 'Lift activation by ~18%' },
                  { id: 'r2', title: 'Improve pricing page conversion', reason: 'Annual plan value prop is not visible above the fold.', fix: 'Move annual plan card to first position and add savings badge near CTA.', impact: 'Increase paid conversion by ~11%' },
                  { id: 'r3', title: 'Target high-converting segment', reason: 'Teams with 5-10 members convert much higher than solo users.', fix: 'Launch a dedicated landing page and outreach flow for 5-10 team segment.', impact: 'Increase qualified pipeline by ~14%' }
                ]).slice(0, 3).map((item, index) => {
                  const isOpen = expandedRecommendationId === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setExpandedRecommendationId(isOpen ? null : item.id)}
                      className="w-full text-left rounded-2xl border border-[#eef0f5] bg-[#fbfcff] p-5 transition hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="flex flex-col items-center gap-1">
                            <span className="h-10 w-10 rounded-full bg-[#6366f1] text-white text-sm font-bold flex items-center justify-center shadow-[0_6px_16px_rgba(99,102,241,0.35)]">
                              {index + 1}
                            </span>
                            <span className="text-[11px] font-semibold text-[#6366f1]">Step {index + 1}</span>
                          </div>
                          <div>
                            <p className="text-base font-semibold text-[#1f2937]">{item.title}</p>
                            <p className="text-sm text-[#4b5563] mt-1">Impact: {item.impact}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs font-semibold text-[#94a3b8]">{index + 1} of 3</span>
                          <ArrowRight size={18} className={`mt-1 text-[#6366f1] transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                        </div>
                      </div>
                      {isOpen && (
                        <div className="mt-4 space-y-3 text-sm text-[#4b5563]">
                          <p className="text-xs uppercase tracking-[0.18em] text-[#6366f1] font-semibold">AI Steps</p>
                          <div className="grid gap-2">
                            <div className="flex items-start gap-2">
                              <span className="h-6 w-6 rounded-full bg-[#eef2ff] text-[#4f46e5] text-xs font-semibold flex items-center justify-center">1</span>
                              <p><span className="font-semibold text-[#1f2937]">Diagnose:</span> {item.reason}</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="h-6 w-6 rounded-full bg-[#eef2ff] text-[#4f46e5] text-xs font-semibold flex items-center justify-center">2</span>
                              <p><span className="font-semibold text-[#1f2937]">Implement:</span> {item.fix}</p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="h-6 w-6 rounded-full bg-[#eef2ff] text-[#4f46e5] text-xs font-semibold flex items-center justify-center">3</span>
                              <p><span className="font-semibold text-[#1f2937]">Validate:</span> Track the key metric for 7-14 days and confirm the lift matches the expected impact.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </Card>

            <Card className="xl:col-span-4 p-6 lg:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6366f1]">Fundraising Intelligence</p>
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

              <div className="mt-5 rounded-2xl border border-[#eef0f5] bg-[#fbfcff] p-4">
                <p className="text-xs font-semibold text-[#6366f1] uppercase tracking-[0.18em]">Check effectiveness</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <label className="text-xs font-semibold text-[#6b7280]">
                    Raise amount (Cr)
                    <input
                      value={fundraisingInput.raiseAmount}
                      onChange={(e) => setFundraisingInput((prev) => ({ ...prev, raiseAmount: e.target.value }))}
                      className="mt-2 w-full rounded-xl border border-[#e5e7eb] bg-white px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="text-xs font-semibold text-[#6b7280]">
                    Runway (months)
                    <input
                      value={fundraisingInput.runwayMonths}
                      onChange={(e) => setFundraisingInput((prev) => ({ ...prev, runwayMonths: e.target.value }))}
                      className="mt-2 w-full rounded-xl border border-[#e5e7eb] bg-white px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="text-xs font-semibold text-[#6b7280]">
                    Growth rate (%)
                    <input
                      value={fundraisingInput.growthRate}
                      onChange={(e) => setFundraisingInput((prev) => ({ ...prev, growthRate: e.target.value }))}
                      className="mt-2 w-full rounded-xl border border-[#e5e7eb] bg-white px-3 py-2 text-sm"
                    />
                  </label>
                  <label className="text-xs font-semibold text-[#6b7280]">
                    Retention (%)
                    <input
                      value={fundraisingInput.retentionRate}
                      onChange={(e) => setFundraisingInput((prev) => ({ ...prev, retentionRate: e.target.value }))}
                      className="mt-2 w-full rounded-xl border border-[#e5e7eb] bg-white px-3 py-2 text-sm"
                    />
                  </label>
                </div>
                <div className={`mt-4 rounded-xl border px-3 py-2 text-sm font-semibold ${fundraisingAssessment.tone}`}>
                  {fundraisingAssessment.verdict}
                </div>
                <p className="mt-2 text-xs text-[#6b7280]">{fundraisingAssessment.guidance}</p>
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
