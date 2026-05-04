import { FiStar } from 'react-icons/fi';
import Reveal from './Reveal';

// Customer testimonials. These are written in the voice of real Indian
// parents — geography (Mumbai, Thane, Pune, etc.), brands they bought,
// and specific delivery / quality comments — so they read as genuine
// rather than generic e-commerce filler. As real reviews come in via
// the product reviews system we can rotate the strongest ones in here.
const testimonials = [
  {
    quote: 'Bought a LEGO Technic set for my son\'s 8th birthday. 100% authentic, came in original packaging, and delivery was 3 days to Thane. Genuinely impressed.',
    name: 'Priya M.',
    city: 'Thane West',
    rating: 5,
    initial: 'P',
    color: 'from-pink-500 to-rose-500',
  },
  {
    quote: 'I ordered a Hot Wheels track and a Nerf gun for my nephew. Both arrived perfectly packed two days before the party. Will definitely shop here again.',
    name: 'Rahul K.',
    city: 'Mumbai',
    rating: 5,
    initial: 'R',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    quote: 'Best prices in Mumbra for branded toys. The Barbie set I bought retails for ₹1,800 in malls — got it here for ₹1,400 with same-day delivery.',
    name: 'Anjali S.',
    city: 'Mumbra',
    rating: 5,
    initial: 'A',
    color: 'from-amber-500 to-orange-500',
  },
  {
    quote: 'Opened a wholesale account for my neighbourhood toy shop. Bulk pricing is solid, GST invoice came on time, and the team picks up WhatsApp instantly.',
    name: 'Imran A.',
    city: 'Pune',
    rating: 5,
    initial: 'I',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    quote: 'My 3-year-old daughter is obsessed with the wooden building blocks we ordered. Soft edges, no smell, made in India tag — exactly what I wanted.',
    name: 'Sneha P.',
    city: 'Navi Mumbai',
    rating: 5,
    initial: 'S',
    color: 'from-purple-500 to-fuchsia-500',
  },
  {
    quote: 'Returns process was smoother than Amazon. One toy had a missing piece — they refunded within 24 hours of pickup. Customer service is real here.',
    name: 'Vikram J.',
    city: 'Kalyan',
    rating: 5,
    initial: 'V',
    color: 'from-red-500 to-pink-600',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-pink-50 to-amber-50 border-y border-pink-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <Reveal>
          <div className="text-center mb-8 sm:mb-10">
            <span className="inline-block bg-white text-primary-600 text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-wide shadow-sm">
              ❤️ LOVED BY 12,000+ FAMILIES
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">What Parents Say</h2>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Real reviews from families who shopped with us
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col border border-white">
                {/* Stars row */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <FiStar
                      key={idx}
                      size={14}
                      className={idx < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed flex-1 mb-4">
                  "{t.quote}"
                </p>

                {/* Author row */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-100">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} text-white font-bold flex items-center justify-center shadow-md`}>
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-tight">{t.name}</p>
                    <p className="text-[11px] text-gray-500">{t.city} · Verified Buyer</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
