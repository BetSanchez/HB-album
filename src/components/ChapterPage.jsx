import { motion } from 'framer-motion'
import AlbumPhoto from './AlbumPhoto'

export default function ChapterPage({ chapter }) {
  return (
    <div className="chapter-page h-full p-3 sm:p-4 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="text-xl sm:text-2xl">{chapter.icon}</span>
        <h2 className="font-display text-base sm:text-lg font-bold text-gradient leading-tight">
          {chapter.title}
        </h2>
        <p className="text-romantic-gold/80 text-[10px] sm:text-xs italic">
          {chapter.subtitle}
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="chapter-photo-area flex items-center justify-center min-h-0 overflow-hidden"
      >
        <AlbumPhoto
          src={chapter.image}
          alt={chapter.title}
          adaptive
          className="max-h-full max-w-full"
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-romantic-deep/85 text-[10px] sm:text-xs leading-relaxed min-h-0 overflow-y-auto"
      >
        {chapter.content}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pt-1.5 border-t border-romantic-gold/20 text-center"
      >
        <p className="text-romantic-pink text-[10px] italic">{chapter.date}</p>
      </motion.div>
    </div>
  )
}
