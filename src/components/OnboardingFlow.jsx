import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Shirt, 
  Palette, 
  Heart, 
  Utensils, 
  Code, 
  Cpu, 
  Wallet, 
  Stethoscope, 
  ShoppingBag, 
  GraduationCap, 
  Plus,
  ArrowRight,
  Target,
  Zap
} from 'lucide-react'

const niches = [
  { id: 'fashion', label: 'Fashion / Clothing', icon: Shirt, color: '#FF6B6B' },
  { id: 'beauty', label: 'Beauty / Makeup', icon: Palette, color: '#F06292' },
  { id: 'skincare', label: 'Skincare / Wellness', icon: Heart, color: '#BA68C8' },
  { id: 'food', label: 'Food & Beverage', icon: Utensils, color: '#FFD54F' },
  { id: 'saas', label: 'SaaS / Tech', icon: Code, color: '#64B5F6' },
  { id: 'ai', label: 'AI / ML', icon: Cpu, color: '#4DB6AC' },
  { id: 'fintech', label: 'Fintech', icon: Wallet, color: '#81C784' },
  { id: 'healthtech', label: 'HealthTech', icon: Stethoscope, color: '#4FC3F7' },
  { id: 'd2c', label: 'D2C / Consumer', icon: ShoppingBag, color: '#FF8A65' },
  { id: 'edtech', label: 'Education / EdTech', icon: GraduationCap, color: '#9575CD' },
]

const OnboardingFlow = ({ onClose }) => {
  const [step, setStep] = useState(1)
  const [founderStatus, setFounderStatus] = useState(null)
  const [selectedNiche, setSelectedNiche] = useState(null)
  const [otherNiche, setOtherNiche] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const isStudentFounderPage = location.pathname === '/student-founders'

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleNext = () => {
    if (step === 1 && founderStatus) {
      if (founderStatus === 'yes') {
        if (isStudentFounderPage) {
          // On student founders page: close modal and scroll to inline signup form
          onClose?.()
          setTimeout(() => {
            const el = document.getElementById('signup-form')
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 100)
          return
        }
        navigate('/signup?role=founder')
        return
      }
      setStep(2)
    } else if (step === 2 && (selectedNiche || (selectedNiche === 'other' && otherNiche))) {
      const nicheQuery = selectedNiche === 'other' ? otherNiche.trim() : selectedNiche
      const encoded = encodeURIComponent(nicheQuery)
      if (founderStatus === 'yes') {
        navigate(`/signup?role=founder&niche=${encoded}`)
      } else {
        navigate(`/niche-validation?niche=${encoded}`)
      }
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#0A1128]/60 backdrop-blur-md flex items-center justify-center px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl bg-white rounded-[2.5rem] border border-[#EEF0FD] shadow-[0_40px_120px_rgba(10,17,40,0.35)] overflow-hidden flex flex-col max-h-[88vh]"
      >
        <header className="flex items-center justify-between px-6 lg:px-10 py-5 border-b border-[#EEF0FD] bg-gradient-to-r from-white via-[#FAFAFD] to-white">
          <div className="text-[13px] font-bold tracking-[0.3em] text-[#122056]">
            Foundr<span className="text-[#5B65DC]">HUB</span> Onboarding
          </div>
          <button
            type="button"
            onClick={() => onClose?.()}
            className="rounded-full border border-[#EEF0FD] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400 hover:text-[#122056] hover:border-[#5B65DC]/40 transition"
          >
            Close
          </button>
        </header>

        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-[#FAFAFD]">
          <motion.div 
            className="h-full bg-[#5B65DC]"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 2) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <main className="flex-1 flex flex-col items-center justify-center p-5 lg:p-8 overflow-y-auto">
          <div className="max-w-4xl w-full">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5B65DC] mb-3 block">Onboarding • 01</span>
                  <h1 className="text-3xl lg:text-4xl font-bold text-[#122056] tracking-tight mb-8">Are you a founder?</h1>
                  
                  <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <button
                      onClick={() => setFounderStatus('yes')}
                      className={`group relative p-7 rounded-[2rem] border-2 text-left transition-all duration-300 ${
                        founderStatus === 'yes' 
                          ? 'border-[#5B65DC] bg-[#EEF0FD]/40' 
                          : 'border-[#EEF0FD] bg-white hover:border-[#5B65DC]/30'
                      }`}
                    >
                      <div className="h-11 w-11 rounded-2xl bg-[#5B65DC]/10 flex items-center justify-center text-[#5B65DC] mb-5">
                        <Zap size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-[#122056] mb-2">Yes — I’m already building</h3>
                      <p className="text-[13px] text-neutral-500 font-medium">Scaling an active product with early traction.</p>
                      {founderStatus === 'yes' && (
                        <motion.div layoutId="selection" className="absolute top-4 right-4 h-3 w-3 rounded-full bg-[#5B65DC]" />
                      )}
                    </button>

                    <button
                      onClick={() => setFounderStatus('maybe')}
                      className={`group relative p-7 rounded-[2rem] border-2 text-left transition-all duration-300 ${
                        founderStatus === 'maybe' 
                          ? 'border-[#5B65DC] bg-[#EEF0FD]/40' 
                          : 'border-[#EEF0FD] bg-white hover:border-[#5B65DC]/30'
                      }`}
                    >
                      <div className="h-11 w-11 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 mb-5">
                        <Target size={24} />
                      </div>
                      <h3 className="text-lg font-bold text-[#122056] mb-2">Maybe — I’m at the ideation stage</h3>
                      <p className="text-[13px] text-neutral-500 font-medium">Exploring concepts before committing to a build.</p>
                      {founderStatus === 'maybe' && (
                        <motion.div layoutId="selection" className="absolute top-4 right-4 h-3 w-3 rounded-full bg-[#5B65DC]" />
                      )}
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!founderStatus}
                    onClick={handleNext}
                    className="mt-10 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#122056] to-[#5B65DC] text-white font-bold text-[12px] tracking-widest uppercase disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-[#122056]/20"
                  >
                    Continue
                    <ArrowRight size={18} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <div className="mb-8">
                    <button 
                      onClick={() => setStep(1)}
                      className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 hover:text-[#5B65DC] transition-colors"
                    >
                      Go Back
                    </button>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#5B65DC] mb-3 block">Onboarding • 02</span>
                  <h1 className="text-3xl lg:text-4xl font-bold text-[#122056] tracking-tight mb-3">What niche are you working in?</h1>
                  <p className="text-[13px] text-neutral-500 font-medium mb-6">Tell us your focus so we can curate the best insights for you.</p>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6 max-h-[300px] overflow-y-auto pr-1">
                    {niches.map((niche) => (
                      <button
                        key={niche.id}
                        onClick={() => setSelectedNiche(niche.id)}
                        className={`flex flex-col items-center justify-center p-5 rounded-3xl border-2 transition-all duration-300 gap-3 ${
                          selectedNiche === niche.id 
                            ? 'border-[#5B65DC] bg-[#EEF0FD]/40' 
                            : 'border-[#FAFAFD] bg-[#FAFAFD] hover:border-[#5B65DC]/20'
                        }`}
                      >
                        <div 
                            className="w-11 h-11 rounded-2xl flex items-center justify-center text-white"
                          style={{ backgroundColor: niche.color }}
                        >
                            <niche.icon size={20} />
                        </div>
                          <span className="text-[12px] font-bold text-[#122056]">{niche.label}</span>
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setSelectedNiche('other')}
                      className={`flex flex-col items-center justify-center p-5 rounded-3xl border-2 transition-all duration-300 gap-3 ${
                        selectedNiche === 'other' 
                          ? 'border-[#5B65DC] bg-[#EEF0FD]/40' 
                          : 'border-[#FAFAFD] bg-[#FAFAFD] hover:border-[#5B65DC]/20'
                      }`}
                    >
                      <div className="w-11 h-11 rounded-2xl bg-neutral-200 flex items-center justify-center text-neutral-500">
                        <Plus size={20} />
                      </div>
                      <span className="text-[12px] font-bold text-[#122056]">Other</span>
                    </button>
                  </div>

                  <AnimatePresence>
                    {selectedNiche === 'other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6"
                      >
                        <input 
                          type="text"
                          placeholder="Enter your niche..."
                          value={otherNiche}
                          onChange={(e) => setOtherNiche(e.target.value)}
                          className="max-w-md w-full px-5 py-3 rounded-2xl border-2 border-[#EEF0FD] focus:border-[#5B65DC] focus:outline-none text-[14px] font-medium text-[#122056]"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!selectedNiche || (selectedNiche === 'other' && !otherNiche)}
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#122056] to-[#5B65DC] text-white font-bold text-[12px] tracking-widest uppercase disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-[#122056]/20"
                  >
                    Finalize
                    <ArrowRight size={18} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

      </motion.div>
    </motion.div>
  )
}

export default OnboardingFlow
