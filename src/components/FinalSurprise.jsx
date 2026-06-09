import { motion } from 'framer-motion'
import PokemonPackOpen from './PokemonPackOpen'

export default function FinalSurprise({ onBack }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col items-center px-4 py-8 z-10 overflow-y-auto"
    >
      <PokemonPackOpen />

      {onBack && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="glass px-6 py-3 rounded-full text-romantic-deep/70 text-sm cursor-pointer mt-8"
        >
          ← Volver al álbum
        </motion.button>
      )}
    </motion.div>
  )
}
