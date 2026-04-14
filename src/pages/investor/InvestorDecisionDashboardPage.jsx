import { useMemo } from 'react'
import { AlertTriangle, ArrowUpRight, Brain, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react'
import InvestorPageFrame from './InvestorPageFrame'
import { investorStartups } from './investorData'

const KPI = ({ label, value, sub }) => (
  <div className="rounded-2xl border border-[#E5EBFF] bg-white p-4">
    <p className="text-[10px] uppercase tracking-[0.18em] font-black text-[#122056]/40">{label}</p>
    <p className="text-2xl font-black text-[#122056] mt-1">{value}</p>
    <p className="text-xs text-[#122056]/55 mt-1">{sub}</p>
  </div>
)

const TrendGraph = ({ points }) => {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const width = 420
  const height = 120

  const path = points
    .map((value, index) => {
      const x = (index / (points.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`
    })
    .join(' ')

  return (
    <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#5B65DC]">Portfolio Performance</p>
          <h3 className="text-xl font-serif font-bold text-[#122056] mt-1">Simple trend graph</h3>
        </div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600">6M trend</p>
      </div>
      <div className="mt-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-28">
          <path d={path} fill="none" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" />
          {points.map((value, index) => {
            const x = (index / (points.length - 1)) * width
            const y = height - ((value - min) / range) * height
            return <circle key={`${value}-${index}`} cx={x} cy={y} r="3" fill="#1d4ed8" />
          })}
        </svg>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-[#122056]/60">
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
      </div>
    </div>
  )
}

const RiskDot = ({ level }) => {
  const tone = level === 'Low' ? 'bg-emerald-500' : level === 'Medium' ? 'bg-amber-500' : 'bg-rose-500'
  return <span className={`inline-block w-2.5 h-2.5 rounded-full ${tone}`} />
}

const InvestorDecisionDashboardPage = () => {
  const portfolio = useMemo(() => ({
    total: investorStartups.length,
    investedAmount: '$3.8M',
    value: '$4.8M',
    growth: '+27.8%',
    top: investorStartups[2],
    risk: investorStartups[4],
    trendPoints: [3.55, 3.62, 3.78, 3.95, 4.32, 4.8],
    distribution: { low: 4, medium: 3, high: 1 }
  }), [])

  const recommendations = useMemo(() => [
    { action: 'Invest', startup: investorStartups[2], reason: '41% growth, strong traction, valuation still reasonable.' },
    { action: 'Wait', startup: investorStartups[5], reason: 'Good momentum but valuation needs a cleaner entry.' },
    { action: 'Avoid', startup: investorStartups[4], reason: 'Growth slowdown and weaker founder consistency.' }
  ], [])

  const riskRows = useMemo(() => investorStartups.slice(0, 5).map((s) => {
    const level = s.readiness >= 90 ? 'Low' : s.readiness >= 78 ? 'Medium' : 'High'
    return {
      ...s,
      level,
      score: Math.max(100 - s.readiness, 8)
    }
  }), [])

  const alerts = [
    { title: 'FlowMint entering funding round', action: 'Open term-sheet prep and schedule intro.' },
    { title: 'Portfolio growth dropped 20% in one startup', action: 'Trigger risk review and burn check now.' },
    { title: 'High potential deal available', action: 'Prioritize TerraFleet in today\'s call queue.' }
  ]

  const allocation = [
    'Increase allocation in TerraFleet (high growth, low risk).',
    'Reduce exposure in LensCopilot until trend stabilizes.',
    'Hold OrbitPay with monthly founder-activity checkpoints.'
  ]

  const curatedFlow = useMemo(
    () => investorStartups.filter((s) => s.tags.some((tag) => ['Top 5%', 'Undervalued', 'Trending'].includes(tag))).slice(0, 5),
    []
  )

  const deepDive = useMemo(() => [...investorStartups].sort((a, b) => b.readiness - a.readiness).slice(0, 4), [])

  return (
    <InvestorPageFrame
      kicker="Investor Decision Dashboard"
      title="Clean decision surface"
      description="Minimal, high-signal view to decide where to invest, where to wait, and where to reduce risk."
      actions={[
        <div key="deal" className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-[#E5EBFF] bg-white text-sm font-semibold text-[#122056]">
          <Sparkles size={16} /> Top Deal Today: {portfolio.top.name}
        </div>
      ]}
    >
      <div className="space-y-5">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          <KPI label="Total Invested Startups" value={portfolio.total} sub="Active startup investments" />
          <KPI label="Total Invested Amount" value={portfolio.investedAmount} sub="Total capital deployed" />
          <KPI label="Current Portfolio Value" value={portfolio.value} sub="Current marked valuation" />
          <KPI label="Overall Portfolio Growth %" value={portfolio.growth} sub="From invested capital" />
        </div>

        <TrendGraph points={portfolio.trendPoints} />

        <div className="grid xl:grid-cols-[1.15fr_0.85fr] gap-5">
          <div className="space-y-5">
            <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#5B65DC]">AI Investment Recommendations</p>
                  <h3 className="text-xl font-serif font-bold text-[#122056] mt-1">Invest / Wait / Avoid</h3>
                </div>
                <Brain size={18} className="text-[#5B65DC]" />
              </div>
              <div className="mt-4 space-y-3">
                {recommendations.map((item) => (
                  <div key={item.startup.id} className="rounded-2xl border border-[#E5EBFF] bg-[#FBFCFF] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-bold text-[#122056]">{item.action} - {item.startup.name}</p>
                      <p className="text-sm font-bold text-[#1d4ed8]">{item.startup.readiness}</p>
                    </div>
                    <p className="text-sm text-[#122056]/70 mt-1">{item.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#5B65DC]">Startup Deep Dive</p>
                  <h3 className="text-xl font-serif font-bold text-[#122056] mt-1">Shortlist cards</h3>
                </div>
                <TrendingUp size={18} className="text-[#5B65DC]" />
              </div>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {deepDive.map((s) => (
                  <div key={s.id} className="rounded-2xl border border-[#E5EBFF] bg-[#FBFCFF] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-bold text-[#122056]">{s.name}</p>
                      <p className="text-lg font-black text-[#122056]">{s.readiness}</p>
                    </div>
                    <p className="text-xs text-[#122056]/55 mt-1">{s.growth}% growth · {s.users}</p>
                    <p className="text-xs text-[#122056]/55 mt-1">Trend: {s.trend} · Founder consistency: {s.consistency}</p>
                    <button className="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#5B65DC]">
                      <ArrowUpRight size={14} /> View Full Analysis
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-5">
              <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#5B65DC]">Deal Flow (AI Curated)</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Top 5%', 'Undervalued', 'Trending', 'Sector', 'Stage', 'Risk', 'City'].map((chip) => (
                  <span key={chip} className="text-[10px] font-black uppercase tracking-[0.16em] px-2.5 py-1 rounded-full bg-[#EEF0FD] text-[#122056] border border-[#DDE5FF]">
                    {chip}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {curatedFlow.map((s) => (
                  <div key={s.id} className="rounded-xl border border-[#E5EBFF] bg-[#FBFCFF] px-3 py-2.5 flex items-center justify-between">
                    <p className="text-sm font-semibold text-[#122056]">{s.name} <span className="text-[#122056]/55">({s.sector})</span></p>
                    <p className="text-sm font-black text-[#1d4ed8]">{s.readiness}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#5B65DC]">Risk Intelligence Engine</p>
                  <h3 className="text-xl font-serif font-bold text-[#122056] mt-1">Risk score by startup</h3>
                </div>
                <ShieldAlert size={18} className="text-[#5B65DC]" />
              </div>
              <div className="mt-4 space-y-2">
                {riskRows.map((r) => (
                  <div key={r.id} className="rounded-xl border border-[#E5EBFF] bg-[#FBFCFF] px-3 py-2.5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[#122056] inline-flex items-center gap-2"><RiskDot level={r.level} /> {r.name}</p>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#122056]/55">{r.level}</p>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-[#E7ECFF] overflow-hidden">
                      <div className="h-full bg-[#1d4ed8] rounded-full" style={{ width: `${r.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-[#122056]/60">At Risk Startup: <span className="font-bold text-[#122056]">{portfolio.risk.name}</span></p>
            </div>

            <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#5B65DC]">Smart Alerts</p>
                  <h3 className="text-xl font-serif font-bold text-[#122056] mt-1">Actionable only</h3>
                </div>
                <AlertTriangle size={18} className="text-[#5B65DC]" />
              </div>
              <div className="mt-4 space-y-3">
                {alerts.map((a) => (
                  <div key={a.title} className="rounded-2xl border border-[#E5EBFF] bg-[#FBFCFF] p-4">
                    <p className="font-semibold text-[#122056]">{a.title}</p>
                    <p className="text-sm text-[#122056]/70 mt-1">Action: {a.action}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-[#122056] p-5 text-white">
              <p className="text-[10px] uppercase tracking-[0.22em] font-black text-white/45">Capital Allocation Suggestions</p>
              <div className="mt-4 space-y-3 text-sm text-white/80">
                {allocation.map((n) => (
                  <p key={n} className="rounded-xl bg-white/5 border border-white/10 p-3">{n}</p>
                ))}
              </div>
            </div>

            <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-5">
              <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#5B65DC]">Portfolio Highlights</p>
              <div className="mt-3 space-y-2 text-sm text-[#122056]/75">
                <p>Top Performer: <span className="font-bold text-[#122056]">{portfolio.top.name}</span></p>
                <p>At Risk Startup: <span className="font-bold text-[#122056]">{portfolio.risk.name}</span></p>
                <p>Sector Allocation: SaaS-led, balanced with Fintech and Climate Tech.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InvestorPageFrame>
  )
}

export default InvestorDecisionDashboardPage
