const GlassCard = ({ children, className = '', hover = false, dark = false, ...props }) => (
  <div
    className={`
      ${dark
        ? 'bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10'
        : 'bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-[0_8px_60px_-12px_rgba(0,0,0,0.08)]'
      }
      ${hover ? 'hover:bg-white/60 hover:shadow-[0_12px_48px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 cursor-pointer' : ''}
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
)

export default GlassCard
