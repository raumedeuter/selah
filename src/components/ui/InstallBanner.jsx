import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download } from 'lucide-react'

function InstallBanner({ isDark, palette, onLearnMore }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('selah_install_banner_dismissed')
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (!dismissed && !isStandalone) {
      setTimeout(() => setVisible(true), 3000)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('selah_install_banner_dismissed', 'true')
    setVisible(false)
  }

  const textColor = isDark ? 'rgba(255,255,255,0.85)' : 'rgba(30,30,40,0.85)'
  const subtextColor = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(30,30,40,0.45)'
  const cardBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.75)'
  const cardBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)'

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-4 right-4 z-50 rounded-2xl p-4"
          style={{
            background: cardBg,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${cardBorder}`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            padding: '0.5rem',
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <div
                className="flex items-center justify-center rounded-xl shrink-0"
                style={{
                  width: '40px',
                  height: '40px',
                  background: `${palette.pill}`,
                  border: `1px solid ${palette.pillBorder}`,
                  marginBottom: '0.25rem',
                }}
              >
                <Download size={18} style={{ color: palette.accent}} />
              </div>
              <div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: textColor,
                  marginBottom: '0.2rem',
                }}>
                  Install Selah
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.7rem',
                  color: subtextColor,
                  lineHeight: 1.5,
                }}>
                  Add to your home screen for the best experience
                </p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              style={{ color: subtextColor }}
              className="hover:opacity-60 transition-opacity shrink-0"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex gap-2 mt-3">
            <motion.button
              onClick={onLearnMore}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-2 rounded-xl text-center"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 600,
                color: '#fff',
                background: palette.pillActive,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              How to Install
            </motion.button>
            <motion.button
              onClick={handleDismiss}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-2 rounded-xl text-center"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 500,
                color: subtextColor,
                background: 'none',
                border: `1px solid ${cardBorder}`,
                cursor: 'pointer',
              }}
            >
              Maybe later
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default InstallBanner