import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { FiHeart, FiTrash2 } from 'react-icons/fi';

export default function Wishlist() {
  const { user } = useAuth();
  const { ids, count, clear } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (user) {
          const { data } = await API.get('/wishlist');
          setProducts(data);
        } else {
          if (ids.length === 0) { setProducts([]); return; }
          // Fetch each product (no batch endpoint yet — fetch in parallel)
          const results = await Promise.allSettled(ids.map((id) => API.get(`/products/${id}`)));
          setProducts(results.filter((r) => r.status === 'fulfilled').map((r) => r.value.data));
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    })();
  }, [user?._id, ids.join(',')]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b pb-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2">
            <FiHeart className="text-primary-500" /> My Wishlist
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {count === 0 ? 'No items yet' : `${count} item${count > 1 ? 's' : ''} saved`}
          </p>
        </div>
        {count > 0 && (
          <button
            onClick={() => { if (confirm('Remove all items from wishlist?')) clear(); }}
            className="text-sm text-red-500 hover:text-red-700 inline-flex items-center gap-1"
          >
            <FiTrash2 size={14} /> Clear all
          </button>
        )}
      </div>

      {!user && count > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-5 text-sm text-yellow-800">
          💡 <Link to="/login" className="font-semibold underline">Login</Link> to keep your wishlist synced across devices.
        </div>
      )}

      {count === 0 ? (
        <div className="text-center py-16 bg-white border rounded-2xl">
          <FiHeart size={56} className="mx-auto text-gray-300" />
          <h2 className="text-xl font-bold mt-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mt-1 max-w-md mx-auto">
            Tap the ❤ on any product to save it for later. Your favorites stay here even after you log out.
          </p>
          <Link to="/shop" className="btn-primary inline-block mt-5">Start Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}
