import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { surpriseCard } from '../data/albumData'

const TEAR_THRESHOLD = 0.75

function TearLine({ progress }) {
  const segments = 12
  const points = Array.from({ length: segments + 1 }, (_, i) => {
    const x = (i / segments) * 100
    const y = 50 + (i % 2 === 0 ? -8 : 8) * (1 - progress * 0.3)
    return `${x},${y}`
  }).join(' ')

  return (
    <svg
      className="absolute left-0 right-0 w-full h-6 pointer-events-none z-20"
      style={{ top: '14%', transform: 'translateY(-50%)' }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinejoin="round"
        opacity={Math.min(progress * 2, 1)}
      />
      <polyline
        points={points}
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="6"
        strokeLinejoin="round"
        opacity={progress * 0.5}
      />
    </svg>
  )
}

function RevealCard({ card }) {
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsFlipped(true), 900)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, y: 80 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
      className="flex flex-col items-center w-full"
    >
      <motion.div
        animate={{
          boxShadow: [
            '0 0 24px rgba(253,80,164,0.4)',
            '0 0 48px rgba(150,208,210,0.6)',
            '0 0 24px rgba(253,80,164,0.4)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flip-card-scene w-64 sm:w-72 md:w-80 rounded-2xl"
      >
        <motion.div
          className="flip-card relative w-full cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          onClick={() => setIsFlipped((prev) => !prev)}
        >
          <div className="flip-card-face rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={card.backImage}
              alt="Reverso de la carta"
              className="w-full h-auto block"
              draggable={false}
            />
          </div>

          <div
            className="flip-card-face flip-card-front rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={card.image}
              alt={card.name}
              className="w-full h-auto block"
              draggable={false}
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="text-romantic-deep/50 text-xs mt-4 text-center"
      >
        Toca la carta para voltearla
      </motion.p>
    </motion.div>
  )
}

export default function PokemonPackOpen() {
  const [phase, setPhase] = useState('ready')
  const [tearProgress, setTearProgress] = useState(0)
  const [flash, setFlash] = useState(false)
  const packRef = useRef(null)
  const dragStart = useRef(null)
  const isDragging = useRef(false)
  const phaseRef = useRef('ready')

  const completeTear = useCallback(() => {
    if (phaseRef.current === 'opening' || phaseRef.current === 'card') return
    phaseRef.current = 'opening'
    setPhase('opening')
    setTearProgress(1)
    isDragging.current = false

    setTimeout(() => setFlash(true), 400)
    setTimeout(() => setFlash(false), 700)
    setTimeout(() => {
      phaseRef.current = 'card'
      setPhase('card')
    }, 900)
  }, [])

  const handlePointerDown = useCallback((e) => {
    if (phaseRef.current !== 'ready' && phaseRef.current !== 'tearing') return
    const rect = packRef.current?.getBoundingClientRect()
    if (!rect) return

    const relativeY = (e.clientY - rect.top) / rect.height
    if (relativeY > 0.22) return

    isDragging.current = true
    dragStart.current = { x: e.clientX }
    phaseRef.current = 'tearing'
    setPhase('tearing')
  }, [])

  const handlePointerMove = useCallback(
    (e) => {
      if (!isDragging.current || !dragStart.current || !packRef.current) return

      const deltaX = e.clientX - dragStart.current.x
      const rect = packRef.current.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, deltaX / (rect.width * 0.85)))

      setTearProgress(progress)

      if (progress >= TEAR_THRESHOLD) {
        completeTear()
      }
    },
    [completeTear],
  )

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false

    setTearProgress((prev) => {
      if (prev >= TEAR_THRESHOLD) {
        completeTear()
      } else if (prev > 0) {
        phaseRef.current = 'ready'
        setPhase('ready')
        return 0
      }
      return prev
    })
  }, [completeTear])

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-sm mx-auto select-none">
      <AnimatePresence mode="wait">
        {(phase === 'ready' || phase === 'tearing' || phase === 'opening') && (
          <motion.div
            key="pack"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, y: -30 }}
            className="flex flex-col items-center"
          >
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-gradient mb-2 text-center">
              ¡Sobre Sorpresa!
            </h2>
            <p className="text-romantic-deep/70 text-sm mb-6 text-center">
              {phase === 'opening'
                ? 'Abriendo...'
                : 'Desliza el dedo por la parte superior →'}
            </p>

            <div
              ref={packRef}
              className="relative w-52 sm:w-60 h-80 sm:h-96 touch-none cursor-grab"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <motion.div
                className="pack-body absolute inset-x-0 bottom-0 top-[14%] rounded-b-2xl overflow-hidden shadow-2xl"
                animate={
                  phase === 'opening'
                    ? { y: 500, opacity: 0 }
                    : { y: 0, opacity: 1 }
                }
                transition={{ duration: 0.6, ease: 'easeIn' }}
              >
                <div className="absolute inset-0 pack-foil" />
                <div className="absolute inset-0 pack-pattern opacity-30" />
                <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4 border-2 border-white/40 shadow-inner">
                    <span className="text-4xl">💕</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white drop-shadow-md tracking-wide">
                    LOVE PACK
                  </h3>
                  <p className="text-white/70 text-xs mt-1 tracking-widest">
                    EDICIÓN ESPECIAL
                  </p>
                  <div className="mt-6 flex gap-1">
                    {['★', '★', '★'].map((s, i) => (
                      <span key={i} className="text-romantic-gold text-sm drop-shadow">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20" />
              </motion.div>

              <motion.div
                className="pack-top absolute inset-x-0 top-0 h-[14%] rounded-t-2xl overflow-hidden shadow-lg z-10"
                animate={
                  phase === 'opening'
                    ? { y: -120, rotate: -8, opacity: 0 }
                    : { y: tearProgress * -8, rotate: tearProgress * -3, opacity: 1 }
                }
                transition={
                  phase === 'opening'
                    ? { duration: 0.5, ease: 'easeOut' }
                    : { duration: 0.1 }
                }
              >
                <div className="absolute inset-0 pack-foil" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-3 bg-black/10" />
              </motion.div>

              {(phase === 'tearing' || tearProgress > 0) && phase !== 'opening' && (
                <TearLine progress={tearProgress} />
              )}

              {phase === 'ready' && (
                <motion.div
                  className="absolute top-[10%] left-0 right-0 flex justify-center z-30 pointer-events-none"
                  animate={{ x: [0, 40, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-lg">👉</span>
                    <span className="text-white/80 text-[10px]">desliza</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {phase === 'card' && (
          <motion.div
            key="card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center w-full"
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-romantic-deep/70 text-sm mb-5 text-center font-display italic"
            >
              ¡Carta legendaria obtenida!
            </motion.p>
            <RevealCard card={surpriseCard} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.9, 0] }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
