import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AnalysisInputForm from '../components/analyser/AnalysisInputForm'
import AnalysisLoadingState from '../components/analyser/AnalysisLoadingState'
import AnalysisReport from '../components/analyser/AnalysisReport'

const getCompetitionLevel = (stage, audience) => {
  if (stage === 'Growth') return 'High'
  if (audience.toLowerCase().includes('niche')) return 'Low'
  return 'Medium'
}

const clampScore = (value) => Math.max(28, Math.min(92, value))

const buildAnalysisReport = (form) => {
  const ideaLen = form.idea.trim().length
  const problemLen = form.problem.trim().length
  const audienceLen = form.audience.trim().length

  let score = 42
  score += ideaLen > 100 ? 12 : 5
  score += problemLen > 90 ? 14 : 6
  score += audienceLen > 24 ? 10 : 4
  score += form.stage === 'MVP' ? 10 : form.stage === 'Growth' ? 14 : 6
  score += form.businessModel === 'SaaS Subscription' || form.businessModel === 'Enterprise Licensing' ? 8 : 4
  score += form.goal.toLowerCase().includes('users') ? 6 : 3

  const finalScore = clampScore(score)
  const competitionLevel = getCompetitionLevel(form.stage, form.audience)

  const marketDemand = `The demand signal looks ${finalScore >= 70 ? 'promising' : 'early but uncertain'} for ${form.audience}. Your idea addresses ${form.problem.toLowerCase()} and can attract attention if the first use-case is narrow and urgent.`

  const competitionInsight =
    competitionLevel === 'High'
      ? 'You are entering a crowded landscape. Distribution and differentiation will matter more than feature breadth.'
      : competitionLevel === 'Medium'
        ? 'There is visible competition, but room exists for focused positioning and faster execution.'
        : 'Competition appears limited in your niche. Validate quickly before larger players react.'

  const problemValidity =
    problemLen > 80
      ? 'Problem statement is concrete enough to test. It appears real and tied to user friction.'
      : 'Problem statement is currently broad. Tighten it around one painful moment and one user segment.'

  const monetizationPotential =
    form.businessModel === 'SaaS Subscription' || form.businessModel === 'Enterprise Licensing'
      ? 'Strong recurring revenue potential if onboarding and retention are engineered early.'
      : 'Monetization is viable, but pricing and value capture need sharper definition in the first iterations.'

  const risks = [
    competitionLevel === 'High' ? 'Highly saturated market with strong incumbents.' : 'Risk of underestimating adjacent competitors.',
    'Weak differentiation if value proposition remains too broad.',
    'User acquisition cost can rise before retention fundamentals are stable.',
    form.stage === 'Idea' ? 'Execution risk due to limited real user feedback at current stage.' : 'Scaling risk if product quality and support processes lag behind growth.'
  ]

  const suggestions = [
    `Target a tighter segment within ${form.audience}.`,
    'Refine your value proposition into one measurable user outcome.',
    `Run 10-15 structured interviews focused on: ${form.problem.toLowerCase()}.`,
    `Design a 30-day plan explicitly tied to goal: ${form.goal}.`
  ]

  const pivotIdeas = [
    'Focus on a niche vertical use-case instead of a broad all-in-one solution.',
    'Switch from feature-heavy offering to workflow automation with faster ROI proof.',
    'Consider a services-led entry with productized components to validate willingness to pay.'
  ]

  return {
    score: finalScore,
    marketDemand,
    competitionLevel,
    competitionInsight,
    problemValidity,
    monetizationPotential,
    risks,
    suggestions,
    pivotIdeas
  }
}

const AnalyserPage = () => {
  const [form, setForm] = useState({
    idea: '',
    audience: '',
    problem: '',
    businessModel: 'SaaS Subscription',
    stage: 'Idea',
    goal: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [report, setReport] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleAnalyze = (event) => {
    event.preventDefault()
    setReport(null)
    setIsLoading(true)

    window.setTimeout(() => {
      setReport(buildAnalysisReport(form))
      setIsLoading(false)
    }, 3300)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[radial-gradient(circle_at_12%_5%,rgba(91,101,220,0.16),transparent_38%),radial-gradient(circle_at_88%_20%,rgba(18,32,86,0.12),transparent_42%),#FAFAFD] pt-32 pb-24">
        <section className="max-w-6xl mx-auto px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#5B65DC]">Reality Check</p>
            <h1 className="mt-3 text-[clamp(2rem,4.8vw,3.4rem)] leading-[1.08] font-semibold text-[#122056]">Validate Your Startup Idea</h1>
            <p className="mt-4 text-base text-[#122056]/72">Get a real, data-driven reality check before you build.</p>
          </motion.div>

          <div className="mt-8">
            <AnalysisInputForm
              form={form}
              onChange={handleChange}
              onSubmit={handleAnalyze}
              isLoading={isLoading}
            />

            <AnalysisLoadingState loading={isLoading} />
            <AnalysisReport report={report} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default AnalyserPage
