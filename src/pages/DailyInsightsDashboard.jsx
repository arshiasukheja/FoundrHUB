import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock3, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

const newsFeed = [
  {
    headline: 'Seed funding for AI tooling startups jumps across Bengaluru and Pune',
    summary: 'Investors are backing workflow automation, copilots, and developer tooling as enterprise adoption keeps rising.',
    category: 'Funding',
    time: '12m ago',
  },
  {
    headline: 'Consumer brands using community-led growth are outperforming paid acquisition',
    summary: 'D2C teams are shifting budget into creator loops, retention, and repeat purchase programs instead of pure ads.',
    category: 'Growth',
    time: '31m ago',
  },
  {
    headline: 'Mobility and logistics founders report faster pilot conversions in Tier 2 cities',
    summary: 'Operational startups are seeing better unit economics as smaller markets adopt digital tools faster than expected.',
    category: 'Market',
    time: '1h ago',
  },
  {
    headline: 'New product teams are packaging AI features into simpler customer-facing workflows',
    summary: 'The strongest launches are not pure AI. They are practical products that remove friction for everyday users.',
    category: 'Tech',
    time: '2h ago',
  },
]

const trendingStartups = [
  { name: 'FlowMint', growth: '+42%', sector: 'Fintech', reason: 'New SME onboarding feature is driving repeat usage.' },
  { name: 'TerraFleet', growth: '+37%', sector: 'Climate / Logistics', reason: 'Expansion into two new cities improved traction quickly.' },
  { name: 'NexaCare', growth: '+29%', sector: 'HealthTech', reason: 'Founder-led partnerships boosted inbound demand.' },
]

const marketInsights = [
  'Fintech funding is up 30% this week.',
  'D2C market growth is slowing, but retention-heavy brands are holding up.',
  'AI-native tools continue to attract the fastest seed rounds.',
]

const investorActivity = [
  { label: 'Recent funding rounds', value: '14 closed this week' },
  { label: 'Active sectors', value: 'Fintech, AI, Climate Tech' },
  { label: 'Top investors', value: 'Accel, Peak XV, Elevation' },
]

const personalizedTags = ['Startups', 'Industries', 'Cities', 'Fintech', 'AI', 'Bengaluru', 'Pune', 'SaaS']

const DailyInsightsDashboard = () => {
  const { user } = useAuth()
  const role = user?.role === 'investor' ? 'investor' : 'founder'

  const quickActions = useMemo(() => [
    { label: 'Explore startups', to: '/explore' },
    { label: 'View AI insights', to: '/analyser' },
    role === 'investor'
      ? { label: 'Go to portfolio', to: '/dashboard/investor' }
      : { label: 'Submit startup', to: '/verify' },
  ], [role])

  const topStats = [
    { label: 'Funding momentum', value: '8.93%' },
    { label: 'News this week', value: '12.6K' },
    { label: 'Active sectors', value: '16+' },
    { label: 'Top investors live', value: '12+' },
  ]

  return (
    <div className="min-h-screen bg-[#ECEDEE] text-[#101B35]">
      <Navbar />
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8 pt-28 pb-6 lg:pb-8">

        <section className="mt-8 relative">
          <div className="relative grid lg:grid-cols-[1.18fr_0.82fr] gap-8 items-start">
            <div className="bg-white rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.08)] border border-black/5 p-4 lg:p-6">
              <div className="flex items-center justify-between border-b border-black/5 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6159]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2ACB43]" />
                </div>
                <p className="text-xs text-[#101B35]/45">foundrhub.com/daily-insights</p>
              </div>

              <div className="pt-6">
                <p className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#1F5B75]">FoundrHUB Intelligence</p>
                <h1 className="mt-3 text-[clamp(1.8rem,3.5vw,2.75rem)] leading-[1.1] font-semibold max-w-[16ch]">
                  Daily startup signal board for smarter market decisions.
                </h1>
                <div className="mt-5 flex items-center gap-3">
                  <Link to="/explore" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#17847C] text-white text-sm font-semibold">
                    Explore Startups <ArrowRight size={14} />
                  </Link>
                  <span className="inline-flex items-center gap-1 text-xs text-[#101B35]/55">
                    <Clock3 size={14} /> Updated now
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-xl overflow-hidden border border-black/5">
                <img
                  src="https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=1400&auto=format&fit=crop"
                  alt="Market intelligence visual"
                  className="w-full h-56 lg:h-64 object-cover"
                />
              </div>

              <div className="mt-6 grid md:grid-cols-[0.8fr_1.2fr] gap-4">
                <h2 className="text-3xl font-semibold leading-[1.1]">Get to know the market more</h2>
                <div className="text-sm text-[#101B35]/72 space-y-3 leading-relaxed">
                  <p>
                    News-first intelligence for founders and investors. Track funding shifts, startup momentum, and sector heat in one clean view.
                  </p>
                  <p>
                    Use this page as your daily briefing before portfolio calls, deal screening, and execution planning.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {topStats.map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl border border-black/5 p-3">
                    <p className="text-lg font-bold">{stat.value}</p>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[#101B35]/45 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl overflow-hidden border border-black/5 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop"
                  alt="Trending city buildings"
                  className="w-full h-44 object-cover"
                />
              </div>

              <div className="bg-white rounded-xl border border-black/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#1F5B75]">Investor Activity</p>
                <div className="mt-3 space-y-2">
                  {investorActivity.map((item) => (
                    <div key={item.label} className="flex items-start justify-between gap-3 border-b border-black/5 pb-2 last:border-0 last:pb-0">
                      <p className="text-sm text-[#101B35]/65">{item.label}</p>
                      <p className="text-sm font-semibold text-right">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-black/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#1F5B75]">Trending Startups</p>
                <div className="mt-3 space-y-3">
                  {trendingStartups.map((item) => (
                    <div key={item.name} className="rounded-lg border border-black/5 p-3 bg-[#F9FAFB]">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm font-bold text-emerald-600">{item.growth}</p>
                      </div>
                      <p className="text-xs uppercase tracking-[0.12em] mt-1 text-[#101B35]/50">{item.sector}</p>
                      <p className="text-sm mt-1 text-[#101B35]/70">{item.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
          <div className="bg-white rounded-2xl border border-black/5 p-5 lg:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#1F5B75]">Daily Startup News Feed</p>
                <h3 className="text-2xl font-semibold mt-2">News-first market brief</h3>
              </div>
              <span className="text-xs font-semibold text-[#101B35]/55">Twitter x Bloomberg style</span>
            </div>

            <div className="mt-5 space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {newsFeed.map((item) => (
                <article key={item.headline} className="rounded-xl border border-black/5 bg-[#FBFBFC] p-4">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] font-bold">
                    <span className="px-2 py-1 rounded-full bg-[#DFEEF5] text-[#1F5B75]">{item.category}</span>
                    <span className="text-[#101B35]/45">{item.time}</span>
                  </div>
                  <h4 className="text-[17px] leading-snug font-semibold mt-3">{item.headline}</h4>
                  <p className="text-sm mt-2 text-[#101B35]/68 leading-relaxed">{item.summary}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-[#0E1538] text-white rounded-2xl p-5 border border-black/10">
              <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-white/60">AI Market Insights</p>
              <div className="mt-3 space-y-2.5">
                {marketInsights.map((insight) => (
                  <div key={insight} className="rounded-lg bg-white/5 border border-white/10 p-3 flex gap-2.5">
                    <Sparkles size={16} className="text-[#90A8FF] shrink-0 mt-0.5" />
                    <p className="text-sm text-white/88">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-black/5 p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#1F5B75]">Personalized Feed</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {personalizedTags.map((tag) => (
                  <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[#F3F5F7] border border-black/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-black/5 p-5">
              <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#1F5B75]">Quick Actions</p>
              <div className="mt-3 space-y-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    to={action.to}
                    className="flex items-center justify-between rounded-lg border border-black/5 bg-[#F9FAFB] px-3.5 py-3 text-sm font-semibold hover:bg-white transition-colors"
                  >
                    <span>{action.label}</span>
                    <ArrowRight size={15} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DailyInsightsDashboard