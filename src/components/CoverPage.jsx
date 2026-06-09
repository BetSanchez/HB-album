import { motion } from 'framer-motion'
import { coverPhoto } from '../data/albumData'
import AlbumPhoto from './AlbumPhoto'

export default function CoverPage({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 z-10"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="text-center mb-6"
      >
        <motion.h1
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-gradient mb-2"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Happy Birthday ❤️
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-romantic-deep/70 text-lg sm:text-xl font-light"
        >
          ¡Felicidades mi pastelito!
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
        className="relative mb-8"
      >
        <div className="absolute -inset-3 bg-gradient-to-r from-romantic-pink via-romantic-gold to-romantic-purple blur-lg opacity-40" />
        <AlbumPhoto
          src={coverPhoto}
          alt="Foto de portada"
          size="large"
          className="relative"
          imageClassName="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
        />
        <motion.div
          className="absolute -top-3 -right-3 text-3xl"
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💕
        </motion.div>
      </motion.div>

      <motion.button
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        className="btn-romantic px-10 py-4 rounded-full font-semibold text-lg cursor-pointer"
      >
        Abrir Nuestro Álbum ✨
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 text-romantic-deep/50 text-sm"
      >
        Desliza las páginas para descubrir nuestra historia
      </motion.p>
    </motion.div>
  )
}
