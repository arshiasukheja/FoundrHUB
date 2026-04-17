import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Toast = ({ message, duration = 3500, onClose }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onClose?.(), 300)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-3.5 rounded-2xl bg-neutral-950/90 backdrop-blur-2xl border border-white/10 shadow-[0_16px_64px_-16px_rgba(0,0,0,0.4)] text-white text-[14px] font-medium flex items-center gap-3"
        >
          <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          {message}
          <button onClick={() => { setVisible(false); onClose?.() }} className="ml-2 text-white/50 hover:text-white transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Toast
