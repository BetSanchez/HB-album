// Rutas locales: coloca tus fotos en public/images/ (ver public/images/LEEME.txt)
const img = (path) => `/images/${path}`

export const coverPhoto = img('portada.jpg')

export const chapters = [
  {
    id: 'how-we-met',
    title: 'Cómo Nos Conocimos',
    subtitle: 'El inicio de todo',
    icon: '✨',
    image: img('capitulos/capitulo01.jpg'),
    content:
      'Recuerdo ese día como si fuera ayer. Un encuentro casual que cambió mi vida para siempre. Tus ojos brillaban y supe, en ese instante, que algo mágico estaba por comenzar. Desde la primera conversación, sentí que te conocía de toda la vida.',
    date: 'El día que el destino nos unió',
  },
  {
    id: 'our-adventures',
    title: 'Nuestras Aventuras',
    subtitle: 'Cada viaje contigo',
    icon: '🌍',
    image: img('capitulos/02-aventuras.jpg'),
    content:
      'Juntos hemos explorado lugares increíbles y creado recuerdos inolvidables. Cada aventura contigo es una nueva página en nuestra historia. Desde paseos espontáneos hasta viajes soñados, cada momento a tu lado es una aventura que atesoro.',
    date: 'Miles de kilómetros, un solo corazón',
  },
  {
    id: 'favorite-memories',
    title: 'Mis Recuerdos Favoritos',
    subtitle: 'Momentos que guardo en el alma',
    icon: '💫',
    image: img('capitulos/03-recuerdos.jpg'),
    content:
      'Hay momentos que se quedan grabados para siempre: tus risas, nuestras conversaciones hasta tarde, los abrazos que curan todo. Cada recuerdo contigo es un tesoro que llevo cerca del corazón. Eres mi momento favorito, una y otra vez.',
    date: 'Los instantes que definen nuestro amor',
  },
  {
    id: 'our-future',
    title: 'Nuestro Futuro Juntos',
    subtitle: 'Lo que aún está por venir',
    icon: '🌟',
    image: img('capitulos/04-futuro.jpg'),
    content:
      'Imagino un futuro lleno de amor, risas y sueños cumplidos a tu lado. Cada día contigo es una promesa de lo que vendrá. Quiero construir contigo un mañana hermoso, lleno de nuevas aventuras, más amor y una vida juntos que valga la pena.',
    date: 'Para siempre y un día más',
  },
]

export const pokemonCards = [
  {
    id: 1,
    name: 'Amor Brillante',
    type: 'Corazón',
    rarity: '★★★',
    image: img('cartas/01.jpg'),
    description:
      'Tu sonrisa ilumina mi mundo entero. Cada vez que me miras, siento que todo vale la pena.',
  },
  {
    id: 2,
    name: 'Abrazo Eterno',
    type: 'Ternura',
    rarity: '★★★',
    image: img('cartas/02.jpg'),
    description:
      'En tus brazos encontré mi hogar. No hay lugar en el mundo donde prefiera estar.',
  },
  {
    id: 3,
    name: 'Risa Mágica',
    type: 'Alegría',
    rarity: '★★',
    image: img('cartas/03.jpg'),
    description:
      'Tu risa es la melodía más hermosa que he escuchado. Haces que cada día sea especial.',
  },
  {
    id: 4,
    name: 'Mirada Profunda',
    type: 'Conexión',
    rarity: '★★★',
    image: img('cartas/04.jpg'),
    description:
      'Cuando nuestros ojos se encuentran, el tiempo se detiene. Eres mi universo entero.',
  },
  {
    id: 5,
    name: 'Aventura Juntos',
    type: 'Exploración',
    rarity: '★★',
    image: img('cartas/05.jpg'),
    description:
      'Cada aventura contigo es un capítulo nuevo de nuestra historia. Contigo, todo es emocionante.',
  },
  {
    id: 6,
    name: 'Noche Estrellada',
    type: 'Romance',
    rarity: '★★★',
    image: img('cartas/06.jpg'),
    description:
      'Bajo las estrellas contigo, cada noche se convierte en un sueño hecho realidad.',
  },
  {
    id: 7,
    name: 'Canción de Amor',
    type: 'Música',
    rarity: '★★',
    image: img('cartas/07.jpg'),
    description:
      'Eres la canción que mi corazón canta cada mañana. Mi playlist favorita eres tú.',
  },
  {
    id: 8,
    name: 'Flor de Primavera',
    type: 'Belleza',
    rarity: '★★★',
    image: img('cartas/08.jpg'),
    description:
      'Como una flor en primavera, tu amor hace florecer cada rincón de mi vida.',
  },
  {
    id: 9,
    name: 'Promesa Eterna',
    type: 'Compromiso',
    rarity: '★★★',
    image: img('cartas/09.jpg'),
    description:
      'Prometo amarte hoy, mañana y siempre. Eres mi presente y mi futuro.',
  },
  {
    id: 10,
    name: 'Tesoro Supremo',
    type: 'Legendario',
    rarity: '★★★★',
    image: img('cartas/10.jpg'),
    description:
      'Eres el tesoro más preciado de mi vida. Mi carta más valiosa, mi amor legendario.',
  },
]

export const loveLetter = `Mi amor,

Hoy celebramos un día muy especial: el día en que llegaste al mundo para iluminar la mía. No hay palabras suficientes para expresar lo que siento por ti, pero quiero que sepas que eres lo más importante en mi vida.

Cada momento a tu lado es un regalo. Tu amor me hace mejor persona, tu sonrisa me da fuerzas y tu presencia hace que todo tenga sentido.

Este álbum es solo una pequeña muestra de todo lo que significas para mí. Cada página, cada recuerdo, cada carta coleccionable... todo es por ti.

Gracias por existir, por amarme y por ser exactamente quien eres.

Feliz cumpleaños, mi amor. Te amo infinitamente. ❤️

Con todo mi corazón,
Tu persona favorita 💕`

export const birthdayVideoUrl =
  'https://www.youtube.com/embed/450p7goxZqg?autoplay=0&rel=0'

export const surpriseCard = {
  name: 'Amor Legendario',
  type: 'Corazón',
  rarity: '★★★★',
  hp: '∞',
  image: img('sorpresa/carta-sorpresa.jpg'),
  message:
    'Hoy celebramos el día en que llegaste al mundo para iluminar la mía. Eres lo más importante en mi vida. Cada momento a tu lado es un regalo. Feliz cumpleaños, mi amor. Te amo infinitamente. ❤️',
}
