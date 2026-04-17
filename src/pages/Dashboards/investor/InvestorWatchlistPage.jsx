import { useMemo, useState } from 'react'
import { Bell, Bookmark, ArrowUpRight } from 'lucide-react'
import InvestorPageFrame from './InvestorPageFrame'
import { investorStartups, investorWatchlistSeed } from './investorData'

const InvestorWatchlistPage = () => {
  const [watchlist, setWatchlist] = useState(investorWatchlistSeed)
  const items = useMemo(() => investorStartups.filter((startup) => watchlist.includes(startup.id)), [watchlist])

  return (
    <InvestorPageFrame
      kicker="Startup Watchlist"
      title="Saved startups and traction alerts"
      description="Bookmark startups you want to follow, inspect their key metrics, and keep traction-change notifications in one place."
      actions={[
        <div key="saved" className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-[#E5EBFF] bg-white text-sm font-semibold text-[#122056]">
          <Bookmark size={16} /> {items.length} saved
        </div>
      ]}
    >
      <div className="grid xl:grid-cols-[1fr_0.8fr] gap-5">
        <div className="space-y-3">
          {items.map((startup) => (
            <div key={startup.id} className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-4 lg:p-5">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <p className="text-lg font-bold text-[#122056]">{startup.name}</p>
                  <p className="text-sm text-[#122056]/58 mt-1">{startup.sector} · {startup.city} · {startup.revenue}</p>
                  <p className="text-xs text-[#122056]/50 mt-2">Quick view: {startup.users}, {startup.growth}% growth, trend {startup.trend}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl border border-[#E5EBFF] bg-[#FBFCFF] px-4 py-3 text-right">
                    <p className="text-[10px] uppercase tracking-[0.16em] font-black text-[#122056]/40">Readiness</p>
                    <p className="text-2xl font-black text-[#122056] mt-1">{startup.readiness}</p>
                  </div>
                  <button onClick={() => setWatchlist((prev) => prev.filter((id) => id !== startup.id))} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[#E5EBFF] bg-white text-sm font-semibold text-[#122056]">
                    <Bookmark size={15} fill="currentColor" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-[#122056] p-5 text-white">
            <p className="text-[10px] uppercase tracking-[0.22em] font-black text-white/45">Notifications</p>
            <h3 className="text-2xl font-serif font-bold mt-1">Traction changes to watch</h3>
            <div className="mt-4 space-y-3 text-sm text-white/72">
              <p className="rounded-2xl bg-white/5 border border-white/10 p-3 inline-flex items-center gap-2"><Bell size={14} /> FlowMint added 2.1K users in 7 days.</p>
              <p className="rounded-2xl bg-white/5 border border-white/10 p-3 inline-flex items-center gap-2"><Bell size={14} /> AstraGrid improved execution speed week-over-week.</p>
              <p className="rounded-2xl bg-white/5 border border-white/10 p-3 inline-flex items-center gap-2"><Bell size={14} /> OrbitPay moved from seed+ to stronger readiness.</p>
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-5">
            <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#5B65DC]">Activity snapshot</p>
            <div className="mt-4 space-y-3">
              {items.map((startup) => (
                <div key={startup.id} className="rounded-2xl border border-[#E5EBFF] bg-[#FBFCFF] p-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-[#122056]">{startup.name}</p>
                    <p className="text-xs text-[#122056]/55">Consistency {startup.consistency} · {startup.trend}</p>
                  </div>
                  <ArrowUpRight size={16} className="text-[#5B65DC]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </InvestorPageFrame>
  )
}

export default InvestorWatchlistPage
