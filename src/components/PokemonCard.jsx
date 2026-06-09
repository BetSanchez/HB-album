import { motion } from 'framer-motion'
import AlbumPhoto from './AlbumPhoto'

export default function PokemonCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="pokemon-card perspective-[800px] w-full aspect-[3/4] cursor-pointer"
    >
      <div className="pokemon-card-inner relative w-full h-full">
        {/* Frente */}
        <div className="pokemon-card-front absolute inset-0 rounded-lg overflow-hidden border-2 border-romantic-gold/50 shadow-lg">
          <div className="h-full flex flex-col bg-gradient-to-b from-romantic-purple/40 to-romantic-deep/80">
            <div className="bg-gradient-to-r from-romantic-gold/30 to-romantic-pink/30 px-2 py-1 flex justify-between items-center">
              <span className="text-[10px] font-bold text-romantic-gold truncate">
                {card.name}
              </span>
              <span className="text-[8px] text-romantic-gold">{card.rarity}</span>
            </div>
            <div className="flex-1 p-1.5 flex items-center justify-center">
              <AlbumPhoto
                src={card.image}
                alt={card.name}
                size="small"
                className="w-full h-full"
                imageClassName="w-full h-full min-h-[80px]"
              />
            </div>
            <div className="px-2 py-1 flex justify-between items-center">
              <span className="text-[9px] bg-romantic-pink/40 px-1.5 py-0.5 rounded-full">
                {card.type}
              </span>
              <span className="text-[8px] text-white/50">#{String(card.id).padStart(3, '0')}</span>
            </div>
          </div>
        </div>

        {/* Reverso */}
        <div className="pokemon-card-back absolute inset-0 rounded-lg overflow-hidden border-2 border-romantic-purple/50 shadow-lg">
          <div className="h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-romantic-purple/60 via-romantic-deep/90 to-romantic-pink/40 text-center">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-xl mb-2"
            >
              💕
            </motion.span>
            <h4 className="font-display text-xs font-bold text-romantic-gold mb-2">
              {card.name}
            </h4>
            <p className="text-[9px] sm:text-[10px] text-white/80 leading-relaxed italic">
              "{card.description}"
            </p>
            <div className="mt-2 w-8 h-0.5 bg-gradient-to-r from-romantic-pink to-romantic-gold rounded" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
