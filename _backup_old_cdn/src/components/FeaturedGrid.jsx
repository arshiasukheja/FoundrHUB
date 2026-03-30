/* FoundrHUB — Featured Discovery Grid Preview */
const startups = [
  {
    name: 'Bloomcraft Studio',
    founder: 'Ananya Sharma',
    category: 'Sustainable Fashion',
    city: 'Mumbai',
    description: 'Handcrafted sustainable fashion blending traditional Indian textiles with modern minimalism.',
    badge: 'Verified',
    color: '#e8d5c0',
    initials: 'BC',
  },
  {
    name: 'NeuralBrew AI',
    founder: 'Rahul Kapoor',
    category: 'AI / Deep Tech',
    city: 'Bengaluru',
    description: 'AI-powered creative tools helping D2C brands generate compelling product narratives at scale.',
    badge: 'Rising',
    color: '#c9d5e0',
    initials: 'NB',
  },
  {
    name: 'GreenRoute',
    founder: 'Meera Patel',
    category: 'Climate Tech',
    city: 'Delhi',
    description: 'Last-mile delivery optimization reducing carbon footprint for hyperlocal e-commerce brands.',
    badge: 'Funded',
    color: '#d5e0c9',
    initials: 'GR',
  },
  {
    name: 'Kira Skincare',
    founder: 'Priya Nair',
    category: 'D2C Beauty',
    city: 'Pune',
    description: 'Clean-label skincare powered by lab-tested Ayurvedic formulations for the modern consumer.',
    badge: 'Verified',
    color: '#e0c9d5',
    initials: 'KS',
  },
  {
    name: 'StackFin',
    founder: 'Arjun Desai',
    category: 'Fintech',
    city: 'Hyderabad',
    description: 'Embedded finance infrastructure helping SaaS founders add payments in under 10 minutes.',
    badge: 'Rising',
    color: '#d5d0e8',
    initials: 'SF',
  },
  {
    name: 'CraftBox',
    founder: 'Sneha Joshi',
    category: 'EdTech / Hobby',
    city: 'Jaipur',
    description: 'Subscription craft kits bringing curated DIY experiences to families across India.',
    badge: 'Funded',
    color: '#e0dac9',
    initials: 'CB',
  },
];

const badgeStyles = {
  Verified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Rising: 'bg-amber-50 text-amber-700 border-amber-200',
  Funded: 'bg-blue-50 text-blue-700 border-blue-200',
};

const FeaturedGrid = () => {
  return (
    <section id="discover" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="reveal max-w-2xl mb-16">
          <span className="text-[12px] font-semibold tracking-widest uppercase text-neutral-400 mb-4 block">
            Featured Startups
          </span>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-tight text-neutral-950 mb-4">
            Curated picks from the FoundrHUB community
          </h2>
          <p className="text-[16px] text-neutral-500 leading-relaxed">
            Handpicked startups making waves across categories — from deep tech to sustainable fashion.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map((s, i) => (
            <div
              key={s.name}
              className="reveal group relative bg-white rounded-3xl border border-neutral-100 p-7 hover:border-neutral-200 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] transition-all duration-500 cursor-pointer"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-[14px] font-bold text-neutral-700" style={{ background: s.color }}>
                  {s.initials}
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${badgeStyles[s.badge]}`}>
                  {s.badge === 'Verified' && (
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  )}
                  {s.badge}
                </span>
              </div>

              {/* Name & founder */}
              <h3 className="text-[17px] font-semibold text-neutral-900 mb-1 group-hover:text-neutral-950 transition-colors duration-300">
                {s.name}
              </h3>
              <p className="text-[13px] text-neutral-400 mb-3">by {s.founder}</p>

              {/* Description */}
              <p className="text-[14px] text-neutral-500 leading-relaxed mb-5">
                {s.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-beige-50 text-[11px] font-medium text-neutral-600 border border-beige-200">
                  {s.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-neutral-50 text-[11px] font-medium text-neutral-500 border border-neutral-100">
                  📍 {s.city}
                </span>
              </div>

              {/* Hover arrow */}
              <div className="absolute top-7 right-7 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0">
                <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
