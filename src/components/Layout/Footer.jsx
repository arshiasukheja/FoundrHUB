import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className="bg-neutral-950 border-t border-neutral-800/50">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="font-serif text-[18px] text-white tracking-tight">
            Foundr<span className="text-neutral-500">HUB</span>
          </Link>
          <p className="text-[12px] text-neutral-500 leading-relaxed mt-2 max-w-xs">
            India's curated startup discovery platform. Built for founders, by founders.
          </p>
        </div>
        {[
          { t: 'Platform', l: [
            { label: 'Explore Startups', to: '/explore' },
            { label: 'Get Verified', to: '/verify' },
            { label: 'Founder Stories', to: '/explore' },
            { label: 'Analytics', to: '/dashboard' },
          ]},
          { t: 'Company', l: [
            { label: 'About', to: '/' },
            { label: 'Blog', to: '/' },
            { label: 'Careers', to: '/' },
            { label: 'Press', to: '/' },
          ]},
          { t: 'Legal', l: [
            { label: 'Privacy Policy', to: '/' },
            { label: 'Terms of Service', to: '/' },
            { label: 'Cookie Policy', to: '/' },
          ]},
        ].map(col => (
          <div key={col.t}>
            <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-neutral-500 mb-3">{col.t}</p>
            <ul className="space-y-1.5">
              {col.l.map(item => (
                <li key={item.label}>
                  <Link to={item.to} className="text-[12px] text-neutral-400 hover:text-white transition-colors duration-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="pt-6 border-t border-neutral-800/50">
        <p className="text-[11px] text-neutral-600">© 2026 FoundrHUB. All rights reserved.</p>
      </div>
    </div>
  </footer>
)

export default Footer
