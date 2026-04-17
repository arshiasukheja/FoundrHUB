export const investorStartups = [
  { id: 's1', name: 'FlowMint', sector: 'SaaS', city: 'Bengaluru', growth: 32, readiness: 91, traction: 'Series A', tags: ['High Potential', 'Trending'], revenue: '$42K MRR', users: '12.4K users', consistency: 86, trend: 'Improving' },
  { id: 's2', name: 'VedaCare', sector: 'HealthTech', city: 'Delhi', growth: 28, readiness: 84, traction: 'Seed', tags: ['Undervalued'], revenue: '$18K MRR', users: '7.1K users', consistency: 79, trend: 'Stable' },
  { id: 's3', name: 'TerraFleet', sector: 'Climate Tech', city: 'Bengaluru', growth: 41, readiness: 95, traction: 'Pre-Series A', tags: ['Top 5%', 'Trending'], revenue: '$61K MRR', users: '18.9K users', consistency: 92, trend: 'Improving' },
  { id: 's4', name: 'OrbitPay', sector: 'Fintech', city: 'Mumbai', growth: 24, readiness: 78, traction: 'Seed+', tags: ['High Potential'], revenue: '$34K MRR', users: '10.2K users', consistency: 74, trend: 'Improving' },
  { id: 's5', name: 'LensCopilot', sector: 'AI / SaaS', city: 'Bengaluru', growth: 19, readiness: 69, traction: 'Angel', tags: ['Undervalued', 'Watchlist'], revenue: '$9K MRR', users: '4.8K users', consistency: 67, trend: 'Declining' },
  { id: 's6', name: 'AstraGrid', sector: 'Enterprise AI', city: 'Pune', growth: 36, readiness: 88, traction: 'Seed', tags: ['Trending'], revenue: '$27K MRR', users: '9.6K users', consistency: 85, trend: 'Improving' },
  { id: 's7', name: 'GreenRoute', sector: 'Logistics', city: 'Chennai', growth: 17, readiness: 73, traction: 'Pre-Seed', tags: ['Undervalued'], revenue: '$11K MRR', users: '3.2K users', consistency: 72, trend: 'Stable' },
  { id: 's8', name: 'KiraSkin', sector: 'D2C Beauty', city: 'Jaipur', growth: 22, readiness: 76, traction: 'Seed', tags: ['High Potential'], revenue: '$16K MRR', users: '6.4K users', consistency: 78, trend: 'Improving' }
]

export const investorFilterOptions = {
  industry: ['All', 'SaaS', 'HealthTech', 'Climate Tech', 'Fintech', 'AI / SaaS', 'Enterprise AI', 'Logistics', 'D2C Beauty'],
  city: ['All', 'Bengaluru', 'Delhi', 'Mumbai', 'Pune', 'Chennai', 'Jaipur'],
  traction: ['All', 'Angel', 'Pre-Seed', 'Seed', 'Seed+', 'Pre-Series A', 'Series A'],
  funding: ['All', '0-1M', '1M-5M', '5M+']
}

export const investorCitySignals = [
  { city: 'Bengaluru', density: 94, investorActivity: 91, opportunity: 'Deep tech + SaaS cluster' },
  { city: 'Mumbai', density: 78, investorActivity: 88, opportunity: 'Fintech and distribution' },
  { city: 'Delhi', density: 71, investorActivity: 76, opportunity: 'Health, consumer, and B2B' },
  { city: 'Pune', density: 63, investorActivity: 58, opportunity: 'Enterprise tooling' },
  { city: 'Chennai', density: 55, investorActivity: 49, opportunity: 'Supply chain intelligence' },
  { city: 'Jaipur', density: 47, investorActivity: 38, opportunity: 'D2C and premium local brands' }
]

export const investorDealInbox = [
  { id: 'd1', founder: 'Ananya Sharma', startup: 'AstraGrid', note: 'Requesting intro on enterprise AI pricing pilot.', status: 'pending', score: 89 },
  { id: 'd2', founder: 'Arjun Desai', startup: 'OrbitPay', note: 'Shared a fresh runway update and compliance plan.', status: 'pending', score: 81 },
  { id: 'd3', founder: 'Meera Patel', startup: 'GreenRoute', note: 'Seeking strategic investor on logistics expansion.', status: 'saved', score: 76 }
]

export const investorMemoTemplate = {
  problem: 'The startup solves a clear, expensive, recurring pain point with visible urgency.',
  solution: 'The product shortens workflow time, reduces manual work, and improves measurable outcomes.',
  market: 'The market is large enough to support venture-scale growth with strong expansion potential.',
  traction: 'Growth signals are positive and the startup shows compounding execution velocity.',
  risks: 'Execution, distribution, and competitive pressure should be monitored closely.'
}

export const investorNavItems = [
  { id: 'decision', label: 'Decision Dashboard', route: '/dashboard/investor' },
  { id: 'discovery', label: 'Discovery Feed', route: '/dashboard/investor/discovery' },
  { id: 'dealflow', label: 'AI Deal Flow', route: '/dashboard/investor/deal-flow' },
  { id: 'watchlist', label: 'Watchlist', route: '/dashboard/investor/watchlist' },
  { id: 'traction', label: 'Traction', route: '/dashboard/investor/traction' },
  { id: 'consistency', label: 'Consistency', route: '/dashboard/investor/consistency' },
  { id: 'memo', label: 'Memo Generator', route: '/dashboard/investor/memo' },
  { id: 'inbox', label: 'Deal Inbox', route: '/dashboard/investor/inbox' },
  { id: 'city', label: 'City Intelligence', route: '/dashboard/investor/city' }
]

export const investorWatchlistSeed = ['s1', 's3', 's6']
