import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import AnimatedBackground from './components/AnimatedBackground'
import Particles from './components/Particles'
import MusicControl from './components/MusicControl'
import CoverPage from './components/CoverPage'
import Book from './components/Book'
import FinalSurprise from './components/FinalSurprise'

const VIEWS = {
  COVER: 'cover',
  BOOK: 'book',
  SURPRISE: 'surprise',
}

export default function App() {
  const [view, setView] = useState(VIEWS.COVER)

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Particles count={140} />
      <MusicControl />

      <AnimatePresence mode="wait">
        {view === VIEWS.COVER && (
          <CoverPage key="cover" onStart={() => setView(VIEWS.BOOK)} />
        )}

        {view === VIEWS.BOOK && (
          <Book
            key="book"
            onOpenGift={() => setView(VIEWS.SURPRISE)}
            onBack={() => setView(VIEWS.COVER)}
          />
        )}

        {view === VIEWS.SURPRISE && (
          <FinalSurprise
            key="surprise"
            onBack={() => setView(VIEWS.BOOK)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
