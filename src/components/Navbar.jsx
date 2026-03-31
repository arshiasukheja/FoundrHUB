import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Track if it's the first mount to apply cinematic entrance only once
  const [isFirstMount, setIsFirstMount] = useState(true)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h, { passive: true })
    
    const timer = setTimeout(() => setIsFirstMount(false), 5000)
    return () => {
      window.removeEventListener('scroll', h)
      clearTimeout(timer)
    }
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

  const handleLogout = () => {
    setDropdownOpen(false)
    logout()
    navigate('/', { replace: true })
  }

  const dashboardPath = user?.role === 'founder' ? '/dashboard/founder' : '/dashboard/explore'

  const getNavLinks = () => {
    const base = [
      { label: 'Discover', to: '/explore' },
      { label: 'Get Verified', to: '/verify' },
    ]

    if (isAuthenticated && user?.role === 'founder') {
      return [
        { label: 'Dashboard', to: dashboardPath },
        ...base
      ]
    }

    return [
      { label: 'Home', to: '/' },
      ...base
    ]
  }

  const navLinks = getNavLinks()
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'FH'

  const roleLabel = user?.role === 'founder' ? 'Founder' : user?.role === 'discoverer' ? 'Discoverer' : ''

  const dropdownItems = [
    { label: 'My Profile', to: '/profile', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0' },
    { label: 'Dashboard', to: dashboardPath, icon: 'M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z' },
    { label: 'Settings', to: '/settings', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292' }
  ]

  // Entrance delay logic: Only on home page reload
  const isHomePage = location.pathname === '/'
  const entranceDelay = (isHomePage && isFirstMount) ? 2.8 : 0

  return (
    <>
      {/* 1. SEPARATE LOGO (LEFT) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: entranceDelay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed left-10 z-50 transition-all duration-500 ${scrolled ? 'top-6' : 'top-10'}`}
      >
        <Link
          to="/"
          className="font-serif text-[24px] tracking-tight text-[#122056] hover:opacity-70 transition-opacity"
        >
          Foundr<span className="text-[#5B65DC]">HUB</span>
        </Link>
      </motion.div>

      {/* 2. PILL NAVBAR (CENTER) */}
      <div className={`fixed top-8 left-0 w-full z-50 flex justify-center transition-all duration-500 pointer-events-none ${scrolled ? 'top-4' : 'top-8'}`}>
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            delay: entranceDelay, 
            duration: 1, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="bg-neutral-950/90 backdrop-blur-xl border border-white/10 rounded-full px-7 py-3 flex items-center gap-10 shadow-2xl shadow-black/20 pointer-events-auto"
        >
          {/* Navigation Buttons */}
          <div className="flex items-center gap-7 pr-7 border-r border-white/10">
            {navLinks.map(l => (
              <Link
                key={l.label}
                to={l.to}
                className={`text-[12px] font-bold tracking-wide uppercase transition-colors duration-300 ${
                  location.pathname === l.to
                    ? 'text-white'
                    : 'text-neutral-500 hover:text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5">
            {isAuthenticated ? (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-700 flex items-center justify-center text-[10px] font-bold text-white border border-white/10 hover:border-white/30 transition-all font-sans"
                >
                  {initials}
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute right-0 mt-5 w-60 rounded-[28px] bg-neutral-900 border border-white/10 shadow-2xl p-2.5 z-50 overflow-hidden"
                    >
                      <div className="px-3.5 py-3.5 mb-1.5 border-b border-white/5">
                        <p className="text-[13px] font-bold text-white leading-tight">{user?.name || 'Founder'}</p>
                        <p className="text-[11px] text-neutral-500 truncate mt-0.5">{user?.email}</p>
                        {roleLabel && <p className="text-[10px] text-[#5B65DC] uppercase tracking-wide mt-1 tracking-[0.2em] font-bold">{roleLabel}</p>}
                      </div>

                      {dropdownItems.map(item => (
                        <button
                          key={item.label}
                          onClick={() => {
                            setDropdownOpen(false)
                            navigate(item.to)
                          }}
                          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13px] font-medium text-neutral-400 hover:bg-white/5 hover:text-white transition-all text-left group"
                        >
                          <svg className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                          </svg>
                          {item.label}
                        </button>
                      ))}

                      <div className="my-1.5 border-t border-white/5" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-[13px] font-medium text-rose-500 hover:bg-rose-500/10 transition-all text-left"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
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
                  to="/signin?role=discoverer"
                  className="text-[13px] font-bold text-neutral-400 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup?role=founder"
                  className="px-6 py-2.5 rounded-full bg-white text-neutral-950 text-[13px] font-bold hover:bg-neutral-200 transition-all shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </motion.nav>
      </div>
    </>
  )
}

export default Navbar
