import { useEffect, useState, useCallback } from 'react';
import { X, Sparkles } from 'lucide-react';

// ─── Festival definitions ────────────────────────────────────────────────────
interface Festival {
  name: string;
  emoji: string;
  wish: string;
  gradient: string;
  accent: string;
  dates: Array<[number, number]>;
  specificDates?: string[];
}

const FESTIVALS: Festival[] = [
  {
    name: 'Happy New Year! 🎆',
    emoji: '🎉',
    wish: 'Wishing you and your family a year filled with joy, success, and endless happiness. May this new year bring new beginnings and bright opportunities!',
    gradient: 'from-indigo-600 via-purple-600 to-pink-600',
    accent: 'text-yellow-300',
    dates: [[1, 1]],
  },
  {
    name: 'Makar Sankranti',
    emoji: '🪁',
    wish: 'May the auspicious occasion of Makar Sankranti fill your life with warmth, prosperity, and the sweetness of tilgur. Wishing everyone happiness and good health!',
    gradient: 'from-orange-500 via-yellow-500 to-amber-400',
    accent: 'text-white',
    dates: [[1, 14]],
  },
  {
    name: 'Republic Day',
    emoji: '🇮🇳',
    wish: 'On this proud occasion of Republic Day, let us celebrate the spirit of our great nation. Jai Hind! Wishing everyone a happy and prosperous Republic Day!',
    gradient: 'from-orange-500 via-white to-green-600',
    accent: 'text-blue-900',
    dates: [[1, 26]],
  },
  {
    name: 'Vasant Panchami',
    emoji: '🌸',
    wish: 'May Goddess Saraswati bless every student with wisdom, knowledge, and creativity. Happy Vasant Panchami — may spring bring joy and new beginnings!',
    gradient: 'from-yellow-400 via-yellow-300 to-amber-300',
    accent: 'text-yellow-900',
    dates: [],
    specificDates: ['2025-02-02', '2026-01-22', '2027-02-11'],
  },
  {
    name: "Valentine's Day 💕",
    emoji: '❤️',
    wish: "Spread love, kindness, and warmth today and every day. Happy Valentine's Day to all our wonderful students, teachers, and families!",
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    accent: 'text-pink-100',
    dates: [[2, 14]],
  },
  {
    name: 'Maha Shivratri',
    emoji: '🔱',
    wish: 'May Lord Shiva bless you with strength, wisdom, and peace. Happy Maha Shivratri — may his divine grace guide you on the path of righteousness!',
    gradient: 'from-gray-800 via-indigo-900 to-purple-900',
    accent: 'text-orange-300',
    dates: [],
    specificDates: ['2025-02-26', '2026-02-15', '2027-03-06'],
  },
  {
    name: 'Holi — Festival of Colours! 🌈',
    emoji: '🎨',
    wish: 'May the vibrant colours of Holi paint your life with happiness, health, and prosperity. Wishing everyone a safe and colourful Holi — bura na mano, Holi hai!',
    gradient: 'from-pink-500 via-purple-500 to-yellow-400',
    accent: 'text-white',
    dates: [],
    specificDates: ['2025-03-14', '2026-03-03', '2027-03-22'],
  },
  {
    name: 'Good Friday',
    emoji: '✝️',
    wish: 'On this solemn day of Good Friday, may we reflect on sacrifice, compassion, and love. Wishing peace and blessings to all who observe this sacred day.',
    gradient: 'from-gray-700 via-gray-600 to-gray-800',
    accent: 'text-gray-200',
    dates: [],
    specificDates: ['2025-04-18', '2026-04-03', '2027-03-26'],
  },
  {
    name: 'Ram Navami',
    emoji: '🙏',
    wish: "May Lord Ram's teachings of righteousness, courage, and devotion inspire us all. Wishing you and your family a blessed Ram Navami filled with peace and joy!",
    gradient: 'from-orange-400 via-yellow-400 to-amber-500',
    accent: 'text-orange-900',
    dates: [],
    specificDates: ['2025-04-06', '2026-03-26', '2027-04-14'],
  },
  {
    name: 'Easter Sunday 🐣',
    emoji: '🌷',
    wish: 'May the joy of Easter fill your heart with hope, renewal, and happiness. Wishing everyone a blessed Easter Sunday full of love and new beginnings!',
    gradient: 'from-green-400 via-emerald-400 to-teal-400',
    accent: 'text-green-900',
    dates: [],
    specificDates: ['2025-04-20', '2026-04-05', '2027-03-28'],
  },
  {
    name: 'Eid-ul-Fitr Mubarak! ☪️',
    emoji: '🌙',
    wish: 'Eid Mubarak! May this joyous occasion bring peace, happiness, and prosperity to you and your loved ones. Wishing everyone a blessed Eid filled with love and togetherness!',
    gradient: 'from-emerald-600 via-teal-600 to-green-700',
    accent: 'text-yellow-200',
    dates: [],
    specificDates: ['2025-03-31', '2026-03-20', '2027-03-09'],
  },
  {
    name: 'Ambedkar Jayanti',
    emoji: '✊',
    wish: 'On the birth anniversary of Dr. B.R. Ambedkar, let us remember his extraordinary contributions to our nation. Jai Bhim! Let his vision of equality and justice guide us always.',
    gradient: 'from-blue-700 via-blue-600 to-blue-800',
    accent: 'text-yellow-300',
    dates: [[4, 14]],
  },
  {
    name: 'Independence Day 🎉',
    emoji: '🇮🇳',
    wish: 'Happy Independence Day! Let us cherish the freedom our brave heroes gifted us. May our nation continue to grow in strength, unity, and prosperity. Jai Hind!',
    gradient: 'from-orange-500 via-white to-green-600',
    accent: 'text-blue-900',
    dates: [[8, 15]],
  },
  {
    name: 'Janmashtami',
    emoji: '🦚',
    wish: "May Lord Krishna's wisdom, love, and playful spirit fill your life with joy and blessings. Happy Janmashtami — Nand ke Anand Bhayo, Jai Kanhaiya Lal Ki!",
    gradient: 'from-blue-700 via-purple-700 to-indigo-800',
    accent: 'text-yellow-300',
    dates: [],
    specificDates: ['2025-08-16', '2026-08-05', '2027-08-24'],
  },
  {
    name: 'Ganesh Chaturthi',
    emoji: '🐘',
    wish: 'Ganpati Bappa Morya! May Lord Ganesha remove all obstacles from your path and bless you with wisdom, success, and prosperity. Happy Ganesh Chaturthi!',
    gradient: 'from-orange-400 via-amber-400 to-yellow-400',
    accent: 'text-orange-900',
    dates: [],
    specificDates: ['2025-08-27', '2026-08-17', '2027-09-05'],
  },
  {
    name: "Teachers' Day 🍎",
    emoji: '📚',
    wish: "On this special Teachers' Day, we bow in gratitude to every teacher who shapes young minds and nurtures future leaders. Thank you for your dedication and love!",
    gradient: 'from-green-700 via-emerald-600 to-teal-600',
    accent: 'text-yellow-300',
    dates: [[9, 5]],
  },
  {
    name: 'Navratri',
    emoji: '💃',
    wish: 'May Goddess Durga shower her blessings upon you and your family. Wishing everyone a joyful Navratri filled with devotion, dance, and divine grace. Jai Mata Di!',
    gradient: 'from-red-500 via-pink-500 to-orange-500',
    accent: 'text-yellow-200',
    dates: [],
    specificDates: ['2025-09-22', '2026-10-11', '2027-09-30'],
  },
  {
    name: 'Dussehra — Vijay Dashami!',
    emoji: '🏹',
    wish: 'May this Dussehra mark the victory of good over evil in your life too. Wishing you the strength to conquer every challenge. Happy Vijay Dashami!',
    gradient: 'from-orange-600 via-red-500 to-yellow-500',
    accent: 'text-yellow-100',
    dates: [],
    specificDates: ['2025-10-02', '2026-10-20', '2027-10-09'],
  },
  {
    name: 'Gandhi Jayanti',
    emoji: '🕊️',
    wish: "On the birth anniversary of the Father of the Nation, let us recommit to truth, non-violence, and service. Happy Gandhi Jayanti — Bapu's ideals are our guiding light!",
    gradient: 'from-amber-600 via-orange-500 to-yellow-600',
    accent: 'text-white',
    dates: [[10, 2]],
  },
  {
    name: 'Dhanteras',
    emoji: '🪔',
    wish: 'May Goddess Lakshmi bless your home with wealth, health, and prosperity on this auspicious Dhanteras. Wishing you and your family a golden and prosperous year ahead!',
    gradient: 'from-yellow-500 via-amber-400 to-orange-400',
    accent: 'text-yellow-900',
    dates: [],
    specificDates: ['2025-10-20', '2026-11-07', '2027-10-27'],
  },
  {
    name: 'Happy Diwali! 🪔',
    emoji: '✨',
    wish: 'May the Festival of Lights illuminate your life with happiness, peace, and prosperity. Wishing you and your family a very Happy and Safe Diwali — Shubh Deepawali!',
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
    accent: 'text-yellow-100',
    dates: [],
    specificDates: ['2025-10-20', '2026-11-08', '2027-10-28'],
  },
  {
    name: 'Bhai Dooj',
    emoji: '🤝',
    wish: 'May the beautiful bond between brothers and sisters grow stronger every year. Happy Bhai Dooj — wishing love, protection, and joy to all siblings!',
    gradient: 'from-pink-500 via-rose-400 to-red-400',
    accent: 'text-pink-100',
    dates: [],
    specificDates: ['2025-10-23', '2026-11-11', '2027-10-30'],
  },
  {
    name: "Children's Day 🎈",
    emoji: '🧒',
    wish: "Happy Children's Day to all our wonderful little stars! May you always stay curious, joyful, and full of dreams. Today is all about YOU — keep shining bright!",
    gradient: 'from-sky-400 via-blue-400 to-violet-500',
    accent: 'text-yellow-200',
    dates: [[11, 14]],
  },
  {
    name: 'Guru Nanak Jayanti',
    emoji: '☬',
    wish: 'Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh! May the teachings of Guru Nanak Dev Ji — love, equality, and selfless service — guide us all towards peace and harmony.',
    gradient: 'from-orange-500 via-amber-400 to-yellow-300',
    accent: 'text-orange-900',
    dates: [],
    specificDates: ['2025-11-05', '2026-11-24', '2027-11-14'],
  },
  {
    name: 'Merry Christmas! 🎄',
    emoji: '🎅',
    wish: 'May the spirit of Christmas fill your heart with warmth, joy, and love. Wishing everyone a Merry Christmas and a wonderful holiday season with family and loved ones!',
    gradient: 'from-red-600 via-green-700 to-red-700',
    accent: 'text-yellow-300',
    dates: [[12, 25]],
  },
];

// ─── Confetti ────────────────────────────────────────────────────────────────
interface Particle {
  id: number;
  x: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  shape: 'square' | 'circle' | 'rect';
}

const COLORS = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#FF9F43', '#A29BFE'];

function generateParticles(count = 40): Particle[] {
  const shapes: Particle['shape'][] = ['square', 'circle', 'rect'];
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: Math.random() * 8 + 5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 2.5,
    duration: Math.random() * 2 + 2.5,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
  }));
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function FestivalGreeting() {
  const [festival, setFestival] = useState<Festival | null>(null);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [particles] = useState<Particle[]>(() => generateParticles(40));

  const detectFestival = useCallback((): Festival | null => {
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const month = now.getMonth() + 1;
    const day = now.getDate();

    for (const f of FESTIVALS) {
      if (f.dates?.some(([m, d]) => m === month && d === day)) return f;
      if (f.specificDates?.includes(todayStr)) return f;
    }
    return null;
  }, []);

  useEffect(() => {
    const found = detectFestival();
    if (!found) return;

    // Show every time the page loads/refreshes — no localStorage suppression
    setFestival(found);
    const t = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(t);
  }, [detectFestival]);

  const handleClose = useCallback(() => {
    if (closing) return;          // prevent double-fire
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      setClosing(false);
      setFestival(null);
    }, 400);
  }, [closing]);

  // Close on Escape key
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [visible, handleClose]);

  if (!festival) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm transition-opacity duration-400 cursor-pointer ${
          closing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Confetti — only while open */}
      {!closing && (
        <div className="fixed inset-0 z-[201] pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className={`absolute top-0 animate-confetti ${
                p.shape === 'circle' ? 'rounded-full' : p.shape === 'rect' ? 'rounded-sm' : 'rounded-sm'
              }`}
              style={{
                left: `${p.x}%`,
                width: p.shape === 'rect' ? p.size * 2 : p.size,
                height: p.size,
                backgroundColor: p.color,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Card wrapper — centres on all screen sizes */}
      <div className="fixed inset-0 z-[202] flex items-center justify-center p-3 xs:p-4 sm:p-6 pointer-events-none">
        <div
          className={`relative w-full pointer-events-auto transition-all duration-400 ease-out ${
            closing
              ? 'opacity-0 scale-90 translate-y-6'
              : visible
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-90 translate-y-6'
          }`}
          style={{ maxWidth: 'min(440px, 100%)' }}
          role="dialog"
          aria-modal="true"
          aria-label={festival.name}
        >
          {/* Glow ring */}
          <div
            className={`absolute -inset-1 bg-gradient-to-r ${festival.gradient} rounded-3xl blur-xl opacity-50 animate-pulse`}
          />

          {/* Card */}
          <div className={`relative bg-gradient-to-br ${festival.gradient} rounded-3xl overflow-hidden shadow-2xl`}>
            {/* Top shimmer strip */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/40" />

            {/* Big faded emoji bg */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <span className="text-[120px] xs:text-[150px] sm:text-[180px] opacity-[0.08] blur-sm leading-none">
                {festival.emoji}
              </span>
            </div>

            {/* ── Close button ── always visible, top-right ── */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 bg-black/25 hover:bg-black/40 active:bg-black/50 rounded-full flex items-center justify-center transition-colors duration-200 cursor-pointer"
              aria-label="Close greeting"
              type="button"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
            </button>

            {/* Content */}
            <div className="relative z-10 px-5 pt-6 pb-6 xs:px-6 xs:pt-7 sm:px-8 sm:pt-8 sm:pb-8 text-center">
              {/* Emoji */}
              <div className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl mb-3 sm:mb-4 animate-bounce-slow select-none drop-shadow-lg leading-none">
                {festival.emoji}
              </div>

              {/* Sparkle label */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white/70 flex-shrink-0" />
                <span className="text-white/80 text-[10px] xs:text-xs font-semibold uppercase tracking-widest">
                  Festival Greetings from GVCS
                </span>
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white/70 flex-shrink-0" />
              </div>

              {/* Festival name */}
              <h2
                className={`text-xl xs:text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 leading-tight drop-shadow ${festival.accent}`}
              >
                {festival.name}
              </h2>

              {/* Divider */}
              <div className="w-10 h-0.5 bg-white/40 mx-auto mb-3 sm:mb-4 rounded-full" />

              {/* Wish text */}
              <p className="text-white/90 text-xs xs:text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 max-w-sm mx-auto">
                {festival.wish}
              </p>

              {/* School tag */}
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 inline-block mb-4 sm:mb-5">
                <p className="text-white text-xs sm:text-sm font-bold leading-tight">
                  — Green Valley Convent School
                </p>
                <p className="text-white/70 text-[10px] xs:text-xs">Wishes you &amp; your family 🌿</p>
              </div>

              {/* Dismiss button */}
              <div>
                <button
                  onClick={handleClose}
                  type="button"
                  className="px-5 xs:px-6 py-2 xs:py-2.5 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white text-xs xs:text-sm font-semibold rounded-xl transition-all duration-200 border border-white/30 hover:border-white/60 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  Thank You! 🙏
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
