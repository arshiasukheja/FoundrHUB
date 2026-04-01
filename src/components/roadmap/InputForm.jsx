import { motion } from 'framer-motion'

const stageOptions = ['Idea', 'MVP', 'Growth']
const industryOptions = ['AI', 'SaaS', 'D2C', 'Fintech', 'EdTech', 'HealthTech', 'Climate Tech', 'Other']
const businessModelOptions = ['B2B SaaS', 'B2C App', 'Marketplace', 'D2C Commerce', 'Fintech Platform', 'Services + Product']
const teamSizeOptions = ['Solo founder', '2-3 members', '4-8 members', '9-20 members']
const runwayOptions = ['< 3 months', '3-6 months', '6-12 months', '12+ months']
const launchTimelineOptions = ['2 weeks', '1 month', '2-3 months', '4-6 months']
const regionOptions = ['India', 'South Asia', 'US', 'Europe', 'Global']
const budgetOptions = ['Bootstrapped', '< $1k/mo', '$1k-$5k/mo', '$5k-$20k/mo', '$20k+/mo']

const InputForm = ({ form, onChange, onSubmit, isGenerating }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-3xl border border-[#122056]/10 bg-white/85 backdrop-blur-xl p-6 md:p-8 shadow-[0_16px_60px_rgba(18,32,86,0.1)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(91,101,220,0.14),transparent_45%),radial-gradient(circle_at_95%_10%,rgba(18,32,86,0.1),transparent_35%)]" />

      <div className="max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.22em] font-semibold text-[#5B65DC]">Founder AI Assistant</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold text-[#122056] leading-tight">Build Your Personalized Founder Roadmap</h1>
        <p className="mt-3 text-sm md:text-base text-[#122056]/75 leading-relaxed">
          Share your startup context and FoundrHUB AI will generate a practical, phase-by-phase roadmap tailored to your stage and goals.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="px-2.5 py-1 rounded-full border border-[#5B65DC]/30 bg-[#5B65DC]/10 text-[11px] font-medium text-[#122056]">Stage-aware planning</span>
          <span className="px-2.5 py-1 rounded-full border border-[#122056]/20 bg-white/80 text-[11px] font-medium text-[#122056]/80">Execution checklist</span>
          <span className="px-2.5 py-1 rounded-full border border-[#122056]/20 bg-white/80 text-[11px] font-medium text-[#122056]/80">Tool recommendations</span>
        </div>
      </div>

      <form onSubmit={onSubmit} className="relative z-10 mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <div className="md:col-span-2 flex items-center justify-between border-y border-[#122056]/10 py-2.5">
          <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#122056]/70">Startup context</p>
          <p className="text-xs text-[#122056]/55">The more details you provide, the better the roadmap.</p>
        </div>

        <label className="md:col-span-2">
          <span className="block text-sm font-medium text-[#122056] mb-2">Startup Idea</span>
          <textarea
            name="idea"
            value={form.idea}
            onChange={onChange}
            placeholder="Describe your startup in 2-3 lines"
            rows={4}
            required
            className="w-full rounded-2xl border border-[#122056]/15 bg-white px-4 py-3 text-sm text-[#122056] placeholder:text-[#122056]/40 focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/35"
          />
        </label>

        <label>
          <span className="block text-sm font-medium text-[#122056] mb-2">Stage</span>
          <select
            name="stage"
            value={form.stage}
            onChange={onChange}
            className="w-full rounded-2xl border border-[#122056]/15 bg-white px-4 py-3 text-sm text-[#122056] focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/35"
          >
            <option value="">Left empty</option>
            {stageOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="block text-sm font-medium text-[#122056] mb-2">Industry</span>
          <select
            name="industry"
            value={form.industry}
            onChange={onChange}
            className="w-full rounded-2xl border border-[#122056]/15 bg-white px-4 py-3 text-sm text-[#122056] focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/35"
          >
            <option value="">Left empty</option>
            {industryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="block text-sm font-medium text-[#122056] mb-2">Business Model</span>
          <select
            name="businessModel"
            value={form.businessModel}
            onChange={onChange}
            className="w-full rounded-2xl border border-[#122056]/15 bg-white px-4 py-3 text-sm text-[#122056] focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/35"
          >
            <option value="">Left empty</option>
            {businessModelOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="block text-sm font-medium text-[#122056] mb-2">Team Size</span>
          <select
            name="teamSize"
            value={form.teamSize}
            onChange={onChange}
            className="w-full rounded-2xl border border-[#122056]/15 bg-white px-4 py-3 text-sm text-[#122056] focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/35"
          >
            <option value="">Left empty</option>
            {teamSizeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="block text-sm font-medium text-[#122056] mb-2">Runway</span>
          <select
            name="runway"
            value={form.runway}
            onChange={onChange}
            className="w-full rounded-2xl border border-[#122056]/15 bg-white px-4 py-3 text-sm text-[#122056] focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/35"
          >
            <option value="">Left empty</option>
            {runwayOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="block text-sm font-medium text-[#122056] mb-2">Launch Timeline</span>
          <select
            name="launchTimeline"
            value={form.launchTimeline}
            onChange={onChange}
            className="w-full rounded-2xl border border-[#122056]/15 bg-white px-4 py-3 text-sm text-[#122056] focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/35"
          >
            <option value="">Left empty</option>
            {launchTimelineOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="block text-sm font-medium text-[#122056] mb-2">Primary Market</span>
          <select
            name="region"
            value={form.region}
            onChange={onChange}
            className="w-full rounded-2xl border border-[#122056]/15 bg-white px-4 py-3 text-sm text-[#122056] focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/35"
          >
            <option value="">Left empty</option>
            {regionOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="block text-sm font-medium text-[#122056] mb-2">Monthly Budget</span>
          <select
            name="budget"
            value={form.budget}
            onChange={onChange}
            className="w-full rounded-2xl border border-[#122056]/15 bg-white px-4 py-3 text-sm text-[#122056] focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/35"
          >
            <option value="">Left empty</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="md:col-span-2">
          <span className="block text-sm font-medium text-[#122056] mb-2">Goal</span>
          <input
            type="text"
            name="goal"
            value={form.goal}
            onChange={onChange}
            placeholder="Example: Get first 100 users"
            required
            className="w-full rounded-2xl border border-[#122056]/15 bg-white px-4 py-3 text-sm text-[#122056] placeholder:text-[#122056]/40 focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/35"
          />
        </label>

        <div className="md:col-span-2 pt-1">
          <button
            type="submit"
            disabled={isGenerating}
            className="inline-flex items-center justify-center rounded-full bg-[#122056] px-7 py-3 text-sm md:text-[15px] font-semibold text-[#FAFAFD] transition-all duration-300 hover:bg-[#5B65DC] hover:shadow-[0_14px_32px_rgba(91,101,220,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Generating...' : 'Generate Roadmap'}
          </button>
        </div>
      </form>
    </motion.section>
  )
}

export default InputForm
