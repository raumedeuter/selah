import { useEffect, useRef } from 'react'

function LightRays() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const rays = Array.from({ length: 6 }, (_, i) => ({
      x: window.innerWidth * (0.1 + i * 0.18),
      width: Math.random() * 80 + 40,
      opacity: Math.random() * 0.08 + 0.05,
      speed: Math.random() * 0.003 + 0.001,
      offset: Math.random() * Math.PI * 2,
      angle: -0.3 + Math.random() * 0.2,
    }))

    let time = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 1

      rays.forEach(ray => {
        const drift = Math.sin(time * ray.speed + ray.offset) * 30
        const x = ray.x + drift
        const opacity = ray.opacity + Math.sin(time * ray.speed * 0.7 + ray.offset) * 0.015

        ctx.save()
        ctx.translate(x, 0)
        ctx.rotate(ray.angle)

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, `rgba(255, 255, 220, ${opacity})`)
        gradient.addColorStop(0.5, `rgba(255, 255, 200, ${opacity * 0.6})`)
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)

        ctx.fillStyle = gradient
        ctx.fillRect(-ray.width / 2, 0, ray.width, canvas.height)
        ctx.restore()
      })

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

export default LightRays