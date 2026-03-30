/* ═══════════════════════════════════════════════════════════════
   SHARED — Router, Context, Form Primitives, Profile Dropdown
   ═══════════════════════════════════════════════════════════════ */

/* ── Hash Router ── */
const RouterContext = React.createContext({ route: '/', navigate: () => {} });
const useRoute = () => React.useContext(RouterContext);

const RouterProvider = ({ children }) => {
  const [route, setRoute] = React.useState(window.location.hash.slice(1) || '/');
  React.useEffect(() => {
    const h = () => setRoute(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);
  const navigate = (path) => { window.location.hash = path; };
  return React.createElement(RouterContext.Provider, { value: { route, navigate } }, children);
};

/* ── Auth Context with logout ── */
const AuthContext = React.createContext({ user: null, setUser: () => {}, logout: () => {} });
const useAuth = () => React.useContext(AuthContext);

/* ── Profile Dropdown (glassmorphism) ── */
const ProfileDropdown = () => {
  const [open, setOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const { navigate } = useRoute();
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!user) return null;

  const initials = user.name ? user.name.split(' ').map(n => n[0]).join('').slice(0,2) : 'FH';
  const items = [
    { label: 'My Profile', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0', route: '/founder-dashboard' },
    { label: 'Dashboard', icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z', route: '/founder-dashboard' },
    { label: 'Settings', icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281', route: null },
  ];

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(!open)} id="profile-avatar" className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-200 via-amber-100 to-amber-50 flex items-center justify-center text-[11px] font-bold text-neutral-700 ring-2 ring-white/60 hover:ring-white transition-all duration-300 shadow-lg shadow-amber-100/30">
        {initials}
      </button>
      {open && (
        <div className="absolute right-0 top-12 w-56 rounded-2xl bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_16px_64px_-16px_rgba(0,0,0,0.15)] p-2 z-50 animate-[fadeInUp_0.2s_ease-out]">
          <div className="px-3 py-2.5 mb-1 border-b border-neutral-100/80">
            <p className="text-[13px] font-semibold text-neutral-900">{user.name || 'Founder'}</p>
            <p className="text-[11px] text-neutral-400">{user.email || 'founder@foundrhub.in'}</p>
          </div>
          {items.map(item => (
            <button key={item.label} onClick={() => { setOpen(false); if(item.route) navigate(item.route); }}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-neutral-600 hover:bg-neutral-100/60 hover:text-neutral-900 transition-all duration-200 text-left">
              <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
              {item.label}
            </button>
          ))}
          <div className="my-1 border-t border-neutral-100/80" />
          <button onClick={() => { setOpen(false); logout(); }}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-500 hover:bg-red-50/60 hover:text-red-600 transition-all duration-200 text-left">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

/* ── Form Input ── */
const FormInput = ({ label, id, type = 'text', placeholder, value, onChange, icon, required = true }) => (
  <div className="mb-5">
    <label htmlFor={id} className="block text-[13px] font-medium text-neutral-600 mb-1.5">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
    <div className="relative">
      {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">{icon}</div>}
      <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange}
        className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-all duration-300`} />
    </div>
  </div>
);

const FormTextarea = ({ label, id, placeholder, value, onChange, rows = 3, required = true }) => (
  <div className="mb-5">
    <label htmlFor={id} className="block text-[13px] font-medium text-neutral-600 mb-1.5">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
    <textarea id={id} rows={rows} placeholder={placeholder} value={value} onChange={onChange}
      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-all duration-300 resize-none" />
  </div>
);

const FormSelect = ({ label, id, options, value, onChange, required = true }) => (
  <div className="mb-5">
    <label htmlFor={id} className="block text-[13px] font-medium text-neutral-600 mb-1.5">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>
    <select id={id} value={value} onChange={onChange}
      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] text-neutral-900 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-all duration-300 appearance-none cursor-pointer">
      <option value="">Select...</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const FormCheckbox = ({ label, id, checked, onChange }) => (
  <label htmlFor={id} className="flex items-start gap-3 cursor-pointer mb-4 group">
    <input id={id} type="checkbox" checked={checked} onChange={onChange} className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-neutral-950 focus:ring-neutral-400 cursor-pointer" />
    <span className="text-[13px] text-neutral-500 leading-relaxed group-hover:text-neutral-700 transition-colors duration-200">{label}</span>
  </label>
);

const FormToggle = ({ label, id, checked, onChange }) => (
  <div className="flex items-center justify-between mb-4">
    <span className="text-[13px] font-medium text-neutral-600">{label}</span>
    <button type="button" id={id} onClick={onChange} className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${checked ? 'bg-neutral-950' : 'bg-neutral-200'}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${checked ? 'translate-x-5' : ''}`} />
    </button>
  </div>
);

const FileUpload = ({ label, id }) => (
  <div className="mb-5">
    <label className="block text-[13px] font-medium text-neutral-600 mb-1.5">{label}</label>
    <div id={id} className="border-2 border-dashed border-neutral-200 rounded-xl p-6 text-center hover:border-neutral-300 transition-colors duration-300 cursor-pointer group">
      <svg className="w-8 h-8 mx-auto text-neutral-300 group-hover:text-neutral-400 transition-colors duration-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>
      <p className="text-[12px] text-neutral-400">Click to upload or drag & drop</p>
    </div>
  </div>
);

const ChipSelect = ({ label, options, selected, onToggle }) => (
  <div className="mb-5">
    <label className="block text-[13px] font-medium text-neutral-600 mb-2">{label}</label>
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => onToggle(opt)}
          className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-300 ${selected.includes(opt) ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400'}`}>{opt}</button>
      ))}
    </div>
  </div>
);

const Stepper = ({ steps, currentStep }) => (
  <div className="flex items-center gap-2 mb-10">
    {steps.map((s, i) => (
      <React.Fragment key={i}>
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all duration-500 ${i < currentStep ? 'bg-emerald-500 text-white' : i === currentStep ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-400'}`}>{i < currentStep ? '✓' : i + 1}</div>
          <span className={`text-[13px] font-medium hidden sm:block transition-colors duration-300 ${i <= currentStep ? 'text-neutral-900' : 'text-neutral-300'}`}>{s}</span>
        </div>
        {i < steps.length - 1 && <div className={`flex-1 h-[2px] rounded-full transition-colors duration-500 ${i < currentStep ? 'bg-emerald-500' : 'bg-neutral-100'}`} />}
      </React.Fragment>
    ))}
  </div>
);

const MetricCard = ({ label, value, change, icon, trend = 'up' }) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 hover:bg-white/15 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] transition-all duration-500">
    <div className="flex items-center justify-between mb-3">
      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-neutral-500">{icon}</div>
      {change && <span className={`text-[12px] font-semibold ${trend === 'up' ? 'text-emerald-600' : 'text-neutral-400'}`}>{change}</span>}
    </div>
    <p className="text-[24px] font-semibold text-neutral-900 leading-tight mb-1">{value}</p>
    <p className="text-[12px] text-neutral-400 font-medium">{label}</p>
  </div>
);

const AuthSidePanel = () => (
  <div className="hidden lg:flex flex-col justify-between bg-neutral-950 rounded-3xl p-10 xl:p-14 min-h-full relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-neutral-800/20 to-transparent rounded-full blur-3xl" />
    <div className="relative z-10"><a href="#/" className="font-serif text-[22px] text-white tracking-tight">Foundr<span className="text-neutral-500">HUB</span></a></div>
    <div className="relative z-10 mt-auto">
      <blockquote className="font-serif text-[clamp(1.4rem,2.2vw,1.8rem)] leading-[1.3] text-white/90 italic mb-8">"The best founders don't just build products — they build movements."</blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-100 flex items-center justify-center text-[12px] font-bold text-neutral-700">RK</div>
        <div><p className="text-[13px] font-semibold text-white/90">Rahul Kapoor</p><p className="text-[11px] text-neutral-400">Founder, NeuralBrew AI</p></div>
      </div>
      <div className="mt-10 pt-8 border-t border-neutral-800/60 grid grid-cols-3 gap-4">
        {[{l:'Founders',v:'240+'},{l:'Cities',v:'86'},{l:'Startups',v:'1,200+'}].map(s=>(<div key={s.l}><p className="text-[20px] font-semibold text-white">{s.v}</p><p className="text-[11px] text-neutral-500">{s.l}</p></div>))}
      </div>
    </div>
  </div>
);

const SuccessModal = ({ show, title, subtitle, cta, onCta }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />
      <div className="relative bg-white/90 backdrop-blur-2xl rounded-3xl p-10 max-w-md w-full mx-4 text-center shadow-2xl border border-white/40 animate-[fadeInUp_0.5s_ease-out]">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-50 flex items-center justify-center"><svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg></div>
        <h3 className="font-serif text-[1.6rem] text-neutral-950 mb-2">{title}</h3>
        <p className="text-[14px] text-neutral-500 leading-relaxed mb-8">{subtitle}</p>
        <button onClick={onCta} className="inline-flex items-center px-7 py-3.5 rounded-full bg-neutral-950 text-white text-[14px] font-semibold tracking-wide hover:bg-neutral-800 transition-all duration-300">{cta}</button>
      </div>
    </div>
  );
};

const PageWrap = ({ children }) => (<div className="animate-[fadeInUp_0.6s_ease-out]">{children}</div>);
