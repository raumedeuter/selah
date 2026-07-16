import { useState, useRef, useEffect } from "react";

export function useGlassSheen() {
  const ref = useRef(null);
  const [sheen, setSheen] = useState({ x: 50, y: 50, opacity: 0 });

  useEffect(() => {
    const handleOrientation = (e) => {
      const x = ((e.gamma + 90) / 180) * 100;
      const y = ((e.beta + 90) / 180) * 100;
      setSheen({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
        opacity: 0.15,
      });
    };
    window.addEventListener("deviceorientation", handleOrientation);
    return () =>
      window.removeEventListener("deviceorientation", handleOrientation);
  }, []);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSheen({ x, y, opacity: 0.15 });
  };

  const handleMouseLeave = () => {
    setSheen((prev) => ({ ...prev, opacity: 0 }));
  };

  return { ref, sheen, handleMouseMove, handleMouseLeave };
}
