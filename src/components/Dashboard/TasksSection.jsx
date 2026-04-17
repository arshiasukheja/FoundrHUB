import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Video, 
  MessageSquare, 
  Mail, 
  PenTool,
  ClipboardList
} from 'lucide-react'

const TasksSection = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete your profile',
      description: 'Add a cover photo and bio',
      completed: false,
      priority: 'high',
      Icon: User,
    },
    {
      id: 2,
      title: 'Add product demo',
      description: 'Upload a 2-3 minute demo',
      completed: true,
      priority: 'high',
      Icon: Video,
    },
    {
      id: 3,
      title: 'Respond to inquiries',
      description: 'You have 5 investor messages',
      completed: false,
      priority: 'medium',
      Icon: MessageSquare,
    },
    {
      id: 4,
      title: 'Verify email',
      description: 'Click the link we sent you',
      completed: false,
      priority: 'low',
      Icon: Mail,
    },
  ])

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const completedCount = tasks.filter(t => t.completed).length
  const progress = (completedCount / tasks.length) * 100

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[100] flex items-center pointer-events-none">
      {/* 1. TRIGGER TAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={false}
        animate={{ x: isOpen ? -320 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 40 }}
        className="pointer-events-auto flex flex-col items-center gap-4 bg-[#122056] text-white py-6 px-3 rounded-l-[32px] shadow-[-10px_0_30px_rgba(0,0,0,0.15)] border-l border-t border-b border-white/10 group group-hover:bg-[#1a2b72] transition-colors"
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="mb-2"
          >
            <ChevronLeft size={20} className="text-[#5B65DC]" />
          </motion.div>
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#122056]" />
        </div>
        
        <p className="text-[10px] font-black uppercase tracking-[0.3em] [writing-mode:vertical-lr] rotate-180 mb-2">Tasks</p>
        
        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
          <PenTool size={14} className="text-[#5B65DC]" />
        </div>
      </motion.button>

      {/* 2. TASK DRAWER (DROPBOX) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 45 }}
            className="pointer-events-auto absolute right-0 w-[320px] bg-white h-[80vh] shadow-[-10px_0_50px_rgba(18,32,86,0.15)] rounded-l-[3rem] border-l border-[#EEF0FD] flex flex-col overflow-hidden"
          >
            {/* Header with Progress */}
            <div className="px-8 pt-10 pb-8 border-b border-[#EEF0FD]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#FAFAFD] border border-[#EEF0FD] flex items-center justify-center">
                  <ClipboardList size={20} className="text-[#122056]" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-[#122056]">Daily Missions</h2>
                  <p className="text-[10px] font-bold text-[#122056]/30 uppercase tracking-widest mt-0.5">Scale Vector Alpha</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3 text-[11px] font-bold text-[#122056]/60">
                <span>Progress Tracker</span>
                <span className="text-[#5B65DC]">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#EEF0FD] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-[#122056]"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 custom-scrollbar">
              {tasks.map((task, i) => (
                <motion.button
                  key={task.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => toggleTask(task.id)}
                  className={`w-full p-4 rounded-3xl border transition-all text-left relative group ${
                    task.completed 
                    ? 'bg-[#FAFAFD] border-[#EEF0FD] grayscale opacity-50' 
                    : 'bg-white border-[#EEF0FD] hover:border-[#122056]/20 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {task.completed ? (
                        <CheckCircle2 size={18} className="text-emerald-500" />
                      ) : (
                        <Circle size={18} className="text-[#EEF0FD] group-hover:text-[#122056]/40" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-bold truncate leading-tight ${task.completed ? 'line-through text-[#122056]' : 'text-[#122056]'}`}>
                        {task.title}
                      </p>
                      <p className="text-[11px] text-[#122056]/40 mt-1">{task.description}</p>
                    </div>

                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-[#FAFAFD] flex items-center justify-center border border-[#EEF0FD]">
                      <task.Icon size={14} className="text-[#5B65DC]" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Sticky Action Footer */}
            <div className="p-8 border-t border-[#EEF0FD] bg-white">
              <button className="w-full py-4 rounded-2xl bg-[#122056] text-white text-[13px] font-bold hover:bg-[#5B65DC] transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#122056]/10">
                Batch Finalize <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TasksSection
