import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { loveLetter, birthdayVideoUrl } from '../data/albumData'
import Confetti from './Confetti'
import PokemonPackOpen from './PokemonPackOpen'

export default function FinalSurprise({ onBack }) {
  const [giftOpened, setGiftOpened] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col items-center px-4 py-8 z-10 overflow-y-auto"
    >
      <Confetti active={giftOpened} />

      <AnimatePresence mode="wait">
        {!giftOpened ? (
          <motion.div
            key="pack-opening"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <PokemonPackOpen onComplete={() => setGiftOpened(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="gift-opened"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl space-y-8 pb-12"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl sm:text-4xl font-bold text-gradient text-center"
            >
              ¡Feliz Cumpleaños, Mi Amor! 🎂
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-gold p-2 rounded-2xl"
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={birthdayVideoUrl}
                  title="Video de cumpleaños"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-gold p-6 sm:p-8 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-2xl"
                >
                  💌
                </motion.span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-romantic-gold">
                  Carta de Amor
                </h3>
              </div>
              <div className="text-romantic-deep/85 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light italic">
                {loveLetter}
              </div>
            </motion.div>

            {onBack && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="glass px-6 py-3 rounded-full text-romantic-deep/70 text-sm cursor-pointer mx-auto block"
              >
                ← Volver al álbum
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
