import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lightbulb, MapPin, Sparkles } from 'lucide-react'
import Footer from '../components/Footer'

const nicheOptions = [
  { id: 'fashion', label: 'Fashion / Clothing' },
  { id: 'beauty', label: 'Beauty / Makeup' },
  { id: 'skincare', label: 'Skincare / Wellness' },
  { id: 'food', label: 'Food & Beverage' },
  { id: 'saas', label: 'SaaS / Tech' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'fintech', label: 'Fintech' },
  { id: 'healthtech', label: 'HealthTech' },
  { id: 'd2c', label: 'D2C / Consumer Brand' },
  { id: 'edtech', label: 'Education / EdTech' }
]

const ideaData = [
  {
    id: 'idea-201',
    title: 'Virtual fit sessions for boutique labels',
    summary: 'Reduce returns by letting customers book a 10-minute styling fit consult inside checkout.',
    nicheId: 'fashion',
    signal: 'Return rates rising in tier-2 cities',
    location: 'Delhi'
  },
  {
    id: 'idea-202',
    title: 'Shade matching by influencer complexion',
    summary: 'Let shoppers choose creators with the same skin tone to preview makeup bundles.',
    nicheId: 'beauty',
    signal: 'UGC conversion > brand campaigns',
    location: 'Mumbai'
  },
  {
    id: 'idea-203',
    title: 'Clinical journey tracker for sensitive skin',
    summary: 'A 4-week diary + routine optimizer that logs triggers and symptoms.',
    nicheId: 'skincare',
    signal: 'Search demand up 32% for barrier repair',
    location: 'Chandigarh'
  },
  {
    id: 'idea-204',
    title: 'Micro-batch tastings for new snack SKUs',
    summary: 'Ship 50-box taste tests with feedback loops before full production.',
    nicheId: 'food',
    signal: 'Trial boxes outperform discount funnels',
    location: 'Pune'
  },
  {
    id: 'idea-205',
    title: 'AI onboarding concierge for trial users',
    summary: 'Interactive checklists that auto-configure the workspace in 7 minutes.',
    nicheId: 'saas',
    signal: 'Trial drop-offs highest after day one',
    location: 'Bangalore'
  },
  {
    id: 'idea-206',
    title: 'Agentic brief generator for brand teams',
    summary: 'Turn campaign goals into ready-to-ship creative briefs in 5 minutes.',
    nicheId: 'ai',
    signal: 'Agency usage grew 2.1x in Q1',
    location: 'Hyderabad'
  },
  {
    id: 'idea-207',
    title: 'SME credit health snapshot dashboard',
    summary: 'One-page risk and cashflow insights for micro-lenders.',
    nicheId: 'fintech',
    signal: 'SME delinquency up 9% QoQ',
    location: 'Gurgaon'
  },
  {
    id: 'idea-208',
    title: 'Remote follow-up care for clinics',
    summary: 'WhatsApp-based recovery tracking for outpatient procedures.',
    nicheId: 'healthtech',
    signal: 'Patient follow-up drop-offs > 45%',
    location: 'Chennai'
  },
  {
    id: 'idea-209',
    title: 'D2C loyalty tier based on referrals',
    summary: 'Unlock rewards only after verified referrals to increase retention.',
    nicheId: 'd2c',
    signal: 'Referral-led cohorts convert 18% higher',
    location: 'Jaipur'
  },
  {
    id: 'idea-210',
    title: 'Cohort launch kit for micro-courses',
    summary: 'Build a 14-day live bootcamp with engagement checkpoints.',
    nicheId: 'edtech',
    signal: 'Live cohorts retain 2.4x vs recorded',
    location: 'Kolkata'
  },
  {
    id: 'idea-211',
    title: 'Category validation sprint',
    summary: 'A 10-day experiment to validate demand in a new segment.',
    nicheId: 'other',
    signal: 'Search volume rising with no clear leader',
    location: 'Ahmedabad'
  },
  {
    id: 'idea-212',
    title: 'Local-first discovery marketplace',
    summary: 'Test hyperlocal demand with 100 early adopter interviews.',
    nicheId: 'other',
    signal: 'Localized searches up 28%',
    location: 'Noida'
  }
]

const normalize = (value = '') => value.toLowerCase().trim()
const slugify = (value = '') => normalize(value).replace(/[^a-z0-9]+/g, '-')

const NicheValidationInsightsPage = () => {
  const [searchParams] = useSearchParams()

  const rawNiche = searchParams.get('niche') || ''
  const normalizedNiche = normalize(rawNiche)

  const matchedNiche = nicheOptions.find((option) => (
    option.id === normalizedNiche || slugify(option.label) === normalizedNiche
  ))

  const displayNiche = matchedNiche?.label || (rawNiche ? rawNiche : 'your niche')
  const resolvedNicheId = matchedNiche?.id || (rawNiche ? 'other' : null)

  const filteredIdeas = useMemo(() => {
    if (!resolvedNicheId) return ideaData
    return ideaData.filter((idea) => idea.nicheId === resolvedNicheId)
  }, [resolvedNicheId])

  return (
    <div className="min-h-screen bg-[#FAFAFD]">
      <header className="sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-4">
          <div className="bg-white/80 backdrop-blur-xl border border-[#EEF0FD] rounded-full px-6 py-3 flex items-center justify-between shadow-[0_20px_50px_rgba(18,32,86,0.08)]">
            <div className="text-[18px] font-extrabold tracking-tight text-[#122056]">
              Foundr<span className="text-[#5B65DC]">HUB</span>
            </div>
            <nav className="hidden md:flex items-center gap-8 text-[12px] font-bold uppercase tracking-[0.2em] text-neutral-400">
              <a href="/analyser" className="hover:text-[#122056] transition-colors">Idea Analyser</a>
              <a href="/roadmap" className="hover:text-[#122056] transition-colors">Roadmap</a>
              <a href="/startup-map" className="hover:text-[#122056] transition-colors">Map</a>
            </nav>
            <div className="flex items-center gap-3">
              <a href="/signin" className="text-[12px] font-bold text-neutral-400 hover:text-[#122056]">Sign In</a>
              <a href="/signup" className="px-4 py-2 rounded-full bg-[#122056] text-white text-[12px] font-bold tracking-wide hover:bg-[#5B65DC] transition">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] bg-[#5B65DC]/10 rounded-full blur-[140px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[35%] h-[35%] bg-[#122056]/10 rounded-full blur-[140px]" />
          </div>

          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 relative z-10">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#5B65DC]">Idea Lab</p>
                <h1 className="mt-5 text-[clamp(2.3rem,4.6vw,3.8rem)] font-bold tracking-tight text-[#122056]">
                  Validate your <span className="text-[#5B65DC] italic">{displayNiche}</span> idea with live signals
                </h1>
                <p className="mt-4 text-[16px] lg:text-[18px] text-neutral-500 max-w-xl">
                  These are idea-stage concepts, not startups. Use them as inspiration to pressure-test demand.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {['Opportunity signals', 'Audience demand', 'MVP angles', 'Validation sprints'].map((item) => (
                    <span key={item} className="px-4 py-2 rounded-full border border-[#EEF0FD] bg-white text-[11px] font-bold uppercase tracking-[0.18em] text-[#122056]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="rounded-[2.5rem] border border-[#EEF0FD] bg-white p-6 shadow-[0_20px_50px_rgba(18,32,86,0.08)]">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-400">Niche signal</p>
                <p className="text-3xl font-bold text-[#122056] mt-3">+19% search lift</p>
                <p className="text-xs text-[#122056]/60 mt-2">Last 30 days across intent keywords</p>
                <div className="mt-6 flex items-center gap-3 text-xs font-semibold text-[#122056]/60">
                  <Sparkles size={14} className="text-amber-500" />
                  Early-stage signal stack curated
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 lg:px-10 pb-20">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#5B65DC]">Idea Concepts</p>
              <h2 className="text-2xl font-bold text-[#122056]">Ideas aligned to {displayNiche}</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredIdeas.map((idea) => (
              <motion.div
                key={idea.id}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-[#EEF0FD] bg-white p-6 shadow-[0_16px_40px_rgba(18,32,86,0.06)]"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EEF0FD] text-[#5B65DC] flex items-center justify-center">
                  <Lightbulb size={20} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#122056]">{idea.title}</h3>
                <p className="mt-2 text-sm text-[#122056]/60 leading-relaxed">{idea.summary}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-[#122056]/60">
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles size={12} className="text-amber-500" />
                    {idea.signal}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin size={12} />
                    {idea.location}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default NicheValidationInsightsPage
