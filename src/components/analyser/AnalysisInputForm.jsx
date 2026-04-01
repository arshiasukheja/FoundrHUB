import { motion } from 'framer-motion'

const stageOptions = ['Idea', 'MVP', 'Growth']
const businessModels = ['SaaS Subscription', 'Freemium', 'Transaction Fee', 'Marketplace', 'D2C', 'Enterprise Licensing', 'Other']

const AnalysisInputForm = ({ form, onChange, onSubmit, isLoading }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-3xl border border-[#122056]/10 bg-white/85 p-6 md:p-8 shadow-[0_18px_50px_rgba(18,32,86,0.10)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(91,101,220,0.16),transparent_40%),radial-gradient(circle_at_90%_10%,rgba(18,32,86,0.12),transparent_36%)]" />

      <form onSubmit={onSubmit} className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        <label className="md:col-span-2">
          <span className="block text-sm font-medium text-[#122056] mb-2">Startup Idea</span>
          <textarea
            name="idea"
            value={form.idea}
            onChange={onChange}
            rows={4}
            required
            placeholder="Describe your startup idea in 2-4 lines"
            className="w-full rounded-2xl border border-[#122056]/15 bg-white px-4 py-3 text-sm text-[#122056] placeholder:text-[#122056]/40 focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/35"
          />
        </label>

        <label>
          <span className="block text-sm font-medium text-[#122056] mb-2">Target Audience</span>
          <input
            name="audience"
            value={form.audience}
            onChange={onChange}
            required
            placeholder="Example: Early-stage D2C founders"
            className="w-full rounded-2xl border border-[#122056]/15 bg-white px-4 py-3 text-sm text-[#122056] placeholder:text-[#122056]/40 focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/35"
          />
        </label>

        <label>
          <span className="block text-sm font-medium text-[#122056] mb-2">Business Model</span>
          <select
            name="businessModel"
            value={form.businessModel}
            onChange={onChange}
            className="w-full rounded-2xl border border-[#122056]/15 bg-white px-4 py-3 text-sm text-[#122056] focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/35"
          >
            {businessModels.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="md:col-span-2">
          <span className="block text-sm font-medium text-[#122056] mb-2">Problem Being Solved</span>
          <textarea
            name="problem"
            value={form.problem}
            onChange={onChange}
            rows={3}
            required
            placeholder="What painful problem does this solve?"
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
            {stageOptions.map((stage) => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
        </label>

        <label>
          <span className="block text-sm font-medium text-[#122056] mb-2">Goal</span>
          <input
            name="goal"
            value={form.goal}
            onChange={onChange}
            required
            placeholder="Example: Get first 100 users"
            className="w-full rounded-2xl border border-[#122056]/15 bg-white px-4 py-3 text-sm text-[#122056] placeholder:text-[#122056]/40 focus:outline-none focus:ring-2 focus:ring-[#5B65DC]/35"
          />
        </label>

        <div className="md:col-span-2 pt-1">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-full bg-[#122056] px-7 py-3 text-sm md:text-[15px] font-semibold text-[#FAFAFD] transition-all duration-300 hover:bg-[#5B65DC] hover:shadow-[0_16px_34px_rgba(91,101,220,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Analyzing...' : 'Analyze My Idea'}
          </button>
        </div>
      </form>
    </motion.section>
  )
}

export default AnalysisInputForm
