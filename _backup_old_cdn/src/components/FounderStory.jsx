/* FoundrHUB — Founder Story Spotlight Section */
const FounderStory = () => {
  return (
    <section id="stories" className="py-24 lg:py-32 bg-beige-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Section Label */}
        <div className="reveal mb-16">
          <span className="text-[12px] font-semibold tracking-widest uppercase text-neutral-400 mb-4 block">
            Founder Stories
          </span>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.12] tracking-tight text-neutral-950">
            Real stories from real builders
          </h2>
        </div>

        {/* Split Editorial */}
        <div className="reveal grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Image Placeholder */}
          <div className="relative group">
            <div className="aspect-[4/5] lg:aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-beige-200 via-beige-100 to-white border border-beige-200/60 relative">
              {/* Decorative illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  {/* Abstract founder silhouette */}
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-100 flex items-center justify-center">
                    <svg className="w-16 h-16 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <p className="text-[13px] font-medium text-neutral-400">Ananya Sharma</p>
                  <p className="text-[11px] text-neutral-300 mt-1">Founder, Bloomcraft Studio</p>
                </div>
              </div>

              {/* Corner badge */}
              <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/60 text-[11px] font-semibold text-neutral-700">
                ✨ Featured Founder
              </div>
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-white rounded-2xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-neutral-100 px-6 py-4 transform group-hover:-translate-y-1 transition-transform duration-500">
              <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider mb-1">Since launch</p>
              <p className="text-[28px] font-semibold text-neutral-900 leading-tight">12,400+</p>
              <p className="text-[12px] text-emerald-600 font-medium">products sold</p>
            </div>
          </div>

          {/* Right — Story Content */}
          <div className="lg:pl-4">
            {/* Quote */}
            <div className="mb-8">
              <svg className="w-10 h-10 text-neutral-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
              <blockquote className="font-serif text-[clamp(1.3rem,2.5vw,1.75rem)] leading-[1.35] text-neutral-900 italic">
                "FoundrHUB gave us visibility we couldn't have earned in two years of hustle. Our first 500 customers came from the platform — founders supporting founders."
              </blockquote>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-beige-200/60">
              <div className="w-12 h-12 rounded-full bg-[#e8d5c0] flex items-center justify-center text-[14px] font-bold text-neutral-700">
                AS
              </div>
              <div>
                <p className="text-[15px] font-semibold text-neutral-900">Ananya Sharma</p>
                <p className="text-[13px] text-neutral-400">Founder & CEO, Bloomcraft Studio · Mumbai</p>
              </div>
            </div>

            {/* Story Excerpt */}
            <p className="text-[15px] leading-relaxed text-neutral-500 mb-8">
              From a single sewing machine in her Bandra apartment to a team of 40 artisans across three states, Ananya's journey with Bloomcraft Studio is a masterclass in building with intention. Her sustainable fashion brand has redefined how India thinks about slow fashion — one handcrafted piece at a time.
            </p>

            {/* CTA */}
            <a
              href="#"
              id="story-cta"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-neutral-900 hover:text-neutral-600 transition-colors duration-300 group"
            >
              Read Full Story
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
