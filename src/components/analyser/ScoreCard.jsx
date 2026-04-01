import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const ScoreCard = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    let frame
    let start
    const duration = 900

    const tick = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      setDisplayScore(Math.round(progress * score))
      if (progress < 1) {
        frame = window.requestAnimationFrame(tick)
      }
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [score])

  const scoreColor = score >= 75 ? 'text-emerald-600' : score >= 50 ? 'text-amber-500' : 'text-rose-500'
  const chipColor = score >= 75 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : score >= 50 ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-rose-50 border-rose-200 text-rose-700'

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-2xl border border-[#122056]/10 bg-white/85 p-5 md:p-6 shadow-[0_10px_30px_rgba(18,32,86,0.08)]"
    >
      <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#122056]/65">Startup Viability Score</p>
      <div className="mt-2 flex items-end gap-2">
        <p className={`text-4xl md:text-5xl font-bold tracking-tight ${scoreColor}`}>{displayScore}</p>
        <span className="pb-1 text-[#122056]/60">/100</span>
      </div>
      <span className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${chipColor}`}>
        {score >= 75 ? 'Strong signal' : score >= 50 ? 'Promising with risks' : 'Needs repositioning'}
      </span>
    </motion.div>
  )
}

export default ScoreCard
