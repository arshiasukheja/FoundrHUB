/* FoundrHUB — Final CTA Footer Section */
const FooterCTA = () => {
  return (
    <React.Fragment>
      {/* CTA Section */}
      <section id="join" className="py-24 lg:py-32 bg-neutral-950 relative overflow-hidden">
        {/* Subtle gradient orb */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-neutral-800/30 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center relative z-10">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-neutral-700 bg-neutral-900/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[12px] font-semibold tracking-widest uppercase text-neutral-400">
                Open for founders
              </span>
            </span>

            <h2 className="font-serif text-[clamp(2rem,5vw,3.2rem)] leading-[1.1] tracking-tight text-white mb-6">
              Built for founders shaping<br className="hidden sm:block" /> what's next.
            </h2>

            <p className="text-[17px] text-neutral-400 leading-relaxed max-w-xl mx-auto mb-10">
              Whether you're launching your first product or scaling your hundredth, FoundrHUB is where India's most ambitious founders get discovered.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#"
                id="footer-cta-launch"
                className="inline-flex items-center px-8 py-4 rounded-full bg-white text-neutral-950 text-[15px] font-semibold tracking-wide hover:bg-neutral-100 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] group"
              >
                Launch on FoundrHUB
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a
                href="#discover"
                className="inline-flex items-center px-8 py-4 rounded-full border border-neutral-700 text-neutral-300 text-[15px] font-medium hover:border-neutral-500 hover:text-white transition-all duration-300"
              >
                Explore Startups
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <span className="font-serif text-[20px] text-white tracking-tight">
                Foundr<span className="text-neutral-500">HUB</span>
              </span>
              <p className="text-[13px] text-neutral-500 leading-relaxed mt-3 max-w-xs">
                India's curated startup discovery platform. Built for founders, by founders.
              </p>
            </div>

            {/* Links */}
            {[
              {
                title: 'Platform',
                links: ['Discover Startups', 'Get Verified', 'Founder Stories', 'Analytics'],
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers', 'Press'],
              },
              {
                title: 'Legal',
                links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-[12px] font-semibold tracking-widest uppercase text-neutral-500 mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[13px] text-neutral-400 hover:text-white transition-colors duration-300">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-neutral-800/50 gap-4">
            <p className="text-[12px] text-neutral-600">
              © 2026 FoundrHUB. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {/* Social icons */}
              {[
                { label: 'Twitter', path: 'M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.93.07 4.28 4.28 0 004 2.98 8.521 8.521 0 01-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z' },
                { label: 'LinkedIn', path: 'M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="text-neutral-600 hover:text-white transition-colors duration-300">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};
