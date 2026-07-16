import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Feather, Flame, Star, BookOpen, Heart, Sun, Droplets, Music, Leaf, Bird } from 'lucide-react'

const iconList = [ Feather, Flame, Star, BookOpen, Heart, Sun, Droplets, Music, Leaf, Bird]

function generateConfig() {
  return {
    Icon: iconList[Math.floor(Math.random() * iconList.length)],
    size: Math.random() * 20 + 14,
    left: Math.random() * 90 + 5,
    duration: Math.random() * 10 + 12,
    opacity: Math.random() * 0.3 + 0.4,
    drift: (Math.random() - 0.5) * 60,
  }
}

function FloatingIcon({ config, onDone, accentColor }) {
  const { Icon, size, left, duration, opacity, drift } = config

  useEffect(() => {
    const timer = setTimeout(onDone, duration * 1000 + 500)
    return () => clearTimeout(timer)
  }, [duration, onDone])

return (
  <motion.div
    initial={{ y: '100vh', x: 0, opacity: 0 }}
    animate={{
      y: '-110vh',
      x: [0, drift, -drift * 0.5, drift * 0.3, 0],
      opacity: [0, opacity, opacity, opacity, 0],
    }}
    transition={{
      duration,
      ease: 'easeInOut',
      x: { duration, ease: 'easeInOut' },
      opacity: { duration, times: [0, 0.1, 0.5, 0.9, 1] },
    }}
    style={{
      position: 'fixed',
      bottom: 0,
      left: `${left}%`,
      zIndex: 1,
      pointerEvents: 'none',
      color: accentColor,
    }}
  >
    <Icon size={size} strokeWidth={2} />
  </motion.div>
)
}

function FloatingSymbols({ accentColor }) {
  const [icons, setIcons] = useState([])
  const nextId = useRef(0)

  {icons.map(({ id, config }) => (
  <FloatingIcon key={id} config={config} accentColor={accentColor} onDone={() => removeIcon(id)} />
))}

  useEffect(() => {
    let timeout

    const launch = () => {
      const id = nextId.current++
      const config = generateConfig()
      setIcons(prev => [...prev, { id, config }])
      timeout = setTimeout(launch, Math.random() * 2000 + 1200)
    }

    launch()
    return () => clearTimeout(timeout)
  }, [])

  const removeIcon = (id) => {
    setIcons(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {icons.map(({ id, config }) => (
        <FloatingIcon key={id} config={config} onDone={() => removeIcon(id)} />
      ))}
    </div>
  )
}

export default FloatingSymbols