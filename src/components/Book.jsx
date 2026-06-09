import { useRef, useState, useEffect, useCallback, forwardRef } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { motion } from 'framer-motion'
import ChapterPage from './ChapterPage'
import { chapters } from '../data/albumData'

const TOTAL_PAGES = 6

const Page = forwardRef(({ children, className = '' }, ref) => (
  <div ref={ref} className={`page-content book-page ${className}`}>
    {children}
  </div>
))
Page.displayName = 'Page'

export default function Book({ onOpenGift, onBack }) {
  const bookRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 380, height: 520 })
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  const updateDimensions = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const mobile = vw < 768
    setIsMobile(mobile)

    if (mobile) {
      // Móvil: una hoja a la vez ocupando todo el ancho disponible
      const pageWidth = Math.min(vw - 24, 460)
      const pageHeight = Math.min(vh - 230, Math.floor(pageWidth * 1.4))

      setDimensions({
        width: Math.max(pageWidth, 240),
        height: Math.max(pageHeight, 340),
      })
    } else {
      // Escritorio: libro abierto de dos páginas
      const bookWidth = Math.min(vw - 80, 900)
      const pageWidth = Math.floor(bookWidth / 2)
      const pageHeight = Math.min(560, Math.floor(pageWidth * 1.35))

      setDimensions({
        width: Math.max(pageWidth, 140),
        height: Math.max(pageHeight, 360),
      })
    }
  }, [])

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [updateDimensions])

  const handleFlip = (e) => {
    setCurrentPage(e.data)
  }

  const goNext = () => bookRef.current?.pageFlip()?.flipNext()
  const goPrev = () => bookRef.current?.pageFlip()?.flipPrev()

  const getPageLabel = () => {
    if (currentPage === 0) return 'Portada'
    if (currentPage === TOTAL_PAGES - 1) return 'Contraportada'
    if (isMobile) return `Página ${currentPage} de ${TOTAL_PAGES - 2}`
    return `Páginas ${currentPage}–${Math.min(currentPage + 1, TOTAL_PAGES - 2)}`
  }

  const isCover = currentPage === 0
  const isBackCover = currentPage === TOTAL_PAGES - 1
  const isClosed = isCover || isBackCover

  // En escritorio (libro abierto), la portada se dibuja en la mitad derecha y la
  // contraportada en la izquierda. Desplazamos el libro para centrar la hoja única.
  // En móvil ya se muestra una sola hoja centrada, así que no hace falta offset.
  const coverOffset =
    isMobile || !isClosed ? 0 : isCover ? -dimensions.width / 2 : dimensions.width / 2

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 py-6 z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-gradient">
          Nuestra historia
        </h2>
        <p className="text-romantic-deep/60 text-sm mt-1">
          {getPageLabel()}
        </p>
      </motion.div>

      <div className="book-container relative">
        <motion.div
          className="relative"
          animate={{ x: coverOffset }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
        <div
          className="book-spine"
          aria-hidden="true"
          style={{
            opacity: isClosed || isMobile ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        />
        <HTMLFlipBook
          ref={bookRef}
          width={dimensions.width}
          height={dimensions.height}
          size="fixed"
          minWidth={140}
          maxWidth={480}
          minHeight={360}
          maxHeight={650}
          maxShadowOpacity={0.6}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={handleFlip}
          className="book-flip shadow-2xl"
          style={{}}
          startPage={0}
          drawShadow={true}
          flippingTime={900}
          usePortrait={isMobile}
          startZIndex={0}
          autoSize={false}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
          clickEventForward={true}
        >
          {/* Página 0 — Portada (una sola hoja) */}
          <Page className="book-cover flex flex-col items-center justify-center p-4 sm:p-6 text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="text-4xl sm:text-5xl mb-3 block">📖</span>
            </motion.div>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gradient mb-2">
              Nuestra Historia
            </h2>
            <p className="text-romantic-deep/70 text-xs sm:text-sm italic mb-4">
              Un viaje por nuestro amor
            </p>
            <div className="w-14 h-0.5 bg-gradient-to-r from-romantic-pink via-romantic-gold to-romantic-purple rounded mb-4" />
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-romantic-purple text-[10px] sm:text-xs font-semibold"
            >
              Toca para abrir 👆
            </motion.p>
          </Page>

          {/* Páginas 1–4 — Capítulos en hojas enfrentadas */}
          {chapters.map((chapter) => (
            <Page key={chapter.id}>
              <ChapterPage chapter={chapter} />
            </Page>
          ))}

          {/* Página 5 — Sorpresa final (contraportada, una sola hoja) */}
          <Page className="book-back-cover flex flex-col items-center justify-center p-4 sm:p-6 text-center">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl sm:text-6xl mb-4 block"
            >
              🎁
            </motion.span>
            <h2 className="font-display text-lg sm:text-2xl font-bold text-gradient mb-3">
              ¡Llegaste al Final!
            </h2>
            <p className="text-romantic-deep/70 text-xs sm:text-sm mb-5 max-w-[200px]">
              Hay una sorpresa especial esperándote...
            </p>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenGift}
              className="btn-romantic px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-sm sm:text-base cursor-pointer"
            >
              Abrir Regalo Final 🎀
            </motion.button>
            <p className="mt-6 text-romantic-deep/40 text-[10px] italic">
              Con todo mi amor ❤️
            </p>
          </Page>
        </HTMLFlipBook>
        </motion.div>
      </div>

      <p className="text-romantic-deep/50 text-xs mt-3 text-center px-4">
        {isCover
          ? 'Toca la portada para abrir el libro 📖'
          : 'Haz clic en la esquina de la página o arrastra para pasar hojas'}
      </p>

      <div className="flex items-center gap-4 mt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goPrev}
          disabled={currentPage === 0}
          className="glass px-5 py-2 rounded-full text-sm text-romantic-deep cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Anterior
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goNext}
          disabled={currentPage >= TOTAL_PAGES - 1}
          className="glass px-5 py-2 rounded-full text-sm text-romantic-deep cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Siguiente →
        </motion.button>
      </div>

      {onBack && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          onClick={onBack}
          className="mt-4 text-romantic-deep/50 text-sm hover:text-romantic-deep/80 transition-colors cursor-pointer"
        >
          ← Volver a la portada
        </motion.button>
      )}
    </motion.div>
  )
}
