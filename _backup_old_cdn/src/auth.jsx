/* ═══════════════════════════════════════════════════════════════
   AUTH — Sign In, Sign Up, Role Selection
   ═══════════════════════════════════════════════════════════════ */

/* ── SIGN IN ── */
const SignInPage = () => {
  const { navigate } = useRoute();
  const { setUser } = useAuth();
  const [form, setForm] = React.useState({ email: '', password: '', remember: false });
  const up = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSignIn = (e) => {
    e.preventDefault();
    setUser({ email: form.email, role: 'founder' });
    navigate('/founder-dashboard');
  };

  return (
    <PageWrap>
      <div className="min-h-screen bg-white flex">
        <div className="hidden lg:block lg:w-[45%] xl:w-[42%] p-5">
          <AuthSidePanel />
        </div>
        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-md">
            <a href="#/" className="lg:hidden font-serif text-[22px] tracking-tight text-neutral-950 mb-10 block">Foundr<span className="text-neutral-400">HUB</span></a>
            <h1 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.1] tracking-tight text-neutral-950 mb-2">Welcome back</h1>
            <p className="text-[15px] text-neutral-400 mb-10">Sign in to your FoundrHUB account</p>

            <form onSubmit={handleSignIn}>
              <FormInput label="Email" id="signin-email" type="email" placeholder="you@example.com" value={form.email} onChange={e => up('email', e.target.value)}
                icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>} />
              <FormInput label="Password" id="signin-password" type="password" placeholder="••••••••" value={form.password} onChange={e => up('password', e.target.value)}
                icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>} />

              <div className="flex items-center justify-between mb-6">
                <FormCheckbox label="Remember me" id="signin-remember" checked={form.remember} onChange={e => up('remember', e.target.checked)} />
                <a href="#" className="text-[13px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors duration-300">Forgot password?</a>
              </div>

              <button type="submit" id="signin-cta" className="w-full py-3.5 rounded-full bg-neutral-950 text-white text-[14px] font-semibold tracking-wide hover:bg-neutral-800 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-200 mb-6">
                Sign In
              </button>
            </form>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-100" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-4 text-[12px] text-neutral-400 font-medium">or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-neutral-200 text-[13px] font-medium text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-neutral-200 text-[13px] font-medium text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                LinkedIn
              </button>
            </div>

            <p className="text-center text-[13px] text-neutral-400">
              Don't have an account? <a href="#/signup" className="font-semibold text-neutral-900 hover:text-neutral-600 transition-colors">Create one</a>
            </p>
          </div>
        </div>
      </div>
    </PageWrap>
  );
};


/* ── SIGN UP ── */
const SignUpPage = () => {
  const { navigate } = useRoute();
  const [form, setForm] = React.useState({ name:'', email:'', password:'', confirm:'', phone:'', city:'', state:'', role:'', terms:false });
  const up = (k,v) => setForm(p=>({...p,[k]:v}));

  const states = ['Maharashtra','Karnataka','Delhi','Tamil Nadu','Telangana','Gujarat','Rajasthan','Uttar Pradesh','West Bengal','Kerala'];
  const roles = ['Founder / Early-stage Brand / Startup', 'Explorer / User / Investor / Consumer'];

  const handleSignUp = (e) => { e.preventDefault(); navigate('/role-selection'); };

  return (
    <PageWrap>
      <div className="min-h-screen bg-white flex">
        <div className="hidden lg:block lg:w-[45%] xl:w-[42%] p-5"><AuthSidePanel /></div>
        <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
          <div className="w-full max-w-md">
            <a href="#/" className="lg:hidden font-serif text-[22px] tracking-tight text-neutral-950 mb-8 block">Foundr<span className="text-neutral-400">HUB</span></a>
            <h1 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.1] tracking-tight text-neutral-950 mb-2">Create your account</h1>
            <p className="text-[15px] text-neutral-400 mb-8">Join India's most curated startup discovery platform</p>

            <form onSubmit={handleSignUp}>
              <FormInput label="Full Name" id="signup-name" placeholder="Ananya Sharma" value={form.name} onChange={e=>up('name',e.target.value)} />
              <FormInput label="Email" id="signup-email" type="email" placeholder="you@example.com" value={form.email} onChange={e=>up('email',e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <FormInput label="Password" id="signup-password" type="password" placeholder="Min 8 chars" value={form.password} onChange={e=>up('password',e.target.value)} />
                <FormInput label="Confirm Password" id="signup-confirm" type="password" placeholder="••••••••" value={form.confirm} onChange={e=>up('confirm',e.target.value)} />
              </div>
              <FormInput label="Phone Number" id="signup-phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e=>up('phone',e.target.value)} />
              <div className="grid grid-cols-2 gap-4">
                <FormInput label="City" id="signup-city" placeholder="Mumbai" value={form.city} onChange={e=>up('city',e.target.value)} />
                <FormSelect label="State" id="signup-state" options={states} value={form.state} onChange={e=>up('state',e.target.value)} />
              </div>

              <div className="mb-5">
                <label className="block text-[13px] font-medium text-neutral-600 mb-2">I am a...<span className="text-red-400 ml-0.5">*</span></label>
                <div className="grid gap-3">
                  {roles.map(r => (
                    <button key={r} type="button" onClick={() => up('role',r)}
                      className={`w-full text-left px-5 py-4 rounded-xl border text-[14px] font-medium transition-all duration-300 ${
                        form.role === r ? 'border-neutral-950 bg-neutral-950 text-white shadow-lg shadow-neutral-200' : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                      }`}>
                      {r === roles[0] ? '🚀 ' : '🔍 '}{r}
                    </button>
                  ))}
                </div>
              </div>

              <FormCheckbox label="I agree to the Terms of Service and Privacy Policy" id="signup-terms" checked={form.terms} onChange={e=>up('terms',e.target.checked)} />

              <button type="submit" id="signup-cta" className="w-full py-3.5 rounded-full bg-neutral-950 text-white text-[14px] font-semibold tracking-wide hover:bg-neutral-800 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-200 mb-6">
                Create Account
              </button>
            </form>

            <p className="text-center text-[13px] text-neutral-400">
              Already have an account? <a href="#/signin" className="font-semibold text-neutral-900 hover:text-neutral-600 transition-colors">Sign in</a>
            </p>
          </div>
        </div>
      </div>
    </PageWrap>
  );
};


/* ── ROLE SELECTION ── */
const RoleSelectionPage = () => {
  const { navigate } = useRoute();
  const [selected, setSelected] = React.useState('');
  const roles = [
    { key:'founder', icon:'🚀', title:'Founder / Startup', desc:'List your brand, tell your story, get discovered by users and investors.', features:['Brand profile','Verification badge','Analytics dashboard','Community visibility'] },
    { key:'explorer', icon:'🔍', title:'Explorer / User', desc:'Discover homegrown startups, support local founders, and shop curated picks.', features:['Personalized feed','Save & wishlist','Founder stories','Local map discovery'] },
  ];

  return (
    <PageWrap>
      <div className="min-h-screen bg-beige-50 flex items-center justify-center px-6 py-16">
        <div className="max-w-2xl w-full text-center">
          <a href="#/" className="font-serif text-[22px] tracking-tight text-neutral-950 mb-10 inline-block">Foundr<span className="text-neutral-400">HUB</span></a>
          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.1] tracking-tight text-neutral-950 mb-3">How will you use FoundrHUB?</h1>
          <p className="text-[15px] text-neutral-400 mb-12 max-w-md mx-auto">Choose your path. You can always switch later from your settings.</p>

          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {roles.map(r => (
              <button key={r.key} onClick={() => setSelected(r.key)}
                className={`text-left p-7 rounded-3xl border transition-all duration-500 group ${
                  selected === r.key ? 'border-neutral-950 bg-white shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)]' : 'border-neutral-200 bg-white/60 hover:border-neutral-300 hover:shadow-[0_4px_20px_-6px_rgba(0,0,0,0.05)]'
                }`}>
                <div className="text-3xl mb-4">{r.icon}</div>
                <h3 className="text-[17px] font-semibold text-neutral-900 mb-2">{r.title}</h3>
                <p className="text-[13px] text-neutral-400 leading-relaxed mb-4">{r.desc}</p>
                <ul className="space-y-1.5">
                  {r.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-[12px] text-neutral-500">
                      <svg className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                {selected === r.key && <div className="mt-4 w-full h-1 rounded-full bg-neutral-950" />}
              </button>
            ))}
          </div>

          <button onClick={() => navigate(selected === 'founder' ? '/founder-onboarding' : '/user-onboarding')}
            disabled={!selected}
            className={`inline-flex items-center px-8 py-3.5 rounded-full text-[14px] font-semibold tracking-wide transition-all duration-300 ${
              selected ? 'bg-neutral-950 text-white hover:bg-neutral-800 hover:shadow-lg hover:shadow-neutral-200' : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}>
            Continue
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </div>
    </PageWrap>
  );
};
