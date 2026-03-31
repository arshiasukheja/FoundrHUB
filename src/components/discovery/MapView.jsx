import { AnimatePresence, motion } from 'framer-motion'
import { Activity, Flame, TrendingUp } from 'lucide-react'
import StartupMarker from './StartupMarker'

const connections = [
  ['Delhi', 'Bengaluru'],
  ['Mumbai', 'Hyderabad']
]

const MapView = ({
  items,
  onSelect,
  selectedCity,
  selectedStartup,
  hotspots,
  cityMeta = {},
  liveStats = { active: 0, trendingCity: 'Delhi', weeklyDelta: 0 },
  empty
}) => {
  const hotspotLookup = hotspots.reduce((acc, item) => {
    acc[item.city] = item
    return acc
  }, {})

  const focusedHotspot = selectedStartup ? hotspotLookup[selectedStartup.city] : null
  const shiftX = focusedHotspot ? (50 - focusedHotspot.x) * 0.16 : 0
  const shiftY = focusedHotspot ? (50 - focusedHotspot.y) * 0.12 : 0

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="relative h-[520px] md:h-[620px] rounded-2xl border border-[#122056]/10 bg-white/92 overflow-hidden shadow-[0_18px_42px_rgba(18,32,86,0.10)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_6%,rgba(91,101,220,0.16),transparent_42%),radial-gradient(circle_at_92%_98%,rgba(18,32,86,0.1),transparent_42%),#FAFAFD]" />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${liveStats.active}-${liveStats.trendingCity}`}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="absolute left-4 top-4 z-20 flex flex-wrap items-center gap-2"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#122056]/12 bg-white/90 px-3 py-1.5 text-xs font-medium text-[#122056]">
            <Activity size={13} />
            {liveStats.active} startups active
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#122056]/12 bg-white/90 px-3 py-1.5 text-xs font-medium text-[#122056]">
            <TrendingUp size={13} />
            Trending in {liveStats.trendingCity}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#122056]/12 bg-white/90 px-3 py-1.5 text-xs font-medium text-emerald-700">
            +{liveStats.weeklyDelta} this week
          </span>
        </motion.div>
      </AnimatePresence>

      <motion.div
        animate={{ x: `${shiftX}%`, y: `${shiftY}%`, scale: focusedHotspot ? 1.03 : 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0">
          {hotspots.map((hotspot, index) => {
            const active = selectedStartup && selectedStartup.city === hotspot.city
            const scaleFactor = 70 + hotspot.intensity * 55
            return (
              <motion.div
                key={hotspot.city}
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(18px)' }}
                animate={{
                  opacity: active ? 0.56 : 0.34,
                  scale: active ? [1.05, 1.1, 1.05] : [1, 1.05, 1],
                  filter: ['blur(18px)', 'blur(20px)', 'blur(18px)']
                }}
                transition={{
                  delay: index * 0.08,
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  width: `${scaleFactor}px`,
                  height: `${scaleFactor}px`,
                  background: 'radial-gradient(circle, rgba(91,101,220,0.42) 0%, rgba(91,101,220,0.16) 46%, rgba(91,101,220,0) 82%)'
                }}
              />
            )
          })}
        </div>

        <svg viewBox="0 0 600 700" className="absolute inset-0 h-full w-full opacity-75" aria-hidden="true">
          <defs>
            <linearGradient id="indiaStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5B65DC" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#122056" stopOpacity="0.45" />
            </linearGradient>
            <linearGradient id="flowLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5B65DC" stopOpacity="0.06" />
              <stop offset="50%" stopColor="#5B65DC" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#122056" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          <path
            d="M284 46l52 22 28 36 42 16 30 40-8 34 18 34-14 28 14 42-20 40-36 18-20 46-34 14-38 52-48 12-26-32-54 4-26-28-44-14-10-34-38-30 8-44 30-28 6-42 22-22 2-52 34-26 14-36 42-6z"
            fill="#eef0ff"
            stroke="url(#indiaStroke)"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />

          {connections.map(([fromCity, toCity]) => {
            const from = hotspotLookup[fromCity]
            const to = hotspotLookup[toCity]
            if (!from || !to) {
              return null
            }

            const x1 = from.x * 6
            const y1 = from.y * 7
            const x2 = to.x * 6
            const y2 = to.y * 7

            return (
              <g key={`${fromCity}-${toCity}`}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#flowLine)"
                  strokeWidth="1.8"
                />
                <motion.line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#5B65DC"
                  strokeOpacity="0.5"
                  strokeWidth="1.1"
                  strokeDasharray="5 9"
                  animate={{ strokeDashoffset: [0, -56] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                />
              </g>
            )
          })}
        </svg>

        <div className="absolute inset-0">
          <AnimatePresence>
            {hotspots.map((hotspot, index) => {
              const active = selectedStartup && selectedStartup.city === hotspot.city
              return (
                <motion.div
                  key={hotspot.city}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: selectedStartup && !active ? 0.35 : 1, y: 0, scale: active ? 1.08 : 1 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ delay: index * 0.08, duration: 0.3, ease: 'easeOut' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                >
                  <span className={`relative inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium shadow-sm ${active ? 'border-[#5B65DC]/35 bg-white text-[#122056]' : 'border-[#122056]/12 bg-white/90 text-[#122056]'}`}>
                    <Flame size={11} className="text-[#5B65DC]" />
                    {hotspot.city}
                  </span>
                </motion.div>
              )
            })}
          </AnimatePresence>

          <AnimatePresence>
            {items.map((item, index) => (
              <StartupMarker
                key={item.id}
                item={item}
                delay={index * 0.08}
                onSelect={onSelect}
                cityMeta={cityMeta}
                isActive={selectedStartup?.id === item.id}
                isDimmed={Boolean(selectedStartup) && selectedStartup.city !== item.city}
              />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {selectedCity ? (
        <div className="absolute right-4 top-4 z-20 rounded-full border border-[#122056]/12 bg-white px-3 py-1.5 text-xs font-medium text-[#122056]">
          Focus: {selectedCity}
        </div>
      ) : null}

      {empty ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/72 backdrop-blur-[1px] px-6">
          <div className="rounded-2xl border border-[#122056]/12 bg-white px-6 py-5 text-center shadow-sm">
            <p className="text-[#122056] font-semibold">No startups found in this area</p>
            <p className="mt-1 text-sm text-[#122056]/70">Try removing a filter to discover more ecosystems.</p>
          </div>
        </div>
      ) : null}
    </motion.section>
  )
}

export default MapView
