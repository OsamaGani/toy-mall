import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import Loader from '../components/Loader';
import OrderTimeline from '../components/OrderTimeline';
import { FiMapPin, FiCreditCard, FiPhone } from 'react-icons/fi';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get(`/orders/${id}`);
        setOrder(data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, [id]);

  if (loading) return <Loader />;
  if (!order) return <p className="text-center py-20">Order not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-wrap justify-between items-end gap-3 mb-5">
        <div>
          <p className="text-sm text-gray-500">Order Number</p>
          <h1 className="text-xl md:text-2xl font-bold font-mono">{order.orderNumber || `#${order._id.slice(-8).toUpperCase()}`}</h1>
          <p className="text-sm text-gray-600 mt-1">Placed on {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        {order.accountType === 'wholesale' && (
          <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">WHOLESALE ORDER</span>
        )}
      </div>

      <OrderTimeline
        status={order.status}
        history={order.statusHistory}
        estimatedDelivery={order.estimatedDelivery}
        trackingNumber={order.trackingNumber}
      />

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 mt-6">
        <div className="space-y-4">
          <Card title={`Items (${order.items.length})`}>
            {order.items.map((it) => (
              <div key={it._id} className="flex gap-3 py-3 border-b last:border-0">
                <Link to={`/product/${it.product}`} className="w-20 h-20 bg-gray-50 border rounded overflow-hidden p-2 flex-shrink-0">
                  <img src={it.image} className="w-full h-full object-contain" alt={it.name} />
                </Link>
                <div className="flex-1">
                  <Link to={`/product/${it.product}`} className="font-medium hover:text-primary-500">{it.name}</Link>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-gray-500">Qty: {it.qty} × ₹{it.price}</p>
                    {it.isWholesalePrice && <span className="bg-purple-100 text-purple-700 text-[10px] px-1.5 py-0.5 rounded font-bold">WHOLESALE</span>}
                  </div>
                </div>
                <p className="font-bold">₹{(it.qty * it.price).toFixed(2)}</p>
              </div>
            ))}
          </Card>

          <Card title={<span className="flex items-center gap-2"><FiMapPin /> Shipping Address</span>}>
            <p className="font-semibold">{order.shippingAddress.fullName}</p>
            <p className="text-gray-600 text-sm mt-1">{order.shippingAddress.street}</p>
            <p className="text-gray-600 text-sm">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</p>
            <p className="text-gray-600 text-sm">{order.shippingAddress.country}</p>
            <p className="text-gray-600 text-sm mt-2 flex items-center gap-1"><FiPhone size={14} /> {order.shippingAddress.phone}</p>
          </Card>
        </div>

        <aside className="space-y-3">
          <Card title={<span className="flex items-center gap-2"><FiCreditCard /> Payment</span>}>
            <p className="text-sm">Method: <span className="font-semibold">{order.paymentMethod}</span></p>
            <p className="text-sm">Status: {order.isPaid ? <span className="text-green-600 font-semibold">Paid {order.paidAt && '✓'}</span> : <span className="text-orange-600 font-semibold">Pending</span>}</p>
          </Card>
          <Card title="Bill Summary">
            <Row label="Subtotal" value={`₹${order.itemsPrice.toFixed(2)}`} />
            <Row label="Shipping" value={order.shippingPrice === 0 ? <span className="text-green-600 font-semibold">FREE</span> : `₹${order.shippingPrice.toFixed(2)}`} />
            <Row label="Tax" value={`₹${order.taxPrice.toFixed(2)}`} />
            <hr className="my-2" />
            <Row label="Total" value={`₹${order.totalPrice.toFixed(2)}`} bold />
          </Card>
        </aside>
      </div>
    </div>
  );
}

const Card = ({ title, children }) => (
  <div className="bg-white border rounded-lg p-5">
    <h2 className="font-bold text-lg mb-3">{title}</h2>
    {children}
  </div>
);
const Row = ({ label, value, bold }) => (
  <div className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm text-gray-700'}`}>
    <span>{label}</span><span>{value}</span>
  </div>
);
