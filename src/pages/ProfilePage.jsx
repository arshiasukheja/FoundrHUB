import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { ClipboardList, CheckCircle, Rocket } from 'lucide-react'

const ProfilePage = () => {
  const { user } = useAuth()
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'FH'

  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-gradient-to-b from-beige-50/30 to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
          {/* Profile Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white rounded-3xl border border-neutral-100 p-8 lg:p-10 shadow-[0_4px_32px_-12px_rgba(0,0,0,0.04)] mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-200 via-amber-100 to-amber-50 flex items-center justify-center text-[24px] font-bold text-neutral-700 shadow-lg shadow-amber-100/30">
                {initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="font-serif text-[1.6rem] text-neutral-950">{user?.name || 'Founder'}</h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[10px] font-semibold text-amber-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Under Review
                  </span>
                </div>
                <p className="text-[14px] text-neutral-400 mb-1">{user?.email || 'founder@foundrhub.in'}</p>
                <p className="text-[13px] text-neutral-500">Founder · {user?.role === 'founder' ? 'Startup Profile' : 'Explorer Profile'}</p>
              </div>
              <button className="inline-flex items-center px-5 py-2.5 rounded-full border border-neutral-200 text-[13px] font-medium text-neutral-600 hover:border-neutral-400 hover:text-neutral-900 transition-all duration-300">
                Edit Profile
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { l: 'Profile Views', v: '2,847' },
              { l: 'Saves', v: '342' },
              { l: 'Connections', v: '89' },
              { l: 'Rank', v: '#14' },
            ].map(s => (
              <div key={s.l} className="bg-white rounded-2xl border border-neutral-100 px-5 py-4">
                <p className="text-[22px] font-semibold text-neutral-900">{s.v}</p>
                <p className="text-[12px] text-neutral-400 font-medium">{s.l}</p>
              </div>
            ))}
          </motion.div>

          {/* About */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="bg-white rounded-3xl border border-neutral-100 p-8 mb-8">
            <h2 className="text-[16px] font-semibold text-neutral-900 mb-4">About</h2>
            <p className="text-[14px] text-neutral-500 leading-relaxed">
              Passionate founder building the next generation of homegrown brands in India. Committed to innovation, sustainability, and empowering local communities through technology and design.
            </p>
          </motion.div>

          {/* Brand Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="bg-white rounded-3xl border border-neutral-100 p-8 mb-8">
            <h2 className="text-[16px] font-semibold text-neutral-900 mb-6">Brand Information</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { label: 'Brand Name', value: 'My Startup' },
                { label: 'Category', value: 'AI / Deep Tech' },
                { label: 'Stage', value: 'MVP' },
                { label: 'City', value: 'Mumbai' },
                { label: 'Founded', value: '2025' },
                { label: 'Team Size', value: '3' },
                { label: 'Funding', value: 'Bootstrapped' },
                { label: 'Website', value: '—' },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="text-[14px] font-medium text-neutral-900">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Activity */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="bg-white rounded-3xl border border-neutral-100 p-8">
            <h2 className="text-[16px] font-semibold text-neutral-900 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'Submitted for verification', time: 'Just now', icon: ClipboardList },
                { action: 'Profile created', time: '2 minutes ago', icon: CheckCircle },
                { action: 'Joined FoundrHUB', time: 'Today', icon: Rocket },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-4 py-3 border-b border-neutral-50 last:border-0">
                  <span className="text-neutral-500"><a.icon size={20} strokeWidth={1.5} /></span>
                  <div className="flex-1">
                    <p className="text-[13px] font-medium text-neutral-700">{a.action}</p>
                    <p className="text-[11px] text-neutral-400">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ProfilePage
