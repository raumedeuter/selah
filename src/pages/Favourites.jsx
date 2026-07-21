import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, BookOpen, Quote } from "lucide-react";
import { useFavourites } from "../hooks/useFavourites";
import { useTheme } from "../context/useTheme";
import votdBgLight from "../assets/votd-bg.jpg";
import votdBgDark from "../assets/votd-bg-dark.jpg";

function Favourites() {
  const navigate = useNavigate();
  const { favourites, removeFavourite } = useFavourites();
  const { isDark } = useTheme();

  const textColor = isDark ? "rgba(255,255,255,0.85)" : "rgba(30,30,40,0.85)";
  const subtextColor = isDark
    ? "rgba(255,255,255,0.45)"
    : "rgba(30,30,40,0.45)";
  const cardBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.55)";
  const cardBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.7)";

  return (
    // <div
    //   className="min-h-screen w-full flex flex-col items-center"
    //   style={{
    //     background: isDark
    //       ? "linear-gradient(135deg, #08080F 0%, #0F0F1A 50%, #141428 100%)"
    //       : "linear-gradient(135deg, #F8F7FF 0%, #EEF2FF 50%, #E0E7FF 100%)",
    //     fontFamily: "'Inter', sans-serif",
    //   }}
    // >
    <div
      className="min-h-screen w-full flex flex-col items-center"
      style={{
        background: isDark
          ? `url(${votdBgDark}) center/cover no-repeat`
          : `url(${votdBgLight}) center/cover no-repeat`,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="w-full max-w-2xl mx-auto flex flex-col flex-1">
        {/* Hero */}
        <div
          className="w-full flex flex-col items-center text-center px-8 pb-8"
          style={{
            paddingTop: "calc(env(safe-area-inset-top) + 3rem)",
            borderBottom: `1px solid ${cardBorder}`,
            marginBottom: "2rem",
          }}
        >
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "2rem",
              fontWeight: 500,
              letterSpacing: "0.3em",
              color: textColor,
              marginBottom: "0.5rem",
            }}
          >
            SELAH
          </h1>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: subtextColor,
              marginBottom: "1.5rem",
            }}
          >
            Your saved verses & quotes
          </p>

          {/* Count badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.35rem 1rem",
              borderRadius: "999px",
              background: isDark
                ? "rgba(45,212,191,0.1)"
                : "rgba(15,118,110,0.1)",
              border: isDark
                ? "1px solid rgba(45,212,191,0.2)"
                : "1px solid rgba(15,118,110,0.2)",
              marginBottom: "1.5rem",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: isDark ? "#2DD4BF" : "#0F766E",
                fontWeight: 600,
              }}
            >
              {favourites.length} {favourites.length === 1 ? "item" : "items"}{" "}
              saved
            </p>
          </div>

          {/* Breadcrumb */}
          <div className="w-full flex items-start">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 transition-opacity hover:opacity-60"
              style={{
                color: subtextColor,
                fontSize: "0.9rem",
                letterSpacing: "0.08em",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 pb-10">
          {favourites.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center h-64 text-center"
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.2rem",
                  fontStyle: "italic",
                  color: subtextColor,
                  marginBottom: "0.5rem",
                }}
              >
                Nothing saved yet.
              </p>
              <p
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  color: subtextColor,
                  textTransform: "uppercase",
                }}
              >
                Tap Save on any verse or quote to keep it here.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence>
              <div className="flex flex-col gap-4 px-6 md:px-0">
                {favourites.map((item, i) => (
                  <motion.div
                    key={item.savedAt}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="flex flex-col"
                    style={{
                      background: cardBg,
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: `1px solid ${cardBorder}`,
                      borderRadius: "16px",
                      padding: "1.25rem 1.5rem",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Label */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5">
                        {item.type === "verse" ? (
                          <BookOpen
                            size={11}
                            style={{ color: isDark ? "#2DD4BF" : "#0F766E" }}
                          />
                        ) : (
                          <Quote
                            size={11}
                            style={{ color: isDark ? "#2DD4BF" : "#0F766E" }}
                          />
                        )}
                        <p
                          style={{
                            fontSize: "0.6rem",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: isDark ? "#2DD4BF" : "#0F766E",
                            fontWeight: 500,
                          }}
                        >
                          {item.type === "verse"
                            ? "Scripture"
                            : "From the Saints"}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFavourite(item)}
                        className="transition-opacity hover:opacity-60"
                        style={{ color: subtextColor }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Quote */}
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        fontStyle: "italic",
                        lineHeight: 1.75,
                        fontWeight: 500,
                        color: textColor,
                        marginBottom: "1rem",
                      }}
                    >
                      "{item.type === "verse" ? item.text : item.quote}"
                    </p>

                    {/* Attribution */}
                    <div
                      style={{
                        borderTop: `1px solid ${cardBorder}`,
                        paddingTop: "0.75rem",
                      }}
                    >
                      {item.type === "verse" ? (
                        <p
                          style={{
                            fontSize: "0.72rem",
                            color: subtextColor,
                            fontWeight: 600,
                            letterSpacing: "0.04em",
                          }}
                        >
                          — {item.reference} · {item.version}
                        </p>
                      ) : (
                        <>
                          <p
                            style={{
                              fontSize: "0.72rem",
                              color: textColor,
                              fontWeight: 600,
                            }}
                          >
                            — {item.saint}
                          </p>
                          <p
                            style={{
                              fontSize: "0.65rem",
                              color: subtextColor,
                              marginTop: "0.2rem",
                            }}
                          >
                            {item.descriptor} · Feast Day: {item.feastDay}
                          </p>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

export default Favourites;
