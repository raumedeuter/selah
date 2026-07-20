import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  RefreshCw,
  Moon,
  Sun,
  Smile,
  Feather,
  Wind,
  CloudRain,
  Flame,
  Sunrise,
  BookOpen,
  Quote,
  HeartHandshake,
  Bookmark,
  ChevronDown,
  Share2,
  Copy,
  Check,
} from "lucide-react";
import { themes } from "../data/themes";
import { seedVerses } from "../data/verses";
import { saintQuotes } from "../data/saints";
import { themeColors } from "../data/themeColors";
// import { useFavourites } from "../hooks/useFavourites";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/useTheme";
import StarField from "../components/ui/StarField";
import LightRays from "../components/ui/LightRays";
import { useGlassSheen } from "../hooks/useGlassSheen";
import ThemeDrawer from "../components/ui/ThemeDrawer";
import FloatingSymbols from "../components/ui/FloatingSymbols";
import CrossBearer from "../components/ui/CrossBearer";
import RisenChrist from "../components/ui/RisenChrist";
import { requestNotificationPermission } from "../services/firebase";
import votdBgLight from '../assets/votd-bg.jpg'
import votdBgDark from '../assets/votd-bg-dark.jpg'
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getVerseOfTheDay() {
  const all = [];
  themes.forEach((theme) => {
    const verses = (seedVerses[theme.id] || []).map((v) => ({
      ...v,
      type: "verse",
      themeId: theme.id,
    }));
    all.push(...verses);
  });
  const now = new Date();
  const dayOfYear = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / 86400000,
  );
  return all[dayOfYear % all.length];
}

const iconMap = {
  Smile,
  Feather,
  Wind,
  CloudRain,
  Moon,
  Flame,
  Sunrise,
  BookOpen,
  HeartHandshake,
  Heart,
  Quote,
};

const themeRows = [
  ["joy", "peace", "anxiety"],
  ["grief", "loneliness", "strength", "hope"],
  ["forgiveness", "wisdom", "love"],
];

function Home() {
  // const { saveFavourite, isFavourited, removeFavourite } = useFavourites();
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [current, setCurrent] = useState(() => getVerseOfTheDay());
  const [isVerseOfDay, setIsVerseOfDay] = useState(true);
  const { isDark, setIsDark } = useTheme();
  const colors = themeColors[selectedTheme] || themeColors.default;
  const palette = isDark ? colors.dark : colors.light;
  const [shareOpen, setShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", palette.from);
    }
  }, [palette]);
  useEffect(() => {
    const askPermission = async () => {
      await requestNotificationPermission();
    };
    askPermission();
  }, []);
  const {
    ref: cardRef,
    sheen,
    handleMouseMove,
    handleMouseLeave,
  } = useGlassSheen();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [favourites, setFavourites] = useState(() => {
    try {
      const stored = localStorage.getItem("selah_favourites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const isFavourited = (item) => {
    if (!item) return false;
    if (item.type === "verse")
      return favourites.some((f) => f.reference === item.reference);
    return favourites.some(
      (f) => f.saint === item.saint && f.quote === item.quote,
    );
  };

  const saveFavourite = (item) => {
    if (!item || isFavourited(item)) return;
    const updated = [
      { ...item, savedAt: new Date().toISOString() },
      ...favourites,
    ];
    setFavourites(updated);
    localStorage.setItem("selah_favourites", JSON.stringify(updated));
  };

  const removeFavourite = (item) => {
    const updated = favourites.filter((f) => {
      if (item.type === "verse") return f.reference !== item.reference;
      return !(f.saint === item.saint && f.quote === item.quote);
    });
    setFavourites(updated);
    localStorage.setItem("selah_favourites", JSON.stringify(updated));
  };

  const pool = useMemo(() => {
    if (!selectedTheme) return [];
    const verses = (seedVerses[selectedTheme] || []).map((v) => ({
      ...v,
      type: "verse",
    }));
    const quotes = (saintQuotes[selectedTheme] || []).map((q) => ({
      ...q,
      type: "quote",
    }));
    return shuffleArray([...verses, ...quotes]);
  }, [selectedTheme]);

  const handleThemeSelect = (themeId) => {
    setSelectedTheme(themeId);
    setIndex(0);
    setDirection(1);
    const verses = (seedVerses[themeId] || []).map((v) => ({
      ...v,
      type: "verse",
    }));
    const quotes = (saintQuotes[themeId] || []).map((q) => ({
      ...q,
      type: "quote",
    }));
    const shuffled = shuffleArray([...verses, ...quotes]);
    setCurrent(shuffled[0]);
    setIsVerseOfDay(false);
  };

  const handleNext = () => {
    setDirection(1);
    const nextIndex = (index + 1) % pool.length;
    setIndex(nextIndex);
    setCurrent(pool[nextIndex]);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 260 : -260, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir) => ({ x: dir > 0 ? -260 : 260, opacity: 0, scale: 0.96 }),
  };

  const getShareText = () => {
    if (!current) return "";
    if (current.type === "verse") {
      return `"${current.text}" — ${current.reference} (${current.version})\n\nShared via Selah`;
    }
    return `"${current.quote}" — ${current.saint}\n\nShared via Selah`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getShareText());
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShareOpen(false);
    }, 2000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://wa.me/?text=${text}`, "_blank");
    setShareOpen(false);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Selah",
          text: getShareText(),
        });
      } catch {
        // console.log('Share cancelled')
      }
    }
    setShareOpen(false);
  };

  const textColor = isDark ? "rgba(255,255,255,0.85)" : "rgba(30,30,40,0.85)";
  const subtextColor = isDark
    ? "rgba(255,255,255,0.45)"
    : "rgba(30,30,40,0.45)";
  const cardBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.55)";
  const cardBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.7)";

  return (
    // <motion.div
    //   className="min-h-screen w-full flex flex-col items-center relative overflow-hidden"
    //   animate={{
    //     background: `linear-gradient(135deg, ${palette.from} 0%, ${palette.via} 50%, ${palette.to} 100%)`,
    //   }}
    //   transition={{ duration: 1.2, ease: "easeInOut" }}
    // >
    <motion.div
      className="min-h-screen w-full flex flex-col items-center relative overflow-hidden"
      style={{
        background: isVerseOfDay
          ? `url(${isDark ? votdBgDark : votdBgLight}) center/cover no-repeat`
          : undefined,
      }}
      animate={
        !isVerseOfDay
          ? {
              background: `linear-gradient(135deg, ${palette.from} 0%, ${palette.via} 50%, ${palette.to} 100%)`,
            }
          : {}
      }
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >
      {isDark ? (
        <>
          <StarField />
          <RisenChrist />
        </>
      ) : (
        <>
          <LightRays />
          <FloatingSymbols accentColor={palette.accent} />
          {!isDark && <CrossBearer />}
        </>
      )}
      {/* Ambient glow blob */}
      <motion.div
        animate={{ background: palette.cardGlow }}
        transition={{ duration: 1.2 }}
        className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ opacity: 0.6 }}
      />
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Top bar */}
        <div className="w-full flex items-center justify-between px-8 pt-8 pb-2">
          <motion.h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: textColor,
              fontSize: "1.5rem",
              fontWeight: 500,
              letterSpacing: "0.25em",
              marginLeft: "0.5rem",
            }}
          >
            SELAH
          </motion.h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/favourites")}
              style={{ color: subtextColor }}
              className="transition-colors hover:opacity-70"
            >
              <Bookmark size={22} />
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              style={{ color: subtextColor, marginRight: "0.5rem" }}
              className="transition-colors hover:opacity-70"
            >
              {isDark ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: subtextColor,
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginTop: "0.7rem",
            marginBottom: "0.75rem",
          }}
        >
          What's on your heart today?
        </motion.p>

        {/* Verse of the Day reset */}
        <AnimatePresence>
          {!isVerseOfDay && (
            <motion.button
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setSelectedTheme(null);
                setIsVerseOfDay(true);
                setCurrent(getVerseOfTheDay());
              }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: palette.accent,
                background: "none",
                border: "none",
                cursor: "pointer",
                marginBottom: "1rem",
                opacity: 0.8,
              }}
            >
              ← Verse of the Day
            </motion.button>
          )}
        </AnimatePresence>

        {/* Desktop pills — hidden on mobile */}
        <div className="hidden md:flex flex-col items-center gap-2 px-8 mb-12 w-full">
          {themeRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-2">
              {row.map((themeId) => {
                const theme = themes.find((t) => t.id === themeId);
                const isActive = selectedTheme === themeId;
                const IconComponent = iconMap[theme.icon];
                return (
                  <motion.button
                    key={theme.id}
                    onClick={() => handleThemeSelect(theme.id)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      fontWeight: isActive ? 600 : 400,
                      letterSpacing: "0.05em",
                      padding: "0.45rem 1rem",
                      borderRadius: "999px",
                      border: `1px solid ${isActive ? palette.pillActive : palette.pillBorder}`,
                      background: isActive ? palette.pillActive : palette.pill,
                      color: isActive
                        ? "#fff"
                        : isDark
                          ? "rgba(255,255,255,0.75)"
                          : "rgba(30,30,40,0.7)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
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
          ))}
        </div>

        {/* Mobile theme button — hidden on desktop */}
        <div className="flex md:hidden flex-col items-center mb-4 w-full px-6 gap-1">
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: subtextColor,
              marginBottom: "0.3rem",
            }}
          >
            Theme
          </p>
          <motion.button
            onClick={() => setDrawerOpen(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              padding: "0.65rem 1.8rem",
              borderRadius: "999px",
              border: `1px solid ${selectedTheme ? palette.pillActive : cardBorder}`,
              background: selectedTheme ? palette.pillActive : cardBg,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: selectedTheme ? "#fff" : textColor,
            }}
          >
            {selectedTheme &&
              (() => {
                const t = themes.find((th) => th.id === selectedTheme);
                const IconComponent = iconMap[t?.icon];
                return IconComponent ? <IconComponent size={12} /> : null;
              })()}
            {selectedTheme
              ? themes.find((t) => t.id === selectedTheme)?.label
              : "Choose a theme"}
            <ChevronDown size={13} />
          </motion.button>
        </div>
        {/* Theme Drawer */}
        <ThemeDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          selectedTheme={selectedTheme}
          onSelectTheme={handleThemeSelect}
          palette={palette}
          isDark={isDark}
        />

        {/* Card */}
        <div className="w-full flex justify-center px-8 md:px-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              // key={current?.text || current?.quote}
              key={current?.reference || current?.saint}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="w-full flex flex-col"
              style={{
                maxWidth: "540px",
                width: "calc(100% - 3rem)",
                // minHeight: '280px',
                borderRadius: "24px",
                padding: "2rem 2.5rem",
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
                background: cardBg,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${cardBorder}`,
                boxShadow: `0 8px 40px ${palette.cardGlow}, 0 2px 8px rgba(0,0,0,0.06)`,
              }}
            >
              {/* Glass sheen overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "24px",
                  pointerEvents: "none",
                  transition: "opacity 0.3s ease",
                  opacity: sheen.opacity,
                  background: isDark
                    ? `radial-gradient(circle at ${sheen.x}% ${sheen.y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)`
                    : `radial-gradient(circle at ${sheen.x}% ${sheen.y}%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 40%, transparent 70%)`,
                }}
              />

              {/* Label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  marginBottom: "1.25rem",
                }}
              >
                {isVerseOfDay ? (
                  <Sunrise size={12} style={{ color: palette.accent }} />
                ) : current?.type === "verse" ? (
                  <BookOpen size={12} style={{ color: palette.accent }} />
                ) : (
                  <Quote size={12} style={{ color: palette.accent }} />
                )}
                <p
                  style={{
                    fontSize: "0.82rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: palette.accent,
                    fontWeight: 500,
                  }}
                >
                  {isVerseOfDay
                    ? "Verse of the Day"
                    : current?.type === "verse"
                      ? "Scripture"
                      : "From the Saints"}
                </p>
              </div>

              {/* Quote text */}
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.2rem",
                  lineHeight: 1.8,
                  fontStyle: "italic",
                  color: textColor,
                  fontWeight: 500,
                  // flex: 1,
                  marginBottom: "1.5rem",
                }}
              >
                "{current?.type === "verse" ? current?.text : current?.quote}"
              </p>

              {/* Attribution */}
              <div
                style={{
                  borderTop: `1px solid ${cardBorder}`,
                  paddingTop: "1rem",
                }}
              >
                {current?.type === "verse" ? (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.78rem",
                      color: textColor,
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      opacity: 0.7,
                    }}
                  >
                    — {current?.reference} · {current?.version}
                  </p>
                ) : (
                  <>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.75rem",
                        color: textColor,
                        fontWeight: 500,
                        opacity: 0.75,
                      }}
                    >
                      — {current?.saint}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.65rem",
                        color: subtextColor,
                        marginTop: "0.25rem",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {current?.descriptor} · Feast Day: {current?.feastDay}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-4 mb-4 relative">
          {!isVerseOfDay && (
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.06em",
                padding: "0.7rem 1.6rem",
                borderRadius: "999px",
                border: `1px solid ${cardBorder}`,
                background: cardBg,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                color: textColor,
                cursor: "pointer",
              }}
            >
              <RefreshCw size={13} />
              Next
            </motion.button>
          )}

          <motion.button
            key={`${current?.reference || current?.saint}-${isVerseOfDay}`}
            onClick={() => {
              if (!current) return;
              isFavourited(current)
                ? removeFavourite(current)
                : saveFavourite(current);
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              padding: "0.7rem 1.6rem",
              borderRadius: "999px",
              border: `1px solid ${cardBorder}`,
              background: isFavourited(current) ? palette.pillActive : cardBg,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: isFavourited(current) ? "#fff" : textColor,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            <Heart size={13} fill={isFavourited(current) ? "#fff" : "none"} />
            {isFavourited(current) ? "Saved" : "Save"}
          </motion.button>

          {/* Share button */}
          <motion.button
            onClick={() => setShareOpen(!shareOpen)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              padding: "0.7rem 1.6rem",
              borderRadius: "999px",
              border: `1px solid ${cardBorder}`,
              background: cardBg,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: textColor,
              cursor: "pointer",
            }}
          >
            <Share2 size={13} />
            Share
          </motion.button>

          {/* Share options popover */}
          <AnimatePresence>
            {shareOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  bottom: "110%",
                  right: 0,
                  borderRadius: "16px",
                  padding: "0.75rem",
                  background: cardBg,
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: `1px solid ${cardBorder}`,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  minWidth: "160px",
                  zIndex: 10,
                }}
              >
                {/* Copy */}
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: textColor,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.4rem 0.5rem",
                    borderRadius: "8px",
                    textAlign: "left",
                  }}
                >
                  {copied ? (
                    <Check size={13} color={palette.accent} />
                  ) : (
                    <Copy size={13} />
                  )}
                  {copied ? "Copied!" : "Copy to clipboard"}
                </button>

                {/* WhatsApp */}
                <button
                  onClick={handleWhatsApp}
                  className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: textColor,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.4rem 0.5rem",
                    borderRadius: "8px",
                    textAlign: "left",
                  }}
                >
                  <Share2 size={13} />
                  Share to WhatsApp
                </button>

                {/* Native share — only shows if supported */}
                {navigator.share && (
                  <button
                    onClick={handleNativeShare}
                    className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      color: textColor,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "0.4rem 0.5rem",
                      borderRadius: "8px",
                      textAlign: "left",
                    }}
                  >
                    <Share2 size={13} />
                    More options
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* <motion.button
            // key={`${isVerseOfDay}-${current?.text || current?.quote}`}
            onClick={() => {
              if (!current) return;
              isFavourited(current)
                ? removeFavourite(current)
                : saveFavourite(current);
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              padding: "0.7rem 1.6rem",
              borderRadius: "999px",
              border: `1px solid ${cardBorder}`,
              background: isFavourited(current) ? palette.pillActive : cardBg,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              color: isFavourited(current) ? "#fff" : textColor,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            <Heart size={13} fill={isFavourited(current) ? "#fff" : "none"} />
            {isFavourited(current) ? "Saved" : "Save"}
          </motion.button> */}
      </div>
      {/* </div> */}
      {/* Footer */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.6rem",
          fontWeight: 1000,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: isDark ? "rgba(255, 255, 255, 0.87)" : "rgba(30, 30, 40, 0.53)",
          opacity: 0.4,
          marginTop: "2rem",
          marginBottom: "1rem",
          textAlign: "center",
          position: "relative",
          zIndex: 3,
        }}
      >
        Crafted with faith · Michael E. Ben-Ikheloah
      </p>

      {/* {!isDark && <CrossBearer />} */}
    </motion.div>
  );
}

export default Home;
