import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';

export default function PageHeader({ title, subtitle, breadcrumbs = [] }) {
  return (
    <div className="bg-gradient-to-r from-primary-500 to-pink-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <nav className="text-sm opacity-90 flex items-center gap-1 mb-3 flex-wrap">
          <Link to="/" className="hover:underline flex items-center gap-1"><FiHome size={12} /> Home</Link>
          {breadcrumbs.map((b, i) => (
            <span key={i} className="flex items-center gap-1">
              <FiChevronRight size={12} />
              {b.to ? <Link to={b.to} className="hover:underline">{b.label}</Link> : <span>{b.label}</span>}
            </span>
          ))}
        </nav>
        <h1 className="text-3xl md:text-5xl font-extrabold">{title}</h1>
        {subtitle && <p className="mt-3 text-base md:text-lg opacity-95 max-w-2xl">{subtitle}</p>}
      </div>
    </div>
  );
}
