import { useMemo } from 'react'
import { ArrowUpRight, Bell, Sparkles, Target, TrendingUp, Users, Zap } from 'lucide-react'
import { investorStartups } from './investorData'
import InvestorPageFrame from './InvestorPageFrame'

const OverviewStat = ({ label, value, hint }) => (
  <div className="rounded-2xl border border-[#E5EBFF] bg-[#FBFCFF] p-4">
    <p className="text-[10px] uppercase tracking-[0.18em] font-black text-[#122056]/40">{label}</p>
    <p className="text-2xl font-black text-[#122056] mt-1">{value}</p>
    <p className="text-xs text-[#122056]/55 mt-1">{hint}</p>
  </div>
)

const InvestorOverviewPage = () => {
  const featured = investorStartups[2]
  const alerts = useMemo(() => [
    'TerraFleet crossed 41% growth this week.',
    'AstraGrid added two enterprise logos.',
    'OrbitPay updated runway and compliance status.'
  ], [])

  return (
    <InvestorPageFrame
      kicker="Dashboard Overview"
      title="Decision room for active investors"
      description="A high-speed summary of the startups worth attention, the alerts that matter, and the actions you should take next."
      actions={[
        <button key="scan" className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#122056] text-white text-sm font-semibold">
          <Sparkles size={16} /> Run AI scan
        </button>,
        <button key="alerts" className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-[#E5EBFF] bg-white text-[#122056] text-sm font-semibold">
          <Bell size={16} /> View alerts
        </button>
      ]}
    >
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-5">
        <div className="space-y-5">
          <div className="grid sm:grid-cols-3 gap-4">
            <OverviewStat label="Curated startups" value="128" hint="Filtered from active signals" />
            <OverviewStat label="AI top matches" value="14" hint="Aligned to your thesis" />
            <OverviewStat label="Watchlist changes" value="09" hint="Tracked in the last 24h" />
          </div>

          <div className="rounded-[1.5rem] border border-[#E5EBFF] bg-[#122056] p-5 text-white shadow-[0_24px_70px_rgba(18,32,86,0.18)]">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-black text-white/45">Featured startup</p>
                <h3 className="text-2xl font-serif font-bold mt-1">{featured.name}</h3>
                <p className="text-white/60 text-sm mt-2 max-w-xl">{featured.sector} in {featured.city} is showing strong motion with a clean readiness signal and consistent product execution.</p>
              </div>
              <div className="rounded-2xl bg-white/10 border border-white/10 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.18em] font-black text-white/45">Readiness</p>
                <p className="text-3xl font-black mt-1 text-cyan-300">{featured.readiness}</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                <p className="text-[10px] uppercase tracking-[0.18em] font-black text-white/45">Growth</p>
                <p className="text-lg font-bold mt-1 text-white">{featured.growth}%</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                <p className="text-[10px] uppercase tracking-[0.18em] font-black text-white/45">Users</p>
                <p className="text-lg font-bold mt-1 text-white">{featured.users}</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                <p className="text-[10px] uppercase tracking-[0.18em] font-black text-white/45">Trend</p>
                <p className="text-lg font-bold mt-1 text-emerald-300">{featured.trend}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[1.5rem] border border-[#E5EBFF] bg-[#FBFCFF] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#5B65DC]">Live actions</p>
                <h3 className="text-xl font-serif font-bold text-[#122056] mt-1">What to review next</h3>
              </div>
              <TrendingUp size={18} className="text-[#5B65DC]" />
            </div>
            <div className="mt-4 space-y-3">
              {alerts.map((item) => (
                <div key={item} className="rounded-2xl border border-[#E5EBFF] bg-white px-4 py-3 text-sm text-[#122056]/72">{item}</div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-[#E5EBFF] bg-[#FBFCFF] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#5B65DC]">Next move</p>
                <h3 className="text-xl font-serif font-bold text-[#122056] mt-1">Best deal for today</h3>
              </div>
              <Target size={18} className="text-[#5B65DC]" />
            </div>
            <div className="mt-4 rounded-2xl border border-[#E5EBFF] bg-white p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-[#122056]">{featured.name}</p>
                  <p className="text-sm text-[#122056]/58">High potential · Underpriced relative to growth</p>
                </div>
                <ArrowUpRight size={18} className="text-[#5B65DC]" />
              </div>
              <div className="mt-4 flex items-center gap-3 text-xs font-black uppercase tracking-[0.18em]">
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">Top 5%</span>
                <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">AI matched</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InvestorPageFrame>
  )
}

export default InvestorOverviewPage
