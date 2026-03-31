import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'

const types = ['Startup', 'D2C brand', 'Student founder', 'Startup cafe', 'Coworking space', 'Startup event', 'College startup']

const FilterPanel = ({
  cities,
  colleges,
  filters,
  onChange,
  onToggleCategory,
  onToggleFlag,
  nearbyCity,
  trendingCities,
  resultCount
}) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="rounded-2xl border border-[#122056]/10 bg-white/90 p-4 md:p-5 shadow-[0_12px_35px_rgba(18,32,86,0.08)]"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.16em] font-semibold text-[#122056]/65">Filters</p>
        <span className="text-xs rounded-full bg-[#122056]/10 px-2 py-1 text-[#122056] font-medium">{resultCount} results found</span>
      </div>

      <div className="mt-4 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-[#122056]">City</span>
          <select
            value={filters.city}
            onChange={(event) => onChange('city', event.target.value)}
            className="mt-2 w-full rounded-xl border border-[#122056]/15 bg-white px-3 py-2 text-sm text-[#122056]"
          >
            <option value="">All cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-[#122056]">College</span>
          <select
            value={filters.college}
            onChange={(event) => onChange('college', event.target.value)}
            className="mt-2 w-full rounded-xl border border-[#122056]/15 bg-white px-3 py-2 text-sm text-[#122056]"
          >
            <option value="">All colleges</option>
            {colleges.map((college) => (
              <option key={college} value={college}>{college}</option>
            ))}
          </select>
        </label>

        <div>
          <span className="text-sm font-medium text-[#122056]">Category</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {types.map((type) => {
              const active = filters.categories.includes(type)
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onToggleCategory(type)}
                  className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${active ? 'border-[#5B65DC]/35 bg-[#5B65DC]/12 text-[#122056]' : 'border-[#122056]/15 bg-white text-[#122056]/70 hover:text-[#122056]'}`}
                >
                  {type}
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-2.5">
          {[
            { key: 'womenLed', label: 'Women-led' },
            { key: 'verifiedOnly', label: 'Verified only' },
            { key: 'trendingNearby', label: 'Trending nearby' }
          ].map((flag) => (
            <button
              key={flag.key}
              type="button"
              onClick={() => onToggleFlag(flag.key)}
              className="w-full rounded-xl border border-[#122056]/12 bg-[#FAFAFD] px-3 py-2.5 text-left flex items-center justify-between"
            >
              <span className="text-sm text-[#122056]">{flag.label}</span>
              <span className={`h-5 w-9 rounded-full p-0.5 transition-colors ${filters[flag.key] ? 'bg-[#5B65DC]' : 'bg-[#122056]/20'}`}>
                <span className={`block h-4 w-4 rounded-full bg-white transition-transform ${filters[flag.key] ? 'translate-x-4' : 'translate-x-0'}`} />
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-[#122056]/10 bg-[#FAFAFD] p-3">
        <p className="text-xs font-semibold text-[#122056]">Discovery Layers</p>
        {nearbyCity ? <p className="mt-1 text-xs text-[#122056]/70">Nearby ecosystem: {nearbyCity}</p> : <p className="mt-1 text-xs text-[#122056]/70">Enable location for nearby discovery.</p>}
        <div className="mt-2 space-y-1">
          {trendingCities.slice(0, 3).map((city) => (
            <p key={city} className="text-xs text-[#122056]/75 inline-flex items-center gap-1.5"><Flame size={12} /> Trending in {city}</p>
          ))}
        </div>
      </div>
    </motion.aside>
  )
}

export default FilterPanel
