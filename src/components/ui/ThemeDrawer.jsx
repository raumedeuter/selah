import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { themes } from "../../data/themes";
import {
  Smile,
  Feather,
  Wind,
  CloudRain,
  Moon,
  Flame,
  Sunrise,
  Heart,
  BookOpen,
  HeartHandshake,
} from "lucide-react";

const iconMap = {
  Smile,
  Feather,
  Wind,
  CloudRain,
  Moon,
  Flame,
  Sunrise,
  Heart,
  BookOpen,
  HeartHandshake,
};

function ThemeDrawer({
  isOpen,
  onClose,
  selectedTheme,
  onSelectTheme,
  palette,
  isDark,
}) {
  const textColor = isDark ? "rgba(255,255,255,0.85)" : "rgba(30,30,40,0.85)";
  const subtextColor = isDark
    ? "rgba(255,255,255,0.45)"
    : "rgba(30,30,40,0.45)";
  const cardBg = isDark ? "rgba(20,20,35,0.95)" : "rgba(255,255,255,0.95)";
  const cardBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.7)";

  const handleSelect = (themeId) => {
    onSelectTheme(themeId);
    onClose();
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
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl px-6 pt-5 pb-24"
            style={{
              background: cardBg,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${cardBorder}`,
              boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
            }}
          >
            {/* Handle */}
            <div className="flex justify-center mb-4">
              <div
                style={{
                  width: "36px",
                  height: "4px",
                  borderRadius: "999px",
                  background: subtextColor,
                  opacity: 0.4,
                }}
              />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    color: textColor,
                    margin: "1rem",
                  }}
                >
                  What's on your heart?
                </p>
                <p
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: subtextColor,
                    margin: "0.2rem 0 1rem 1rem",
                  }}
                >
                  Choose a theme
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  color: subtextColor,
                  margin: "1rem",
                }}
                className="hover:opacity-60 transition-opacity"
              >
                <X size={18} />
              </button>
            </div>

            {/* Theme grid */}
            <div className="flex flex-wrap justify-center gap-2">
              {themes.map((theme) => {
                const isActive = selectedTheme === theme.id;
                const IconComponent = iconMap[theme.icon];
                return (
                  <motion.button
                    key={theme.id}
                    onClick={() => handleSelect(theme.id)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: "0.05em",
                      padding: "0.5rem 1.1rem",
                      borderRadius: "999px",
                      border: `1px solid ${isActive ? palette.pillActive : palette.pillBorder}`,
                      background: isActive ? palette.pillActive : palette.pill,
                      color: isActive ? "#fff" : textColor,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.35rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {IconComponent && <IconComponent size={11} />}
                    {theme.label}
                  </motion.button>
                );
              })}
            </div>
            <div style={{ height: "24px" }} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ThemeDrawer;
