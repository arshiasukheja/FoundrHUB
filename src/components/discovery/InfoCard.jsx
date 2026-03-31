import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const InfoCard = ({ startup, nearbyCity, similarStartups, onClose }) => {
  if (!startup) {
    return (
      <aside className="rounded-2xl border border-[#122056]/12 bg-white/92 p-4 md:p-5 shadow-[0_12px_35px_rgba(18,32,86,0.08)]">
        <p className="text-xs uppercase tracking-[0.15em] text-[#5B65DC] font-semibold">Live preview</p>
        <h3 className="mt-2 text-lg font-semibold text-[#122056]">Select a pin to inspect the ecosystem</h3>
        <p className="mt-2 text-sm text-[#122056]/75 leading-relaxed">
          Click any marker on the map to view startup context, traction stats, and quick actions.
        </p>
        <div className="mt-4 rounded-xl border border-[#122056]/10 bg-[#FAFAFD] p-3">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#122056]/60">Nearby ecosystem</p>
          <p className="mt-1 text-sm font-semibold text-[#122056]">{nearbyCity || 'Location not available'}</p>
        </div>
      </aside>
    )
  }

  const growthSeries = [
    Math.max(8, startup.growth - 10),
    Math.max(12, startup.growth - 6),
    Math.max(16, startup.growth - 3),
    startup.growth
  ]

  return (
    <AnimatePresence>
      {startup && (
        <motion.aside
          key={startup.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="rounded-2xl border border-[#122056]/12 bg-white/95 p-4 md:p-5 shadow-[0_12px_35px_rgba(18,32,86,0.12)]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-[#5B65DC] font-semibold">{startup.type}</p>
              <h3 className="mt-1 text-lg font-semibold text-[#122056]">{startup.name}</h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#122056]/15 px-2 py-1 text-xs text-[#122056]/70 hover:text-[#122056]"
            >
              Close
            </button>
          </div>

          <p className="mt-3 text-sm text-[#122056]/80 leading-relaxed">{startup.description}</p>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-[#122056]/10 bg-[#FAFAFD] px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#122056]/60">Category</p>
              <p className="mt-1 text-xs font-semibold text-[#122056]">{startup.category}</p>
            </div>
            <div className="rounded-xl border border-[#122056]/10 bg-[#FAFAFD] px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#122056]/60">City</p>
              <p className="mt-1 text-xs font-semibold text-[#122056]">{startup.city}</p>
            </div>
            <div className="rounded-xl border border-[#122056]/10 bg-[#FAFAFD] px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#122056]/60">Views</p>
              <p className="mt-1 text-xs font-semibold text-[#122056]">{startup.views}</p>
            </div>
            <div className="rounded-xl border border-[#122056]/10 bg-[#FAFAFD] px-3 py-2">
              <p className="text-[10px] uppercase tracking-[0.12em] text-[#122056]/60">Saves</p>
              <p className="mt-1 text-xs font-semibold text-[#122056]">{startup.saves}</p>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-[#122056]/10 bg-[#FAFAFD] px-3 py-2">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#122056]/60">Growth</p>
            <p className="mt-1 text-xs font-semibold text-emerald-600">+{startup.growth}% this month</p>
          </div>

          <div className="mt-3 rounded-xl border border-[#122056]/10 bg-[#FAFAFD] px-3 py-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#122056]/60">Mini growth chart</p>
            <div className="mt-2 flex items-end gap-1.5 h-14">
              {growthSeries.map((point, index) => (
                <motion.span
                  key={`${startup.id}-growth-${index}`}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.min(100, point * 2)}%` }}
                  transition={{ delay: index * 0.08, duration: 0.35, ease: 'easeOut' }}
                  className="flex-1 rounded-md bg-gradient-to-t from-[#5B65DC] to-[#122056]/30"
                />
              ))}
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-[#122056]/10 bg-[#FAFAFD] px-3 py-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#122056]/60">Similar startups</p>
            <div className="mt-2 space-y-1.5">
              {similarStartups.length > 0 ? (
                similarStartups.map((item) => (
                  <p key={item.id} className="text-xs text-[#122056]/80">{item.name} · {item.city}</p>
                ))
              ) : (
                <p className="text-xs text-[#122056]/60">No close matches under current filters.</p>
              )}
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-[#122056]/10 bg-[#FAFAFD] px-3 py-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#122056]/60">Nearby ecosystem</p>
            <p className="mt-1 text-xs font-semibold text-[#122056]">{nearbyCity || startup.city}</p>
          </div>

          <Link
            to="/explore"
            className="mt-4 inline-flex items-center rounded-full bg-[#122056] px-4 py-2 text-xs font-semibold text-[#FAFAFD] hover:bg-[#5B65DC] transition-colors"
          >
            View Startup
          </Link>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

export default InfoCard
