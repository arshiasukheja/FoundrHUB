import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'

const cn = (...classes) => classes.filter(Boolean).join(' ')

function Card({ className, children }) {
  return (
    <div
      className={cn(
        'relative w-full rounded-[22px] border border-[#122056]/12 bg-white/90 p-1.5 shadow-[0_18px_45px_rgba(18,32,86,0.12)] backdrop-blur-xl',
        className
      )}
    >
      {children}
    </div>
  )
}

function Header({ children, className, highlight = false }) {
  return (
    <div
      className={cn(
        'relative mb-5 rounded-[18px] border p-5 overflow-hidden',
        highlight
          ? 'border-[#5B65DC]/30 bg-gradient-to-b from-[#5B65DC]/20 via-white to-white'
          : 'border-[#122056]/10 bg-[#FAFAFD]',
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-44"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.08) 42%, rgba(255,255,255,0) 100%)'
        }}
      />
      {children}
    </div>
  )
}

function PlanName({ children }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-[#122056]/80">
      <Sparkles size={14} className="text-[#5B65DC]" />
      {children}
    </div>
  )
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-[#5B65DC]/30 bg-[#5B65DC]/10 px-2 py-0.5 text-[11px] font-semibold text-[#122056]">
      {children}
    </span>
  )
}

function Description({ children }) {
  return <p className="mt-2 text-xs text-[#122056]/70">{children}</p>
}

function Price({ amount, period, strike }) {
  return (
    <div className="mt-4 flex items-end gap-2">
      {strike ? <span className="text-base text-[#122056]/40 line-through">${strike}</span> : null}
      <span className="text-3xl font-extrabold tracking-tight text-[#122056]">${amount}</span>
      <span className="pb-1 text-sm text-[#122056]/70">/{period}</span>
    </div>
  )
}

function List({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5 text-sm text-[#122056]/80">
          <Check size={16} className="mt-0.5 shrink-0 text-[#5B65DC]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

const PricingCard = ({ plan, billing, onAction }) => {
  const price = billing === 'yearly' ? plan.priceYearly : plan.priceMonthly
  const period = billing === 'yearly' ? 'mo (annual)' : 'mo'

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="w-full"
    >
      <Card className={plan.popular ? 'ring-2 ring-[#5B65DC]/30' : ''}>
        <Header highlight={plan.popular}>
          <div className="relative z-10 flex items-center justify-between">
            <PlanName>{plan.name}</PlanName>
            {plan.popular ? <Badge>Most Popular</Badge> : null}
          </div>
          <Description>{plan.description}</Description>
          <Price amount={price} period={period} strike={billing === 'yearly' ? plan.priceMonthly : null} />
        </Header>

        <div className="space-y-5 p-3 pb-4">
          <p className="text-xs uppercase tracking-[0.14em] text-[#122056]/55">Upgrade to access</p>
          <List items={plan.features} />

          <button
            type="button"
            onClick={() => onAction(plan.name)}
            className={cn(
              'w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300',
              plan.popular
                ? 'bg-[#122056] text-[#FAFAFD] hover:bg-[#5B65DC] hover:shadow-[0_16px_34px_rgba(91,101,220,0.32)]'
                : 'bg-[#122056]/8 text-[#122056] hover:bg-[#122056]/14'
            )}
          >
            {plan.cta}
          </button>
        </div>
      </Card>
    </motion.div>
  )
}

export default PricingCard
