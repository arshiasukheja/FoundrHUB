import { useMemo, useState } from 'react'
import { Bookmark, CircleDollarSign, Filter, Globe2, Target, TrendingUp, Zap } from 'lucide-react'
import InvestorPageFrame from './InvestorPageFrame'
import { investorFilterOptions, investorStartups } from './investorData'

const InvestorDiscoveryPage = () => {
  const [filters, setFilters] = useState({ industry: 'All', city: 'All', traction: 'All', funding: 'All' })
  const [saved, setSaved] = useState(['s1', 's3'])

  const filteredStartups = useMemo(() => investorStartups.filter((startup) => {
    const sectorMatch = filters.industry === 'All' || startup.sector === filters.industry
    const cityMatch = filters.city === 'All' || startup.city === filters.city
    const tractionMatch = filters.traction === 'All' || startup.traction === filters.traction
    const fundingMatch = filters.funding === 'All'
      || (filters.funding === '0-1M' && startup.readiness < 75)
      || (filters.funding === '1M-5M' && startup.readiness >= 75 && startup.readiness < 90)
      || (filters.funding === '5M+' && startup.readiness >= 90)

    return sectorMatch && cityMatch && tractionMatch && fundingMatch
  }), [filters])

  return (
    <InvestorPageFrame
      kicker="Startup Discovery Feed"
      title="Scrollable startup market map"
      description="Use filters to narrow the feed by industry, city, traction, and funding stage. Each card shows growth, sector, and readiness score."
      actions={[
        <div key="count" className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-[#E5EBFF] bg-white text-sm font-semibold text-[#122056]">
          <Filter size={16} /> {filteredStartups.length} startups
        </div>
      ]}
    >
      <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-5">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
            {[
              { key: 'industry', label: 'Industry' },
              { key: 'city', label: 'City' },
              { key: 'traction', label: 'Traction' },
              { key: 'funding', label: 'Funding Stage' }
            ].map((item) => (
              <label key={item.key} className="text-xs font-black uppercase tracking-[0.18em] text-[#122056]/45">
                <span className="block mb-2">{item.label}</span>
                <select
                  value={filters[item.key]}
                  onChange={(e) => setFilters((prev) => ({ ...prev, [item.key]: e.target.value }))}
                  className="w-full rounded-xl border border-[#E5EBFF] bg-white px-3 py-2.5 text-sm font-semibold text-[#122056] outline-none"
                >
                  {investorFilterOptions[item.key].map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
            ))}
          </div>

          <div className="max-h-[640px] overflow-auto pr-1 space-y-3">
            {filteredStartups.map((startup) => {
              const active = saved.includes(startup.id)
              return (
                <div key={startup.id} className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-4 lg:p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold text-[#122056]">{startup.name}</h3>
                        {startup.tags.map((tag) => <span key={tag} className="text-[10px] font-black uppercase tracking-[0.16em] px-2.5 py-1 rounded-full bg-[#EEF0FD] text-[#122056] border border-[#DDE5FF]">{tag}</span>)}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-[#122056]/58">
                        <span className="inline-flex items-center gap-2"><TrendingUp size={14} /> {startup.growth}% growth</span>
                        <span className="inline-flex items-center gap-2"><Target size={14} /> {startup.sector}</span>
                        <span className="inline-flex items-center gap-2"><Globe2 size={14} /> {startup.city}</span>
                        <span className="inline-flex items-center gap-2"><CircleDollarSign size={14} /> Ready {startup.readiness}/100</span>
                      </div>
                    </div>
                    <button onClick={() => setSaved((prev) => prev.includes(startup.id) ? prev.filter((id) => id !== startup.id) : [startup.id, ...prev])} className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold ${active ? 'bg-[#122056] border-[#122056] text-white' : 'bg-white border-[#E5EBFF] text-[#122056]'}`}>
                      <Bookmark size={15} fill={active ? 'currentColor' : 'none'} /> {active ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-[#122056] p-5 text-white">
            <p className="text-[10px] uppercase tracking-[0.22em] font-black text-white/45">Discovery briefing</p>
            <h3 className="text-2xl font-serif font-bold mt-1">AI surfaces the best matches first</h3>
            <p className="text-white/60 text-sm mt-3">This panel shifts with your filters so the feed stays focused on the startups most likely to fit your thesis.</p>
            <div className="mt-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em]">
              <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10">High Potential</span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10">Trending</span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10">Undervalued</span>
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-5">
            <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#5B65DC]">Quick scan</p>
            <div className="mt-4 space-y-3">
              {filteredStartups.slice(0, 4).map((startup) => (
                <div key={startup.id} className="rounded-2xl border border-[#E5EBFF] bg-[#FBFCFF] p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#122056]">{startup.name}</p>
                    <p className="text-xs text-[#122056]/55">{startup.city} · {startup.sector}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-[#1d4ed8]">{startup.readiness}</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] font-black text-[#122056]/40">Readiness</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </InvestorPageFrame>
  )
}

export default InvestorDiscoveryPage
