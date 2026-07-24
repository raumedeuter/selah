import { motion, AnimatePresence } from "framer-motion";
import { X, Share, Plus, MoreVertical, Download } from "lucide-react";

function InstallModal({ isOpen, onClose, isDark }) {
  const textColor = isDark ? "rgba(255,255,255,0.85)" : "rgba(30,30,40,0.85)";
  const subtextColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(30,30,40,0.5)";
  const cardBg = isDark ? "rgba(20,20,35,0.98)" : "rgba(255,255,255,0.98)";
  const cardBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const stepBg = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";

  const steps = {
    ios: [
      {
        icon: <Share size={16} />,
        text: "Tap the Share button at the bottom of Safari",
      },
      {
        icon: <Plus size={16} />,
        text: 'Scroll down and tap "Add to Home Screen"',
      },
      {
        icon: <Download size={16} />,
        text: 'Tap "Add" in the top right corner',
      },
    ],
    android: [
      {
        icon: <MoreVertical size={16} />,
        text: "Tap the three dots menu in Chrome",
      },
      {
        icon: <Download size={16} />,
        text: 'Tap "Add to Home Screen" or "Install App"',
      },
      { icon: <Plus size={16} />, text: 'Tap "Add" to confirm' },
    ],
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 rounded-3xl p-6"
            style={{
              background: cardBg,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${cardBorder}`,
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
              maxWidth: "400px",
              margin: "0 auto",
              padding: "1.5rem",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.4rem",
                    fontWeight: 500,
                    color: textColor,
                    letterSpacing: "0.05em",
                  }}
                >
                  Install Selah
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.68rem",
                    color: subtextColor,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginTop: "0.2rem",
                  }}
                >
                  Add to your home screen
                </p>
              </div>
              <button
                onClick={onClose}
                style={{ color: subtextColor }}
                className="hover:opacity-60 transition-opacity"
              >
                <X size={18} />
              </button>
            </div>

            {/* iOS Steps */}
            <div className="mb-4">
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: subtextColor,
                  marginBottom: "0.75rem",
                  marginTop: "0.5rem",
                }}
              >
                 iPhone / iPad (Safari)
              </p>
              <div className="flex flex-col gap-2">
                {steps.ios.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl p-3"
                    style={{ background: stepBg }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "rgba(15,118,110,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#0F766E",
                        flexShrink: 0,
                      }}
                    >
                      {step.icon}
                    </div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.75rem",
                        color: textColor,
                        lineHeight: 1.4,
                      }}
                    >
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Android Steps */}
            <div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: subtextColor,
                  marginBottom: "0.75rem",
                  marginTop: "0.5rem",
                }}
              >
                🤖 Android (Chrome)
              </p>
              <div className="flex flex-col gap-2">
                {steps.android.map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl p-3"
                    style={{ background: stepBg }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "8px",
                        background: "rgba(15,118,110,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#0F766E",
                        flexShrink: 0,
                      }}
                    >
                      {step.icon}
                    </div>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.75rem",
                        color: textColor,
                        lineHeight: 1.4,
                      }}
                    >
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer note */}
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                color: subtextColor,
                textAlign: "center",
                marginTop: "1.25rem",
                lineHeight: 1.5,
              }}
            >
              Selah works offline once installed and feels just like a native
              app.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                color: subtextColor,
                textAlign: "center",
                marginTop: "0.75rem",
                opacity: 0.5,
                letterSpacing: "0.05em",
              }}
            >
              © {new Date().getFullYear()} Selah · Crafted with faith by Michael E. Ben-Ikheloah
            </p>
            {/* Bottom Bar */}
            {/* <div className="border-t border-brand-cream mt-6 md:mt-10 pt-4 md:pt-6 text-center text-xs text-brand-brown opacity-50">
        © {new Date().getFullYear()} Selah All rights reserved.
      </div> */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default InstallModal;
