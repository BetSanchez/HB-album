import { motion } from 'framer-motion'
import PokemonCard from './PokemonCard'

export default function PokemonGallery({
  cards,
  title = 'Colección de Amor',
  subtitle = 'Pasa el cursor para descubrir su mensaje',
}) {
  return (
    <div className="h-full p-2 sm:p-3 flex flex-col overflow-hidden bg-white">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-2 flex-shrink-0"
      >
        <span className="text-lg">🃏</span>
        <h2 className="font-display text-sm sm:text-base font-bold text-gradient">
          {title}
        </h2>
        <p className="text-[9px] sm:text-[10px] text-romantic-deep/60">
          {subtitle}
        </p>
      </motion.div>

      <div className="flex-1 overflow-y-auto pr-0.5">
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          {cards.map((card, index) => (
            <PokemonCard key={card.id} card={card} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
