import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AuthSidePanel = () => (
  <div className="hidden lg:flex flex-col justify-between bg-neutral-950 rounded-3xl p-10 xl:p-14 min-h-full relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-neutral-800/20 to-transparent rounded-full blur-3xl" />
    <div className="relative z-10">
      <Link to="/" className="font-serif text-[22px] text-white tracking-tight">
        Foundr<span className="text-neutral-500">HUB</span>
      </Link>
    </div>
    <div className="relative z-10 mt-auto">
      <blockquote className="font-serif text-[clamp(1.4rem,2.2vw,1.8rem)] leading-[1.3] text-white/90 italic mb-8">
        "The best founders don't just build products — they build movements."
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-100 flex items-center justify-center text-[12px] font-bold text-neutral-700">RK</div>
        <div>
          <p className="text-[13px] font-semibold text-white/90">Rahul Kapoor</p>
          <p className="text-[11px] text-neutral-400">Founder, NeuralBrew AI</p>
        </div>
      </div>
      <div className="mt-10 pt-8 border-t border-neutral-800/60 grid grid-cols-3 gap-4">
        {[{ l: 'Founders', v: '240+' }, { l: 'Cities', v: '86' }, { l: 'Startups', v: '1,200+' }].map(s => (
          <div key={s.l}>
            <p className="text-[20px] font-semibold text-white">{s.v}</p>
            <p className="text-[11px] text-neutral-500">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const SignInPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, getDashboardPathForRole } = useAuth()
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [error, setError] = useState('')
  const up = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const roleIntent = searchParams.get('role') === 'founder' ? 'founder' : 'discoverer'

  const handleSignIn = async (e) => {
    e.preventDefault()
    setError('')
    const result = await login({ email: form.email, password: form.password })

    if (!result.ok) {
      setError(result.error || 'Unable to sign in.')
      return
    }

    navigate(getDashboardPathForRole(result.user.role), { replace: true })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <div className="min-h-screen bg-white flex">
        <div className="hidden lg:block lg:w-[45%] xl:w-[42%] p-5">
          <AuthSidePanel />
        </div>
        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-md">
            <Link to="/" className="lg:hidden font-serif text-[22px] tracking-tight text-neutral-950 mb-10 block">
              Foundr<span className="text-neutral-400">HUB</span>
            </Link>
            <h1 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] leading-[1.1] tracking-tight text-neutral-950 mb-2">Welcome back</h1>
            <p className="text-[15px] text-neutral-400 mb-10">
              Sign in as a {roleIntent === 'founder' ? 'Founder' : 'Discoverer'}
            </p>

            <form onSubmit={handleSignIn}>
              <div className="mb-5">
                <label className="block text-[13px] font-medium text-neutral-600 mb-1.5">Email <span className="text-red-400">*</span></label>
                <input type="email" value={form.email} onChange={e => up('email', e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-all duration-300" />
              </div>
              <div className="mb-5">
                <label className="block text-[13px] font-medium text-neutral-600 mb-1.5">Password <span className="text-red-400">*</span></label>
                <input type="password" value={form.password} onChange={e => up('password', e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-all duration-300" />
              </div>

              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.remember} onChange={e => up('remember', e.target.checked)} className="w-4 h-4 rounded border-neutral-300 text-neutral-950 focus:ring-neutral-400 cursor-pointer" />
                  <span className="text-[13px] text-neutral-500">Remember me</span>
                </label>
                <a href="#" className="text-[13px] font-medium text-neutral-500 hover:text-neutral-900 transition-colors duration-300">Forgot password?</a>
              </div>

              <button type="submit" id="signin-btn" className="w-full py-3.5 rounded-full bg-neutral-950 text-white text-[14px] font-semibold tracking-wide hover:bg-neutral-800 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-200 mb-6">
                Sign In
              </button>

              {error && <p className="text-[13px] text-red-500 mb-4">{error}</p>}
            </form>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-100" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-4 text-[12px] text-neutral-400 font-medium">or continue with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-neutral-200 text-[13px] font-medium text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-all duration-300">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-neutral-200 text-[13px] font-medium text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-all duration-300">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
                LinkedIn
              </button>
            </div>

            <p className="text-center text-[13px] text-neutral-400">
              Don't have an account? <Link to={`/signup?role=${roleIntent}`} className="font-semibold text-neutral-900 hover:text-neutral-600 transition-colors">Create account</Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SignInPage
