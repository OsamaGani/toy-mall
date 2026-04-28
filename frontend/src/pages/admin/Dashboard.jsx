import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axios';
import Loader from '../../components/Loader';
import { FiBox, FiShoppingBag, FiUsers, FiDollarSign, FiTrendingUp } from 'react-icons/fi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0, recentOrders: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [products, orders, users] = await Promise.all([
          API.get('/products?limit=1'),
          API.get('/orders'),
          API.get('/users'),
        ]);
        const revenue = orders.data.reduce((s, o) => s + (o.isPaid ? o.totalPrice : 0), 0);
        setStats({
          products: products.data.total,
          orders: orders.data.length,
          users: users.data.length,
          revenue,
          recentOrders: orders.data.slice(0, 5),
        });
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <Loader />;

  const cards = [
    { label: 'Total Products', value: stats.products, icon: <FiBox />, color: 'bg-blue-500', link: '/admin/products' },
    { label: 'Total Orders', value: stats.orders, icon: <FiShoppingBag />, color: 'bg-green-500', link: '/admin/orders' },
    { label: 'Total Users', value: stats.users, icon: <FiUsers />, color: 'bg-purple-500', link: '/admin/users' },
    { label: 'Revenue', value: `₹${stats.revenue.toFixed(2)}`, icon: <FiDollarSign />, color: 'bg-primary-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {cards.map((c) => (
          <div key={c.label} className="bg-white border rounded-lg p-3 sm:p-5">
            <div className={`${c.color} text-white w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center text-lg sm:text-xl mb-2 sm:mb-3`}>
              {c.icon}
            </div>
            <p className="text-lg sm:text-2xl font-bold truncate">{c.value}</p>
            <p className="text-[11px] sm:text-sm text-gray-500">{c.label}</p>
            {c.link && <Link to={c.link} className="text-[10px] sm:text-xs text-primary-500 hover:underline mt-1 sm:mt-2 inline-block">Manage →</Link>}
          </div>
        ))}
      </div>

      <div className="bg-white border rounded-lg p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg flex items-center gap-2"><FiTrendingUp /> Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm text-primary-500 hover:underline">View All</Link>
        </div>
        {stats.recentOrders.length === 0 ? <p className="text-gray-500">No orders yet.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="py-2">Order</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((o) => (
                  <tr key={o._id} className="border-b last:border-0">
                    <td className="py-2 font-mono">#{o._id.slice(-6).toUpperCase()}</td>
                    <td>{o.user?.name || 'Guest'}</td>
                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td><span className="px-2 py-0.5 text-xs rounded bg-gray-100">{o.status}</span></td>
                    <td className="text-right font-semibold">₹{o.totalPrice.toFixed(2)}</td>
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
