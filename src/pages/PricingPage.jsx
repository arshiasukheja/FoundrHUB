import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PricingCard from '../components/pricing/PricingCard'

const founderPlans = [
  {
    name: 'Free',
    description: 'Start your founder journey.',
    priceMonthly: 0,
    priceYearly: 0,
    popular: false,
    cta: 'Get Started',
    features: [
      'Basic roadmap generation',
      'Limited insights',
      'Basic dashboard',
      'Startup profile visibility'
    ]
  },
  {
    name: 'Pro',
    description: 'Full AI power for growth.',
    priceMonthly: 1999,
    priceYearly: 1999,
    popular: true,
    cta: 'Upgrade to Pro',
    features: [
      'Full AI roadmap & launch optimizer',
      'Competitor tracking',
      'Basic investor matching',
      'Growth tracking (KPIs, traction)',
      'Unlimited insights access',
      'Advanced dashboard'
    ]
  },
  {
    name: 'Premium',
    description: 'Get investor-ready in months.',
    priceMonthly: 4999,
    priceYearly: 4999,
    popular: false,
    cta: 'Upgrade to Premium',
    features: [
      'Everything in Pro, plus:',
      'Investor readiness assessment',
      'Pitch optimization engine',
      'Advanced analytics & branding',
      'Premium investor visibility',
      'Priority support & dedicated guidance'
    ]
  }
]

const investorPlans = [
  {
    name: 'Free',
    description: 'Start exploring deals.',
    priceMonthly: 0,
    priceYearly: 0,
    popular: false,
    cta: 'Get Started',
    features: [
      'Browse startups',
      'Limited startup data',
      'Basic filters',
      'Community access'
    ]
  },
  {
    name: 'Pro',
    description: 'Track & analyze your portfolio.',
    priceMonthly: 2999,
    priceYearly: 2999,
    popular: true,
    cta: 'Upgrade to Pro',
    features: [
      'Portfolio tracking (multi-startup)',
      'Real-time growth metrics',
      'Basic AI insights',
      'Startup discovery with filters',
      'Watchlists & alerts',
      'Investment memos'
    ]
  },
  {
    name: 'Elite',
    description: 'Power investor intelligence.',
    priceMonthly: 7999,
    priceYearly: 7999,
    popular: false,
    cta: 'Upgrade to Elite',
    features: [
      'Everything in Pro, plus:',
      'Advanced AI analytics',
      'Premium deal flow access',
      'Real-time investment alerts',
      'Performance benchmarking',
      'VIP dealflow & concierge support'
    ]
  }
]

const PricingPage = () => {
  const [billing, setBilling] = useState('monthly')
  const [userType, setUserType] = useState('founder') // founder or investor
  const navigate = useNavigate()

  const plans = userType === 'founder' ? founderPlans : investorPlans

  const handlePlanAction = (planName) => {
    if (planName === 'Free') {
      navigate(`/signup?role=${userType}`)
      return
    }
    navigate(`/signup?role=${userType}`)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 bg-[radial-gradient(circle_at_8%_8%,rgba(91,101,220,0.18),transparent_35%),radial-gradient(circle_at_88%_20%,rgba(18,32,86,0.12),transparent_40%),#FAFAFD]">
        <section className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#5B65DC]">Pricing</p>
            <h1 className="mt-3 text-[clamp(2rem,5vw,3.2rem)] leading-[1.08] font-semibold text-[#122056]">
              {userType === 'founder' ? 'Founder Plans' : 'Investor Plans'}
            </h1>
            <p className="mt-4 text-[#122056]/70 text-base leading-relaxed">
              {userType === 'founder'
                ? 'Start free, then upgrade for AI-powered growth, investor matching, and pitch optimization.'
                : 'Start free, then upgrade for portfolio tracking, real-time insights, and premium deal access.'}
            </p>

            {/* User Type Toggle */}
            <div className="mt-8 inline-flex items-center rounded-full border border-[#122056]/15 bg-white p-1.5 shadow-[0_10px_30px_rgba(18,32,86,0.08)]">
              <button
                type="button"
                onClick={() => setUserType('founder')}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${userType === 'founder' ? 'bg-[#122056] text-[#FAFAFD]' : 'text-[#122056]/70 hover:text-[#122056]'}`}
              >
                👨‍💻 Founder
              </button>
              <button
                type="button"
                onClick={() => setUserType('investor')}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${userType === 'investor' ? 'bg-[#122056] text-[#FAFAFD]' : 'text-[#122056]/70 hover:text-[#122056]'}`}
              >
                💼 Investor
              </button>
            </div>

            {/* Billing Toggle */}
            <div className="mt-6 inline-flex items-center rounded-full border border-[#122056]/15 bg-white p-1.5 shadow-[0_10px_30px_rgba(18,32,86,0.08)]">
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${billing === 'monthly' ? 'bg-[#122056] text-[#FAFAFD]' : 'text-[#122056]/70 hover:text-[#122056]'}`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling('yearly')}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${billing === 'yearly' ? 'bg-[#122056] text-[#FAFAFD]' : 'text-[#122056]/70 hover:text-[#122056]'}`}
              >
                Yearly
              </button>
            </div>
            <p className="mt-2 text-xs text-[#122056]/55">Indian Rupees (₹) • Billed in INR</p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {plans.map((plan) => (
              <PricingCard
                key={plan.name}
                plan={plan}
                billing={billing}
                onAction={handlePlanAction}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mt-10 rounded-2xl border border-[#122056]/10 bg-white/70 p-4 text-sm text-[#122056]/75"
          >
            All prices are in Indian Rupees (₹) • Monthly billing charged per month • Upgrade or downgrade anytime • No long-term contracts
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default PricingPage
