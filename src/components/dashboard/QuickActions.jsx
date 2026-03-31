import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EditBrandProfile from './EditBrandProfile'
import UploadModal from './UploadModal'
import StoryEditor from './StoryEditor'
import ShareModal from './ShareModal'
import DashboardToast from './DashboardToast'

const QuickActions = () => {
  const navigate = useNavigate()
  const [activeModal, setActiveModal] = useState(null)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type, key: Date.now() })
  }

  const actions = [
    {
      label: 'Edit Brand Profile',
      emoji: '✏️',
      onClick: () => setActiveModal('editProfile'),
    },
    {
      label: 'Upload Pitch Deck',
      emoji: '📄',
      onClick: () => setActiveModal('uploadDeck'),
    },
    {
      label: 'Write Founder Story',
      emoji: '📝',
      onClick: () => setActiveModal('writeStory'),
    },
    {
      label: 'View Analytics',
      emoji: '📊',
      onClick: () => navigate('/dashboard/analytics'),
    },
    {
      label: 'Share Profile Link',
      emoji: '🔗',
      onClick: () => setActiveModal('shareProfile'),
    },
  ]

  return (
    <>
      <div className="lg:col-span-2 bg-white rounded-3xl border border-neutral-100 p-7">
        <p className="text-[15px] font-semibold text-neutral-900 mb-1">Quick Actions</p>
        <p className="text-[13px] text-neutral-400 mb-5">Keep your profile updated</p>
        <div className="space-y-3">
          {actions.map(({ label, emoji, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-neutral-100 text-[13px] font-medium text-neutral-600 hover:border-neutral-300 hover:text-neutral-900 hover:bg-beige-50/40 transition-all duration-300 text-left"
            >
              <span>{emoji}</span>{label}
            </button>
          ))}
        </div>
      </div>

      {/* Modals */}
      <EditBrandProfile
        isOpen={activeModal === 'editProfile'}
        onClose={() => setActiveModal(null)}
        onSave={(data) => {
          setActiveModal(null)
          showToast(`Profile updated · ${data.completion}% complete`, 'success')
        }}
      />

      <UploadModal
        isOpen={activeModal === 'uploadDeck'}
        onClose={() => setActiveModal(null)}
        onUploadComplete={() => {
          showToast('Pitch deck uploaded successfully', 'success')
        }}
      />

      <StoryEditor
        isOpen={activeModal === 'writeStory'}
        onClose={() => setActiveModal(null)}
        onPublish={() => {
          setActiveModal(null)
          showToast('Founder story published ✨', 'success')
        }}
      />

      <ShareModal
        isOpen={activeModal === 'shareProfile'}
        onClose={() => setActiveModal(null)}
        onCopied={() => {
          showToast('Profile link copied to clipboard', 'copied')
        }}
      />

      {/* Toast */}
      {toast && (
        <DashboardToast
          key={toast.key}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}

export default QuickActions
