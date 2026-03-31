import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const steps = [
  'Analyzing market demand...',
  'Evaluating competition...',
  'Checking feasibility...'
]

const AnalysisLoadingState = ({ loading }) => {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (!loading) {
      setActiveStep(0)
      return
    }

    const interval = window.setInterval(() => {
      setActiveStep((previous) => (previous >= steps.length - 1 ? previous : previous + 1))
    }, 1000)

    return () => window.clearInterval(interval)
  }, [loading])

  return (
    <AnimatePresence>
      {loading && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mt-6 rounded-2xl border border-[#122056]/10 bg-white/80 p-5 md:p-6"
        >
          <div className="h-2 w-full rounded-full bg-[#122056]/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#5B65DC] to-[#122056]"
              initial={{ width: '15%' }}
              animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />
          </div>

          <div className="mt-4 space-y-2">
            {steps.map((step, index) => (
              <motion.p
                key={step}
                animate={{ opacity: index <= activeStep ? 1 : 0.45 }}
                className="text-sm text-[#122056]"
              >
                {step}
              </motion.p>
            ))}
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default AnalysisLoadingState
