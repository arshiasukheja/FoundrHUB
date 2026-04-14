import { useState } from 'react'
import { Bookmark, Check, Inbox, X } from 'lucide-react'
import InvestorPageFrame from './InvestorPageFrame'
import { investorDealInbox } from './investorData'

const DealInboxPage = () => {
  const [items, setItems] = useState(investorDealInbox)

  const updateStatus = (id, status) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)))
  }

  return (
    <InvestorPageFrame
      kicker="Deal Room / Pitch Inbox"
      title="Founder proposals in one queue"
      description="Accept, reject, or save pitch proposals without losing context. Each card stays clean and action-ready."
      actions={[
        <div key="count" className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-[#E5EBFF] bg-white text-sm font-semibold text-[#122056]">
          <Inbox size={16} /> {items.length} proposals
        </div>
      ]}
    >
      <div className="grid xl:grid-cols-[1fr_0.8fr] gap-5">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-4 lg:p-5">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <p className="text-lg font-bold text-[#122056]">{item.startup}</p>
                  <p className="text-xs text-[#122056]/55 mt-1">From {item.founder}</p>
                  <p className="text-sm text-[#122056]/72 mt-2 max-w-xl">{item.note}</p>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`text-[10px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full ${item.status === 'saved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : item.status === 'accepted' ? 'bg-cyan-50 text-cyan-700 border border-cyan-100' : item.status === 'rejected' ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>{item.status}</span>
                  <div className="rounded-2xl border border-[#E5EBFF] bg-[#FBFCFF] px-4 py-3 text-right">
                    <p className="text-[10px] uppercase tracking-[0.16em] font-black text-[#122056]/40">Signal</p>
                    <p className="text-2xl font-black text-[#122056] mt-1">{item.score}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 flex-wrap">
                <button onClick={() => updateStatus(item.id, 'accepted')} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold"><Check size={14} /> Accept</button>
                <button onClick={() => updateStatus(item.id, 'rejected')} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[#E5EBFF] bg-white text-[#122056] text-xs font-semibold"><X size={14} /> Reject</button>
                <button onClick={() => updateStatus(item.id, 'saved')} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-[#E5EBFF] bg-white text-[#122056] text-xs font-semibold"><Bookmark size={14} /> Save</button>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[1.4rem] border border-[#E5EBFF] bg-[#122056] p-5 text-white">
          <p className="text-[10px] uppercase tracking-[0.22em] font-black text-white/45">Decision helper</p>
          <h3 className="text-2xl font-serif font-bold mt-1">Keep the best proposals visible</h3>
          <p className="text-white/60 text-sm mt-3">Saved items remain accessible as your active queue evolves. This gives you a clean deal room without losing promising proposals.</p>
        </div>
      </div>
    </InvestorPageFrame>
  )
}

export default DealInboxPage
