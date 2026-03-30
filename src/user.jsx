/* ═══════════════════════════════════════════════════════════════
   USER / EXPLORER — Onboarding + Dashboard
   ═══════════════════════════════════════════════════════════════ */

const UserOnboarding = () => {
  const { navigate } = useRoute();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const interests = ['D2C','AI','Sustainability','Fashion','Food','Wellness','Student Startups','Fintech','Climate Tech','EdTech'];
  const purposes = ['Discover brands','Invest','Support local','Shop','Networking'];
  const stagePrefs = ['Idea stage','MVP','Launched','Scaling','All stages'];
  const states = ['Maharashtra','Karnataka','Delhi','Tamil Nadu','Telangana','Gujarat','Rajasthan','Uttar Pradesh','West Bengal','Kerala'];

  const [f, setF] = React.useState({ name:'',city:'',state:'',interests:[],purpose:[],categories:[],stagePreference:'',notifications:true,wishlistPublic:false });
  const up = (k,v) => setF(p=>({...p,[k]:v}));
  const toggle = (k,item) => {
    const arr = f[k]; up(k, arr.includes(item) ? arr.filter(x=>x!==item) : [...arr,item]);
  };

  return (
    <PageWrap>
      <div className="min-h-screen bg-beige-50/50">
        <div className="sticky top-0 z-40 bg-white/70 backdrop-blur-2xl border-b border-neutral-100">
          <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="#/" className="font-serif text-[20px] tracking-tight text-neutral-950">Foundr<span className="text-neutral-400">HUB</span></a>
            <span className="text-[13px] text-neutral-400 font-medium">Explorer Setup</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-6 py-10 lg:py-14">
          <div className="bg-white rounded-3xl border border-neutral-100 p-8 lg:p-10 shadow-[0_4px_32px_-12px_rgba(0,0,0,0.04)]">
            <h2 className="font-serif text-[1.6rem] text-neutral-950 mb-1">Personalize your discovery</h2>
            <p className="text-[14px] text-neutral-400 mb-8">Help us curate the best startups and brands for you.</p>

            <FormInput label="Full Name" id="uo-name" placeholder="Priya Nair" value={f.name} onChange={e=>up('name',e.target.value)} />
            <div className="grid sm:grid-cols-2 gap-x-5">
              <FormInput label="City" id="uo-city" placeholder="Mumbai" value={f.city} onChange={e=>up('city',e.target.value)} />
              <FormSelect label="State" id="uo-state" options={states} value={f.state} onChange={e=>up('state',e.target.value)} />
            </div>

            <ChipSelect label="Interests" options={interests} selected={f.interests} onToggle={item=>toggle('interests',item)} />
            <ChipSelect label="What brings you here?" options={purposes} selected={f.purpose} onToggle={item=>toggle('purpose',item)} />
            <ChipSelect label="Favorite Categories" options={['Fashion','Food','Tech','Beauty','Home','Fitness','Stationery','Accessories']} selected={f.categories} onToggle={item=>toggle('categories',item)} />
            <FormSelect label="Startup Stage Preference" id="uo-stage" options={stagePrefs} value={f.stagePreference} onChange={e=>up('stagePreference',e.target.value)} required={false} />

            <div className="mt-6 p-5 rounded-2xl bg-beige-50/60 border border-beige-200/40">
              <FormToggle label="Email & push notifications" id="uo-notif" checked={f.notifications} onChange={()=>up('notifications',!f.notifications)} />
              <FormToggle label="Make wishlist public" id="uo-wishlist" checked={f.wishlistPublic} onChange={()=>up('wishlistPublic',!f.wishlistPublic)} />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button onClick={()=>setShowSuccess(true)} className="inline-flex items-center px-7 py-3.5 rounded-full bg-neutral-950 text-white text-[14px] font-semibold tracking-wide hover:bg-neutral-800 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-200">
              Start Exploring
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        </div>

        <SuccessModal show={showSuccess} title="You're all set!" subtitle="Your personalized discovery feed is being curated. Start exploring India's most exciting startups." cta="Go to Dashboard" onCta={()=>{setShowSuccess(false); navigate('/user-dashboard');}} />
      </div>
    </PageWrap>
  );
};


/* ═══════════════════════════════════════════════════════════════
   USER / EXPLORER DASHBOARD
   ═══════════════════════════════════════════════════════════════ */
const UserDashboard = () => {
  const { navigate } = useRoute();

  const recommended = [
    { name:'Bloomcraft Studio', category:'Sustainable Fashion', city:'Mumbai', badge:'Verified', color:'#e8d5c0', initials:'BC' },
    { name:'NeuralBrew AI', category:'AI / Deep Tech', city:'Bengaluru', badge:'Rising', color:'#c9d5e0', initials:'NB' },
    { name:'GreenRoute', category:'Climate Tech', city:'Delhi', badge:'Funded', color:'#d5e0c9', initials:'GR' },
  ];
  const trending = [
    { name:'Kira Skincare', category:'D2C Beauty', city:'Pune', color:'#e0c9d5', initials:'KS' },
    { name:'StackFin', category:'Fintech', city:'Hyderabad', color:'#d5d0e8', initials:'SF' },
  ];
  const badgeMap = { Verified:'bg-emerald-50 text-emerald-700 border-emerald-200', Rising:'bg-amber-50 text-amber-700 border-amber-200', Funded:'bg-blue-50 text-blue-700 border-blue-200' };

  const StartupMiniCard = ({ s }) => (
    <div className="group bg-white rounded-2xl border border-neutral-100 p-5 hover:border-neutral-200 hover:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.05)] transition-all duration-400 cursor-pointer">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[12px] font-bold text-neutral-700" style={{background:s.color}}>{s.initials}</div>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-semibold text-neutral-900 truncate">{s.name}</p>
          <p className="text-[11px] text-neutral-400">{s.category} · 📍 {s.city}</p>
        </div>
        {s.badge && <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badgeMap[s.badge]||''}`}>{s.badge}</span>}
      </div>
    </div>
  );

  return (
    <PageWrap>
      <div className="min-h-screen bg-beige-50/30">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white/70 backdrop-blur-2xl border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
            <a href="#/" className="font-serif text-[20px] tracking-tight text-neutral-950">Foundr<span className="text-neutral-400">HUB</span></a>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-[13px] text-neutral-500 font-medium">Explorer Dashboard</span>
              <div className="w-8 h-8 rounded-full bg-[#c9d5e0] flex items-center justify-center text-[11px] font-bold text-neutral-700">PN</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.1] text-neutral-950 mb-2">Good evening, Priya</h1>
            <p className="text-[14px] text-neutral-400">Your personalized startup discovery feed</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[{l:'Saved Startups',v:'18'},{l:'Stories Read',v:'34'},{l:'Categories Following',v:'6'},{l:'Local Discoveries',v:'12'}].map(s=>(
              <div key={s.l} className="bg-white rounded-2xl border border-neutral-100 px-5 py-4">
                <p className="text-[22px] font-semibold text-neutral-900">{s.v}</p>
                <p className="text-[12px] text-neutral-400 font-medium">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recommended */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[16px] font-semibold text-neutral-900">Recommended for You</h2>
                  <a href="#/discover" className="text-[12px] font-semibold text-neutral-500 hover:text-neutral-900 transition-colors">View all →</a>
                </div>
                <div className="space-y-3">
                  {recommended.map(s=><StartupMiniCard key={s.name} s={s} />)}
                </div>
              </div>

              {/* City Trending */}
              <div>
                <h2 className="text-[16px] font-semibold text-neutral-900 mb-4">Trending in Mumbai</h2>
                <div className="space-y-3">
                  {trending.map(s=><StartupMiniCard key={s.name} s={s} />)}
                </div>
              </div>

              {/* Founder Stories Feed */}
              <div>
                <h2 className="text-[16px] font-semibold text-neutral-900 mb-4">Founder Stories</h2>
                <div className="bg-white rounded-2xl border border-neutral-100 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#e8d5c0] flex items-center justify-center text-[12px] font-bold text-neutral-700">AS</div>
                    <div>
                      <p className="text-[14px] font-semibold text-neutral-900">Ananya Sharma</p>
                      <p className="text-[11px] text-neutral-400">Bloomcraft Studio · 2 days ago</p>
                    </div>
                  </div>
                  <p className="text-[14px] text-neutral-600 leading-relaxed mb-3">"We just crossed 10,000 orders — all organic, all from the FoundrHUB community. Here's what we learned about building a sustainable D2C brand from scratch..."</p>
                  <a href="#" className="text-[13px] font-semibold text-neutral-900 hover:text-neutral-600 transition-colors">Read full story →</a>
                </div>
              </div>

              {/* Local Map Placeholder */}
              <div>
                <h2 className="text-[16px] font-semibold text-neutral-900 mb-4">Discover Near You</h2>
                <div className="bg-gradient-to-br from-beige-100 via-beige-50 to-white rounded-2xl border border-beige-200/60 p-10 text-center">
                  <svg className="w-12 h-12 mx-auto text-neutral-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  <p className="text-[14px] font-medium text-neutral-500">Interactive map discovery</p>
                  <p className="text-[12px] text-neutral-400 mt-1">Coming soon — explore startups on a city map</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6">
                <h3 className="text-[15px] font-semibold text-neutral-900 mb-4">Upcoming Launches</h3>
                <div className="space-y-4">
                  {[{name:'FreshPress Juicery',date:'Apr 2',city:'Mumbai'},{name:'CodeCraft Academy',date:'Apr 5',city:'Bengaluru'},{name:'PureThread Co.',date:'Apr 8',city:'Pune'}].map(e=>(
                    <div key={e.name} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-beige-50 border border-beige-200/60 flex flex-col items-center justify-center">
                        <span className="text-[9px] font-bold text-neutral-400 uppercase leading-none">{e.date.split(' ')[0]}</span>
                        <span className="text-[14px] font-bold text-neutral-900 leading-none">{e.date.split(' ')[1]}</span>
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-neutral-900">{e.name}</p>
                        <p className="text-[11px] text-neutral-400">📍 {e.city}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Categories */}
              <div className="bg-white rounded-2xl border border-neutral-100 p-6">
                <h3 className="text-[15px] font-semibold text-neutral-900 mb-4">Trending Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {['🧴 Clean Beauty','🤖 AI Tools','🌿 Sustainability','👗 Slow Fashion','🍜 Cloud Kitchen','💊 Wellness','📚 EdTech','🔋 Clean Energy'].map(c=>(
                    <span key={c} className="px-3 py-1.5 rounded-full bg-beige-50 border border-beige-200/40 text-[11px] font-medium text-neutral-600 hover:border-neutral-300 cursor-pointer transition-colors duration-200">{c}</span>
                  ))}
                </div>
              </div>

              {/* Personalized Picks */}
              <div className="bg-neutral-950 rounded-2xl p-6 text-center">
                <p className="text-[14px] font-semibold text-white mb-2">Your taste, curated</p>
                <p className="text-[12px] text-neutral-400 mb-4">We've picked 8 startups matching your interests</p>
                <button className="inline-flex items-center px-5 py-2.5 rounded-full bg-white text-neutral-950 text-[12px] font-semibold hover:bg-neutral-100 transition-all duration-300">
                  Explore Rising Brands →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrap>
  );
};
