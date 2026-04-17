import { useMemo } from 'react'
import { ArrowUpRight, Brain, Gauge, TrendingUp } from 'lucide-react'
import InvestorPageFrame from './InvestorPageFrame'
import { investorStartups } from './investorData'

const FounderConsistencyPage = () => {
  const startup = investorStartups[2]
  const trend = useMemo(() => 'Improving', [])

  return (
    <InvestorPageFrame
      kicker="Founder Consistency Score"
      title="Visual signal for activity, updates, and execution speed"
      description="A founder consistency score helps you spot teams that move with discipline and communicate progress reliably."
      actions={[
        <div key="score" className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-[#E5EBFF] bg-white text-sm font-semibold text-[#122056]">
          <Brain size={16} /> 85 / 100
        </div>
      ]}
    >
      <div className="grid xl:grid-cols-[0.9fr_1.1fr] gap-5 items-start">
        <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-[#122056] p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] font-black text-white/45">Score</p>
              <h3 className="text-2xl font-serif font-bold mt-1">{startup.name}</h3>
            </div>
            <Gauge size={18} className="text-cyan-300" />
          </div>
          <div className="mt-6 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-[conic-gradient(#22d3ee_0deg,#60a5fa_306deg,rgba(255,255,255,0.12)_0deg)] flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-[#07111f] border border-white/10 flex flex-col items-center justify-center">
                <p className="text-4xl font-black text-white">{startup.consistency}</p>
                <p className="text-[10px] uppercase tracking-[0.18em] font-black text-white/45 mt-1">/100</p>
              </div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] font-black text-white/45">Trend</p>
              <p className="text-lg font-bold mt-1 text-emerald-300">{trend}</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] font-black text-white/45">Execution speed</p>
              <p className="text-lg font-bold mt-1 text-white">{startup.growth}%</p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-5">
            <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#5B65DC]">How the score is built</p>
            <div className="mt-4 space-y-3 text-sm text-[#122056]/72">
              <p className="rounded-2xl border border-[#E5EBFF] bg-[#FBFCFF] p-3 inline-flex items-center gap-2"><TrendingUp size={14} className="text-[#1d4ed8]" /> Activity cadence and update frequency.</p>
              <p className="rounded-2xl border border-[#E5EBFF] bg-[#FBFCFF] p-3 inline-flex items-center gap-2"><ArrowUpRight size={14} className="text-[#5B65DC]" /> Execution speed across milestones.
              </p>
              <p className="rounded-2xl border border-[#E5EBFF] bg-[#FBFCFF] p-3 inline-flex items-center gap-2"><Brain size={14} className="text-[#122056]" /> Founder consistency across communication and delivery.</p>
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-5">
            <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#5B65DC]">Signal summary</p>
            <div className="mt-4 grid sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-[#E5EBFF] bg-[#FBFCFF] p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] font-black text-[#122056]/40">Activity</p>
                <p className="text-2xl font-black text-[#122056] mt-1">Consistent</p>
              </div>
              <div className="rounded-2xl border border-[#E5EBFF] bg-[#FBFCFF] p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] font-black text-[#122056]/40">Updates</p>
                <p className="text-2xl font-black text-[#122056] mt-1">Frequent</p>
              </div>
              <div className="rounded-2xl border border-[#E5EBFF] bg-[#FBFCFF] p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] font-black text-[#122056]/40">Momentum</p>
                <p className="text-2xl font-black text-emerald-600 mt-1">Rising</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InvestorPageFrame>
  )
}

export default FounderConsistencyPage
