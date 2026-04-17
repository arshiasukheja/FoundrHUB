import React from 'react'
import { motion } from 'framer-motion'

export const Highlighter = ({ children, action = 'highlight', color = '#FF9800', className = '' }) => {
  return (
    <span className={`relative inline-block font-bold ${className}`}>
      {action === 'highlight' && (
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          className="absolute inset-0 z-[-1] rounded-sm opacity-30"
          style={{ backgroundColor: color }}
        />
      )}
      {action === 'underline' && (
        <svg
          className="absolute left-0 bottom-[-2px] w-full h-[6px] pointer-events-none overflow-visible"
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0 5 Q 25 0, 50 5 T 100 5"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
          />
        </svg>
      )}
      {children}
    </span>
  )
}

export function HighlighterDemo() {
  return (
    <div className="text-left mt-8 mb-12 px-0 py-4 max-w-2xl mx-0">
      <p className="text-[17px] lg:text-[19px] leading-relaxed text-neutral-600 font-medium">
        The{" "}
        <Highlighter action="underline" color="#FF9800">
          Magic UI Highlighter
        </Highlighter>{" "}
        makes important{" "}
        <Highlighter action="highlight" color="#87CEFA">
          text stand out
        </Highlighter>{" "}
        effortlessly on any dashboard.
      </p>
    </div>
  )
}
