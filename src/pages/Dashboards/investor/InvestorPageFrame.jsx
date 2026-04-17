import { motion } from 'framer-motion'
import { useOutletContext } from 'react-router-dom'

const InvestorPageFrame = ({ kicker, title, description, actions, children }) => {
  const { surfaceClasses, isDark } = useOutletContext()

  return (
    <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className={`rounded-[2rem] border p-5 lg:p-6 ${surfaceClasses}`}>
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div>
          <p className={`text-[10px] uppercase tracking-[0.22em] font-black ${isDark ? 'text-cyan-300/80' : 'text-[#5B65DC]'}`}>{kicker}</p>
          <h2 className={`text-2xl font-serif font-bold mt-1 ${isDark ? 'text-white' : 'text-[#122056]'}`}>{title}</h2>
          <p className={`text-sm mt-2 max-w-3xl ${isDark ? 'text-white/55' : 'text-[#122056]/58'}`}>{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
      <div className="mt-6">{children}</div>
    </motion.section>
  )
}

export default InvestorPageFrame
