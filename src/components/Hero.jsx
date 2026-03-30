/* FoundrHUB — Hero Section with oversized editorial headline */
const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Subtle radial gradient accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-beige-100/60 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-beige-50/80 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-10 pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — Copy */}
          <div className="reveal max-w-2xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-neutral-200 bg-beige-50/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[12px] font-semibold tracking-widest uppercase text-neutral-500">
                Now in early access
              </span>
            </div>

            <h1 className="font-serif text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.08] tracking-tight text-neutral-950 mb-7">
              Discover the next generation of homegrown brands&nbsp;and&nbsp;startups.
            </h1>

            <p className="text-[17px] lg:text-[18px] leading-relaxed text-neutral-500 max-w-lg mb-10">
              A curated discovery OS for early-stage founders, rising D2C brands, and verified local innovators.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#discover"
                id="hero-cta-explore"
                className="inline-flex items-center px-7 py-3.5 rounded-full bg-neutral-950 text-white text-[14px] font-semibold tracking-wide hover:bg-neutral-800 transition-all duration-300 hover:shadow-xl hover:shadow-neutral-200 group"
              >
                Explore Startups
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a
                href="#verified"
                id="hero-cta-verified"
                className="inline-flex items-center px-7 py-3.5 rounded-full border border-neutral-200 text-neutral-700 text-[14px] font-semibold tracking-wide hover:border-neutral-400 hover:text-neutral-950 transition-all duration-300 bg-white/60"
              >
                Get Verified
              </a>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-2.5">
                {['#e8d5c0','#c9d5e0','#d5e0c9','#e0c9d5'].map((bg, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-neutral-600" style={{ background: bg }}>
                    {['AS','RK','MP','JD'][i]}
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-neutral-400 leading-snug">
                <span className="font-semibold text-neutral-600">240+</span> founders already building in public
              </p>
            </div>
          </div>

          {/* Right — Dashboard Mockup Card */}
          <div className="reveal hidden lg:block" style={{ transitionDelay: '0.15s' }}>
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-beige-100/50 via-white to-beige-50/30 rounded-[2rem] blur-2xl" />

              {/* Card */}
              <div className="relative bg-white rounded-3xl border border-neutral-100 shadow-[0_8px_60px_-12px_rgba(0,0,0,0.08)] p-8">
                {/* Mock header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-950 flex items-center justify-center">
                      <span className="text-white text-[11px] font-bold">FH</span>
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-neutral-900">FoundrHUB Dashboard</p>
                      <p className="text-[12px] text-neutral-400">Startup Discovery OS</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                  </div>
                </div>

                {/* Mock stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Active Startups', value: '1,247', change: '+12%' },
                    { label: 'Cities Covered', value: '86', change: '+5' },
                    { label: 'Verified Founders', value: '493', change: '+28' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-beige-50/60 rounded-2xl p-4">
                      <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1">{stat.label}</p>
                      <p className="text-[22px] font-semibold text-neutral-900 leading-tight">{stat.value}</p>
                      <span className="text-[11px] font-semibold text-emerald-600">{stat.change}</span>
                    </div>
                  ))}
                </div>

                {/* Mock chart */}
                <div className="bg-beige-50/40 rounded-2xl p-5">
                  <p className="text-[12px] font-medium text-neutral-400 mb-4">Discovery Trend — Last 6 months</p>
                  <div className="flex items-end gap-2 h-24">
                    {[35, 48, 42, 65, 58, 82, 70, 90, 78, 95, 88, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-md transition-all duration-500"
                        style={{
                          height: `${h}%`,
                          background: i >= 10 ? '#0a0a0a' : i >= 8 ? '#404040' : '#d1d5db',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
