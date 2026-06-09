// Rutas locales: coloca tus fotos en public/images/ (ver public/images/LEEME.txt)
const img = (path) => `${import.meta.env.BASE_URL}images/${path}`

export const coverPhoto = img('portada.jpg')

export const chapters = [
  {
    id: 'how-we-met',
    title: 'Cómo Nos Conocimos',
    subtitle: 'El inicio de todo',
    icon: '✨',
    image: img('capitulos/capitulo01.jpeg'),
    content:
      'Recuerdo ese día que todo comenzo, te pedi ayuda con unas dudas que tenia sobre mi proyecto de residencia, y viste mi lapicero de Cinnamoroll, me dijiste que era muy lindo y que a ti tambien te gustaba desde ahí comenzamos a acercarnos hablarnos más .',
    date: 'El día que el destino nos unió',
  },
  {
    id: 'first-picture',
    title: 'Nuestra primera foto juntos',
    subtitle: 'La primer foto',
    icon: '📸',
    image: img('capitulos/capitulo02.jpeg'),
    content:
      'Nuestra primer foto juntos, cuando recien nos pasamos a la oficina, Mario la tomo si no mal recuerdo, apenas y nos conociamos, habiamos hablado muy poco, pero esa elección de lugares, tenerte justo al lado fue lo que inicio toda esta historia, porque ahora no quiero que dejes de estar a mi lado.',
    date: 'La primer foto',
  },
  {
    id: 'Odoo',
    title: 'Nuestra primer conferencia y evento tech juntos',
    subtitle: 'Ese día en Odoo',
    icon: '🟣',
    image: img('capitulos/capitulo03.jpeg'),
    content: 
    'Recuerdas ese día, nos vieron pelear y nos dijeron que nosotros ibamos a terminar juntos, cosa que ambos negamos, nos parecia una idea tan ajena en ese momento, pero termino siendo real ',
    date: 'Odoo',
  },
  {
    id: 'Noviembre',
    title: 'Nos volvimos mas cercanos',
    subtitle: 'Nos acercamos',
    icon: '🫶',
    image: img('capitulos/capitulo04.jpeg'),
    content: 
    'Comenzamos a hablar mas y mas en la oficina, nos empezamso a volver mas cercanos, me contaste tu pasado y las cosas que no querias repetir, te conte un poco del mío porque aun me costaba abrirme mucho, pero nos acercamos cada día un poco más...',
    date: 'Empezabamos a entender al otro',
  },
  {
    id: 'Aniversario',
    title: '12/12/25',
    subtitle: 'El dia que todo empezo',
    icon: '❤️‍🔥',
    image: img('capitulos/capitulo05.jpeg'),
    content: 
    'Que puedo decir, sabes lo que paso ese día ambos intentamos negarlo por un tiempo, no aceptabamos que de verdad hubiera pasado pero sucedio, ambos llevabamos tiempo ocultandolo, pero solo un pequeño impulso basto, y como me dijeron "lo hicimos porque estabamos tomados, o tomamos para hacerlo.',
    date: '12/12/25',
  },
  {
    id: 'our-adventures',
    title: 'TE AMO',
    subtitle: 'ERES EL AMOR DE MI VIDA',
    icon: '⭐',
    image: img('capitulos/capitulo06.jpeg'),
    content:
      'Y esto continua pero ya tengo mucho sueño amor perdon. TE AMO MUCHO.',
    date: 'Te amo infinitamente',
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

export const surpriseCard = {
  name: 'Mew',
  image: img('Mew.png'),
  backImage: img('atras.png'),
}
