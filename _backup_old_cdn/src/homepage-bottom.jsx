/* ═══════════════════════════════════════════════════════════════
   HOMEPAGE BOTTOM — Analytics, Verification, CTA, Footer
   ═══════════════════════════════════════════════════════════════ */

/* ── 5. Founder Analytics Dashboard Preview ── */
const AnalyticsPreview = () => (
  <section id="analytics" className="py-24 lg:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/50 via-amber-50/10 to-white" />
    <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
      <div className="reveal text-center mb-16">
        <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-400 mb-4 block">Analytics Dashboard</span>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.1] text-neutral-950 mb-4">Your startup performance at a glance</h2>
        <p className="text-[16px] text-neutral-500 max-w-lg mx-auto">Premium OS-style analytics panels tailored for founders who want real-time insight.</p>
      </div>
      <div className="reveal">
        <div className="relative bg-white/30 backdrop-blur-2xl rounded-3xl border border-white/50 p-6 lg:p-8 shadow-[0_8px_60px_-16px_rgba(0,0,0,0.06)]">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-400" /><div className="w-2.5 h-2.5 rounded-full bg-amber-400" /><div className="w-2.5 h-2.5 rounded-full bg-emerald-400" /></div>
              <span className="text-[12px] font-medium text-neutral-400 ml-2">FoundrHUB Analytics — Bloomcraft Studio</span>
            </div>
            <div className="flex gap-2">{['7D','30D','90D'].map((p,i)=><button key={p} className={`px-3 py-1 rounded-lg text-[10px] font-semibold ${i===1?'bg-neutral-950 text-white':'bg-white/50 backdrop-blur-sm text-neutral-500 border border-white/40'}`}>{p}</button>)}</div>
          </div>
          {/* Metric row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[{l:'Profile Views',v:'2,847',c:'+24%',icon:'👁'},{l:'Saves',v:'342',c:'+18%',icon:'🔖'},{l:'Story Engagement',v:'89%',c:'+5%',icon:'💬'},{l:'Inbound Leads',v:'27',c:'+9',icon:'🤝'}].map(m=>(
              <div key={m.l} className="bg-white/40 backdrop-blur-xl rounded-2xl border border-white/50 p-5 hover:bg-white/55 transition-all duration-300">
                <div className="flex items-center justify-between mb-2"><span className="text-lg">{m.icon}</span><span className="text-[11px] font-semibold text-emerald-600">{m.c}</span></div>
                <p className="text-[22px] font-semibold text-neutral-900 leading-tight">{m.v}</p>
                <p className="text-[11px] text-neutral-400 font-medium mt-0.5">{m.l}</p>
              </div>
            ))}
          </div>
          {/* Charts row */}
          <div className="grid lg:grid-cols-5 gap-4">
            <div className="lg:col-span-3 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/50 p-5">
              <p className="text-[13px] font-semibold text-neutral-800 mb-1">Views Over Time</p>
              <p className="text-[11px] text-neutral-400 mb-4">Last 30 days</p>
              <div className="flex items-end gap-1.5 h-28">{[20,35,28,45,52,38,60,55,72,65,78,82,70,88,92,75,95,88,80,90,85,92,78,95,100,88,92,85,98,92].map((h,i)=><div key={i} className="flex-1 rounded-t hover:opacity-70 transition-opacity" style={{height:`${h}%`,background:i>=27?'#0a0a0a':i>=20?'#525252':'#d4d4d4'}} />)}</div>
            </div>
            <div className="lg:col-span-2 bg-white/40 backdrop-blur-xl rounded-2xl border border-white/50 p-5">
              <p className="text-[13px] font-semibold text-neutral-800 mb-1">Discovery Sources</p>
              <p className="text-[11px] text-neutral-400 mb-4">Where your visitors come from</p>
              <div className="space-y-3">{[{l:'FoundrHUB Feed',pct:45},{l:'Direct Search',pct:28},{l:'Shared Links',pct:18},{l:'Social Media',pct:9}].map(s=>(
                <div key={s.l}><div className="flex justify-between mb-1"><span className="text-[11px] font-medium text-neutral-600">{s.l}</span><span className="text-[11px] font-semibold text-neutral-500">{s.pct}%</span></div><div className="w-full h-1.5 rounded-full bg-white/50"><div className="h-full rounded-full transition-all duration-700" style={{width:`${s.pct}%`,background:s.pct>30?'#0a0a0a':'#a3a3a3'}} /></div></div>
              ))}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);


/* ── 6. Startup Verification Workflow ── */
const VerificationSection = () => {
  const steps = [
    {num:'01',title:'Create your profile',desc:'Sign up and tell us about your startup — name, category, stage, and your founding story.',icon:'✏️'},
    {num:'02',title:'Submit for review',desc:'Upload documents and verification details. Our team reviews every application personally.',icon:'📋'},
    {num:'03',title:'Get verified badge',desc:'Once approved, your startup receives a verified badge — trusted by the community.',icon:'✅'},
    {num:'04',title:'Go live on FoundrHUB',desc:'Your brand is now discoverable. Get featured, attract users, and grow organically.',icon:'🚀'},
  ];
  return (
    <section id="get-verified" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/5 to-neutral-50/80" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="reveal text-center mb-16">
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-400 mb-4 block">How it works</span>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.1] text-neutral-950 mb-4">From idea to verified in 4 steps</h2>
          <p className="text-[16px] text-neutral-500 max-w-lg mx-auto">Our founder-first verification process is designed to be fast, transparent, and trust-building.</p>
        </div>
        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s,i) => (
            <div key={s.num} className="group bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 p-7 hover:bg-white/60 hover:shadow-[0_12px_48px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500" style={{transitionDelay:`${i*0.08}s`}}>
              <div className="text-3xl mb-5">{s.icon}</div>
              <div className="text-[11px] font-bold text-neutral-300 tracking-widest mb-2">{s.num}</div>
              <h3 className="text-[16px] font-semibold text-neutral-900 mb-2">{s.title}</h3>
              <p className="text-[13px] text-neutral-500 leading-relaxed">{s.desc}</p>
              {i < 3 && <div className="hidden lg:block absolute top-1/2 -right-3 w-6 text-neutral-200"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


/* ── 7. Final Founder CTA Banner ── */
const FinalCTA = () => (
  <section className="py-24 lg:py-32 bg-neutral-950 relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-neutral-800/20 to-transparent rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tl from-emerald-900/10 to-transparent rounded-full blur-3xl" />
    <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
      <div className="reveal">
        <span className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-neutral-700 bg-white/5 backdrop-blur-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-400">Open for founders</span>
        </span>
        <h2 className="font-serif text-[clamp(2rem,5vw,3.4rem)] leading-[1.08] tracking-tight text-white mb-6">Built for founders shaping what's next.</h2>
        <p className="text-[17px] text-neutral-400 leading-relaxed max-w-xl mx-auto mb-10">Whether you're launching your first product or scaling your hundredth, FoundrHUB is where India's most ambitious founders get discovered.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="#/signup" className="inline-flex items-center px-8 py-4 rounded-full bg-white text-neutral-950 text-[15px] font-semibold tracking-wide hover:bg-neutral-100 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.12)] group">
            Launch on FoundrHUB <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <a href="#discover" className="inline-flex items-center px-8 py-4 rounded-full border border-neutral-700 text-neutral-300 text-[15px] font-medium hover:border-neutral-500 hover:text-white hover:bg-white/5 backdrop-blur-sm transition-all duration-300">Explore Startups</a>
        </div>
      </div>
    </div>
  </section>
);


/* ── Footer ── */
const Footer = () => (
  <footer className="bg-neutral-950 border-t border-neutral-800/50">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-12">
        <div className="sm:col-span-2 lg:col-span-1">
          <span className="font-serif text-[20px] text-white tracking-tight">Foundr<span className="text-neutral-500">HUB</span></span>
          <p className="text-[13px] text-neutral-500 leading-relaxed mt-3 max-w-xs">India's curated startup discovery platform. Built for founders, by founders.</p>
        </div>
        {[{t:'Platform',l:['Discover Startups','Get Verified','Founder Stories','Analytics']},{t:'Company',l:['About','Blog','Careers','Press']},{t:'Legal',l:['Privacy Policy','Terms of Service','Cookie Policy']}].map(col=>(
          <div key={col.t}>
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-500 mb-4">{col.t}</p>
            <ul className="space-y-2.5">{col.l.map(l=><li key={l}><a href="#" className="text-[13px] text-neutral-400 hover:text-white transition-colors duration-300">{l}</a></li>)}</ul>
          </div>
        ))}
      </div>
      <div className="pt-8 border-t border-neutral-800/50"><p className="text-[12px] text-neutral-600">© 2026 FoundrHUB. All rights reserved.</p></div>
    </div>
  </footer>
);


/* ── HomePage Wrapper ── */
const HomePage = () => (
  <React.Fragment>
    <Navbar />
    <main>
      <HeroSection />
      <FounderSpotlight />
      <CityMapSection />
      <TrendingSection />
      <AnalyticsPreview />
      <VerificationSection />
      <FinalCTA />
    </main>
    <Footer />
  </React.Fragment>
);
