import { useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import InputForm from '../components/roadmap/InputForm'
import Timeline from '../components/roadmap/Timeline'
import { MultiStepLoader } from '../components/ui/multi-step-loader'

const stageCurrentPhase = {
  Idea: 'Validation',
  MVP: 'Build',
  Growth: 'Growth'
}

const loadingStates = [
  { text: 'Reading your startup idea context' },
  { text: 'Matching strategy to your current stage' },
  { text: 'Prioritizing actions for your primary goal' },
  { text: 'Adding tools and execution checkpoints' },
  { text: 'Designing your founder roadmap timeline' }
]

const basePhases = [
  {
    title: 'Validation',
    phaseLabel: 'Phase 1',
    baseDescription: 'Validate demand and sharpen your value proposition before shipping heavily.',
    tags: {
      Idea: 'Do this first',
      MVP: 'High priority',
      Growth: 'Optional'
    },
    resources: ['MCA (company registration)', 'IP India (trademark)']
  },
  {
    title: 'Build',
    phaseLabel: 'Phase 2',
    baseDescription: 'Turn assumptions into a usable product with clear onboarding and feedback loops.',
    tags: {
      Idea: 'High priority',
      MVP: 'Do this first',
      Growth: 'High priority'
    },
    resources: ['Vercel', 'Stripe', 'Razorpay']
  },
  {
    title: 'Launch',
    phaseLabel: 'Phase 3',
    baseDescription: 'Go live with focused channels and measurable activation milestones.',
    tags: {
      Idea: 'Optional',
      MVP: 'High priority',
      Growth: 'High priority'
    },
    resources: ['Razorpay', 'Stripe', 'Vercel']
  },
  {
    title: 'Growth',
    phaseLabel: 'Phase 4',
    baseDescription: 'Scale retention, referrals, and efficient acquisition as your engine stabilizes.',
    tags: {
      Idea: 'Optional',
      MVP: 'Optional',
      Growth: 'Do this first'
    },
    resources: ['Stripe', 'Razorpay', 'Vercel']
  },
  {
    title: 'Legal',
    phaseLabel: 'Phase 5',
    baseDescription: 'Protect IP, formalize entity structure, and stay compliant while you grow.',
    tags: {
      Idea: 'High priority',
      MVP: 'High priority',
      Growth: 'High priority'
    },
    resources: ['MCA (company registration)', 'IP India (trademark)']
  }
]

const industryFocus = {
  AI: 'model quality and trust',
  SaaS: 'activation and retention',
  D2C: 'brand differentiation and repeat purchases',
  Fintech: 'compliance and transaction trust',
  EdTech: 'outcome clarity and learner engagement',
  HealthTech: 'regulatory readiness and patient confidence',
  'Climate Tech': 'impact validation and enterprise partnerships',
  Other: 'clear value delivery'
}

const buildPhaseSteps = (phase, form) => {
  const selectedIndustry = form.industry || 'your industry'
  const selectedBusinessModel = form.businessModel || 'your business model'
  const selectedTeamSize = form.teamSize || 'your current team'
  const selectedRunway = form.runway || 'your runway'
  const selectedLaunchTimeline = form.launchTimeline || 'your target timeline'
  const selectedRegion = form.region || 'your target market'
  const selectedBudget = form.budget || 'your available budget'

  const ideaSnippet = form.idea.trim().slice(0, 90)
  const focus = industryFocus[form.industry] || industryFocus.Other
  const urgencyLine = selectedRunway === '< 3 months' ? 'Move with weekly shipping speed and strict prioritization.' : 'Maintain a sustainable cadence with measurable weekly outcomes.'

  if (phase === 'Validation') {
    return [
      `Interview 12-15 target users to validate pain points around ${ideaSnippet || 'your idea'}.`,
      `Define one measurable success metric linked to ${form.goal}.`,
      `Create a simple landing page and collect waitlist signups in ${selectedIndustry} for ${selectedRegion}.`,
      `Run a 7-day demand test and compare insights against your assumptions. ${urgencyLine}`
    ]
  }

  if (phase === 'Build') {
    return [
      `Prioritize the smallest MVP scope that delivers one clear user outcome for a ${selectedBusinessModel} model.`,
      `Implement onboarding focused on ${focus}.`,
      `Ship weekly iterations with ${selectedTeamSize} and log user feedback after each release.`,
      `Set up analytics events for activation, engagement, and retention with ${selectedLaunchTimeline}.`
    ]
  }

  if (phase === 'Launch') {
    return [
      `Design a 30-day launch campaign aligned to the goal: ${form.goal}.`,
      `Publish founder-led product stories across 2-3 channels where your ${selectedRegion} audience already exists.`,
      `Set up referral and ambassador loops sized for ${selectedBudget}.`,
      `Track signups, activation rate, and day-7 retention daily until ${selectedLaunchTimeline}.`
    ]
  }

  if (phase === 'Growth') {
    return [
      'Build a weekly growth dashboard with CAC, retention, and LTV.',
      `Run one pricing experiment and one onboarding experiment each sprint for your ${selectedBusinessModel} motion.`,
      `Automate lifecycle messaging to improve conversion and stickiness in ${selectedRegion}.`,
      'Document repeatable GTM playbooks for the next growth cycle.'
    ]
  }

  return [
    'Finalize company registration and update founder agreements.',
    'File trademark assets and maintain an IP documentation folder.',
    'Draft clear terms, privacy policy, and customer contract templates.',
    'Review quarterly compliance checkpoints with your advisor or legal partner.'
  ]
}

const createRoadmap = (form) => {
  const selectedStage = form.stage || 'Idea'
  const selectedIndustry = form.industry || 'your industry'
  const selectedBusinessModel = form.businessModel || 'your business model'
  const selectedRegion = form.region || 'your target market'

  const currentPhase = stageCurrentPhase[form.stage] || 'Validation'

  return basePhases.map((phase) => ({
    ...phase,
    description: `${phase.baseDescription} Tailored for a ${selectedStage}-stage ${selectedIndustry} ${selectedBusinessModel} startup targeting: ${form.goal} in ${selectedRegion}.`,
    tag: phase.tags[selectedStage] || 'High priority',
    isCurrentStage: phase.title === currentPhase,
    steps: buildPhaseSteps(phase.title, form)
  }))
}

const RoadmapPage = () => {
  const [form, setForm] = useState({
    idea: '',
    stage: '',
    industry: '',
    businessModel: '',
    teamSize: '',
    runway: '',
    launchTimeline: '',
    region: '',
    budget: '',
    goal: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [roadmap, setRoadmap] = useState([])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
  }

  const handleGenerateRoadmap = (event) => {
    event.preventDefault()
    setIsGenerating(true)

    const totalLoaderTime = loadingStates.length * 700

    window.setTimeout(() => {
      setRoadmap(createRoadmap(form))
      setIsGenerating(false)
    }, totalLoaderTime)
  }

  const stageLabel = useMemo(() => stageCurrentPhase[form.stage] || 'Validation', [form.stage])
  const hasRoadmap = roadmap.length > 0

  return (
    <>
      <MultiStepLoader
        loading={isGenerating}
        loadingStates={loadingStates}
        duration={700}
      />
      <Navbar />
      <main className="min-h-screen bg-[radial-gradient(circle_at_20%_0%,rgba(91,101,220,0.12),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(18,32,86,0.08),transparent_45%),#FAFAFD] pt-32 pb-20">
        <section className="max-w-6xl mx-auto px-5 md:px-8">
          <InputForm
            form={form}
            onChange={handleChange}
            onSubmit={handleGenerateRoadmap}
            isGenerating={isGenerating}
          />

          {hasRoadmap && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-[#122056]/10 bg-white/75 backdrop-blur-sm px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#122056]/60">Stage focus</p>
                <p className="text-sm font-semibold text-[#122056] mt-1">{stageLabel}</p>
              </div>
              <div className="rounded-2xl border border-[#122056]/10 bg-white/75 backdrop-blur-sm px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#122056]/60">Business model</p>
                <p className="text-sm font-semibold text-[#122056] mt-1">{form.businessModel || 'Not specified'}</p>
              </div>
              <div className="rounded-2xl border border-[#122056]/10 bg-white/75 backdrop-blur-sm px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#122056]/60">Runway and budget</p>
                <p className="text-sm font-semibold text-[#122056] mt-1">{form.runway || 'Not specified'} / {form.budget || 'Not specified'}</p>
              </div>
              <div className="rounded-2xl border border-[#122056]/10 bg-white/75 backdrop-blur-sm px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#122056]/60">Market and timeline</p>
                <p className="text-sm font-semibold text-[#122056] mt-1">{form.region || 'Not specified'} / {form.launchTimeline || 'Not specified'}</p>
              </div>
            </div>
          )}

          <Timeline phases={roadmap} />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default RoadmapPage
