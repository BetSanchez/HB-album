import { motion } from 'framer-motion'
import { useMemo } from 'react'

const orbs = [
  {
    id: 1,
    color: 'rgba(253, 165, 204, 0.55)',
    size: 'min(70vw, 520px)',
    initial: { x: '-10%', y: '10%' },
    animate: {
      x: ['-10%', '5%', '-10%'],
      y: ['10%', '25%', '10%'],
      scale: [1, 1.15, 1],
    },
    duration: 18,
  },
  {
    id: 2,
    color: 'rgba(150, 208, 210, 0.5)',
    size: 'min(65vw, 480px)',
    initial: { x: '60%', y: '50%' },
    animate: {
      x: ['60%', '45%', '60%'],
      y: ['50%', '35%', '50%'],
      scale: [1, 1.2, 1],
    },
    duration: 22,
  },
  {
    id: 3,
    color: 'rgba(253, 80, 164, 0.25)',
    size: 'min(50vw, 380px)',
    initial: { x: '30%', y: '70%' },
    animate: {
      x: ['30%', '40%', '30%'],
      y: ['70%', '55%', '70%'],
      scale: [1, 1.1, 1],
    },
    duration: 16,
  },
  {
    id: 4,
    color: 'rgba(81, 172, 197, 0.4)',
    size: 'min(55vw, 420px)',
    initial: { x: '75%', y: '-5%' },
    animate: {
      x: ['75%', '65%', '75%'],
      y: ['-5%', '15%', '-5%'],
      scale: [1, 1.25, 1],
    },
    duration: 20,
  },
  {
    id: 5,
    color: 'rgba(255, 214, 236, 0.6)',
    size: 'min(40vw, 300px)',
    initial: { x: '10%', y: '60%' },
    animate: {
      x: ['10%', '20%', '10%'],
      y: ['60%', '45%', '60%'],
      scale: [1, 1.15, 1],
    },
    duration: 14,
  },
]

export default function AnimatedBackground() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 76 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 18 + 10,
        delay: Math.random() * 10,
        duration: Math.random() * 8 + 7,
        drift: (Math.random() - 0.5) * 80,
        color: ['#FD50A4', '#FDA5CC', '#FFD6EC', '#96D0D2', '#FFCCE5'][
          Math.floor(Math.random() * 5)
        ],
        opacity: Math.random() * 0.35 + 0.2,
        symbol: Math.random() > 0.15 ? '❤' : '💕',
      })),
    [],
  )

  const sparkles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 2,
        delay: Math.random() * 6,
        duration: Math.random() * 3 + 2,
      })),
    [],
  )

  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      <div className="absolute inset-0 bg-pastel-base" />

      {/* Malla de gradiente giratoria */}
      <motion.div
        className="absolute -inset-1/4 bg-mesh-gradient opacity-50"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      />

      {/* Orbes difuminados */}
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            background: orb.color,
            left: orb.initial.x,
            top: orb.initial.y,
          }}
          animate={orb.animate}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Capa radial que pulsa */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(253,165,204,0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(150,208,210,0.35) 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, rgba(81,172,197,0.25) 0%, transparent 50%)',
        }}
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Destellos parpadeantes */}
      {sparkles.map((s) => (
        <motion.div
          key={`sparkle-${s.id}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            boxShadow: '0 0 6px rgba(255,255,255,0.9)',
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Corazones que flotan hacia arriba */}
      {hearts.map((h) => (
        <motion.div
          key={`heart-${h.id}`}
          className="absolute"
          style={{
            left: `${h.left}%`,
            bottom: -40,
            fontSize: h.size,
            color: h.color,
            opacity: h.opacity,
          }}
          animate={{
            y: ['0vh', '-110vh'],
            x: [0, h.drift, 0],
            rotate: [0, h.drift > 0 ? 25 : -25, 0],
            opacity: [0, h.opacity, h.opacity, 0],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {h.symbol}
        </motion.div>
      ))}

      {/* Brillo superior tipo aurora */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-aurora opacity-30"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
