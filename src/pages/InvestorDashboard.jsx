import { Outlet, useLocation } from 'react-router-dom'
import { useMemo, useState } from 'react'
import InvestorSidebar from '../components/InvestorSidebar'
import { Search } from 'lucide-react'

const InvestorDashboard = () => {
  const location = useLocation()
  const isDark = false
  const themeClasses = 'bg-[#F6F8FC] text-[#122056]'

  const surfaceClasses = 'bg-white border-[#E5EBFF] text-[#122056] shadow-[0_24px_70px_rgba(18,32,86,0.08)]'

  const softSurface = 'bg-[#FBFCFF] border-[#E5EBFF] text-[#122056]'

  const outletContext = useMemo(() => ({ isDark, surfaceClasses, softSurface }), [isDark, surfaceClasses, softSurface])

  return (
    <div className={`min-h-screen relative overflow-hidden ${themeClasses}`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-[-8%] left-[-10%] w-[38%] h-[38%] rounded-full blur-[140px] ${isDark ? 'bg-cyan-500/10' : 'bg-[#5B65DC]/8'}`} />
        <div className={`absolute top-[16%] right-[-8%] w-[30%] h-[30%] rounded-full blur-[120px] ${isDark ? 'bg-blue-500/10' : 'bg-[#122056]/5'}`} />
        <div className={`absolute bottom-[-10%] left-[20%] w-[24%] h-[24%] rounded-full blur-[140px] ${isDark ? 'bg-emerald-500/10' : 'bg-cyan-500/8'}`} />
      </div>

      <div className="relative z-10">
        <InvestorSidebar isDark={isDark} />

        <div className="ml-0 lg:ml-[292px] relative z-10 min-h-screen">
          <div className={`sticky top-0 z-40 backdrop-blur-2xl border-b ${isDark ? 'bg-[#07111f]/80 border-white/10' : 'bg-[#F6F8FC]/85 border-[#E5EBFF]'}`}>
            <div className="max-w-[1600px] mx-auto px-5 lg:px-8 py-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className={`text-[10px] uppercase tracking-[0.24em] font-black ${isDark ? 'text-cyan-300/80' : 'text-[#5B65DC]'}`}>Investor Intelligence OS</p>
                <h1 className={`text-2xl lg:text-3xl font-serif font-bold ${isDark ? 'text-white' : 'text-[#122056]'}`}>Investor dashboard</h1>
                <p className={`text-sm mt-1 ${isDark ? 'text-white/55' : 'text-[#122056]/58'}`}>Use the sidebar to move between feature pages without losing context.</p>
              </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <div className="hidden xl:flex items-center gap-2 rounded-2xl px-4 py-3 border bg-white border-[#E5EBFF] text-[#122056]/70 min-w-[280px]">
                  <Search size={16} />
                  <span className="text-sm">Search startup, founder, sector, city</span>
                </div>
                  <div className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-[#E5EBFF] bg-white text-sm font-semibold text-[#122056]">
                    Light mode
                  </div>
              </div>
            </div>
          </div>

          <main className="max-w-[1600px] mx-auto px-5 lg:px-8 py-6 lg:py-8">
            <Outlet context={outletContext} />
          </main>
        </div>
      </div>
    </div>
  )
}

export default InvestorDashboard
