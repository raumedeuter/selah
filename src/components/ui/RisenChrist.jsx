import { motion } from "framer-motion";
import risenImg from "../../assets/risen-removebg.png";

function RisenChrist() {
  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{
        bottom: "40px",
        right: "40px",
        zIndex: 2,
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {/* Outer glow pulse */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          inset: "-20px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,200,80,0.25) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Image */}
      <motion.img
        src={risenImg}
        alt="The Risen Christ"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          height: "160px",
          width: "auto",
          position: "relative",
          zIndex: 1,
          filter:
            "invert(1) sepia(0.4) saturate(2) hue-rotate(10deg) brightness(1.4)",
          opacity: 0.85,
        }}
      />
    </motion.div>
  );
}

export default RisenChrist;
