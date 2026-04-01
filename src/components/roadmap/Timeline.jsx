import { motion } from 'framer-motion'
import PhaseCard from './PhaseCard'

const Timeline = ({ phases }) => {
  if (!phases.length) {
    return null
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative mt-10"
    >
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-[#5B65DC] via-[#122056]/60 to-[#122056]/20"
        />

        <div className="space-y-6 md:space-y-8">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.35 }}
              className="relative grid md:grid-cols-2 gap-4 md:gap-8 pl-12 md:pl-0"
            >
              <div className={`${index % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2'}`}>
                <PhaseCard phase={phase} index={index} />
              </div>

              <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 top-9 w-3.5 h-3.5 rounded-full border-2 border-[#FAFAFD] bg-[#5B65DC] shadow-[0_0_0_4px_rgba(91,101,220,0.2)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Timeline
