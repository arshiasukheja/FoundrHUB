/**
 * FoundrHUB — Founder Intelligence Engine v3
 * ============================================
 * Dynamically extracts incubator headers and maps them
 * to Punjab cities. Computes strategic ecosystem KPIs,
 * sector diversity, geographic distribution, whitespace
 * opportunities, cluster analysis, and investor-grade
 * weekly recommendations.
 *
 * Incubator → City mapping (resolved dynamically):
 *   Chitkara         → Chandigarh
 *   STPI             → Mohali
 *   Thapar / STEP    → Patiala
 *   DBU              → Mandi Gobindgarh
 *   PAU              → Ludhiana
 *   PCTE             → Ludhiana
 *   GNDEC            → Ludhiana
 */

/* ── Punjab Incubator → City resolver ─────────────────────────────────────── */
const INCUBATOR_CITY_RULES = [
  { keyword: 'chitkara',  city: 'Chandigarh' },
  { keyword: 'stpi',      city: 'Mohali' },
  { keyword: 'thapar',    city: 'Patiala' },
  { keyword: 'step-tiet', city: 'Patiala' },
  { keyword: 'step tiet', city: 'Patiala' },
  { keyword: 'dbu',       city: 'Mandi Gobindgarh' },
  { keyword: 'desh bhagat', city: 'Mandi Gobindgarh' },
  { keyword: 'pau',       city: 'Ludhiana' },
  { keyword: 'pcte',      city: 'Ludhiana' },
  { keyword: 'gndec',     city: 'Ludhiana' },
]

/**
 * Resolve city for a startup based on incubator name.
 * Falls back to the startup's own `city` field if no rule matches.
 */
export function resolveCityFromIncubator(incubatorName) {
  if (!incubatorName) return null
  const lower = incubatorName.toLowerCase()
  for (const rule of INCUBATOR_CITY_RULES) {
    if (lower.includes(rule.keyword)) return rule.city
  }
  return null
}

/* ── Region helper ── */
const regionFor = (state) => {
  const map = {
    'Punjab': 'North India', 'Haryana': 'North India', 'Delhi': 'North India',
    'Uttar Pradesh': 'North India', 'Rajasthan': 'North India',
    'Maharashtra': 'West India', 'Gujarat': 'West India',
    'Karnataka': 'South India', 'Tamil Nadu': 'South India',
    'Kerala': 'South India', 'Telangana': 'South India',
    'West Bengal': 'East India', 'Odisha': 'East India',
    'Bihar': 'East India', 'Assam': 'Northeast India',
    'Madhya Pradesh': 'Central India',
  }
  return map[state] || 'Other'
}

/* ── Short incubator label for display ── */
function shortIncubator(name) {
  if (!name) return '—'
  if (name.length <= 30) return name
  // Try to extract the core name
  const lower = name.toLowerCase()
  if (lower.includes('chitkara')) return 'Chitkara Innovation Incubator'
  if (lower.includes('thapar') || lower.includes('step-tiet')) return 'Venture Lab, Thapar'
  if (lower.includes('stpi')) return 'STPI Mohali'
  if (lower.includes('pau')) return 'PAU Ludhiana'
  if (lower.includes('pcte')) return 'PCTE Ludhiana'
  if (lower.includes('gndec')) return 'GNDEC Ludhiana'
  if (lower.includes('dbu') || lower.includes('desh bhagat')) return 'DBU Incubation Centre'
  return name.slice(0, 30) + '…'
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN INTELLIGENCE FUNCTION
   ═══════════════════════════════════════════════════════════════════════════ */

export function computeFounderIntelligence(startups = []) {
  const total = startups.length

  // ── Pre-process: resolve city from incubator if needed ─────────────────
  const resolved = startups.map((s) => {
    const resolvedCity = resolveCityFromIncubator(s.incubator)
    return {
      ...s,
      city: resolvedCity || s.city || 'Unknown',
    }
  })

  // ── 1. City distribution ──────────────────────────────────────────────────
  const cityMap = {}
  resolved.forEach((s) => {
    const c = s.city
    cityMap[c] = (cityMap[c] || 0) + 1
  })
  const cityDistribution = Object.entries(cityMap)
    .map(([city, count]) => ({ city, count, pct: ((count / total) * 100).toFixed(1) }))
    .sort((a, b) => b.count - a.count)

  // ── 2. Incubator ranking ──────────────────────────────────────────────────
  const incMap = {}
  resolved.forEach((s) => {
    const inc = s.incubator || 'Unknown'
    if (!incMap[inc]) incMap[inc] = { count: 0, cities: new Set(), states: new Set() }
    incMap[inc].count++
    incMap[inc].cities.add(s.city)
    incMap[inc].states.add(s.state)
  })
  const incubatorRanking = Object.entries(incMap)
    .map(([name, v]) => ({
      name,
      shortName: shortIncubator(name),
      startups: v.count,
      cities: [...v.cities],
      states: [...v.states],
      density: v.count / v.cities.size,
    }))
    .sort((a, b) => b.startups - a.startups)

  // ── 3. Sector distribution ────────────────────────────────────────────────
  const sectorMap = {}
  resolved.forEach((s) => {
    const sec = s.sector || 'Uncategorised'
    if (!sectorMap[sec]) sectorMap[sec] = { count: 0, startups: [], cities: new Set() }
    sectorMap[sec].count++
    sectorMap[sec].startups.push(s.name)
    sectorMap[sec].cities.add(s.city)
  })
  const sectorDistribution = Object.entries(sectorMap)
    .map(([sector, v]) => ({
      sector, count: v.count,
      pct: ((v.count / total) * 100).toFixed(1),
      startups: v.startups,
      cities: [...v.cities],
    }))
    .sort((a, b) => b.count - a.count)

  // Sector diversity index (Simpson's, 0→1)
  const sectorDiversityRaw = 1 - sectorDistribution.reduce((sum, s) => {
    const p = s.count / total
    return sum + (p * p)
  }, 0)
  const sectorDiversity = (sectorDiversityRaw * 100).toFixed(0)
  const uniqueSectors = sectorDistribution.length

  // ── 4. Ecosystem clusters (city × incubator) ─────────────────────────────
  const clusterKey = (s) => `${s.city}::${s.incubator}`
  const clusterMap = {}
  resolved.forEach((s) => {
    const k = clusterKey(s)
    if (!clusterMap[k]) clusterMap[k] = {
      city: s.city, state: s.state, incubator: s.incubator,
      shortIncubator: shortIncubator(s.incubator),
      startups: [], region: regionFor(s.state), sectors: new Set()
    }
    clusterMap[k].startups.push({ id: s.id, name: s.name, sector: s.sector })
    clusterMap[k].sectors.add(s.sector)
  })
  const ecosystemClusters = Object.values(clusterMap)
    .map((c) => ({ ...c, count: c.startups.length, sectorCount: c.sectors.size, sectors: [...c.sectors] }))
    .sort((a, b) => b.count - a.count)

  // ── 5. Whitespace opportunities ───────────────────────────────────────────
  const allPossibleSectors = [
    'FinTech', 'HealthTech', 'EdTech', 'AgriTech', 'CleanTech',
    'AI / ML', 'IoT / Hardware', 'Logistics', 'D2C / E-Commerce',
    'SaaS', 'Gaming', 'SpaceTech', 'Blockchain', 'Cybersecurity',
    'Social Impact', 'Media & Entertainment', 'LegalTech', 'PropTech',
    'FoodTech', 'General Tech'
  ]
  const presentSectors = new Set(Object.keys(sectorMap))
  const whitespaceOpportunities = allPossibleSectors
    .filter((s) => !presentSectors.has(s))
    .map((sector) => ({
      sector,
      opportunity: 'High',
      reason: `No startups currently in ${sector} — first-mover advantage in this ecosystem.`,
      action: `Build or pivot into ${sector} to capture untapped incubator support and investor interest.`
    }))

  const underservedSectors = sectorDistribution
    .filter((s) => s.count <= 3 && s.sector !== 'Uncategorised' && s.sector !== 'General Tech')
    .map((s) => ({
      sector: s.sector,
      count: s.count,
      opportunity: s.count <= 1 ? 'Very High' : 'Moderate',
      reason: `Only ${s.count} startup${s.count > 1 ? 's' : ''} in ${s.sector} — underserved within an ecosystem of ${total}.`,
      action: `Cross-pollinate: connect ${s.sector} founders with the larger General Tech cluster for GTM partnerships.`
    }))

  // ── 6. Collaboration recommendations (geography-aware) ────────────────────
  // With mostly General Tech sector data, we match by cross-city/cross-incubator
  const collabRecommendations = []
  for (let i = 0; i < resolved.length && collabRecommendations.length < 8; i++) {
    for (let j = i + 1; j < resolved.length && collabRecommendations.length < 8; j++) {
      const a = resolved[i], b = resolved[j]
      const diffCity = a.city !== b.city
      const diffIncubator = a.incubator !== b.incubator
      const secA = a.sector || 'General Tech', secB = b.sector || 'General Tech'
      const complementarySector = secA !== secB && secA !== 'General Tech' && secB !== 'General Tech'

      // Priority: cross-city pairs, then cross-incubator, then complementary sectors
      if (diffCity && diffIncubator) {
        collabRecommendations.push({
          startupA: { id: a.id, name: a.name, sector: secA, city: a.city, incubator: shortIncubator(a.incubator) },
          startupB: { id: b.id, name: b.name, sector: secB, city: b.city, incubator: shortIncubator(b.incubator) },
          reason: `Cross-city match: ${a.city} (${shortIncubator(a.incubator)}) ↔ ${b.city} (${shortIncubator(b.incubator)}) — geographic reach expansion.`,
          action: `Set up a virtual intro call. Cross-city collaboration can unlock combined ${a.city} + ${b.city} market access.`,
          strength: 'Strong',
          type: 'cross-city',
        })
      } else if (complementarySector) {
        collabRecommendations.push({
          startupA: { id: a.id, name: a.name, sector: secA, city: a.city, incubator: shortIncubator(a.incubator) },
          startupB: { id: b.id, name: b.name, sector: secB, city: b.city, incubator: shortIncubator(b.incubator) },
          reason: `Sector synergy: ${secA} × ${secB} under shared incubator ecosystem.`,
          action: `Both are in ${a.city} — schedule a co-working session for joint product integration.`,
          strength: 'Moderate',
          type: 'sector-match',
        })
      }
    }
  }

  // ── 7. Suggested connections (diverse geography) ───────────────────────────
  // Pick one from each city for geographic diversity
  const seenCities = new Set()
  const suggestedConnections = []
  
  // First pass: one per city
  for (const s of resolved) {
    if (suggestedConnections.length >= 6) break
    if (!seenCities.has(s.city) && s.verified) {
      seenCities.add(s.city)
      suggestedConnections.push({
        id: s.id, name: s.name, city: s.city, incubator: s.incubator,
        shortIncubator: shortIncubator(s.incubator),
        sector: s.sector || 'General Tech', tags: s.tags || [],
        reason: `Verified startup in ${s.city} (${shortIncubator(s.incubator)}) — expand your Punjab network.`,
        action: `Reach out via FoundrHUB to explore co-building opportunities.`,
      })
    }
  }
  // Fill remaining slots with interesting candidates
  for (const s of resolved) {
    if (suggestedConnections.length >= 6) break
    if (!suggestedConnections.find(c => c.id === s.id) && s.verified) {
      suggestedConnections.push({
        id: s.id, name: s.name, city: s.city, incubator: s.incubator,
        shortIncubator: shortIncubator(s.incubator),
        sector: s.sector || 'General Tech', tags: s.tags || [],
        reason: `Verified startup in ${s.city} (${shortIncubator(s.incubator)}) — strategic partnership potential.`,
        action: `Reach out via FoundrHUB to explore co-building opportunities.`,
      })
    }
  }

  // ── 8. Weekly AI recommendations ──────────────────────────────────────────
  const cofounderSeekers = resolved.filter((s) => s.looking_for_cofounder)
  const weeklyRecommendations = generateWeeklyRecommendations({
    total, cityDistribution, incubatorRanking, sectorDistribution,
    whitespaceOpportunities, underservedSectors, collabRecommendations,
    cofounderSeekers, ecosystemClusters, sectorDiversity, uniqueSectors,
  })

  // ── 9. Strategic KPIs ─────────────────────────────────────────────────────
  const topSector = sectorDistribution[0] || { sector: '—', count: 0, pct: '0' }
  const topCluster = ecosystemClusters[0] || { city: '—', count: 0 }
  const topIncubator = incubatorRanking[0] || { name: '—', startups: 0 }
  const incConcentration = total > 0 ? ((topIncubator.startups / total) * 100).toFixed(0) : 0

  // Best expansion signal — city with lowest density (room to grow)
  const expansionSignal = cityDistribution.length > 1
    ? cityDistribution[cityDistribution.length - 1]
    : { city: 'New cities needed', count: 0 }

  const kpis = {
    totalStartups: total,
    totalCities: cityDistribution.length,
    totalIncubators: incubatorRanking.length,
    topSector: topSector.sector,
    topSectorCount: topSector.count,
    topSectorPct: topSector.pct,
    sectorDiversity: `${sectorDiversity}%`,
    uniqueSectors,
    whitespaceCount: whitespaceOpportunities.length,
    strongestCluster: `${topCluster.city} (${topCluster.count})`,
    strongestClusterCity: topCluster.city,
    strongestClusterCount: topCluster.count,
    expansionSignal: expansionSignal.city,
    expansionSignalCount: expansionSignal.count,
    incConcentration: `${incConcentration}%`,
    topIncubatorName: topIncubator.name,
    topIncubatorShort: shortIncubator(topIncubator.name),
  }

  return {
    kpis,
    cityDistribution,
    incubatorRanking,
    ecosystemClusters,
    sectorDistribution,
    whitespaceOpportunities,
    underservedSectors,
    collabRecommendations,
    suggestedConnections,
    weeklyRecommendations,
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   WEEKLY RECOMMENDATIONS GENERATOR
   ═══════════════════════════════════════════════════════════════════════════ */

function generateWeeklyRecommendations(data) {
  const recs = []

  // Geographic diversity insight
  if (data.cityDistribution.length >= 2) {
    const cities = data.cityDistribution.map(c => c.city).join(', ')
    recs.push({
      type: 'geography', icon: '🗺️',
      title: `Active across ${data.cityDistribution.length} Punjab cities — ${cities}`,
      description: `Geographic spread across multiple incubators creates a robust, decentralized ecosystem. Cross-city partnerships amplify regional market access.`,
      action: `Explore cross-city collaboration — founders in different cities can capture diverse customer bases.`,
      priority: 'High',
    })
  }

  // Strongest cluster
  if (data.ecosystemClusters.length > 0) {
    const top = data.ecosystemClusters[0]
    recs.push({
      type: 'ecosystem', icon: '🏙️',
      title: `${top.city} leads with ${top.count} startups under ${shortIncubator(top.incubator)}`,
      description: `This concentrated cluster creates a powerful network effect. Founders here benefit from peer density, shared mentorship, and accelerated deal flow.`,
      action: `Apply to ${shortIncubator(top.incubator)} for maximum ecosystem leverage in ${top.region}.`,
      priority: 'High',
    })
  }

  // Multi-incubator insight
  if (data.incubatorRanking.length >= 3) {
    recs.push({
      type: 'network', icon: '🔗',
      title: `${data.incubatorRanking.length} active incubators — inter-incubator collaboration is untapped`,
      description: `Most founders network only within their incubator. Cross-incubator partnerships (e.g., Chitkara × Thapar × STPI) can unlock combined expertise, mentorship, and market access.`,
      action: `Attend cross-incubator demo days or co-organize a Punjab Startup Connect event.`,
      priority: 'High',
    })
  }

  // Whitespace
  if (data.whitespaceOpportunities.length >= 3) {
    const top3 = data.whitespaceOpportunities.slice(0, 3)
    recs.push({
      type: 'whitespace', icon: '🎯',
      title: `${data.whitespaceOpportunities.length} untapped sectors — zero competition in ${top3.map(w => w.sector).join(', ')}`,
      description: `These sectors have no representation. Building here means first-mover advantage with immediate incubator attention and investor curiosity.`,
      action: `Validate your idea in one of these sectors. Use FoundrHUB Analyser to get a reality check before pitching.`,
      priority: 'Critical',
    })
  }

  // Sector diversity
  if (data.sectorDiversity) {
    const div = parseInt(data.sectorDiversity)
    recs.push({
      type: 'diversity', icon: '📊',
      title: `Sector diversity score: ${data.sectorDiversity}% across ${data.uniqueSectors} verticals`,
      description: div < 60
        ? `Low diversity signals heavy concentration risk. The ecosystem needs more sector variety for healthy growth.`
        : `Healthy diversity indicates a maturing ecosystem. Cross-sector collaboration potential is high.`,
      action: div < 60
        ? `Differentiate aggressively — avoid crowded sectors and explore adjacent whitespace verticals.`
        : `Leverage cross-sector partnerships to create compound market advantages.`,
      priority: div < 60 ? 'Critical' : 'Medium',
    })
  }

  // Expansion signal
  if (data.cityDistribution.length > 1) {
    const smallest = data.cityDistribution[data.cityDistribution.length - 1]
    const largest = data.cityDistribution[0]
    recs.push({
      type: 'expansion', icon: '📍',
      title: `${smallest.city} (${smallest.count}) vs ${largest.city} (${largest.count}) — expansion opportunity`,
      description: `${smallest.city} has room to grow. Incubators in emerging cities often offer better terms, more attention, and less competition for the same support infrastructure.`,
      action: `If you're in a saturated city, consider applying to incubators in ${smallest.city} for differentiated positioning.`,
      priority: 'Medium',
    })
  }

  // Concentration risk
  const topSector = data.sectorDistribution[0]
  if (topSector && parseFloat(topSector.pct) > 25) {
    recs.push({
      type: 'risk', icon: '⚠️',
      title: `${topSector.sector} holds ${topSector.pct}% of all startups — concentration risk`,
      description: `Over-concentration increases competitive pressure and dilutes differentiation for startups in this sector.`,
      action: `If you're in ${topSector.sector}, carve a niche vertical or pivot to adjacent whitespace sectors.`,
      priority: 'Medium',
    })
  }

  // Trust baseline
  recs.push({
    type: 'trust', icon: '✅',
    title: `${data.total} startups tracked across ${data.cityDistribution.length} cities and ${data.incubatorRanking.length} incubators`,
    description: `Verified data points ensure high-confidence recommendations. The intelligence layer refreshes as new startups join the ecosystem.`,
    action: `Complete your startup verification this week to unlock premium visibility and matching.`,
    priority: 'Medium',
  })

  return recs
}
