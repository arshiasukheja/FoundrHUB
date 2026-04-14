import { useState } from 'react'
import { Sparkles, FileText } from 'lucide-react'
import InvestorPageFrame from './InvestorPageFrame'
import { investorMemoTemplate, investorStartups } from './investorData'

const MemoGeneratorPage = () => {
  const startup = investorStartups[0]
  const [memo, setMemo] = useState(investorMemoTemplate)
  const [status, setStatus] = useState('Ready to generate')

  const generateMemo = () => {
    setStatus('Generating investment memo...')
    window.setTimeout(() => {
      setMemo({
        problem: `${startup.name} solves a recurring operational pain with measurable urgency.`,
        solution: `The product creates a clearer, faster path to value inside ${startup.sector.toLowerCase()}.`,
        market: `${startup.city} and its adjacent markets are large enough to support venture-scale expansion.`,
        traction: `${startup.growth}% growth and ${startup.revenue} show a credible momentum curve.`,
        risks: 'Watch execution consistency, distribution costs, and competitive crowding.'
      })
      setStatus('Memo updated with structured analysis')
    }, 600)
  }

  return (
    <InvestorPageFrame
      kicker="AI Investment Memo Generator"
      title="One-click structured memo builder"
      description="Generate a clean memo with problem, solution, market, traction, and risk sections."
      actions={[
        <button key="generate" onClick={generateMemo} className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#122056] text-white text-sm font-semibold">
          <Sparkles size={16} /> Generate memo
        </button>
      ]}
    >
      <div className="grid xl:grid-cols-[0.8fr_1.2fr] gap-5 items-start">
        <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-[#122056] p-5 text-white">
          <p className="text-[10px] uppercase tracking-[0.22em] font-black text-white/45">Startup context</p>
          <h3 className="text-2xl font-serif font-bold mt-1">{startup.name}</h3>
          <p className="text-white/60 text-sm mt-2">Memo generation is tuned to the current startup signal set so you can move from scan to decision faster.</p>
          <div className="mt-4 rounded-2xl bg-white/5 border border-white/10 p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] font-black text-white/45">Status</p>
            <p className="text-sm mt-1 text-white">{status}</p>
          </div>
        </div>

        <div className="space-y-3">
          {Object.entries(memo).map(([key, value]) => (
            <div key={key} className="rounded-[1.2rem] border border-[#E5EBFF] bg-white p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] font-black text-[#5B65DC]">{key}</p>
              <p className="text-sm text-[#122056]/72 mt-2">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </InvestorPageFrame>
  )
}

export default MemoGeneratorPage
