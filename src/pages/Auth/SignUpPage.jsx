import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const roles = [
  {
    value: 'founder',
    title: "I'm a Founder",
    description: 'Submit and grow your startup with a clean workspace.',
  },
  {
    value: 'investor',
    title: "I'm an Investor",
    description: 'Track startups, trends, and market activity quickly.',
  },
  {
    value: 'mentor',
    title: "I'm a Mentor",
    description: 'Guide founders with structured sessions and shared insights.',
  },
]

const SignUpPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { signup, getDashboardPathForRole } = useAuth()

  const roleFromQuery = useMemo(() => {
    const role = searchParams.get('role')
    if (role === 'investor') return 'investor'
    if (role === 'mentor') return 'mentor'
    return 'founder'
  }, [searchParams])

  const [form, setForm] = useState({
    email: '',
    password: '',
    role: roleFromQuery,
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    const result = await signup(form)
    setIsSubmitting(false)

    if (!result.ok) {
      setError(result.error || 'Unable to create your account.')
      return
    }

    if (result.user.role === 'founder') {
      navigate('/verify', { replace: true })
      return
    }

    navigate(location.state?.from?.pathname || getDashboardPathForRole(result.user.role), { replace: true })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-white"
    >
      <div className="min-h-screen flex">
        <div className="hidden lg:block lg:w-[45%] xl:w-[42%] p-5">
          <div
            className="flex flex-col justify-between rounded-3xl p-10 xl:p-14 min-h-full relative overflow-hidden bg-center bg-cover"
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
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-amber-100 flex items-center justify-center text-[12px] font-bold text-neutral-700">RK</div>
                <div>
                  <p className="text-[13px] font-semibold text-white/95">Rahul Kapoor</p>
                  <p className="text-[11px] text-white/70">Founder, NeuralBrew AI</p>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t border-white/20 grid grid-cols-3 gap-4">
                {[{ l: 'Founders', v: '240+' }, { l: 'Cities', v: '86' }, { l: 'Startups', v: '1,200+' }].map(s => (
                  <div key={s.l}>
                    <p className="text-[20px] font-semibold text-white">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-2xl">
            <Link to="/" className="lg:hidden font-serif text-[22px] tracking-tight text-[#122056] mb-8 inline-block">
              Foundr<span className="text-[#5B65DC]">HUB</span>
            </Link>
            <h1 className="mt-5 text-3xl lg:text-4xl font-bold text-[#122056] tracking-tight">Create your account</h1>
            <p className="mt-2 text-[#122056]/60">Pick founder, investor, or mentor, then use email and password to continue.</p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-3 md:grid-cols-3">
              {roles.map((item) => {
                const active = form.role === item.value
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => updateForm('role', item.value)}
                    className={`text-left rounded-2xl border p-4 transition-all ${
                      active
                        ? 'border-[#5B65DC] bg-[#EEF0FD]/60 shadow-[0_4px_18px_rgba(91,101,220,0.16)]'
                        : 'border-[#EEF0FD] bg-white hover:border-[#5B65DC]/40'
                    }`}
                  >
                    <p className="font-semibold text-[#122056]">{item.title}</p>
                    <p className="text-xs text-[#122056]/60 mt-1">{item.description}</p>
                  </button>
                )
              })}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#122056] mb-1.5">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateForm('email', e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-[#EEF0FD] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/30 focus:border-[#5B65DC]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#122056] mb-1.5">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => updateForm('password', e.target.value)}
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-[#EEF0FD] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/30 focus:border-[#5B65DC]"
                  required
                />
              </div>

              <button
                type="button"
                className="w-full rounded-xl border border-[#EEF0FD] px-4 py-3 text-sm font-semibold text-[#122056] hover:border-[#5B65DC]/40 hover:bg-[#EEF0FD]/40 transition-colors"
              >
                Continue with Google
              </button>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-[#122056] text-white font-semibold py-3.5 hover:bg-[#0f1a49] transition-colors disabled:opacity-60"
              >
                {isSubmitting ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#122056]/60">
              Already have an account?{' '}
              <Link to={`/signin?role=${form.role}`} className="text-[#5B65DC] font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SignUpPage
