import { motion } from 'framer-motion'

function VerseOfTheDay() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mx-auto max-w-2xl mt-8 rounded-2xl p-8"
      style={{
        background: 'rgba(255, 255, 255, 0.35)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
      }}
    >
      <p className="text-xs uppercase tracking-widest text-slate-400 mb-4">
        Verse of the Day
      </p>
      <p className="text-slate-700 text-lg leading-relaxed italic mb-6">
        "You make known to me the path of life; you will fill me with joy in your presence, with eternal pleasures at your right hand."
      </p>
      <p className="text-sm text-slate-500 font-medium">— Psalm 16:11</p>
    </motion.div>
  )
}

export default VerseOfTheDay