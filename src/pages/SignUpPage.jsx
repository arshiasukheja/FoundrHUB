import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const roles = [
  {
    value: 'founder',
    title: "I'm a Founder",
    description: 'List and grow your startup with visibility tools.',
  },
  {
    value: 'discoverer',
    title: "I'm here to Discover startups",
    description: 'Find, follow, and track high-potential startups.',
  },
]

const SignUpPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { signup, getDashboardPathForRole } = useAuth()

  const roleFromQuery = useMemo(() => {
    const role = searchParams.get('role')
    return role === 'founder' ? 'founder' : role === 'discoverer' ? 'discoverer' : 'founder'
  }, [searchParams])

  const [form, setForm] = useState({
    name: '',
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

    navigate(getDashboardPathForRole(result.user.role), { replace: true })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-[#FAFAFD] px-6 py-12"
    >
      <div className="max-w-2xl mx-auto">
        <Link to="/" className="font-serif text-[22px] tracking-tight text-[#122056] mb-10 inline-block">
          Foundr<span className="text-[#5B65DC]">HUB</span>
        </Link>

        <div className="bg-white rounded-3xl border border-[#EEF0FD] shadow-[0_8px_30px_rgba(18,32,86,0.06)] p-7 md:p-10">
          <h1 className="text-3xl font-bold text-[#122056] tracking-tight">Create your account</h1>
          <p className="mt-2 text-[#122056]/60">Pick your role to personalize your dashboard experience.</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-3">
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
              <label className="block text-sm font-semibold text-[#122056] mb-1.5">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateForm('name', e.target.value)}
                placeholder="Your full name"
                className="w-full rounded-xl border border-[#EEF0FD] px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/30 focus:border-[#5B65DC]"
                required
              />
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
                minLength={6}
                required
              />
            </div>

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
    </motion.div>
  )
}

export default SignUpPage