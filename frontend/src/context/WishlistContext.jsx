import { createContext, useContext, useEffect, useState } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [ids, setIds] = useState(() => {
    const stored = localStorage.getItem('wishlist');
    return stored ? JSON.parse(stored) : [];
  });
  const [synced, setSynced] = useState(false);

  // Save guest list to localStorage
  useEffect(() => {
    if (!user) localStorage.setItem('wishlist', JSON.stringify(ids));
  }, [ids, user]);

  // On login: merge local wishlist into server, then load full server list
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!user) {
        setSynced(false);
        return;
      }
      try {
        const guestIds = JSON.parse(localStorage.getItem('wishlist') || '[]');
        if (guestIds.length > 0) {
          const { data } = await API.post('/wishlist/sync', { ids: guestIds });
          if (!cancelled) setIds(data.wishlist);
          localStorage.removeItem('wishlist');
        } else {
          const { data } = await API.get('/wishlist/ids');
          if (!cancelled) setIds(data);
        }
        if (!cancelled) setSynced(true);
      } catch (err) { /* ignore */ }
    })();
    return () => { cancelled = true; };
  }, [user?._id]);

  const isInWishlist = (productId) => ids.includes(productId);

  const toggle = async (product) => {
    const productId = product._id || product;
    const inList = ids.includes(productId);

    if (user) {
      try {
        const { data } = inList
          ? await API.delete(`/wishlist/${productId}`)
          : await API.post(`/wishlist/${productId}`);
        setIds(data.wishlist);
        toast.success(inList ? 'Removed from wishlist' : '❤ Added to wishlist');
      } catch (err) {
        toast.error('Failed to update wishlist');
      }
    } else {
      setIds((prev) => inList ? prev.filter((id) => id !== productId) : [...prev, productId]);
      toast.success(inList ? 'Removed from wishlist' : '❤ Added to wishlist');
    }
  };

  const clear = () => setIds([]);

  return (
    <WishlistContext.Provider value={{ ids, count: ids.length, isInWishlist, toggle, clear, synced }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
