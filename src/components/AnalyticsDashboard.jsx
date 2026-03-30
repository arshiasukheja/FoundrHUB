/* FoundrHUB — Analytics Dashboard Preview Strip */
const metrics = [
  {
    label: 'Startups Discovered',
    value: '12,480',
    change: '+18.2%',
    trend: 'up',
    description: 'Total startups surfaced through FoundrHUB this quarter',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    label: 'Cities Active',
    value: '86',
    change: '+12 new',
    trend: 'up',
    description: 'Tier 1, 2 & 3 cities where founders are building',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    label: 'Founder Growth',
    value: '3.4x',
    change: 'YoY',
    trend: 'up',
    description: 'Founder signups growing at 3.4x year-over-year',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    label: 'Traction Score',
    value: '94',
    change: '/100',
    trend: 'neutral',
    description: 'Average traction score of verified startups on the platform',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

const cityData = [
  { city: 'Bengaluru', count: 342, pct: 100 },
  { city: 'Mumbai', count: 289, pct: 84 },
  { city: 'Delhi NCR', count: 234, pct: 68 },
  { city: 'Pune', count: 156, pct: 46 },
  { city: 'Hyderabad', count: 128, pct: 37 },
];

const AnalyticsDashboard = () => {
  return (
    <section id="analytics" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="reveal max-w-2xl mb-16">
          <span className="text-[12px] font-semibold tracking-widest uppercase text-neutral-400 mb-4 block">
            Platform Analytics
          </span>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-tight text-neutral-950 mb-4">
            The pulse of India's startup ecosystem
          </h2>
          <p className="text-[16px] text-neutral-500 leading-relaxed">
            Track real-time discovery trends, city-wise traction, and growth metrics — all in one place.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className="reveal group bg-white rounded-3xl border border-neutral-100 p-6 hover:border-neutral-200 hover:shadow-[0_4px_32px_-8px_rgba(0,0,0,0.06)] transition-all duration-500 cursor-default"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-beige-50 border border-beige-200/60 flex items-center justify-center text-neutral-500">
                  {m.icon}
                </div>
                <span className={`text-[12px] font-semibold ${m.trend === 'up' ? 'text-emerald-600' : 'text-neutral-400'}`}>
                  {m.change}
                </span>
              </div>
              <p className="text-[28px] font-semibold text-neutral-900 leading-tight mb-1">{m.value}</p>
              <p className="text-[13px] text-neutral-400 font-medium">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Bottom Row: Chart + City Breakdown */}
        <div className="reveal grid lg:grid-cols-5 gap-6">
          {/* Mini Trend Chart */}
          <div className="lg:col-span-3 bg-beige-50/50 rounded-3xl border border-beige-200/40 p-7">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[15px] font-semibold text-neutral-900">Startup Growth Trends</p>
                <p className="text-[13px] text-neutral-400 mt-1">Monthly new startups joined — last 12 months</p>
              </div>
              <div className="flex gap-2">
                {['6M', '12M', 'All'].map((period, idx) => (
                  <button
                    key={period}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors duration-200 ${
                      idx === 1 ? 'bg-neutral-950 text-white' : 'bg-white text-neutral-500 border border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart bars */}
            <div className="flex items-end gap-3 h-40">
              {[28, 35, 42, 38, 50, 55, 48, 62, 68, 72, 80, 92].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-lg transition-all duration-700 hover:opacity-80"
                    style={{
                      height: `${h}%`,
                      background: i === 11 ? '#0a0a0a' : i >= 9 ? '#525252' : '#d4d4d4',
                    }}
                  />
                  <span className="text-[9px] text-neutral-400 font-medium">
                    {['J','F','M','A','M','J','J','A','S','O','N','D'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* City Breakdown */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-neutral-100 p-7">
            <p className="text-[15px] font-semibold text-neutral-900 mb-1">City-wise Discovery</p>
            <p className="text-[13px] text-neutral-400 mb-6">Top cities by active startups</p>

            <div className="space-y-4">
              {cityData.map((c) => (
                <div key={c.city}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[13px] font-medium text-neutral-700">{c.city}</span>
                    <span className="text-[12px] font-semibold text-neutral-500">{c.count}</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${c.pct}%`,
                        background: c.pct > 80 ? '#0a0a0a' : c.pct > 50 ? '#525252' : '#a3a3a3',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
