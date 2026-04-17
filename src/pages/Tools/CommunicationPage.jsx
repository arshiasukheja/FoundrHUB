import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Video, PhoneCall } from 'lucide-react'
import SidebarMenu from '../../components/Navigation/SidebarMenu'
import DashboardHeader from '../../components/Layout/DashboardHeader'
import EventsPanel from '../../components/Dashboard/EventsPanel'
import { useAuth } from '../../context/AuthContext'
import { useRealtimeValue } from '../../lib/realtime'
import { buildDefaultUserData } from '../../lib/seedData'

const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl bg-white border border-[#eef0f5] shadow-[0_4px_24px_rgba(0,0,0,0.04)] ${className}`}>
    {children}
  </div>
)

const CommunicationPage = () => {
  const { user } = useAuth()
  const fallback = useMemo(() => buildDefaultUserData({}).communication, [])
  const { value: communicationData } = useRealtimeValue(
    user?.uid ? `users/${user.uid}/communication` : null,
    fallback
  )
  const conversations = communicationData?.conversations || []
  const meetings = communicationData?.meetings || []

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-[#1f2937] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[420px] bg-[#818cf8]/8 blur-[180px]" />
        <div className="absolute bottom-[-12%] right-[-12%] w-[520px] h-[520px] bg-[#94a3b8]/10 blur-[200px]" />
      </div>

      <SidebarMenu activeItem="communication" />

      <div className="ml-0 lg:ml-64 relative z-10">
        <div className="sticky top-0 z-40 bg-[#f5f7fb]/80 backdrop-blur-xl border-b border-[#e5e7eb]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
            <DashboardHeader />
            <div />
          </div>
        </div>

        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-[1280px] mx-auto px-6 lg:px-8 py-6"
        >
          <div className="mb-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6366f1]">Communication Hub</p>
            <h1 className="text-2xl font-serif font-bold text-[#1f2937] mt-1">Meetings and founder conversations</h1>
            <p className="text-sm text-[#6b7280] mt-2">Track upcoming meetings and stay on top of founder discussions.</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-5">
            <EventsPanel events={meetings} />

            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6366f1]">Founder Conversations</p>
                  <h2 className="text-lg font-semibold text-[#1f2937] mt-1">Latest messages</h2>
                </div>
                <div className="flex items-center gap-2 text-[#9ca3af]">
                  <button className="h-9 w-9 rounded-xl bg-[#f5f7fb] border border-[#eef0f5] flex items-center justify-center">
                    <MessageCircle size={16} />
                  </button>
                  <button className="h-9 w-9 rounded-xl bg-[#f5f7fb] border border-[#eef0f5] flex items-center justify-center">
                    <PhoneCall size={16} />
                  </button>
                  <button className="h-9 w-9 rounded-xl bg-[#f5f7fb] border border-[#eef0f5] flex items-center justify-center">
                    <Video size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {conversations.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-[#eef0f5] bg-[#fbfcff] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold text-[#1f2937]">{item.name}</p>
                        <p className="text-xs text-[#6b7280] mt-1">{item.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-[#9ca3af]">{item.time}</p>
                        {item.unread > 0 && (
                          <span className="mt-2 inline-flex items-center justify-center text-[10px] font-bold text-white bg-[#6366f1] px-2 py-1 rounded-full">
                            {item.unread} new
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-[#6b7280] mt-3">{item.message}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </motion.main>
      </div>
    </div>
  )
}

export default CommunicationPage
