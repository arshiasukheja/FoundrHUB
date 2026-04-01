import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

const pinColors = {
  Startup: '#5B65DC',
  'D2C brand': '#2563eb',
  'Student founder': '#7c3aed',
  'Startup cafe': '#ea580c',
  'Coworking space': '#0891b2',
  'Startup event': '#dc2626',
  'College startup': '#16a34a'
}

const StartupMarker = ({ item, delay = 0, onSelect, cityMeta, isActive, isDimmed }) => {
  const cityInfo = cityMeta[item.city] || { count: 1, trending: false }

  return (
    <motion.button
      initial={{ opacity: 0, y: 8, scale: 0.8 }}
      animate={{ opacity: isDimmed ? 0.3 : 1, y: 0, scale: isActive ? 1.08 : 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.86 }}
      transition={{ delay, duration: 0.35, ease: 'easeOut' }}
      whileHover={{ scale: 1.2 }}
      onClick={() => onSelect(item)}
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${item.x}%`, top: `${item.y}%` }}
      aria-label={item.name}
    >
      <motion.span
        aria-hidden="true"
        animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-3 rounded-full"
        style={{ background: `${pinColors[item.type] || pinColors.Startup}22` }}
      />

      <span
        className="relative block h-3.5 w-3.5 rounded-full border border-white shadow-[0_0_0_4px_rgba(91,101,220,0.2)]"
        style={{ background: pinColors[item.type] || pinColors.Startup }}
      />

      <motion.div
        initial={{ opacity: 0, y: 4 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="pointer-events-none absolute left-1/2 top-5 z-10 min-w-[170px] -translate-x-1/2 rounded-lg border border-[#122056]/12 bg-white px-2.5 py-2 text-left shadow-md"
      >
        <p className="text-[11px] font-semibold text-[#122056] leading-tight">{item.city} · {cityInfo.count} startups</p>
        <p className="text-[10px] text-[#122056]/65 mt-0.5">{item.name} · {item.type}</p>
        {cityInfo.trending ? (
          <p className="mt-1 inline-flex items-center gap-1 text-[10px] text-[#5B65DC] font-medium">
            <Flame size={10} />
            Trending
          </p>
        ) : null}
      </motion.div>
    </motion.button>
  )
}

export default StartupMarker
