import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { FaMusic, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'

export default function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [isPlaying])

  const togglePlay = () => setIsPlaying((prev) => !prev)
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted((prev) => !prev)
    }
  }

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="fixed top-4 right-4 z-50 flex items-center gap-2"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className="glass-gold w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={isPlaying ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
          >
            <FaMusic className="text-romantic-gold text-lg" />
          </motion.div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMute}
          className="glass w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {isMuted ? (
            <FaVolumeMute className="text-romantic-deep/70 text-sm" />
          ) : (
            <FaVolumeUp className="text-romantic-deep/70 text-sm" />
          )}
        </motion.button>

        {isPlaying && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            className="glass px-3 py-1 rounded-full text-xs text-romantic-gold hidden sm:block"
          >
            ♪ Música romántica
          </motion.span>
        )}
      </motion.div>
    </>
  )
}
