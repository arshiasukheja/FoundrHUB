import { useState } from 'react'
import { motion } from 'framer-motion'
import PremiumModal from './PremiumModal'

const ShareModal = ({ isOpen, onClose, onCopied }) => {
  const [copied, setCopied] = useState(false)
  const profileUrl = 'https://foundrhub.in/p/arshia-sukheja'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopied(true)
      onCopied?.()
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback
      const input = document.createElement('input')
      input.value = profileUrl
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      onCopied?.()
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const shareChannels = [
    {
      name: 'LinkedIn',
      color: 'bg-[#0A66C2]/10 text-[#0A66C2] border-[#0A66C2]/20 hover:bg-[#0A66C2]/20',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`,
    },
    {
      name: 'WhatsApp',
      color: 'bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20 hover:bg-[#25D366]/20',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      url: `https://wa.me/?text=${encodeURIComponent(`Check out my startup profile on FoundrHUB! ${profileUrl}`)}`,
    },
    {
      name: 'Twitter / X',
      color: 'bg-neutral-900/10 text-neutral-900 border-neutral-900/20 hover:bg-neutral-900/20',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out my startup profile on @FoundrHUB!`)}&url=${encodeURIComponent(profileUrl)}`,
    },
  ]

  return (
    <PremiumModal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Your Profile"
      subtitle="Get discovered — share your FoundrHUB profile with the world"
      size="max-w-md"
    >
      {/* Profile Preview Card */}
      <div className="rounded-2xl border border-neutral-100 bg-gradient-to-br from-beige-50/60 to-white p-5 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-50 border border-neutral-100 flex items-center justify-center">
            <span className="text-[20px] font-serif font-bold text-neutral-400">F</span>
          </div>
          <div>
            <p className="text-[14px] font-semibold text-neutral-900">FoundrHUB Profile</p>
            <p className="text-[12px] text-neutral-400">foundrhub.in/p/arshia-sukheja</p>
          </div>
        </div>
        <div className="flex gap-2 text-[11px]">
          <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-500">Fashion</span>
          <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-500">Mumbai</span>
          <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-500">D2C</span>
        </div>
      </div>

      {/* Profile URL + Copy */}
      <div className="mb-6">
        <label className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wider block mb-2">Profile Link</label>
        <div className="flex items-center gap-2">
          <div className="flex-1 px-4 py-3 rounded-xl border border-neutral-100 bg-neutral-50/50 text-[13px] text-neutral-600 truncate select-all">
            {profileUrl}
          </div>
          <button
            onClick={handleCopy}
            className={`px-5 py-3 rounded-xl text-[13px] font-semibold transition-all duration-300 flex items-center gap-2 ${
              copied
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                : 'bg-neutral-950 text-white hover:bg-neutral-800'
            }`}
          >
            {copied ? (
              <>
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </motion.svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25H10.5a2.25 2.25 0 00-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.375a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Share Channels */}
      <div className="mb-6">
        <label className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wider block mb-3">Share On</label>
        <div className="grid grid-cols-3 gap-3">
          {shareChannels.map(ch => (
            <a
              key={ch.name}
              href={ch.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-2 px-4 py-4 rounded-2xl border transition-all duration-300 ${ch.color}`}
            >
              {ch.icon}
              <span className="text-[11px] font-semibold">{ch.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* QR Code Placeholder */}
      <div className="mb-6">
        <label className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wider block mb-3">QR Code</label>
        <div className="w-full flex justify-center">
          <div className="w-36 h-36 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-10 h-10 text-neutral-200 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
              </svg>
              <p className="text-[10px] text-neutral-300">QR Code</p>
            </div>
          </div>
        </div>
      </div>

      {/* Open Profile CTA */}
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3.5 rounded-full bg-neutral-950 text-white text-[14px] font-semibold hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
        Open Public Profile
      </a>
    </PremiumModal>
  )
}

export default ShareModal
