import InvestorPageFrame from './InvestorPageFrame'
import { investorCitySignals } from './investorData'
import { MapPinned } from 'lucide-react'

const CityInsightsPage = () => {
  return (
    <InvestorPageFrame
      kicker="City Intelligence Insights"
      title="Where the startup gravity is forming"
      description="Use density, investor activity, and opportunity areas to decide which startup cities deserve more attention."
      actions={[
        <div key="live" className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-[#E5EBFF] bg-white text-sm font-semibold text-[#122056]">
          <MapPinned size={16} /> Live heatmap
        </div>
      ]}
    >
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {investorCitySignals.map((city) => (
          <div key={city.city} className="rounded-[1.4rem] border border-[#E5EBFF] bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-bold text-[#122056]">{city.city}</p>
                <p className="text-xs text-[#122056]/55 mt-1">{city.opportunity}</p>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.16em] px-2.5 py-1 rounded-full bg-[#EEF0FD] text-[#122056] border border-[#DDE5FF]">Zone</span>
            </div>
            <div className="mt-4 space-y-3">
              {[{ label: 'Startup density', value: city.density }, { label: 'Investor activity', value: city.investorActivity }].map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-[#122056]/55">{metric.label}</span>
                    <span className="text-[#122056]">{metric.value}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden bg-[#E7ECFF]">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#1d4ed8] to-[#22d3ee]" style={{ width: `${metric.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </InvestorPageFrame>
  )
}

export default CityInsightsPage
