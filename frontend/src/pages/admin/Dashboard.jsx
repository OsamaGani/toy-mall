import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import Loader from '../../components/Loader';
import {
  FiBox, FiShoppingBag, FiUsers, FiDollarSign, FiTrendingUp,
  FiCalendar, FiX,
} from 'react-icons/fi';

// ---- Date range helpers ----
const startOfDay = (d) => { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; };
const endOfDay   = (d) => { const x = new Date(d); x.setHours(23, 59, 59, 999); return x; };
const today = () => new Date();
const daysAgo = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return d; };
const startOfMonth = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), 1);
const toInputDate = (d) => new Date(d).toISOString().slice(0, 10); // YYYY-MM-DD

const PRESETS = [
  { id: 'today', label: 'Today',        compute: () => ({ from: startOfDay(today()), to: endOfDay(today()) }) },
  { id: '7d',    label: 'Last 7 days',  compute: () => ({ from: startOfDay(daysAgo(6)), to: endOfDay(today()) }) },
  { id: '30d',   label: 'Last 30 days', compute: () => ({ from: startOfDay(daysAgo(29)), to: endOfDay(today()) }) },
  { id: 'month', label: 'This month',   compute: () => ({ from: startOfDay(startOfMonth()), to: endOfDay(today()) }) },
  { id: 'all',   label: 'All time',     compute: () => ({ from: null, to: null }) },
];

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [productTotal, setProductTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Date range state — default: Last 30 days (most useful at-a-glance)
  const [presetId, setPresetId] = useState('30d');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  useEffect(() => {
    (async () => {
      try {
        // Products endpoint paginates, so request a large page and use total
        // for the all-time count, plus the products list to filter by date.
        const [p, o, u] = await Promise.all([
          API.get('/products?limit=500'),
          API.get('/orders'),
          API.get('/users'),
        ]);
        setProducts(p.data.products || []);
        setProductTotal(p.data.total || 0);
        setOrders(o.data || []);
        setUsers(u.data || []);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  // Resolve the active range — either a preset or the custom dates.
  const activeRange = useMemo(() => {
    if (presetId === 'custom') {
      return {
        from: customFrom ? startOfDay(customFrom) : null,
        to:   customTo   ? endOfDay(customTo)     : null,
      };
    }
    const preset = PRESETS.find((p) => p.id === presetId) || PRESETS[1];
    return preset.compute();
  }, [presetId, customFrom, customTo]);

  // Predicate that decides if a record's createdAt falls within the active range.
  const inRange = useMemo(() => {
    const { from, to } = activeRange;
    return (item) => {
      if (!from && !to) return true; // "All time"
      const t = new Date(item.createdAt).getTime();
      if (from && t < from.getTime()) return false;
      if (to && t > to.getTime()) return false;
      return true;
    };
  }, [activeRange]);

  // ---- Filtered metrics ----
  const filteredOrders   = useMemo(() => orders.filter(inRange), [orders, inRange]);
  const filteredUsers    = useMemo(() => users.filter(inRange),  [users, inRange]);
  const filteredProducts = useMemo(() => products.filter(inRange), [products, inRange]);

  const isAllTime = !activeRange.from && !activeRange.to;
  const periodLabel = isAllTime
    ? 'All time'
    : `${activeRange.from?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – ${activeRange.to?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`;

  const revenue = useMemo(
    () => filteredOrders.reduce((s, o) => s + (o.isPaid ? o.totalPrice : 0), 0),
    [filteredOrders]
  );
  const pendingRevenue = useMemo(
    () => filteredOrders.reduce((s, o) => s + (!o.isPaid ? o.totalPrice : 0), 0),
    [filteredOrders]
  );

  // For "All products" / "All users", show the all-time figure when the
  // user is on All time (or custom with no dates set), otherwise show
  // "new in period" — both are useful, just different framings.
  const productsCard = isAllTime ? productTotal : filteredProducts.length;
  const usersCard    = isAllTime ? users.length  : filteredUsers.length;

  // Recent orders honor the filter so the table matches the cards
  const recentOrders = useMemo(
    () => [...filteredOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5),
    [filteredOrders]
  );

  if (loading) return <Loader />;

  const cards = [
    {
      label: isAllTime ? 'Total Products' : 'New Products',
      value: productsCard,
      icon: <FiBox />, color: 'bg-blue-500', link: '/admin/products',
    },
    {
      label: isAllTime ? 'Total Orders' : 'Orders in period',
      value: filteredOrders.length,
      icon: <FiShoppingBag />, color: 'bg-green-500', link: '/admin/orders',
    },
    {
      label: isAllTime ? 'Total Users' : 'New Users',
      value: usersCard,
      icon: <FiUsers />, color: 'bg-purple-500', link: '/admin/users',
    },
    {
      label: 'Revenue (paid)',
      value: `₹${revenue.toFixed(2)}`,
      sub: pendingRevenue > 0 ? `₹${pendingRevenue.toFixed(2)} pending` : null,
      icon: <FiDollarSign />, color: 'bg-primary-500',
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-between items-end gap-3 mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 inline-flex items-center gap-1.5">
            <FiCalendar size={14} /> Showing: <span className="font-semibold text-gray-700">{periodLabel}</span>
          </p>
        </div>
      </div>

      {/* Date filter chips */}
      <div className="bg-white border rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => { setPresetId(p.id); }}
              className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition ${
                presetId === p.id
                  ? 'bg-primary-500 text-white border-primary-500 shadow'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-primary-400 hover:text-primary-500'
              }`}
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={() => { setPresetId('custom'); if (!customFrom) setCustomFrom(toInputDate(daysAgo(6))); if (!customTo) setCustomTo(toInputDate(today())); }}
            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold border transition ${
              presetId === 'custom'
                ? 'bg-primary-500 text-white border-primary-500 shadow'
                : 'bg-white text-gray-700 border-gray-200 hover:border-primary-400 hover:text-primary-500'
            }`}
          >
            Custom
          </button>
        </div>

        {presetId === 'custom' && (
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t">
            <label className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">From</span>
              <input
                type="date"
                value={customFrom}
                max={customTo || toInputDate(today())}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="border rounded px-2 py-1.5 text-sm"
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">To</span>
              <input
                type="date"
                value={customTo}
                min={customFrom}
                max={toInputDate(today())}
                onChange={(e) => setCustomTo(e.target.value)}
                className="border rounded px-2 py-1.5 text-sm"
              />
            </label>
            <button
              onClick={() => { setCustomFrom(''); setCustomTo(''); setPresetId('all'); }}
              className="text-xs text-gray-500 hover:text-red-500 inline-flex items-center gap-1 ml-auto"
            >
              <FiX size={12} /> Clear
            </button>
          </div>
        )}
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {cards.map((c) => (
          <div key={c.label} className="bg-white border rounded-lg p-3 sm:p-5 hover:shadow-md transition">
            <div className={`${c.color} text-white w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-lg sm:text-xl mb-2 sm:mb-3`}>
              {c.icon}
            </div>
            <p className="text-lg sm:text-2xl font-bold truncate">{c.value}</p>
            <p className="text-[11px] sm:text-sm text-gray-500">{c.label}</p>
            {c.sub && (
              <p className="text-[10px] sm:text-xs text-orange-500 mt-0.5">{c.sub}</p>
            )}
            {c.link && <Link to={c.link} className="text-[10px] sm:text-xs text-primary-500 hover:underline mt-1 sm:mt-2 inline-block">Manage →</Link>}
          </div>
        ))}
      </div>

      {/* Recent orders — filtered by the same range */}
      <div className="bg-white border rounded-lg p-4 sm:p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-base sm:text-lg flex items-center gap-2">
            <FiTrendingUp /> Recent Orders
            <span className="text-xs font-normal text-gray-400 hidden sm:inline">· {periodLabel}</span>
          </h2>
          <Link to="/admin/orders" className="text-xs sm:text-sm text-primary-500 hover:underline">View All</Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="text-center py-8 text-sm text-gray-500">
            <p>No orders in this period.</p>
            <button onClick={() => setPresetId('all')} className="text-primary-500 hover:underline text-xs mt-1">
              Switch to All time
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="py-2">Order</th>
                  <th>Customer</th>
                  <th className="hidden sm:table-cell">Date</th>
                  <th>Status</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o._id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-2 font-mono text-xs sm:text-sm">#{o._id.slice(-6).toUpperCase()}</td>
                    <td className="text-xs sm:text-sm truncate max-w-[120px]">{o.user?.name || 'Guest'}</td>
                    <td className="hidden sm:table-cell text-xs sm:text-sm">{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td><span className="px-2 py-0.5 text-[10px] sm:text-xs rounded bg-gray-100">{o.status}</span></td>
                    <td className="text-right font-semibold text-xs sm:text-sm">₹{o.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
