import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PricingCard from '../components/pricing/PricingCard'

const plans = [
  {
    name: 'Starter',
    description: 'For early founders exploring traction.',
    priceMonthly: 0,
    priceYearly: 0,
    popular: false,
    cta: 'Current Free Plan',
    features: [
      'Basic startup profile visibility',
      'Access to community insights',
      '1 roadmap generation per day',
      'Limited founder analytics'
    ]
  },
  {
    name: 'Pro',
    description: 'For founders ready to scale with confidence.',
    priceMonthly: 29,
    priceYearly: 19,
    popular: true,
    cta: 'Upgrade to Pro',
    features: [
      'Unlimited AI roadmap generations',
      'Priority listing in discovery feed',
      'Advanced analytics and benchmarks',
      'Founder verification fast-track',
      'Monthly GTM strategy templates'
    ]
  },
  {
    name: 'Scale',
    description: 'For teams optimizing growth and operations.',
    priceMonthly: 79,
    priceYearly: 59,
    popular: false,
    cta: 'Upgrade to Scale',
    features: [
      'Everything in Pro, plus team seats',
      'Investor-ready reporting exports',
      'Dedicated onboarding call',
      'Custom KPI dashboards',
      'Priority support and roadmap reviews'
    ]
  }
]

const PricingPage = () => {
  const [billing, setBilling] = useState('monthly')
  const navigate = useNavigate()

  const handlePlanAction = (planName) => {
    if (planName === 'Starter') {
      return
    }
    navigate('/signup?role=founder')
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
            <h1 className="mt-3 text-[clamp(2rem,5vw,3.2rem)] leading-[1.08] font-semibold text-[#122056]">Upgrade FoundrHUB as You Grow</h1>
            <p className="mt-4 text-[#122056]/70 text-base leading-relaxed">
              Start free, then upgrade when you need stronger discovery, analytics, and founder execution tools.
            </p>

            <div className="mt-7 inline-flex items-center rounded-full border border-[#122056]/15 bg-white p-1.5 shadow-[0_10px_30px_rgba(18,32,86,0.08)]">
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
            <p className="mt-2 text-xs text-[#122056]/55">Save up to 34% on annual billing.</p>
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
            Upgrade buttons currently route to founder signup. Payment checkout can be connected next to Razorpay or Stripe for real subscriptions.
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default PricingPage
