import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { LogOut } from 'lucide-react'
import { investorNavItems } from '../pages/investor/investorData'

const InvestorSidebar = ({ isDark }) => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  return (
    <motion.aside
      initial={{ x: -32, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-0 top-0 hidden lg:flex h-screen w-[292px] flex-col border-r backdrop-blur-2xl z-50 ${isDark ? 'bg-[#09111d]/92 border-white/10 text-white' : 'bg-white/80 border-[#E5EBFF] text-[#122056]'}`}
    >
      <div className={`px-6 py-6 border-b ${isDark ? 'border-white/10' : 'border-[#EEF0FD]'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-serif text-xl font-bold ${isDark ? 'bg-white text-[#09111d]' : 'bg-[#122056] text-white'}`}>
            F
          </div>
          <div>
            <p className={`font-serif font-bold text-[15px] tracking-tight ${isDark ? 'text-white' : 'text-[#122056]'}`}>FoundrHUB</p>
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-cyan-300/80' : 'text-[#5B65DC]'}`}>Investor Suite</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-5 space-y-1 overflow-auto">
        {investorNavItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.route}
            end={item.route === '/dashboard/investor'}
            className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${isActive ? (isDark ? 'bg-white text-[#09111d]' : 'bg-[#122056] text-white') : (isDark ? 'text-white/65 hover:bg-white/8 hover:text-white' : 'text-[#122056]/65 hover:bg-[#EEF0FD]/70 hover:text-[#122056]')}`}
          >
            <span>{item.label}</span>
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-white/30' : 'bg-[#C8D4F5]'}`} />
          </NavLink>
        ))}
      </nav>

      <div className={`px-4 py-5 border-t ${isDark ? 'border-white/10' : 'border-[#EEF0FD]'}`}>
        <div className={`rounded-2xl p-4 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-[#FBFCFF] border-[#E5EBFF]'}`}>
          <p className={`text-[10px] uppercase tracking-[0.18em] font-black ${isDark ? 'text-white/45' : 'text-[#122056]/40'}`}>Signed in as</p>
          <p className={`mt-1 font-bold ${isDark ? 'text-white' : 'text-[#122056]'}`}>{user?.name || 'Investor'}</p>
          <p className={`text-xs mt-1 ${isDark ? 'text-white/55' : 'text-[#122056]/55'}`}>{user?.email || 'investor@foundrhub.com'}</p>
        </div>

        <button
          onClick={() => {
            logout()
            navigate('/', { replace: true })
          }}
          className={`mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border text-sm font-semibold transition-all ${isDark ? 'border-white/10 bg-white/5 text-white hover:bg-white/10' : 'border-[#E5EBFF] bg-white text-[#122056] hover:bg-[#FBFCFF]'}`}
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </motion.aside>
  )
}

export default InvestorSidebar
