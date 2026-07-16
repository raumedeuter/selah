import { useEffect, useRef } from 'react'

function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let shootingStarTimer

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Generate stars with drift
    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.5 + 0.3,
      pulseSpeed: Math.random() * 0.008 + 0.003,
      pulseOffset: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.12,
      driftY: (Math.random() - 0.5) * 0.12,
      originX: 0,
      originY: 0,
      driftRange: Math.random() * 12 + 6,
      driftPhase: Math.random() * Math.PI * 2,
      driftSpeed: Math.random() * 0.004 + 0.002,
      warmth: Math.random(),
    }))

    stars.forEach(star => {
      star.originX = star.x
      star.originY = star.y
    })

    // Shooting star state
    let shootingStar = null

    const launchShootingStar = () => {
      const startX = Math.random() * window.innerWidth * 0.7
      const startY = Math.random() * window.innerHeight * 0.4
      shootingStar = {
        x: startX,
        y: startY,
        length: Math.random() * 120 + 80,
        speed: Math.random() * 6 + 8,
        angle: Math.PI / 4 + (Math.random() * 0.3 - 0.15),
        opacity: 0,
        phase: 'in',
      }
    }

    const scheduleShootingStar = () => {
      const delay = Math.random() * 6000 + 5000
      shootingStarTimer = setTimeout(() => {
        launchShootingStar()
        scheduleShootingStar()
      }, delay)
    }
    scheduleShootingStar()

    let time = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 1

      // Draw stars
      stars.forEach(star => {
        // Drift movement
        star.x = star.originX + Math.sin(time * star.driftSpeed + star.driftPhase) * star.driftRange
        star.y = star.originY + Math.cos(time * star.driftSpeed * 0.7 + star.driftPhase) * star.driftRange * 0.6

        // Pulse glow
        const pulse = Math.sin(time * star.pulseSpeed + star.pulseOffset)
        const opacity = star.opacity + pulse * 0.2

        // Warm color — mix between pure white and a soft warm gold
        const r = 255
        const g = Math.floor(235 + star.warmth * 20)
        const b = Math.floor(180 + star.warmth * 75)

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)

        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.radius * 4
        )
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity})`)
        gradient.addColorStop(0.4, `rgba(${r}, ${g}, ${b}, ${opacity * 0.3})`)
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw shooting star
      if (shootingStar) {
        const s = shootingStar

        if (s.phase === 'in') {
          s.opacity = Math.min(s.opacity + 0.06, 1)
          if (s.opacity >= 1) s.phase = 'travel'
        } else if (s.phase === 'travel') {
          s.x += Math.cos(s.angle) * s.speed
          s.y += Math.sin(s.angle) * s.speed
          if (s.x > window.innerWidth || s.y > window.innerHeight) {
            s.phase = 'out'
          }
        } else if (s.phase === 'out') {
          s.opacity = Math.max(s.opacity - 0.08, 0)
          s.x += Math.cos(s.angle) * s.speed
          s.y += Math.sin(s.angle) * s.speed
          if (s.opacity <= 0) shootingStar = null
        }

        if (shootingStar) {
          const tailX = s.x - Math.cos(s.angle) * s.length
          const tailY = s.y - Math.sin(s.angle) * s.length

          const gradient = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
          gradient.addColorStop(0, `rgba(255, 255, 255, 0)`)
          gradient.addColorStop(1, `rgba(255, 255, 255, ${s.opacity * 0.9})`)

          ctx.beginPath()
          ctx.moveTo(tailX, tailY)
          ctx.lineTo(s.x, s.y)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 1.5
          ctx.stroke()
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      clearTimeout(shootingStarTimer)
      window.removeEventListener('resize', resize)
    }
  }, [])

return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

export default StarField