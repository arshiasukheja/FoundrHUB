import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false)
    setDropdownOpen(false)
  }, [location])

  const handleLogout = () => {
    setDropdownOpen(false)
    logout()
    navigate('/', { replace: true })
  }

  const navLinks = [
    { label: 'Discover', to: '/explore' },
    { label: 'Get Verified', to: '/verify' },
  ]

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'FH'

  const dropdownItems = [
    {
      label: 'My Profile',
      to: '/profile',
      icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0',
    },
    {
      label: 'Dashboard',
      to: '/dashboard',
      icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z',
    },
    {
      label: 'Settings',
      to: '/settings',
      icon: 'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281',
    },
  ]

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-white/60 backdrop-blur-2xl shadow-[0_1px_0_rgba(0,0,0,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-[72px]">
        {/* Logo */}
        <Link
          to="/"
          className="font-serif text-[22px] tracking-tight text-neutral-950 hover:opacity-70 transition-opacity duration-300"
        >
          Foundr<span className="text-neutral-400">HUB</span>
        </Link>

        {/* Center Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map(l => (
            <Link
              key={l.label}
              to={l.to}
              className={`text-[13px] font-medium transition-colors duration-300 ${
                location.pathname === l.to
                  ? 'text-neutral-950'
                  : 'text-neutral-500 hover:text-neutral-950'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                id="profile-avatar-btn"
                className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-200 via-amber-100 to-amber-50 flex items-center justify-center text-[11px] font-bold text-neutral-700 ring-2 ring-white/60 hover:ring-white transition-all duration-300 shadow-lg shadow-amber-100/30"
              >
                {initials}
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute right-0 top-12 w-60 rounded-[20px] bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_16px_64px_-16px_rgba(0,0,0,0.15)] p-2 z-50"
                  >
                    {/* User info header */}
                    <div className="px-3 py-2.5 mb-1 border-b border-neutral-100/80">
                      <p className="text-[13px] font-semibold text-neutral-900">
                        {user?.name || 'Founder'}
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        {user?.email || 'founder@foundrhub.in'}
                      </p>
                    </div>

                    {/* Menu items */}
                    {dropdownItems.map(item => (
                      <button
                        key={item.label}
                        onClick={() => {
                          setDropdownOpen(false)
                          navigate(item.to)
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-neutral-600 hover:bg-neutral-100/60 hover:text-neutral-900 hover:shadow-[0_0_12px_rgba(0,0,0,0.03)] transition-all duration-200 text-left group"
                      >
                        <svg
                          className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                        {item.label}
                      </button>
                    ))}

                    {/* Divider */}
                    <div className="my-1 border-t border-neutral-100/80" />

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      id="logout-btn"
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-red-500 hover:bg-red-50/60 hover:text-red-600 transition-all duration-200 text-left group"
                    >
                      <svg
                        className="w-4 h-4 group-hover:text-red-500 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                        />
                      </svg>
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link
                to="/signin"
                className="px-4 py-2 text-[13px] font-medium text-neutral-500 hover:text-neutral-950 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/verify"
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-neutral-950 text-white text-[13px] font-semibold tracking-wide hover:bg-neutral-800 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-200"
              >
                Get Verified
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          {isAuthenticated && (
            <div ref={!menuOpen ? dropdownRef : undefined} className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 via-amber-100 to-amber-50 flex items-center justify-center text-[10px] font-bold text-neutral-700"
              >
                {initials}
              </button>
            </div>
          )}
          <button
            className="flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            id="mobile-menu-btn"
          >
            <span className={`block w-5 h-[1.5px] bg-neutral-950 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-neutral-950 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-neutral-950 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 bg-white/80 backdrop-blur-2xl ${
          menuOpen ? 'max-h-[500px] border-t border-neutral-100/60' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {navLinks.map(l => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="text-[15px] font-medium text-neutral-600"
            >
              {l.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-[15px] font-medium text-neutral-600">Dashboard</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-[15px] font-medium text-neutral-600">My Profile</Link>
              <Link to="/settings" onClick={() => setMenuOpen(false)} className="text-[15px] font-medium text-neutral-600">Settings</Link>
              <button onClick={handleLogout} className="text-[15px] font-medium text-red-500 text-left">Logout</button>
            </>
          ) : (
            <>
              <Link to="/signin" onClick={() => setMenuOpen(false)} className="text-[15px] font-medium text-neutral-600">Sign In</Link>
              <Link to="/verify" onClick={() => setMenuOpen(false)} className="mt-2 px-5 py-3 rounded-full bg-neutral-950 text-white text-[14px] font-semibold text-center">
                Get Verified
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
