import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'

const SettingsPage = () => {
  const { user, logout } = useAuth()
  const [notifications, setNotifications] = useState(true)
  const [emailDigest, setEmailDigest] = useState(true)
  const [publicProfile, setPublicProfile] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const Toggle = ({ checked, onChange, label, desc }) => (
    <div className="flex items-center justify-between py-4 border-b border-neutral-50">
      <div>
        <p className="text-[14px] font-medium text-neutral-700">{label}</p>
        {desc && <p className="text-[12px] text-neutral-400 mt-0.5">{desc}</p>}
      </div>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${checked ? 'bg-neutral-950' : 'bg-neutral-200'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${checked ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  )

  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-gradient-to-b from-beige-50/30 to-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.1] text-neutral-950 mb-2">Settings</h1>
            <p className="text-[14px] text-neutral-400 mb-10">Manage your account preferences and privacy</p>
          </motion.div>

          {/* Account */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="bg-white rounded-3xl border border-neutral-100 p-8 mb-6">
            <h2 className="text-[16px] font-semibold text-neutral-900 mb-6">Account</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-[13px] font-medium text-neutral-600 mb-1.5">Full Name</label>
                <input type="text" defaultValue={user?.name || ''} className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] text-neutral-900 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-all duration-300" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-neutral-600 mb-1.5">Email</label>
                <input type="email" defaultValue={user?.email || ''} className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] text-neutral-900 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-all duration-300" />
              </div>
              <button className="inline-flex items-center px-6 py-2.5 rounded-full bg-neutral-950 text-white text-[13px] font-semibold hover:bg-neutral-800 transition-all duration-300">
                Save Changes
              </button>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="bg-white rounded-3xl border border-neutral-100 p-8 mb-6">
            <h2 className="text-[16px] font-semibold text-neutral-900 mb-4">Notifications</h2>
            <Toggle checked={notifications} onChange={() => setNotifications(!notifications)} label="Push Notifications" desc="Receive notifications for new saves, views, and leads" />
            <Toggle checked={emailDigest} onChange={() => setEmailDigest(!emailDigest)} label="Weekly Email Digest" desc="Get a weekly summary of your startup's performance" />
          </motion.div>

          {/* Privacy */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="bg-white rounded-3xl border border-neutral-100 p-8 mb-6">
            <h2 className="text-[16px] font-semibold text-neutral-900 mb-4">Privacy</h2>
            <Toggle checked={publicProfile} onChange={() => setPublicProfile(!publicProfile)} label="Public Profile" desc="Allow your profile to appear in search and discovery" />
            <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} label="Dark Mode" desc="Switch to a darker interface theme (coming soon)" />
          </motion.div>

          {/* Danger Zone */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }} className="bg-white rounded-3xl border border-red-100 p-8">
            <h2 className="text-[16px] font-semibold text-red-600 mb-4">Danger Zone</h2>
            <p className="text-[13px] text-neutral-500 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={logout} className="inline-flex items-center px-5 py-2.5 rounded-full border border-red-200 text-[13px] font-medium text-red-500 hover:bg-red-50 hover:border-red-300 transition-all duration-300">
                Logout
              </button>
              <button className="inline-flex items-center px-5 py-2.5 rounded-full bg-red-500 text-white text-[13px] font-medium hover:bg-red-600 transition-all duration-300">
                Delete Account
              </button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default SettingsPage
