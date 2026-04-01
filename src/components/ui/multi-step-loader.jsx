import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

export const MultiStepLoader = ({
  loading,
  loadingStates,
  duration = 900,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    if (!loading) {
      setCurrentStep(0)
      return
    }

    const interval = window.setInterval(() => {
      setCurrentStep((previous) => {
        if (previous >= loadingStates.length - 1) {
          return previous
        }
        return previous + 1
      })
    }, duration)

    return () => window.clearInterval(interval)
  }, [loading, loadingStates.length, duration])

  const safeStep = useMemo(() => {
    if (!loadingStates.length) {
      return 0
    }
    return Math.min(currentStep, loadingStates.length - 1)
  }, [currentStep, loadingStates.length])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#FAFAFD]/85 backdrop-blur-md px-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="w-full max-w-xl rounded-3xl border border-[#122056]/15 bg-white shadow-[0_24px_60px_rgba(18,32,86,0.18)] p-6 md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#5B65DC]">AI Roadmap Engine</p>
                <h3 className="mt-2 text-2xl md:text-[30px] leading-tight font-semibold text-[#122056]">Generating your founder roadmap</h3>
              </div>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-[#122056]/15 p-2 text-[#122056]/75 hover:text-[#122056] hover:border-[#122056]/25 transition-colors"
                  aria-label="Close loader"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-[#122056]/10 bg-[#FAFAFD] p-4 md:p-5 min-h-[96px] flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={safeStep}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="text-base md:text-lg text-[#122056] font-medium"
                >
                  {loadingStates[safeStep]?.text || 'Processing...'}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-6 space-y-3">
              {loadingStates.map((step, index) => {
                const isDone = index <= safeStep
                return (
                  <motion.div
                    key={step.text}
                    className="flex items-center gap-3"
                    initial={false}
                    animate={{ opacity: isDone ? 1 : 0.45 }}
                  >
                    <div className={`h-2 w-2 rounded-full ${isDone ? 'bg-[#5B65DC]' : 'bg-[#122056]/20'}`} />
                    <p className={`text-sm ${isDone ? 'text-[#122056]' : 'text-[#122056]/50'}`}>{step.text}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
