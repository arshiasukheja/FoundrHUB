import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PremiumModal from './PremiumModal'

const UploadModal = ({ isOpen, onClose, onUploadComplete }) => {
  const fileInputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [uploadState, setUploadState] = useState('idle') // idle | uploading | done
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState(null)

  const simulateUpload = useCallback((file) => {
    setUploadedFile({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type.includes('pdf') ? 'PDF' : file.type.includes('presentation') ? 'PPT' : file.name.split('.').pop().toUpperCase(),
      lastModified: new Date(file.lastModified).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    })
    setUploadState('uploading')
    setUploadProgress(0)

    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setTimeout(() => {
          setUploadState('done')
          onUploadComplete?.()
        }, 400)
      }
      setUploadProgress(Math.min(Math.round(progress), 100))
    }, 200)
  }, [onUploadComplete])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) simulateUpload(file)
  }, [simulateUpload])

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = () => setIsDragging(false)

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) simulateUpload(file)
  }

  const handleReplace = () => {
    setUploadState('idle')
    setUploadedFile(null)
    setUploadProgress(0)
  }

  const handleRemove = () => {
    setUploadState('idle')
    setUploadedFile(null)
    setUploadProgress(0)
  }

  const handleClose = () => {
    onClose()
    // Reset state after animation
    setTimeout(() => {
      setUploadState('idle')
      setUploadedFile(null)
      setUploadProgress(0)
    }, 400)
  }

  return (
    <PremiumModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Upload Pitch Deck"
      subtitle="Share your vision with investors and partners"
      size="max-w-lg"
    >
      <AnimatePresence mode="wait">
        {uploadState === 'idle' && (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Drop Zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
                isDragging
                  ? 'border-neutral-400 bg-beige-50 scale-[1.02]'
                  : 'border-neutral-200 bg-beige-50/30 hover:border-neutral-300 hover:bg-beige-50/60'
              }`}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-white border border-neutral-100 flex items-center justify-center mb-4 shadow-sm">
                  <svg className="w-7 h-7 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </div>
                <p className="text-[14px] font-semibold text-neutral-700 mb-1">
                  {isDragging ? 'Drop your file here' : 'Drag & drop your pitch deck'}
                </p>
                <p className="text-[12px] text-neutral-400">or click to browse · PDF, PPT, PPTX, KEY</p>
                <p className="text-[11px] text-neutral-300 mt-2">Max 50MB</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.ppt,.pptx,.key"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            {/* Format Hints */}
            <div className="flex items-center justify-center gap-4 mt-5">
              {['PDF', 'PPT', 'PPTX', 'KEY'].map(fmt => (
                <span key={fmt} className="px-3 py-1 rounded-lg bg-neutral-50 border border-neutral-100 text-[11px] font-medium text-neutral-400">
                  .{fmt.toLowerCase()}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {uploadState === 'uploading' && uploadedFile && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="rounded-2xl border border-neutral-100 bg-white p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                  <span className="text-[18px]">📄</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-neutral-900 truncate">{uploadedFile.name}</p>
                  <p className="text-[12px] text-neutral-400">{uploadedFile.size} · {uploadedFile.type}</p>
                </div>
                <span className="text-[13px] font-semibold text-neutral-500">{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-neutral-400 to-neutral-900"
                />
              </div>
              <p className="text-[11px] text-neutral-400 mt-2">Uploading your pitch deck...</p>
            </div>
          </motion.div>
        )}

        {uploadState === 'done' && uploadedFile && (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            {/* Success Banner */}
            <div className="rounded-2xl bg-beige-50 border border-beige-200/60 p-4 mb-5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="text-[13px] font-semibold text-neutral-800">Upload complete</p>
                <p className="text-[11px] text-neutral-500">Your pitch deck is ready to share</p>
              </div>
            </div>

            {/* File Card */}
            <div className="rounded-2xl border border-neutral-100 bg-white p-6 mb-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 border border-neutral-100 flex items-center justify-center">
                  <span className="text-[22px]">📑</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-neutral-900 truncate">{uploadedFile.name}</p>
                  <p className="text-[12px] text-neutral-400">{uploadedFile.size} · Uploaded {uploadedFile.lastModified}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={handleReplace}
                className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 text-[13px] font-medium text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 transition-all duration-300"
              >
                Replace File
              </button>
              <button
                onClick={handleRemove}
                className="flex-1 px-4 py-2.5 rounded-xl border border-red-100 text-[13px] font-medium text-red-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50/50 transition-all duration-300"
              >
                Remove
              </button>
            </div>

            {/* Submit CTA */}
            <button className="w-full py-3.5 rounded-full bg-neutral-950 text-white text-[14px] font-semibold hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              Submit to Investors
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </PremiumModal>
  )
}

export default UploadModal
