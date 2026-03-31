import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { PenLine, ClipboardList, CheckCircle, Rocket } from 'lucide-react'

const steps = [
  { num: '01', title: 'Create your profile', desc: 'Sign up and tell us about your startup — name, category, stage, and your founding story.', icon: PenLine },
  { num: '02', title: 'Submit for review', desc: 'Upload documents and verification details. Our team reviews every application personally.', icon: ClipboardList },
  { num: '03', title: 'Get verified badge', desc: 'Once approved, your startup receives a verified badge — trusted by the community.', icon: CheckCircle },
  { num: '04', title: 'Go live on FoundrHUB', desc: 'Your brand is now discoverable. Get featured, attract users, and grow organically.', icon: Rocket },
]

const categories = ['D2C / E-commerce', 'AI / Deep Tech', 'SaaS / B2B', 'Fintech', 'EdTech', 'HealthTech', 'Climate Tech', 'Fashion / Lifestyle', 'Food / Beverage', 'Media / Content', 'Other']
const stages2 = ['Idea', 'MVP', 'Launched', 'Scaling']

const VerifyPage = () => {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [formStep, setFormStep] = useState(0)
  const [form, setForm] = useState({
    name: '', email: '', brandName: '', tagline: '', category: '', stage: '', city: '', website: '', story: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const up = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = () => {
    login({ name: form.name, email: form.email, role: 'founder' })
    setSubmitted(true)
    setTimeout(() => navigate('/dashboard'), 2500)
  }

  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-gradient-to-b from-beige-50 to-white">
        {/* Hero */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-50/30 to-transparent rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-400 mb-4 block">Founder Verification</span>
              <h1 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] text-neutral-950 mb-4">Get your startup verified on FoundrHUB</h1>
              <p className="text-[16px] text-neutral-500 leading-relaxed">Join India's most trusted startup discovery platform. Verified founders get 10x more visibility, investor access, and community trust.</p>
            </motion.div>

            {/* Steps */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                  className="group bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 p-7 hover:bg-white/60 hover:shadow-[0_12px_48px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="text-neutral-700 mb-5"><s.icon size={30} strokeWidth={1.5} /></div>
                  <div className="text-[11px] font-bold text-neutral-300 tracking-widest mb-2">{s.num}</div>
                  <h3 className="text-[16px] font-semibold text-neutral-900 mb-2">{s.title}</h3>
                  <p className="text-[13px] text-neutral-500 leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Form */}
            {!submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-white rounded-3xl border border-neutral-100 p-8 lg:p-10 shadow-[0_4px_32px_-12px_rgba(0,0,0,0.04)]">
                  {/* Stepper */}
                  <div className="flex items-center gap-2 mb-10">
                    {['Your Info', 'Brand Details', 'Submit'].map((label, i) => (
                      <div key={label} className="flex items-center gap-2 flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-all duration-500 ${i < formStep ? 'bg-emerald-500 text-white' : i === formStep ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-400'}`}>
                          {i < formStep ? '✓' : i + 1}
                        </div>
                        <span className={`text-[12px] font-medium hidden sm:block transition-colors duration-300 ${i <= formStep ? 'text-neutral-900' : 'text-neutral-300'}`}>{label}</span>
                        {i < 2 && <div className={`flex-1 h-[2px] rounded-full transition-colors duration-500 ${i < formStep ? 'bg-emerald-500' : 'bg-neutral-100'}`} />}
                      </div>
                    ))}
                  </div>

                  {formStep === 0 && (
                    <div>
                      <h2 className="font-serif text-[1.6rem] text-neutral-950 mb-1">Tell us about yourself</h2>
                      <p className="text-[14px] text-neutral-400 mb-8">We need some basic information to get started.</p>
                      <div className="space-y-5">
                        <div>
                          <label className="block text-[13px] font-medium text-neutral-600 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                          <input type="text" value={form.name} onChange={e => up('name', e.target.value)} placeholder="Ananya Sharma" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-all duration-300" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-medium text-neutral-600 mb-1.5">Email <span className="text-red-400">*</span></label>
                          <input type="email" value={form.email} onChange={e => up('email', e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-all duration-300" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-medium text-neutral-600 mb-1.5">City</label>
                          <input type="text" value={form.city} onChange={e => up('city', e.target.value)} placeholder="Mumbai" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-all duration-300" />
                        </div>
                      </div>
                    </div>
                  )}

                  {formStep === 1 && (
                    <div>
                      <h2 className="font-serif text-[1.6rem] text-neutral-950 mb-1">Your startup details</h2>
                      <p className="text-[14px] text-neutral-400 mb-8">Share the essentials about your brand.</p>
                      <div className="space-y-5">
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-[13px] font-medium text-neutral-600 mb-1.5">Brand Name <span className="text-red-400">*</span></label>
                            <input type="text" value={form.brandName} onChange={e => up('brandName', e.target.value)} placeholder="Bloomcraft Studio" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-all" />
                          </div>
                          <div>
                            <label className="block text-[13px] font-medium text-neutral-600 mb-1.5">Tagline</label>
                            <input type="text" value={form.tagline} onChange={e => up('tagline', e.target.value)} placeholder="Sustainable fashion, reimagined" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-all" />
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-[13px] font-medium text-neutral-600 mb-1.5">Category <span className="text-red-400">*</span></label>
                            <select value={form.category} onChange={e => up('category', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] text-neutral-900 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-all appearance-none cursor-pointer">
                              <option value="">Select...</option>
                              {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[13px] font-medium text-neutral-600 mb-1.5">Stage <span className="text-red-400">*</span></label>
                            <select value={form.stage} onChange={e => up('stage', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] text-neutral-900 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-all appearance-none cursor-pointer">
                              <option value="">Select...</option>
                              {stages2.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[13px] font-medium text-neutral-600 mb-1.5">Website</label>
                          <input type="url" value={form.website} onChange={e => up('website', e.target.value)} placeholder="https://bloomcraft.in" className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-all" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-medium text-neutral-600 mb-1.5">Founder Story</label>
                          <textarea value={form.story} onChange={e => up('story', e.target.value)} placeholder="What inspired you to start this? Share your journey..." rows={4} className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-[14px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-200 transition-all resize-none" />
                        </div>
                      </div>
                    </div>
                  )}

                  {formStep === 2 && (
                    <div className="text-center py-6">
                      <div className="flex justify-center mb-6"><Rocket size={48} strokeWidth={1.5} className="text-neutral-900" /></div>
                      <h2 className="font-serif text-[1.6rem] text-neutral-950 mb-2">Ready to submit?</h2>
                      <p className="text-[14px] text-neutral-400 mb-4 max-w-md mx-auto">Your application will be reviewed by our team. Verification typically takes 24–48 hours.</p>
                      <div className="bg-beige-50 rounded-2xl border border-beige-200/40 p-5 text-left max-w-md mx-auto mb-4">
                        <div className="space-y-2 text-[13px]">
                          <p><span className="text-neutral-400">Name:</span> <span className="font-medium text-neutral-900">{form.name || '—'}</span></p>
                          <p><span className="text-neutral-400">Email:</span> <span className="font-medium text-neutral-900">{form.email || '—'}</span></p>
                          <p><span className="text-neutral-400">Brand:</span> <span className="font-medium text-neutral-900">{form.brandName || '—'}</span></p>
                          <p><span className="text-neutral-400">Category:</span> <span className="font-medium text-neutral-900">{form.category || '—'}</span></p>
                          <p><span className="text-neutral-400">Stage:</span> <span className="font-medium text-neutral-900">{form.stage || '—'}</span></p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8">
                    <button
                      onClick={() => formStep > 0 ? setFormStep(formStep - 1) : null}
                      className={`inline-flex items-center px-6 py-3 rounded-full border border-neutral-200 text-[14px] font-medium text-neutral-600 hover:border-neutral-400 transition-all duration-300 ${formStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                    >
                      <svg className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
                      Back
                    </button>
                    <button
                      onClick={() => formStep < 2 ? setFormStep(formStep + 1) : handleSubmit()}
                      className="inline-flex items-center px-7 py-3 rounded-full bg-neutral-950 text-white text-[14px] font-semibold tracking-wide hover:bg-neutral-800 transition-all duration-300 hover:shadow-lg hover:shadow-neutral-200"
                    >
                      {formStep < 2 ? 'Continue' : 'Submit for Verification'}
                      <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="max-w-md mx-auto text-center bg-white rounded-3xl border border-neutral-100 p-10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)]"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-50 flex items-center justify-center">
                  <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </div>
                <h3 className="font-serif text-[1.6rem] text-neutral-950 mb-2">Submitted for Review!</h3>
                <p className="text-[14px] text-neutral-500 leading-relaxed mb-4">Your startup profile is under review. You'll receive a verified badge within 24–48 hours.</p>
                <p className="text-[12px] text-neutral-400">Redirecting to dashboard...</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default VerifyPage
