import PageHeader from './PageHeader';
import { Link } from 'react-router-dom';

const POLICIES = [
  { to: '/shipping-policy',  label: 'Shipping Policy' },
  { to: '/privacy-policy',   label: 'Privacy Policy' },
  { to: '/terms-of-service', label: 'Terms of Service' },
  { to: '/refund-policy',    label: 'Refund Policy' },
];

export default function PolicyLayout({ title, lastUpdated, children }) {
  return (
    <div>
      <PageHeader
        title={title}
        subtitle={lastUpdated ? `Last updated: ${lastUpdated}` : undefined}
        breadcrumbs={[{ label: 'Policies' }, { label: title }]}
      />
      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-[240px_1fr] gap-8">
        <aside className="lg:sticky lg:top-32 h-fit">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">All policies</h3>
          <nav className="space-y-1">
            {POLICIES.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className={`block px-3 py-2 rounded-md text-sm transition ${
                  window.location.pathname === p.to
                    ? 'bg-primary-500 text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {p.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
            Questions about any policy? <Link to="/contact" className="font-semibold underline">Contact us</Link>.
          </div>
        </aside>

        <article className="prose prose-sm max-w-none bg-white border rounded-xl p-6 md:p-8 leading-relaxed">
          {children}
        </article>
      </div>
    </div>
  );
}
