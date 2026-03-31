import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ActionDrawer from './ActionDrawer'

const StoryEditor = ({ isOpen, onClose, onPublish }) => {
  const [isPreview, setIsPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [story, setStory] = useState({
    title: '',
    coverImage: null,
    quote: '',
    origin: '',
    struggles: '',
    traction: '',
    vision: '',
    milestones: [
      { year: '', event: '' },
      { year: '', event: '' },
      { year: '', event: '' },
    ],
  })

  const update = (key) => (e) => setStory(prev => ({ ...prev, [key]: e.target.value }))

  const updateMilestone = (index, field) => (e) => {
    setStory(prev => {
      const milestones = [...prev.milestones]
      milestones[index] = { ...milestones[index], [field]: e.target.value }
      return { ...prev, milestones }
    })
  }

  const addMilestone = () => {
    setStory(prev => ({
      ...prev,
      milestones: [...prev.milestones, { year: '', event: '' }],
    }))
  }

  const handlePublish = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSaving(false)
    onPublish?.(story)
  }

  const SectionLabel = ({ children }) => (
    <h3 className="font-serif text-[1.1rem] text-neutral-900 mb-3 mt-8 first:mt-0">{children}</h3>
  )

  const TextArea = ({ value, onChange, placeholder, rows = 4, serif = false }) => (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full px-5 py-4 rounded-2xl border border-neutral-100 bg-white text-[14px] text-neutral-800 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-300 focus:ring-4 focus:ring-neutral-50 transition-all duration-300 resize-none leading-relaxed ${serif ? 'font-serif text-[15px]' : ''}`}
    />
  )

  return (
    <ActionDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Write Your Founder Story"
      subtitle="Tell your journey — inspire investors and the community"
      width="max-w-3xl"
    >
      {/* Mode Toggle */}
      <div className="flex items-center gap-2 mb-8 p-1 rounded-xl bg-neutral-50 border border-neutral-100 w-fit">
        <button
          onClick={() => setIsPreview(false)}
          className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-300 ${
            !isPreview ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          ✏️ Write
        </button>
        <button
          onClick={() => setIsPreview(true)}
          className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-300 ${
            isPreview ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-400 hover:text-neutral-600'
          }`}
        >
          👁 Preview
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!isPreview ? (
          <motion.div
            key="editor"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
          >
            {/* Cover Image Placeholder */}
            <div className="mb-8">
              <label className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wider block mb-3">Cover Image</label>
              <div className="w-full h-48 rounded-2xl border-2 border-dashed border-neutral-200 bg-beige-50/30 flex items-center justify-center cursor-pointer hover:border-neutral-300 transition-all duration-300">
                <div className="text-center">
                  <svg className="w-8 h-8 text-neutral-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <p className="text-[12px] text-neutral-400">Add a cover image for your story</p>
                  <p className="text-[11px] text-neutral-300 mt-1">1200×630 recommended</p>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="mb-6">
              <label className="text-[12px] font-semibold text-neutral-500 uppercase tracking-wider block mb-2">Story Title</label>
              <input
                value={story.title}
                onChange={update('title')}
                placeholder="The story behind building something extraordinary..."
                className="w-full px-5 py-4 rounded-2xl border border-neutral-100 bg-white text-[18px] font-serif text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-300 focus:ring-4 focus:ring-neutral-50 transition-all duration-300"
              />
            </div>

            {/* Founder Quote */}
            <SectionLabel>✦ Founder Quote</SectionLabel>
            <div className="relative mb-6">
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-neutral-300 to-neutral-100" />
              <div className="pl-6">
                <TextArea
                  value={story.quote}
                  onChange={update('quote')}
                  placeholder="A powerful quote that defines your journey..."
                  rows={3}
                  serif
                />
              </div>
            </div>

            {/* Origin Story */}
            <SectionLabel>✦ The Origin</SectionLabel>
            <TextArea
              value={story.origin}
              onChange={update('origin')}
              placeholder="How did it all begin? What was the spark that ignited this idea?"
              rows={5}
            />

            {/* Struggles */}
            <SectionLabel>✦ The Struggles</SectionLabel>
            <TextArea
              value={story.struggles}
              onChange={update('struggles')}
              placeholder="Every great story has its challenges. What obstacles did you face?"
              rows={4}
            />

            {/* Journey Timeline */}
            <SectionLabel>✦ Journey Timeline</SectionLabel>
            <div className="space-y-3 mb-6">
              {story.milestones.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-neutral-200 border-2 border-white shadow-sm" />
                    {i < story.milestones.length - 1 && (
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-px h-8 bg-neutral-100" />
                    )}
                  </div>
                  <input
                    value={m.year}
                    onChange={updateMilestone(i, 'year')}
                    placeholder="Year"
                    className="w-20 px-3 py-2.5 rounded-xl border border-neutral-100 bg-white text-[13px] text-neutral-700 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-300 transition-all duration-300"
                  />
                  <input
                    value={m.event}
                    onChange={updateMilestone(i, 'event')}
                    placeholder="What happened?"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-100 bg-white text-[13px] text-neutral-700 placeholder:text-neutral-300 focus:outline-none focus:border-neutral-300 transition-all duration-300"
                  />
                </div>
              ))}
              <button
                onClick={addMilestone}
                className="ml-6 text-[12px] font-semibold text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                + Add milestone
              </button>
            </div>

            {/* Traction */}
            <SectionLabel>✦ Traction & Milestones</SectionLabel>
            <TextArea
              value={story.traction}
              onChange={update('traction')}
              placeholder="Revenue, users, partnerships, awards — share your wins."
              rows={4}
            />

            {/* Future Vision */}
            <SectionLabel>✦ Future Vision</SectionLabel>
            <TextArea
              value={story.vision}
              onChange={update('vision')}
              placeholder="Where is this heading? What's the grand vision?"
              rows={4}
            />
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.25 }}
            className="prose-neutral max-w-none"
          >
            {/* Cover Image Preview */}
            <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-beige-100 to-beige-50 border border-neutral-100 flex items-center justify-center mb-8">
              <span className="text-[11px] text-neutral-400 uppercase tracking-wider">Cover Image</span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-[clamp(1.5rem,3vw,2rem)] text-neutral-950 leading-tight mb-6">
              {story.title || 'Your Story Title'}
            </h1>

            {/* Quote */}
            {story.quote && (
              <div className="relative my-8">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-neutral-300 to-neutral-100" />
                <blockquote className="pl-6 text-[16px] font-serif italic text-neutral-600 leading-relaxed">
                  "{story.quote}"
                </blockquote>
              </div>
            )}

            {/* Sections */}
            {story.origin && (
              <div className="mb-8">
                <h3 className="font-serif text-[1rem] text-neutral-700 mb-2">The Origin</h3>
                <p className="text-[14px] text-neutral-500 leading-relaxed whitespace-pre-wrap">{story.origin}</p>
              </div>
            )}

            {story.struggles && (
              <div className="mb-8">
                <h3 className="font-serif text-[1rem] text-neutral-700 mb-2">The Struggles</h3>
                <p className="text-[14px] text-neutral-500 leading-relaxed whitespace-pre-wrap">{story.struggles}</p>
              </div>
            )}

            {/* Timeline Preview */}
            {story.milestones.some(m => m.year || m.event) && (
              <div className="mb-8">
                <h3 className="font-serif text-[1rem] text-neutral-700 mb-4">Journey Timeline</h3>
                <div className="space-y-4 relative">
                  <div className="absolute left-1.5 top-2 bottom-2 w-px bg-neutral-100" />
                  {story.milestones.filter(m => m.year || m.event).map((m, i) => (
                    <div key={i} className="flex items-start gap-4 relative">
                      <div className="w-3 h-3 rounded-full bg-neutral-900 border-2 border-white shadow-sm mt-1 flex-shrink-0" />
                      <div>
                        <span className="text-[12px] font-semibold text-neutral-400">{m.year}</span>
                        <p className="text-[14px] text-neutral-600">{m.event}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {story.traction && (
              <div className="mb-8">
                <h3 className="font-serif text-[1rem] text-neutral-700 mb-2">Traction & Milestones</h3>
                <p className="text-[14px] text-neutral-500 leading-relaxed whitespace-pre-wrap">{story.traction}</p>
              </div>
            )}

            {story.vision && (
              <div className="mb-8">
                <h3 className="font-serif text-[1rem] text-neutral-700 mb-2">Future Vision</h3>
                <p className="text-[14px] text-neutral-500 leading-relaxed whitespace-pre-wrap">{story.vision}</p>
              </div>
            )}

            {/* Empty State */}
            {!story.title && !story.quote && !story.origin && (
              <div className="text-center py-12">
                <p className="text-[14px] text-neutral-400">Start writing your story to see a preview here.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-6 mt-8 border-t border-neutral-100">
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-full border border-neutral-200 text-[13px] font-semibold text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 transition-all duration-300"
        >
          Save Draft
        </button>
        <button
          onClick={handlePublish}
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
              Publishing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6V7.5z" />
              </svg>
              Publish Story
            </>
          )}
        </button>
      </div>
    </ActionDrawer>
  )
}

export default StoryEditor
