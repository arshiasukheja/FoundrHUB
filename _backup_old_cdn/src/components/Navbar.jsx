/* FoundrHUB — Sticky Navbar with premium glass blur */
const Navbar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Discover', href: '#discover' },
    { label: 'Categories', href: '#categories' },
    { label: 'Founder Stories', href: '#stories' },
    { label: 'Analytics', href: '#analytics' },
    { label: 'Get Verified', href: '#verified' },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/70 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-[72px]">
        {/* Logo */}
        <a href="#" id="navbar-logo" className="flex items-center gap-2 group">
          <span className="font-serif text-[22px] tracking-tight text-neutral-950 group-hover:opacity-70 transition-opacity duration-300">
            Foundr<span className="text-neutral-400">HUB</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13.5px] font-medium text-neutral-500 hover:text-neutral-950 transition-colors duration-300 tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="#join"
            id="navbar-cta"
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-neutral-950 text-white text-[13px] font-semibold tracking-wide hover:bg-neutral-800 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-200"
          >
            Join as Founder
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          id="navbar-mobile-toggle"
          className="lg:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-neutral-950 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-neutral-950 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-neutral-950 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-white/90 backdrop-blur-2xl ${
          menuOpen ? 'max-h-[500px] border-t border-neutral-100' : 'max-h-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[15px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#join"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center mt-2 px-5 py-3 rounded-full bg-neutral-950 text-white text-[14px] font-semibold tracking-wide"
          >
            Join as Founder
          </a>
        </div>
      </div>
    </nav>
  );
};
