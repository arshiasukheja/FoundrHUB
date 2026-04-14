import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AuthSidePanel = () => (
  <div
    className="hidden lg:flex flex-col justify-between rounded-3xl p-10 xl:p-14 min-h-full relative overflow-hidden bg-center bg-cover"
    style={{ backgroundImage: "url('/2.png')" }}
  >
    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
    <div className="relative z-10">
      <Link to="/" className="font-serif text-[22px] text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
        Foundr<span className="text-white/60">HUB</span>
      </Link>
    </div>
    <div className="relative z-10 mt-auto">
      <blockquote className="font-serif text-[clamp(1.4rem,2.2vw,1.8rem)] leading-[1.3] text-white/95 italic mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
        "The best founders don't just build products — they build movements."
      </blockquote>
      
      <div className="mt-10 pt-8 border-t border-white/20 grid grid-cols-3 gap-4">
        {[{ l: 'Founders', v: '240+' }, { l: 'Cities', v: '86' }, { l: 'Startups', v: '1,200+' }].map(s => (
          <div key={s.l}>
            <p className="text-[20px] font-semibold text-white">{s.v}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const SignInPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { login, getDashboardPathForRole } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const up = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const roleIntent = searchParams.get('role') === 'investor' ? 'investor' : 'founder'

  const handleSignIn = async (e) => {
    e.preventDefault()
    setError('')
    const result = await login({ email: form.email, password: form.password })

    if (!result.ok) {
      setError(result.error || 'Unable to sign in.')
      return
    }

    navigate(location.state?.from?.pathname || getDashboardPathForRole(result.user.role), { replace: true })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="min-h-screen bg-white flex">
        <div className="hidden lg:block lg:w-[45%] xl:w-[42%] p-5">
          <AuthSidePanel />
        </div>
        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-md">
            <Link to="/" className="lg:hidden font-serif text-[22px] tracking-tight text-[#122056] mb-10 block">
              Foundr<span className="text-[#5B65DC]">HUB</span>
            </Link>
            <h1 className="text-[2.2rem] lg:text-[2.6rem] font-bold text-[#122056] tracking-tight mb-3">Welcome back</h1>
            <p className="text-[16px] text-[#122056]/60 mb-10">Email and password only. Fast access to your workspace.</p>

            <form onSubmit={handleSignIn}>
              <div className="mb-5">
                <label className="block text-[14px] font-medium text-[#122056] mb-2">Email <span className="text-red-400">*</span></label>
                <input type="email" value={form.email} onChange={e => up('email', e.target.value)} placeholder="you@example.com" className="w-full px-5 py-3.5 rounded-2xl border border-[#EEF0FD] bg-[#EAF1FF] text-[15px] text-[#122056] placeholder:text-neutral-400 focus:outline-none focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 transition-all duration-300" />
              </div>
              <div className="mb-5">
                <label className="block text-[14px] font-medium text-[#122056] mb-2">Password <span className="text-red-400">*</span></label>
                <input type="password" value={form.password} onChange={e => up('password', e.target.value)} placeholder="••••••••" className="w-full px-5 py-3.5 rounded-2xl border border-[#EEF0FD] bg-[#EAF1FF] text-[15px] text-[#122056] placeholder:text-neutral-400 focus:outline-none focus:border-[#5B65DC] focus:ring-2 focus:ring-[#5B65DC]/20 transition-all duration-300" />
              </div>

              <button type="submit" id="signin-btn" className="w-full py-4 rounded-full bg-[#122056] text-white text-[15px] font-semibold tracking-wide hover:bg-[#0f1a49] transition-all duration-300 hover:shadow-lg hover:shadow-[#122056]/10 mb-6">
                Sign In
              </button>

              {error && <p className="text-[13px] text-red-500 mb-4">{error}</p>}
            </form>

              <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#EEF0FD]" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-4 text-[13px] text-[#122056]/40 font-medium">or continue with</span></div>
            </div>

            <div className="grid grid-cols-1 gap-3 mb-8">
              <button className="flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-[#EEF0FD] text-[14px] font-medium text-[#122056]/70 hover:border-[#5B65DC]/40 hover:text-[#122056] transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                Google
              </button>
            </div>

            <p className="text-center text-[14px] text-[#122056]/60">
              Don't have an account? <Link to={`/signup?role=${roleIntent}`} className="font-semibold text-[#5B65DC] hover:text-[#122056] transition-colors">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SignInPage
