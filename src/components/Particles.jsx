import { motion } from 'framer-motion'
import { useMemo } from 'react'

const COLORS = ['#FDA5CC', '#FD50A4', '#96D0D2', '#51ACC5', '#B8E0F5', '#FFD6EC']

export default function Particles({ count = 40 }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        duration: Math.random() * 10 + 3,
        delay: Math.random() * 3,
        shape: Math.random() > 0.25 ? 'heart' : 'circle',
      })),
    [count],
  )

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.shape === 'heart' ? p.size * 2 : undefined,
            width: p.shape === 'circle' ? p.size : undefined,
            height: p.shape === 'circle' ? p.size : undefined,
            backgroundColor: p.shape === 'circle' ? p.color : undefined,
            borderRadius: p.shape === 'circle' ? '50%' : undefined,
            opacity: 0.6,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {p.shape === 'heart' && (
            <span style={{ color: p.color }}>❤</span>
          )}
        </motion.div>
      ))}
    </div>
  )
}
