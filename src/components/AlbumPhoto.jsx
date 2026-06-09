import { useState, useCallback } from 'react'

function PhotoCorner({ position }) {
  const positions = {
    tl: 'top-1.5 left-1.5',
    tr: 'top-1.5 right-1.5',
    bl: 'bottom-1.5 left-1.5',
    br: 'bottom-1.5 right-1.5',
  }

  const isRight = position === 'tr' || position === 'br'
  const isBottom = position === 'bl' || position === 'br'

  return (
    <div
      className={`album-corner absolute ${positions[position]} z-10`}
      aria-hidden="true"
    >
      <span
        className={`album-corner-bar-h ${isRight ? 'right-0' : 'left-0'} ${isBottom ? 'bottom-0' : 'top-0'}`}
      />
      <span
        className={`album-corner-bar-v ${isRight ? 'right-0' : 'left-0'} ${isBottom ? 'bottom-0' : 'top-0'}`}
      />
    </div>
  )
}

const sizeClasses = {
  small: 'size-small',
  default: '',
  large: 'size-large',
}

const paddingClasses = {
  small: 'p-1',
  default: 'p-1.5 sm:p-2',
  large: 'p-2.5 sm:p-3',
}

export default function AlbumPhoto({
  src,
  alt,
  className = '',
  imageClassName = '',
  size = 'default',
  adaptive = false,
}) {
  const [orientation, setOrientation] = useState(null)

  const handleLoad = useCallback((e) => {
    const { naturalWidth, naturalHeight } = e.target
    setOrientation(naturalWidth >= naturalHeight ? 'landscape' : 'portrait')
  }, [])

  const isAdaptive = adaptive
  const isLandscape = orientation === 'landscape'
  const isPortrait = orientation === 'portrait'

  return (
    <div
      className={`album-photo relative ${isAdaptive ? 'album-photo-adaptive' : 'inline-block'} ${sizeClasses[size]} ${className}`}
    >
      <div
        className={`relative bg-white ${paddingClasses[size]} shadow-[0_2px_10px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.08)] ${isAdaptive ? 'inline-flex items-center justify-center max-h-full max-w-full' : ''}`}
      >
        <img
          src={src}
          alt={alt}
          onLoad={isAdaptive ? handleLoad : undefined}
          className={`block ${isAdaptive ? 'album-photo-img-adaptive' : 'object-cover'} ${
            isAdaptive && isLandscape ? 'album-photo-landscape' : ''
          } ${isAdaptive && isPortrait ? 'album-photo-portrait' : ''} ${imageClassName}`}
        />
        <PhotoCorner position="tl" />
        <PhotoCorner position="tr" />
        <PhotoCorner position="bl" />
        <PhotoCorner position="br" />
      </div>
    </div>
  )
}
