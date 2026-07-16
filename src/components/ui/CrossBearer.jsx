import { motion } from "framer-motion";
import crossBearerImg from "../../assets/crossbearer-removebg.png";

function CrossBearer() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 pointer-events-none"
      style={{ zIndex: 2, height: "160px" }}
    >
      {/* Ground line */}
      <div
        style={{
          position: "absolute",
          bottom: "28px",
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(to right, transparent, rgba(30,20,10,0.15), transparent)",
        }}
      />

      {/* Rugged ground texture */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full"
        height="30"
        viewBox="0 0 1440 30"
        preserveAspectRatio="none"
        style={{ opacity: 0.12 }}
      >
        <path
          d="M0 20 Q120 10 240 18 Q360 26 480 14 Q600 4 720 16 Q840 26 960 12 Q1080 2 1200 18 Q1320 28 1440 16 L1440 30 L0 30 Z"
          fill="rgba(30,20,10,0.8)"
        />
      </svg>

      {/* Moving figure */}
      <motion.div
        initial={{ x: "-20vw" }}
        animate={{ x: "115vw" }}
        transition={{
          duration: 80,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{ position: "absolute", bottom: "28px" }}
      >
        {/* Bob animation */}
        <motion.div
          animate={{ y: [0, -3, 0, -2, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={crossBearerImg}
            alt="Jesus carrying the cross"
            style={{
              height: "110px",
              width: "auto",
              opacity: 0.85,
              filter: "contrast(1.1)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CrossBearer;
