import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

const PremiumModal = ({ isOpen, onClose, title, subtitle, children, size = 'max-w-2xl' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-neutral-950/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className={`relative ${size} w-full bg-white rounded-3xl shadow-[0_32px_128px_-24px_rgba(0,0,0,0.12)] border border-neutral-100 max-h-[90vh] overflow-y-auto`}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl rounded-t-3xl border-b border-neutral-100 px-8 py-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-serif text-[1.35rem] text-neutral-950 leading-tight">{title}</h2>
                  {subtitle && <p className="text-[13px] text-neutral-400 mt-1.5">{subtitle}</p>}
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 rounded-xl border border-neutral-100 flex items-center justify-center text-neutral-400 hover:text-neutral-900 hover:border-neutral-300 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 py-6">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default PremiumModal
