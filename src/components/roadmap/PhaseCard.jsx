import { motion } from 'framer-motion'

const tagStyles = {
  'Do this first': 'bg-[#5B65DC]/15 text-[#122056] border-[#5B65DC]/30',
  'High priority': 'bg-[#122056]/10 text-[#122056] border-[#122056]/20',
  Optional: 'bg-neutral-100 text-neutral-600 border-neutral-200'
}

const PhaseCard = ({ phase, index }) => {
  const fromLeft = index % 2 === 0

  return (
    <motion.article
      initial={{ opacity: 0, x: fromLeft ? -42 : 42, y: 12 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.2 }}
      whileHover={{ scale: 1.02, boxShadow: '0 22px 55px rgba(18, 32, 86, 0.16)' }}
      className={`relative rounded-3xl border bg-white/90 backdrop-blur-xl p-5 md:p-6 transition-shadow duration-300 shadow-[0_10px_35px_rgba(18,32,86,0.08)] ${
        phase.isCurrentStage
          ? 'border-[#5B65DC]/40 ring-2 ring-[#5B65DC]/20'
          : 'border-[#122056]/10'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="px-2.5 py-1 rounded-full bg-[#122056]/90 text-[#FAFAFD] text-[11px] font-semibold">
          {phase.phaseLabel}
        </span>
        <span className={`px-2.5 py-1 rounded-full border text-[11px] font-medium ${tagStyles[phase.tag] || tagStyles.Optional}`}>
          {phase.tag}
        </span>
        {phase.isCurrentStage && (
          <span className="px-2.5 py-1 rounded-full bg-[#5B65DC]/15 text-[#122056] text-[11px] font-semibold border border-[#5B65DC]/30">
            Current stage
          </span>
        )}
      </div>

      <h3 className="text-xl font-semibold text-[#122056]">{phase.title}</h3>
      <p className="mt-2 text-sm text-[#122056]/75 leading-relaxed">{phase.description}</p>

      <div className="mt-5">
        <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#5B65DC]">Action Steps</p>
        <ul className="mt-3 space-y-2">
          {phase.steps.map((step) => (
            <li key={step} className="flex items-start gap-2 text-sm text-[#122056]/90">
              <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#5B65DC] shrink-0" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 rounded-2xl bg-[#FAFAFD] border border-[#122056]/10 p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#122056]/75">Relevant tools</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {phase.resources.map((tool) => (
            <span key={tool} className="px-2.5 py-1 rounded-full border border-[#122056]/10 bg-white text-[11px] text-[#122056]/80">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default PhaseCard
