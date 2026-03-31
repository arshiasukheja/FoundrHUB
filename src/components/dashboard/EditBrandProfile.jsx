import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import ActionDrawer from './ActionDrawer'

const CATEGORIES = ['Fashion', 'Tech', 'Food & Beverage', 'Health & Wellness', 'Education', 'Finance', 'E-Commerce', 'SaaS', 'Media', 'Sustainability', 'Travel', 'Real Estate']
const STAGES = ['Idea', 'Pre-Seed', 'Seed', 'Series A', 'Series B', 'Growth', 'Profitable']
const MODELS = ['D2C', 'B2B', 'B2C', 'Marketplace', 'Subscription', 'Freemium', 'SaaS', 'Hybrid']

const InputField = ({ label, value, onChange, placeholder, type = 'text', icon }) => (
  <div className="space-y-1.5">
    <label className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wider">{label}</label>
    <div className="relative">
      {icon && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-300">{icon}</span>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full ${icon ? 'pl-10' : 'px-4'} pr-4 py-3 rounded-xl border border-neutral-100 bg-white text-[14px] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-300 focus:ring-4 focus:ring-neutral-50 transition-all duration-300`}
      />
    </div>
  </div>
)

const SelectField = ({ label, value, onChange, options, placeholder }) => (
  <div className="space-y-1.5">
    <label className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wider">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl border border-neutral-100 bg-white text-[14px] text-neutral-900 focus:outline-none focus:border-neutral-300 focus:ring-4 focus:ring-neutral-50 appearance-none transition-all duration-300"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' }}
    >
      <option value="" disabled>{placeholder || 'Select...'}</option>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
)

const EditBrandProfile = ({ isOpen, onClose, onSave }) => {
  const fileInputRef = useRef(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  const [form, setForm] = useState({
    brandName: '',
    tagline: '',
    category: '',
    city: '',
    state: '',
    website: '',
    instagram: '',
    linkedin: '',
    businessModel: '',
    founderName: '',
    teamSize: '',
    stage: '',
  })

  const update = (key) => (val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setLogoPreview(ev.target.result)
      reader.readAsDataURL(file)
    }
  }

  const filledFields = Object.values(form).filter(Boolean).length + (logoPreview ? 1 : 0)
  const totalFields = Object.keys(form).length + 1
  const completion = Math.round((filledFields / totalFields) * 100)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1200))
    setIsSaving(false)
    onSave?.({ ...form, logo: logoPreview, completion })
  }

  return (
    <ActionDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Brand Profile"
      subtitle="Keep your startup profile updated for better discovery"
      width="max-w-2xl"
    >
      {/* Completion Indicator */}
      <div className="mb-8 p-4 rounded-2xl bg-beige-50/60 border border-beige-200/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-semibold text-neutral-500">Profile Completion</span>
          <span className="text-[14px] font-bold text-neutral-900">{completion}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-neutral-100 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completion}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-neutral-400 to-neutral-900"
          />
        </div>
      </div>

      {/* Logo Upload */}
      <div className="mb-8">
        <label className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wider block mb-3">Brand Logo</label>
        <div className="flex items-center gap-5">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-20 h-20 rounded-2xl border-2 border-dashed border-neutral-200 flex items-center justify-center overflow-hidden hover:border-neutral-400 transition-all duration-300 bg-beige-50/40"
          >
            {logoPreview ? (
              <img src={logoPreview} alt="Logo" className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <svg className="w-7 h-7 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            )}
          </button>
          <div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-[13px] font-semibold text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              Upload logo
            </button>
            <p className="text-[11px] text-neutral-400 mt-0.5">PNG, JPG or SVG · Max 2MB</p>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
        </div>
      </div>

      {/* Form Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        <InputField label="Startup / Brand Name" value={form.brandName} onChange={update('brandName')} placeholder="e.g. FoundrHUB" />
        <InputField label="One-line Tagline" value={form.tagline} onChange={update('tagline')} placeholder="Discover India's best startups" />
        <SelectField label="Category" value={form.category} onChange={update('category')} options={CATEGORIES} placeholder="Choose category" />
        <SelectField label="Business Model" value={form.businessModel} onChange={update('businessModel')} options={MODELS} placeholder="Choose model" />
        <InputField label="City" value={form.city} onChange={update('city')} placeholder="e.g. Mumbai" />
        <InputField label="State" value={form.state} onChange={update('state')} placeholder="e.g. Maharashtra" />
        <InputField
          label="Website"
          value={form.website}
          onChange={update('website')}
          placeholder="https://"
          type="url"
          icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>}
        />
        <InputField
          label="Instagram"
          value={form.instagram}
          onChange={update('instagram')}
          placeholder="@handle"
          icon={<span className="text-[14px]">📷</span>}
        />
        <InputField
          label="LinkedIn"
          value={form.linkedin}
          onChange={update('linkedin')}
          placeholder="linkedin.com/company/..."
          icon={<span className="text-[14px]">💼</span>}
        />
        <InputField label="Founder Name" value={form.founderName} onChange={update('founderName')} placeholder="Your full name" />
        <InputField label="Team Size" value={form.teamSize} onChange={update('teamSize')} placeholder="e.g. 5" type="number" />
        <SelectField label="Stage" value={form.stage} onChange={update('stage')} options={STAGES} placeholder="Current stage" />
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-full border border-neutral-200 text-[13px] font-semibold text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 transition-all duration-300"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-neutral-950 text-white text-[13px] font-semibold hover:bg-neutral-800 transition-all duration-300 disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
              />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </ActionDrawer>
  )
}

export default EditBrandProfile
