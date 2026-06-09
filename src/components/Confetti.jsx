import { motion } from 'framer-motion'
import { useMemo } from 'react'

const COLORS = ['#FD50A4', '#FDA5CC', '#96D0D2', '#51ACC5', '#227E9D', '#FDF9FA']

export default function Confetti({ active = true, count = 80 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 10 + 5,
        rotation: Math.random() * 360,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 2,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
      })),
    [count],
  )

  if (!active) return null

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: -20,
            width: p.shape === 'rect' ? p.size : p.size * 0.8,
            height: p.shape === 'rect' ? p.size * 0.4 : p.size * 0.8,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, (Math.random() - 0.5) * 200],
            rotate: [p.rotation, p.rotation + 720],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
