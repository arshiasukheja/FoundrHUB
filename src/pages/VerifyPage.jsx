import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAuth } from '../context/AuthContext'
import { PenLine, ClipboardList, CheckCircle, Rocket, Image, Layout, FileText, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

const steps = [
  { num: '01', title: 'Create your profile', desc: 'Sign up and tell us about your startup — name, category, stage, and your founding story.', icon: PenLine },
  { num: '02', title: 'Brand Identity', desc: 'Add your detailed concept, cover images, and visual gallery for the explore page.', icon: Layout },
  { num: '03', title: 'Submission', desc: 'Review your data and submit for manual verification by our specialized team.', icon: Rocket },
]

const categories = ['D2C / E-commerce', 'AI / Deep Tech', 'SaaS / B2B', 'Fintech', 'EdTech', 'HealthTech', 'Climate Tech', 'Fashion / Lifestyle', 'Food / Beverage', 'Media / Content', 'Other']
const stages2 = ['Idea', 'MVP', 'Launched', 'Scaling']

const VerifyPage = () => {
  const { isAuthenticated, updateUser } = useAuth()
  const navigate = useNavigate()
  const [formStep, setFormStep] = useState(0)
  const [form, setForm] = useState({
    name: '', 
    email: '', 
    brandName: '', 
    tagline: '', 
    category: '', 
    stage: '', 
    city: '', 
    website: '', 
    story: '',
    fullConcept: '', // New detailed description
    coverImage: '', // New cover img
    gallery: '', // New gallery urls
  })
  const [submitted, setSubmitted] = useState(false)

  const up = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = () => {
    // Save details to the global user context
    updateUser({
      brandName: form.brandName,
      tagline: form.tagline,
      category: form.category,
      stage: form.stage,
      city: form.city,
      website: form.website,
      story: form.story,
      fullConcept: form.fullConcept,
      coverImage: form.coverImage,
      gallery: form.gallery,
    })

    setSubmitted(true)
    setTimeout(() => navigate('/dashboard/founder'), 2500)
  }

  return (
    <>
      <Navbar />
      <main className="pt-[72px] min-h-screen bg-gradient-to-b from-[#FAFAFD] to-white">
        {/* Hero */}
        <section className="py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5B65DC]/5 rounded-full blur-[120px]" />
            <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-[#122056]/5 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-[#5B65DC] mb-4 block">Enlistment Vector</span>
              <h1 className="font-serif text-[clamp(2.4rem,4.5vw,3.5rem)] leading-[1.1] text-[#122056] mb-4">Get verified on <span className="text-[#5B65DC]">FoundrHUB</span></h1>
              <p className="text-[16px] text-[#122056]/50 leading-relaxed font-medium">Join India's most cinematic startup discovery portal. Verified brands receive prioritized exposure and investor visibility.</p>
            </motion.div>

            {/* Stepper HUD */}
            <div className="max-w-3xl mx-auto mb-16 px-10 py-6 bg-white/40 backdrop-blur-2xl border border-[#EEF0FD] rounded-[2.5rem] flex items-center justify-between shadow-2xl shadow-[#122056]/5">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-center gap-4 flex-1 last:flex-none">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-500 shadow-lg ${i < formStep ? 'bg-emerald-500 text-white scale-95 opacity-50' : i === formStep ? 'bg-[#122056] text-white' : 'bg-[#EEF0FD] text-[#122056]/30'}`}>
                    {i < formStep ? '✓' : s.num}
                  </div>
                  <div className="hidden lg:block">
                    <p className={`text-[11px] font-black uppercase tracking-widest ${i <= formStep ? 'text-[#122056]' : 'text-[#122056]/20'}`}>{s.title}</p>
                  </div>
                  {i < steps.length - 1 && <div className={`h-[1px] flex-1 mx-4 rounded-full ${i < formStep ? 'bg-emerald-500' : 'bg-[#EEF0FD]'}`} />}
                </div>
              ))}
            </div>

            {/* Form Interface */}
            {!submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="max-w-4xl mx-auto"
              >
                <div className="bg-white rounded-[3.5rem] border border-[#EEF0FD] p-10 lg:p-14 shadow-[0_30px_60px_-15px_rgba(18,32,86,0.08)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#5B65DC]/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

                  {formStep === 0 && (
                    <div className="animate-fade-in-up">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-2xl bg-[#EEF2FF] text-[#5B65DC] flex items-center justify-center">
                          <Rocket size={18} />
                        </div>
                        <h2 className="font-serif text-[1.8rem] text-[#122056]">Primary Identifiers</h2>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                          <div className="group">
                            <label className="block text-[11px] font-black text-[#122056]/40 uppercase tracking-widest mb-2 px-1">Startup Name *</label>
                            <input type="text" value={form.brandName} onChange={e => up('brandName', e.target.value)} placeholder="e.g. Vector Logic" className="foundry-input" />
                          </div>
                          <div className="group">
                            <label className="block text-[11px] font-black text-[#122056]/40 uppercase tracking-widest mb-2 px-1">Category *</label>
                            <select value={form.category} onChange={e => up('category', e.target.value)} className="foundry-input appearance-none cursor-pointer">
                              <option value="">Select Category...</option>
                              {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="group">
                            <label className="block text-[11px] font-black text-[#122056]/40 uppercase tracking-widest mb-2 px-1">Tagline</label>
                            <input type="text" value={form.tagline} onChange={e => up('tagline', e.target.value)} placeholder="One-line vision statement" className="foundry-input" />
                          </div>
                          <div className="group">
                            <label className="block text-[11px] font-black text-[#122056]/40 uppercase tracking-widest mb-2 px-1">Growth Stage *</label>
                            <select value={form.stage} onChange={e => up('stage', e.target.value)} className="foundry-input appearance-none cursor-pointer">
                              <option value="">Select Stage...</option>
                              {stages2.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {formStep === 1 && (
                    <div className="animate-fade-in-up">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-2xl bg-[#FFF1F2] text-[#E11D48] flex items-center justify-center">
                          <Image size={18} />
                        </div>
                        <h2 className="font-serif text-[1.8rem] text-[#122056]">Visual & Narrative Details</h2>
                      </div>
                      
                      <div className="space-y-8">
                        {/* Concept Description */}
                        <div>
                          <label className="block text-[11px] font-black text-[#122056]/40 uppercase tracking-widest mb-2 px-1">The Idea (Detailed Concept) *</label>
                          <textarea 
                            value={form.fullConcept} 
                            onChange={e => up('fullConcept', e.target.value)} 
                            placeholder="Deep dive into your product, the problem it solves, and your vision..." 
                            rows={5} 
                            className="foundry-input resize-none py-4" 
                          />
                        </div>

                        {/* Media Section */}
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[11px] font-black text-[#122056]/40 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                              Cover Image URL <Sparkles size={12} className="text-amber-500" />
                            </label>
                            <input 
                              type="url" 
                              value={form.coverImage} 
                              onChange={e => up('coverImage', e.target.value)} 
                              placeholder="Direct link to a high-res cover image" 
                              className="foundry-input" 
                            />
                            <p className="text-[10px] text-[#122056]/30 mt-2 italic">Recommended: 1920x1080 Aspect Ratio</p>
                          </div>
                          <div>
                            <label className="block text-[11px] font-black text-[#122056]/40 uppercase tracking-widest mb-2 px-1">Gallery Image URLs</label>
                            <input 
                              type="text" 
                              value={form.gallery} 
                              onChange={e => up('gallery', e.target.value)} 
                              placeholder="Comma separated: url1, url2, url3" 
                              className="foundry-input" 
                            />
                            <p className="text-[10px] text-[#122056]/30 mt-2 italic">Add up to 4 URLs for your startup gallery</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {formStep === 2 && (
                    <div className="text-center py-10 animate-fade-in-up">
                      <div className="w-20 h-20 mx-auto rounded-[2rem] bg-[#122056] text-white flex items-center justify-center mb-8 shadow-2xl shadow-[#122056]/30">
                        <FileText size={32} />
                      </div>
                      <h2 className="font-serif text-[2rem] text-[#122056] mb-3">Ready for Final Review?</h2>
                      <p className="text-[15px] text-[#122056]/40 mb-10 max-w-md mx-auto">Once submitted, your startup profile will be processed by our verification vector.</p>
                      
                      <div className="bg-[#FAFAFD] rounded-3xl border border-[#EEF0FD] p-8 text-left max-w-xl mx-auto space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-[#EEF0FD]">
                          <span className="text-[10px] font-black uppercase text-[#122056]/30 px-1">Brand Name</span>
                          <span className="text-sm font-bold text-[#122056]">{form.brandName}</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-[#EEF0FD]">
                          <span className="text-[10px] font-black uppercase text-[#122056]/30 px-1">Growth Category</span>
                          <span className="text-sm font-bold text-[#5B65DC]">{form.category}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase text-[#122056]/30 px-1">Description Sync</span>
                          <span className="text-sm font-bold text-[#122056]">{form.fullConcept ? 'Ready' : 'Required'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation HUD */}
                  <div className="flex items-center justify-between mt-16 pt-10 border-t border-[#EEF0FD]">
                    <button
                      onClick={() => formStep > 0 ? setFormStep(formStep - 1) : null}
                      className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#122056]/40 hover:text-[#122056] transition-all ${formStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                    >
                      <ChevronLeft size={16} /> Back Step
                    </button>
                    <button
                      onClick={() => formStep < 2 ? setFormStep(formStep + 1) : handleSubmit()}
                      className="px-10 py-5 rounded-[2rem] bg-[#122056] text-white text-[13px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-[#122056]/20 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-3 group"
                    >
                      {formStep < 2 ? 'Proceed to Next' : 'Launch Verification'}
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto text-center bg-white rounded-[3rem] border border-[#EEF0FD] p-12 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
                <div className="w-20 h-20 mx-auto mb-10 rounded-[2rem] bg-[#F0FDF4] border border-[#DCFCE7] flex items-center justify-center text-emerald-600">
                  <CheckCircle size={40} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-[2rem] text-[#122056] mb-3">Enlistment Success</h3>
                <p className="text-[14px] text-[#122056]/50 leading-relaxed mb-8">Your startup is now queued for verification. The badge will appear on your profile once validated.</p>
                <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#5B65DC] animate-pulse">
                   Syncing with Dashboard
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Global Input Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .foundry-input {
          width: 100%;
          padding: 1rem 1.5rem;
          border-radius: 1.25rem;
          border: 1px solid #EEF0FD;
          background: #FAFAFD;
          color: #122056;
          font-size: 0.875rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .foundry-input:focus {
          outline: none;
          border-color: #5B65DC;
          background: white;
          box-shadow: 0 0 0 4px rgba(91, 101, 220, 0.05);
        }
        .foundry-input::placeholder {
          color: rgba(18, 32, 86, 0.2);
          font-weight: 500;
        }
      `}} />
    </>
  )
}

export default VerifyPage
