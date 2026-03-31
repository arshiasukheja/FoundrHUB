import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScoreCard from './ScoreCard'

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.2, duration: 0.55, ease: 'easeOut' }
  })
}

const cardClass = 'rounded-2xl border border-[#122056]/10 bg-white/85 p-5 md:p-6 shadow-[0_10px_30px_rgba(18,32,86,0.08)]'

const AnalysisReport = ({ report }) => {
  if (!report) {
    return null
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="mt-8 space-y-4"
    >
      <motion.div custom={0} variants={sectionVariants}>
        <ScoreCard score={report.score} />
      </motion.div>

      <motion.div custom={1} variants={sectionVariants} className={cardClass} whileHover={{ scale: 1.01 }}>
        <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#122056]/65">Market Demand</p>
        <p className="mt-2 text-sm text-[#122056]/85 leading-relaxed">{report.marketDemand}</p>
      </motion.div>

      <motion.div custom={2} variants={sectionVariants} className={cardClass} whileHover={{ scale: 1.01 }}>
        <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#122056]/65">Competition</p>
        <p className="mt-2 text-sm text-[#122056]/85 leading-relaxed">
          <span className="font-semibold">Level: {report.competitionLevel}. </span>
          {report.competitionInsight}
        </p>
      </motion.div>

      <motion.div custom={3} variants={sectionVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className={cardClass}>
          <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#122056]/65">Problem Validity</p>
          <p className="mt-2 text-sm text-[#122056]/85 leading-relaxed">{report.problemValidity}</p>
        </div>
        <div className={cardClass}>
          <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#122056]/65">Monetization Potential</p>
          <p className="mt-2 text-sm text-[#122056]/85 leading-relaxed">{report.monetizationPotential}</p>
        </div>
      </motion.div>

      <motion.div custom={4} variants={sectionVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className={cardClass}>
          <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#122056]/65">Major Risks</p>
          <ul className="mt-3 space-y-2">
            {report.risks.map((risk) => (
              <li key={risk} className="text-sm text-[#122056]/85">• {risk}</li>
            ))}
          </ul>
        </div>

        <div className={cardClass}>
          <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#122056]/65">Suggestions</p>
          <ul className="mt-3 space-y-2">
            {report.suggestions.map((suggestion) => (
              <li key={suggestion} className="text-sm text-[#122056]/85">• {suggestion}</li>
            ))}
          </ul>
        </div>

        <div className={cardClass}>
          <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#122056]/65">Pivot Ideas</p>
          <ul className="mt-3 space-y-2">
            {report.pivotIdeas.map((idea) => (
              <li key={idea} className="text-sm text-[#122056]/85">• {idea}</li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div custom={5} variants={sectionVariants} className="rounded-2xl border border-[#122056]/10 bg-white/85 px-5 py-4 md:px-6 md:py-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#122056]/65">Next Step</p>
          <p className="text-sm text-[#122056]/80 mt-1">Turn this reality check into an execution plan.</p>
        </div>
        <Link
          to="/roadmap"
          className="inline-flex items-center rounded-full bg-[#122056] px-6 py-2.5 text-sm font-semibold text-[#FAFAFD] transition-all duration-300 hover:bg-[#5B65DC]"
        >
          Generate Your Roadmap →
        </Link>
      </motion.div>
    </motion.section>
  )
}

export default AnalysisReport
