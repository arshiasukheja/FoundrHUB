/* ═══════════════════════════════════════════════════════════════
   FOUNDER — Multi-step Onboarding + Dashboard
   ═══════════════════════════════════════════════════════════════ */

const FounderOnboarding = () => {
  const { navigate } = useRoute();
  const [step, setStep] = React.useState(0);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const steps = ['Brand Details', 'Business Profile', 'Verification'];
  const categories = ['D2C / E-commerce','AI / Deep Tech','SaaS / B2B','Fintech','EdTech','HealthTech','Climate Tech','Fashion / Lifestyle','Food / Beverage','Media / Content','AgriTech','Logistics','Other'];
  const stages = ['Idea','MVP','Launched','Scaling'];
  const revenueStages = ['Pre-revenue','< ₹1L/mo','₹1L–10L/mo','₹10L–50L/mo','₹50L+/mo'];
  const fundingStatuses = ['Bootstrapped','Friends & Family','Pre-Seed','Seed','Series A','Series B+'];
  const states = ['Maharashtra','Karnataka','Delhi','Tamil Nadu','Telangana','Gujarat','Rajasthan','Uttar Pradesh','West Bengal','Kerala'];

  const [f, setF] = React.useState({ brandName:'',tagline:'',category:'',subCategory:'',foundedYear:'',stage:'',city:'',state:'',website:'',instagram:'',linkedin:'',problem:'',audience:'',product:'',model:'',pricing:'',traction:'',users:'',revenue:'',team:'',funding:'',founderNames:'',founderStory:'',regStatus:'',launchCity:'',online:true,offline:false,featured:false,communityStory:'' });
  const up = (k,v) => setF(p=>({...p,[k]:v}));

  const handleSubmit = () => { setShowSuccess(true); };

  return (
    <PageWrap>
      <div className="min-h-screen bg-beige-50/50">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white/70 backdrop-blur-2xl border-b border-neutral-100">
          <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="#/" className="font-serif text-[20px] tracking-tight text-neutral-950">Foundr<span className="text-neutral-400">HUB</span></a>
            <span className="text-[13px] text-neutral-400 font-medium">Founder Onboarding</span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-10 lg:py-14">
          <Stepper steps={steps} currentStep={step} />

          {/* ── STEP 1: Brand Details ── */}
          {step === 0 && (
            <div className="bg-white rounded-3xl border border-neutral-100 p-8 lg:p-10 shadow-[0_4px_32px_-12px_rgba(0,0,0,0.04)]">
              <h2 className="font-serif text-[1.6rem] text-neutral-950 mb-1">Tell us about your brand</h2>
              <p className="text-[14px] text-neutral-400 mb-8">Share the essentials. You can always edit later.</p>

              <div className="grid sm:grid-cols-2 gap-x-5">
                <FormInput label="Startup / Brand Name" id="fo-brand" placeholder="Bloomcraft Studio" value={f.brandName} onChange={e=>up('brandName',e.target.value)} />
                <FormInput label="One-line Tagline" id="fo-tagline" placeholder="Sustainable fashion, reimagined" value={f.tagline} onChange={e=>up('tagline',e.target.value)} />
              </div>
              <FileUpload label="Logo Upload" id="fo-logo" />
              <div className="grid sm:grid-cols-2 gap-x-5">
                <FormSelect label="Category" id="fo-category" options={categories} value={f.category} onChange={e=>up('category',e.target.value)} />
                <FormInput label="Sub-Category" id="fo-subcategory" placeholder="e.g. Slow Fashion" value={f.subCategory} onChange={e=>up('subCategory',e.target.value)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-x-5">
                <FormInput label="Founded Year" id="fo-year" type="number" placeholder="2024" value={f.foundedYear} onChange={e=>up('foundedYear',e.target.value)} />
                <FormSelect label="Current Stage" id="fo-stage" options={stages} value={f.stage} onChange={e=>up('stage',e.target.value)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-x-5">
                <FormInput label="City" id="fo-city" placeholder="Mumbai" value={f.city} onChange={e=>up('city',e.target.value)} />
                <FormSelect label="State" id="fo-state" options={states} value={f.state} onChange={e=>up('state',e.target.value)} />
              </div>
              <FormInput label="Website" id="fo-website" placeholder="https://bloomcraft.in" value={f.website} onChange={e=>up('website',e.target.value)} required={false} />
              <div className="grid sm:grid-cols-2 gap-x-5">
                <FormInput label="Instagram" id="fo-ig" placeholder="@bloomcraft" value={f.instagram} onChange={e=>up('instagram',e.target.value)} required={false} />
                <FormInput label="LinkedIn" id="fo-li" placeholder="linkedin.com/company/bloomcraft" value={f.linkedin} onChange={e=>up('linkedin',e.target.value)} required={false} />
              </div>
              <FileUpload label="Pitch Deck Upload (optional)" id="fo-pitch" />
            </div>
          )}

          {/* ── STEP 2: Business Profile ── */}
          {step === 1 && (
            <div className="bg-white rounded-3xl border border-neutral-100 p-8 lg:p-10 shadow-[0_4px_32px_-12px_rgba(0,0,0,0.04)]">
              <h2 className="font-serif text-[1.6rem] text-neutral-950 mb-1">Your business profile</h2>
              <p className="text-[14px] text-neutral-400 mb-8">Help investors and users understand what you're building.</p>

              <FormTextarea label="Problem Being Solved" id="fo-problem" placeholder="What pain point are you addressing?" value={f.problem} onChange={e=>up('problem',e.target.value)} rows={3} />
              <FormTextarea label="Target Audience" id="fo-audience" placeholder="Who are your ideal customers?" value={f.audience} onChange={e=>up('audience',e.target.value)} rows={2} />
              <FormTextarea label="Product Description" id="fo-product" placeholder="Describe your product or service in detail" value={f.product} onChange={e=>up('product',e.target.value)} rows={4} />
              <div className="grid sm:grid-cols-2 gap-x-5">
                <FormInput label="Business Model" id="fo-model" placeholder="D2C, B2B, Marketplace..." value={f.model} onChange={e=>up('model',e.target.value)} />
                <FormInput label="Pricing Range" id="fo-pricing" placeholder="₹499 – ₹2,999" value={f.pricing} onChange={e=>up('pricing',e.target.value)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-x-5">
                <FormInput label="Monthly Traction" id="fo-traction" placeholder="e.g. 500 orders/mo" value={f.traction} onChange={e=>up('traction',e.target.value)} />
                <FormInput label="Active Users / Customers" id="fo-users" placeholder="e.g. 12,400" value={f.users} onChange={e=>up('users',e.target.value)} />
              </div>
              <div className="grid sm:grid-cols-2 gap-x-5">
                <FormSelect label="Revenue Stage" id="fo-revenue" options={revenueStages} value={f.revenue} onChange={e=>up('revenue',e.target.value)} />
                <FormInput label="Team Size" id="fo-team" type="number" placeholder="12" value={f.team} onChange={e=>up('team',e.target.value)} />
              </div>
              <FormSelect label="Funding Status" id="fo-funding" options={fundingStatuses} value={f.funding} onChange={e=>up('funding',e.target.value)} />
              <FormInput label="Founder Names" id="fo-founders" placeholder="Ananya Sharma, Priya Nair" value={f.founderNames} onChange={e=>up('founderNames',e.target.value)} />
              <FormTextarea label="Founder Story" id="fo-story" placeholder="Share the journey — your motivation, pivots, and vision..." value={f.founderStory} onChange={e=>up('founderStory',e.target.value)} rows={5} />
            </div>
          )}

          {/* ── STEP 3: Verification + Discovery ── */}
          {step === 2 && (
            <div className="bg-white rounded-3xl border border-neutral-100 p-8 lg:p-10 shadow-[0_4px_32px_-12px_rgba(0,0,0,0.04)]">
              <h2 className="font-serif text-[1.6rem] text-neutral-950 mb-1">Verification & Discovery</h2>
              <p className="text-[14px] text-neutral-400 mb-8">Verify your startup for a trusted badge on FoundrHUB.</p>

              <FormSelect label="Startup Registration Status" id="fo-reg" options={['Registered (Pvt Ltd)','Registered (LLP)','Registered (Partnership)','Sole Proprietorship','Not yet registered']} value={f.regStatus} onChange={e=>up('regStatus',e.target.value)} />
              <FileUpload label="GST / Legal Verification Document" id="fo-gst" />
              <FileUpload label="Founder Identity Document" id="fo-id" />
              <FormInput label="Launch City" id="fo-launch-city" placeholder="Mumbai" value={f.launchCity} onChange={e=>up('launchCity',e.target.value)} />

              <div className="mb-6 p-5 rounded-2xl bg-beige-50/60 border border-beige-200/40">
                <p className="text-[13px] font-semibold text-neutral-700 mb-3">Availability</p>
                <FormToggle label="Available Online" id="fo-online" checked={f.online} onChange={()=>up('online',!f.online)} />
                <FormToggle label="Available Offline / Physical Store" id="fo-offline" checked={f.offline} onChange={()=>up('offline',!f.offline)} />
              </div>

              <div className="mb-6 p-5 rounded-2xl bg-beige-50/60 border border-beige-200/40">
                <FormToggle label="Request Featured Listing" id="fo-featured" checked={f.featured} onChange={()=>up('featured',!f.featured)} />
                <p className="text-[11px] text-neutral-400 -mt-2">Featured startups get 10x more visibility on the platform.</p>
              </div>

              <FormTextarea label="Community Launch Story" id="fo-community" placeholder="Write a short note for the FoundrHUB community about your launch..." value={f.communityStory} onChange={e=>up('communityStory',e.target.value)} rows={4} />
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button onClick={() => step > 0 ? setStep(step - 1) : navigate('/')}
              className="inline-flex items-center px-6 py-3 rounded-full border border-neutral-200 text-[14px] font-medium text-neutral-600 hover:border-neutral-400 transition-all duration-300">
              <svg className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
              {step > 0 ? 'Back' : 'Cancel'}
            </button>
            <button onClick={() => step < 2 ? setStep(step + 1) : handleSubmit()}
              className="inline-flex items-center px-7 py-3 rounded-full bg-neutral-950 text-white text-[14px] font-semibold tracking-wide hover:bg-neutral-800 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-200">
              {step < 2 ? 'Continue' : 'Submit for Verification'}
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        </div>

        <SuccessModal show={showSuccess} title="Submitted for Review!" subtitle="Your startup profile is under review. You'll receive a verified badge within 24–48 hours." cta="Go to Dashboard" onCta={() => { setShowSuccess(false); navigate('/founder-dashboard'); }} />
      </div>
    </PageWrap>
  );
};


/* ═══════════════════════════════════════════════════════════════
   FOUNDER DASHBOARD
   ═══════════════════════════════════════════════════════════════ */
const FounderDashboard = () => {
  const { navigate } = useRoute();
  const ico = (d) => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={d} /></svg>;

  return (
    <PageWrap>
      <div className="min-h-screen bg-beige-50/30">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white/70 backdrop-blur-2xl border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
            <a href="#/" className="font-serif text-[20px] tracking-tight text-neutral-950">Foundr<span className="text-neutral-400">HUB</span></a>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-[13px] text-neutral-500 font-medium">Founder Portal</span>
              <div className="w-8 h-8 rounded-full bg-[#e8d5c0] flex items-center justify-center text-[11px] font-bold text-neutral-700">AS</div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h1 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.1] text-neutral-950 mb-2">Welcome back, Ananya</h1>
              <p className="text-[14px] text-neutral-400">Here's how your startup is performing on FoundrHUB.</p>
            </div>
            <button className="inline-flex items-center px-6 py-2.5 rounded-full bg-neutral-950 text-white text-[13px] font-semibold hover:bg-neutral-800 transition-all duration-300 self-start sm:self-auto">
              ✨ Upgrade to Featured
            </button>
          </div>

          {/* Profile Completion + Verification */}
          <div className="grid lg:grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-3xl border border-neutral-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[13px] font-semibold text-neutral-700">Profile Completion</p>
                <span className="text-[20px] font-bold text-neutral-950">72%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-neutral-400 to-neutral-950 transition-all duration-1000" style={{width:'72%'}} />
              </div>
              <p className="text-[11px] text-neutral-400 mt-2">Add a pitch deck & founder story to reach 100%</p>
            </div>
            <div className="bg-white rounded-3xl border border-neutral-100 p-6">
              <p className="text-[13px] font-semibold text-neutral-700 mb-3">Verification Status</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[12px] font-semibold text-amber-700">Under Review</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-3">Expected verification: 24–48 hours</p>
            </div>
            <div className="bg-white rounded-3xl border border-neutral-100 p-6">
              <p className="text-[13px] font-semibold text-neutral-700 mb-2">City Discovery Ranking</p>
              <p className="text-[32px] font-bold text-neutral-950 leading-tight">#14</p>
              <p className="text-[12px] text-emerald-600 font-semibold">in Mumbai · Fashion</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <MetricCard label="Profile Views" value="2,847" change="+24%" icon={ico('M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z')} />
            <MetricCard label="Saves" value="342" change="+18%" icon={ico('M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z')} />
            <MetricCard label="Story Engagement" value="89%" change="+5%" icon={ico('M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z')} />
            <MetricCard label="Inbound Leads" value="27" change="+9 this week" icon={ico('M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z')} />
          </div>

          {/* Bottom panels */}
          <div className="grid lg:grid-cols-5 gap-5">
            <div className="lg:col-span-3 bg-white rounded-3xl border border-neutral-100 p-7">
              <p className="text-[15px] font-semibold text-neutral-900 mb-1">Views Over Time</p>
              <p className="text-[13px] text-neutral-400 mb-6">Last 30 days</p>
              <div className="flex items-end gap-2 h-32">
                {[20,35,28,45,52,38,60,55,72,65,78,82,70,88,92,75,95,88,80,90,85,92,78,95,100,88,92,85,98,92].map((h,i) => (
                  <div key={i} className="flex-1 rounded-t transition-all duration-500 hover:opacity-70" style={{height:`${h}%`, background: i>=27? '#0a0a0a' : i>=20? '#525252' : '#d4d4d4'}} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-2 bg-white rounded-3xl border border-neutral-100 p-7">
              <p className="text-[15px] font-semibold text-neutral-900 mb-1">Quick Actions</p>
              <p className="text-[13px] text-neutral-400 mb-5">Keep your profile updated</p>
              <div className="space-y-3">
                {[['Edit Brand Profile','✏️'],['Upload Pitch Deck','📄'],['Write Founder Story','📝'],['View Analytics','📊'],['Share Profile Link','🔗']].map(([label,emoji]) => (
                  <button key={label} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-neutral-100 text-[13px] font-medium text-neutral-600 hover:border-neutral-300 hover:text-neutral-900 hover:bg-beige-50/40 transition-all duration-300 text-left">
                    <span>{emoji}</span>{label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrap>
  );
};
