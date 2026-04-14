import { useMemo } from 'react'
import { ArrowUpRight, Sparkles, Star, TrendingUp } from 'lucide-react'
import InvestorPageFrame from './InvestorPageFrame'
import { investorStartups } from './investorData'

const InvestorDealFlowPage = () => {
  const ranked = useMemo(() => [...investorStartups].sort((a, b) => b.readiness - a.readiness).slice(0, 5), [])
  const top = ranked[0]

  return (
    <InvestorPageFrame
      kicker="AI Smart Deal Flow"
      title="Top 5% startups"
      description="AI-ranked opportunities based on investor fit, readiness, traction, and momentum. Use this page to move quickly from signal to action."
      actions={[
        <div key="fit" className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-[#E5EBFF] bg-white text-sm font-semibold text-[#122056]">
          <Sparkles size={16} /> 92% thesis match
        </div>
      ]}
    >
      <div className="grid xl:grid-cols-[1fr_0.72fr] gap-5">
        <div className="space-y-3">
          {ranked.map((deal, index) => (
            <div key={deal.id} className={`rounded-[1.4rem] border p-4 lg:p-5 ${index === 0 ? 'border-emerald-200 bg-emerald-50/70' : 'border-[#E5EBFF] bg-white'}`}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-lg font-bold text-[#122056]">{index + 1}. {deal.name}</p>
                    {deal.tags.map((tag) => <span key={tag} className={`text-[10px] font-black uppercase tracking-[0.16em] px-2.5 py-1 rounded-full ${tag === 'Top 5%' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : tag === 'Trending' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-cyan-100 text-cyan-700 border border-cyan-200'}`}>{tag}</span>)}
                  </div>
                  <p className="text-sm text-[#122056]/58 mt-2">{deal.sector} · {deal.city} · {deal.growth}% monthly growth · {deal.traction}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-[#122056]">{deal.readiness}</p>
                  <p className="text-[10px] uppercase tracking-[0.18em] font-black text-[#122056]/40">Readiness</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-[#122056] p-5 text-white">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] font-black text-white/45">Best current match</p>
                <h3 className="text-2xl font-serif font-bold mt-1">{top.name}</h3>
              </div>
              <Star size={18} className="text-emerald-300" fill="currentColor" />
            </div>
            <p className="text-white/60 text-sm mt-3">{top.sector} in {top.city} combines speed, readiness, and execution quality into the strongest AI recommendation today.</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                <p className="text-[10px] uppercase tracking-[0.16em] font-black text-white/45">Growth</p>
                <p className="text-xl font-bold mt-1 text-white">{top.growth}%</p>
              </div>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                <p className="text-[10px] uppercase tracking-[0.16em] font-black text-white/45">Users</p>
                <p className="text-xl font-bold mt-1 text-white">{top.users}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-5">
            <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#5B65DC]">Why this ranks high</p>
            <div className="mt-4 space-y-3 text-sm text-[#122056]/72">
              <p className="inline-flex items-start gap-2"><TrendingUp size={14} className="mt-0.5 text-[#1d4ed8]" /> Rapid month-over-month growth with a clear market wedge.</p>
              <p className="inline-flex items-start gap-2"><Sparkles size={14} className="mt-0.5 text-[#5B65DC]" /> Strong execution rhythm and a clean data trail.</p>
              <p className="inline-flex items-start gap-2"><ArrowUpRight size={14} className="mt-0.5 text-[#122056]" /> Underpriced relative to startup quality and traction signal.</p>
            </div>
          </div>
        </div>
      </div>
    </InvestorPageFrame>
  )
}

export default InvestorDealFlowPage
