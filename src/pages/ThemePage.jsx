import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, RefreshCw, Heart } from "lucide-react";
import AppShell from "../components/layout/AppShell";
import { seedVerses } from "../data/verses";
import { saintQuotes } from "../data/saints";
import { themes } from "../data/themes";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function ThemePage() {
  const { themeId } = useParams();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const theme = themes.find((t) => t.id === themeId);

  const pool = useMemo(() => {
    const verses = (seedVerses[themeId] || []).map((v) => ({
      ...v,
      type: "verse",
    }));
    const quotes = (saintQuotes[themeId] || []).map((q) => ({
      ...q,
      type: "quote",
    }));
    return shuffleArray([...verses, ...quotes]);
  }, [themeId]);

  const current = pool[index];

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % pool.length);
  };

  return (
    <AppShell>
      <div className="w-full flex flex-col items-center px-6 mt-8">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="self-start flex items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">Back</span>
        </button>

        {/* Theme title */}
        <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">
          You are seeking
        </p>
        <h2 className="text-slate-700 text-2xl font-semibold mb-10">
          {theme?.label}
        </h2>

        {/* Verse card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-2xl rounded-2xl p-8 mb-8"
            style={{
              background: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
            }}
          >
            {current?.type === "verse" ? (
              <>
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-4">
                  Scripture
                </p>
                <p className="text-slate-700 text-lg leading-relaxed italic mb-6">
                  "{current?.text}"
                </p>
                <p className="text-sm text-slate-500 font-medium">
                  — {current?.reference} ({current?.version})
                </p>
              </>
            ) : (
              <>
                <p className="text-xs uppercase tracking-widest text-slate-400 mb-4">
                  From the Saints
                </p>
                <p className="text-slate-600 text-lg leading-relaxed italic mb-6">
                  "{current?.quote}"
                </p>
                <div>
                  <p className="text-sm text-slate-500 font-medium">
                    — {current?.saint}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {current?.descriptor} · Feast Day: {current?.feastDay}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-slate-600 transition-all duration-200 hover:scale-105 hover:shadow-md"
            style={{
              background: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            <RefreshCw size={15} />
            Next Verse
          </button>

          <button
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-slate-600 transition-all duration-200 hover:scale-105 hover:shadow-md"
            style={{
              background: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.6)",
            }}
          >
            <Heart size={15} />
            Save
          </button>
        </div>
      </div>
    </AppShell>
  );
}

export default ThemePage;
