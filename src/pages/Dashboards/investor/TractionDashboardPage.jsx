import { useMemo } from 'react'
import { Clock3, Gauge, LineChart, ShieldCheck, TrendingUp } from 'lucide-react'
import InvestorPageFrame from './InvestorPageFrame'
import { investorStartups } from './investorData'

const Sparkline = ({ points }) => {
  const width = 360
  const height = 120
  const min = Math.min(...points)
  const max = Math.max(...points)
  const poly = points.map((point, index) => {
    const x = (index / (points.length - 1)) * width
    const y = height - ((point - min) / Math.max(max - min, 1)) * (height - 14) - 7
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[120px]">
      <polyline fill="none" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" points={poly} />
      <polygon fill="rgba(29,78,216,0.08)" points={`0,${height} ${poly} ${width},${height}`} />
    </svg>
  )
}

const TractionDashboardPage = () => {
  const data = useMemo(() => [12, 15, 18, 22, 24, 27, 31, 30, 33, 36, 39, 41], [])
  const startup = investorStartups[0]

  return (
    <InvestorPageFrame
      kicker="Traction Monitoring Dashboard"
      title="Growth velocity, revenue trends, and milestone cadence"
      description="Track the metrics that signal momentum: CAC, retention, growth rate, and the timeline of milestones achieved."
      actions={[
        <div key="trend" className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-[#E5EBFF] bg-white text-sm font-semibold text-[#122056]">
          <TrendingUp size={16} /> +18.2% month over month
        </div>
      ]}
    >
      <div className="grid xl:grid-cols-[1.15fr_0.85fr] gap-5">
        <div className="space-y-5">
          <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-[#FBFCFF] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#5B65DC]">Growth vector</p>
                <h3 className="text-2xl font-serif font-bold text-[#122056] mt-1">Monthly growth rate</h3>
              </div>
              <div className="rounded-2xl border border-[#E5EBFF] bg-white px-4 py-3 text-right">
                <p className="text-[10px] uppercase tracking-[0.16em] font-black text-[#122056]/40">Current</p>
                <p className="text-3xl font-black text-[#122056] mt-1">32%</p>
              </div>
            </div>
            <div className="mt-4"><Sparkline points={data} /></div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: 'CAC', value: '$42' },
              { label: 'Retention', value: '68%' },
              { label: 'Growth rate', value: '32%' }
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-[#E5EBFF] bg-white p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] font-black text-[#122056]/40">{item.label}</p>
                <p className="text-2xl font-black text-[#122056] mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#5B65DC]">Milestones</p>
                <h3 className="text-xl font-serif font-bold text-[#122056] mt-1">Recent events</h3>
              </div>
              <Clock3 size={16} className="text-[#5B65DC]" />
            </div>
            <div className="mt-4 space-y-4">
              {['Seed round closed', '1K paying users hit', 'Product v2 shipped', 'SOC 2 review in progress'].map((item, index) => (
                <div key={item} className="flex gap-3">
                  <div className={`w-3 h-3 rounded-full mt-1.5 ${index < 2 ? 'bg-emerald-400' : 'bg-[#C7D3F5]'}`} />
                  <div>
                    <p className="text-sm font-semibold text-[#122056]">{item}</p>
                    <p className="text-xs text-[#122056]/45">Updated within the last 10 days</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-[#122056] p-5 text-white">
            <p className="text-[10px] uppercase tracking-[0.22em] font-black text-white/45">Startup focus</p>
            <h3 className="text-2xl font-serif font-bold mt-1">{startup.name}</h3>
            <p className="text-white/60 text-sm mt-2">{startup.sector} momentum is strongest in {startup.city}. Signals stay consistent across product, growth, and execution.</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                <p className="text-[10px] uppercase tracking-[0.16em] font-black text-white/45">Revenue</p>
                <p className="text-xl font-bold mt-1">{startup.revenue}</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                <p className="text-[10px] uppercase tracking-[0.16em] font-black text-white/45">Trend</p>
                <p className="text-xl font-bold mt-1 text-emerald-300">{startup.trend}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InvestorPageFrame>
  )
}

export default TractionDashboardPage
