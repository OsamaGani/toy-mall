import PageHeader from '../components/PageHeader';
import Reveal from '../components/Reveal';
import { Link } from 'react-router-dom';
import { FiAward, FiHeart, FiTruck, FiShield, FiArrowRight } from 'react-icons/fi';
import SEO from '../components/SEO';

const values = [
  { icon: <FiAward />,  title: 'Craftsman-Built',     desc: 'Every Talle chair is built and inspected by craftsmen with 15+ years of seating experience — no factory shortcuts.' },
  { icon: <FiHeart />,  title: 'Comfort First',       desc: 'We obsess over cushion density, seat depth and lumbar curve so your back thanks you eight hours into a workday.' },
  { icon: <FiShield />, title: 'BIFMA-Grade Parts',   desc: 'Class-4 hydraulics, certified mesh, heavy-duty star bases. The components inside match what you\'d find in chairs costing 3× more.' },
  { icon: <FiTruck />,  title: 'Mumbai Service',      desc: 'Free delivery on orders above ₹2,999, doorstep pickup for repairs, and an actual human you can call.' },
];

const stats = [
  { num: '15+',     label: 'Years in Business' },
  { num: '8,000+',  label: 'Chairs Sold' },
  { num: '4.9★',    label: 'Google Rating (213 reviews)' },
  { num: '24×7',    label: 'Open All Days' },
];

export default function About() {
  return (
    <div>
      <SEO
        title="About Talle Furniture Mart — Chair Manufacturer & Repair in Sakinaka, Mumbai"
        description="Talle Furniture Mart is a family-run chair specialist in Sakinaka, Mumbai. We manufacture, retail and repair executive, ergonomic, gaming, banquet and dining chairs. 15+ years, 4.8★ on Justdial, BIFMA-grade parts, doorstep repair across Mumbai."
        path="/about"
        keywords="talle furniture mart, chair manufacturer mumbai, chair repair sakinaka, chair shop andheri east, office chair supplier mumbai, ergonomic chair manufacturer india, banquet chair manufacturer, gaming chair shop mumbai, chair reupholstery, family run furniture shop mumbai"
      />
      <PageHeader
        title="From a Sakinaka Workshop to Offices & Homes Across Mumbai"
        subtitle="Talle Furniture Mart started as a one-room chair workshop. Today we manufacture, retail and repair seating for offices, banquet halls, restaurants and homes across the city — without losing the craftsman's eye for detail."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* Story */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <Reveal>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed">
                Talle Furniture Mart opened at D'Souza Sadan, Saki Naka with one simple
                goal: give Mumbai a chair shop where the people fitting the cylinder
                actually know how it works. Founded by <strong>Abdul Rab</strong>, the
                shop quickly became the place offices, banquet halls and restaurants
                came to for genuine seating that lasted.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                Word spread, and customers from every Mumbai suburb — and beyond — started
                asking if we could deliver, repair their tired chairs, manufacture custom
                runs for new offices. So we built this online store and a doorstep service
                operation. Whether you walk into our workshop or order from across the
                country, the promise is the same: <strong>real components, fair prices,
                and a shop owner who personally signs off on every repair.</strong>
              </p>
              <div className="mt-5 inline-flex items-center gap-3 bg-primary-50 border border-primary-200 rounded-xl px-4 py-3">
                <span className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-pink-500 text-white font-extrabold flex items-center justify-center">A</span>
                <div>
                  <p className="font-bold text-sm text-gray-900">Abdul Rab</p>
                  <p className="text-xs text-gray-500">Founder &amp; Master Craftsman</p>
                </div>
              </div>
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800" alt="Talle Furniture Mart workshop" className="w-full h-full object-cover" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-primary-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl md:text-4xl font-extrabold">{s.num}</p>
              <p className="opacity-90 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold">How We Run the Workshop</h2>
            <p className="text-gray-600 mt-2">Four standards we don't compromise on — for every chair that leaves the shop.</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 100}>
              <div className="bg-white border-2 border-gray-100 hover:border-primary-500 rounded-xl p-6 transition hover:shadow-lg group h-full">
                <div className="bg-primary-100 group-hover:bg-primary-500 group-hover:text-white text-primary-500 w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-3 transition">
                  {v.icon}
                </div>
                <h3 className="font-bold text-lg">{v.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTAs */}
      <section className="bg-gray-50 border-y">
        <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-6">
          <Reveal direction="left">
            <Link to="/wholesale" className="bg-gradient-to-r from-purple-600 to-primary-500 text-white rounded-xl p-8 hover:shadow-xl transition flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-extrabold">Outfitting an office?</h3>
                <p className="opacity-90 mt-1">Open a wholesale account for the best rates</p>
              </div>
              <FiArrowRight size={28} />
            </Link>
          </Reveal>
          <Reveal direction="right" delay={150}>
            <Link to="/contact" className="bg-gray-900 text-white rounded-xl p-8 hover:shadow-xl transition flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-extrabold">Need a repair quote?</h3>
                <p className="opacity-90 mt-1">Visit our Sakinaka workshop or call +91 93261 66875</p>
              </div>
              <FiArrowRight size={28} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
